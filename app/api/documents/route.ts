import fs from "fs";
import prisma from "@/lib/prisma";
import pinecone, { initializePinecone } from "@/lib/pinecone";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PineconeStore } from "langchain/vectorstores/pinecone";

import axios from "axios";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request, response: Response) {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized Request." },
      { status: 401 }
    );
  }

  const body = await request.json();

  if (!body || !body.url || !body.path || !body.name) {
    return NextResponse.json(
      { error: "Invalid request. Missing required params" },
      { status: 429 }
    );
  }

  const document = await prisma.document.create({
    data: {
      url: body?.url,
      path: body?.path,
      name: body?.name,
      userId: session.user.id,
    },
  });

  const res = await axios.get(body.url, { responseType: "arraybuffer" });
  fs.writeFileSync(`/tmp/${document.id}.pdf`, res.data);

  const loader = new PDFLoader(`/tmp/${document.id}.pdf`);

  const rawDocuments = await loader.load();
  /* Split text into chunks */
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1536,
    chunkOverlap: 200,
  });

  const documents = await textSplitter.splitDocuments(rawDocuments);

  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPEN_AI_API_KEY as string,
    stripNewLines: true,
    verbose: true,
    timeout: 60000,
    maxConcurrency: 5,
  });

  if (!pinecone) {
    initializePinecone();
  }

  const index = pinecone.Index(process.env.PINECONE_INDEX_NAME!);

  await PineconeStore.fromDocuments(documents, embeddings, {
    pineconeIndex: index,
    namespace: document.id,
  });

  return NextResponse.json(document, { status: 200 });
}

export async function GET(request: Request) {
  const data = await prisma.document.findMany({
    orderBy: {
      created_at: "desc",
    },
  });

  return NextResponse.json(data, { status: 200 });
}
