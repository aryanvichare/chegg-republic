import pinecone from "@/lib/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

import { type PineconeClient } from "@pinecone-database/pinecone";
import { getOpenAIEmbeddings } from "@/lib/openai";
import { Metadata, getMatchesFromEmbeddings } from "@/lib/pinecone";

export async function getPineconeStore(namespace: string) {
  const index = pinecone.Index(process.env.PINECONE_INDEX_NAME!);

  /* create vectorstore*/
  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings({ openAIApiKey: process.env.OPEN_AI_API_KEY }),
    {
      pineconeIndex: index,
      textKey: "text",
      namespace: namespace || process.env.PINECONE_NAME_SPACE,
    }
  );

  return vectorStore;
}

export const getContext = async (
  message: string,
  pinecone: PineconeClient,
  namespace: string,
  maxTokens = 3000
) => {
  const embedding = await getOpenAIEmbeddings(message);
  const matches = await getMatchesFromEmbeddings(
    embedding,
    pinecone!,
    1,
    namespace
  );

  console.log("matches", matches);

  const docs =
    matches &&
    Array.from(
      matches.reduce((map, match) => {
        const metadata = match.metadata as Metadata;
        const { text, url } = metadata;
        if (!map.has(url)) {
          map.set(url, text);
        }
        return map;
      }, new Map())
    ).map(([_, text]) => text);

  return docs.join("\n").substring(0, maxTokens);
};
