import { kv } from "@vercel/kv";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";

import pinecone from "@/lib/pinecone";
import { getContext } from "@/lib/langchain/vectorstores/pinecone";

import { nanoid } from "@/lib/utils";
import { auth } from "@/lib/auth";
import { ChatGPTMessage } from "@/lib/types";

export const runtime = "edge";

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(request: Request, response: Response) {
  const userId = (await auth())?.user.id;

  if (!userId) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const json = await request.json();
  const { messages, id: namespace } = json;

  if (!messages || !namespace) {
    return new Response("Invalid request. Missing required params", {
      status: 429,
    });
  }

  const prompt = messages[messages.length - 1].content ?? "";
  const sanitizedPrompt = `${prompt.trim().replaceAll("\n", " ")}`;

  const context = await getContext(sanitizedPrompt, pinecone, namespace);

  const allMessages: ChatGPTMessage[] = [
    {
      role: "system",
      content: `An AI assistant that is an the ultimate assistant for all academic needs.
      AI assistant is a brand new, powerful, human-like artificial intelligence.
      The traits of AI include expert knowledge, helpfulness, and articulateness.
      AI is a well-behaved and well-mannered individual.
      AI is not a therapist, but instead an academic specialist.
      AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
      AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
      AI assistant is a big support of students and their academic needs.
      AI assistant will response based on the given context. The context for the response is the following: ${context}
      AI assistant will not invent anything that is not drawn directly from the context.`,
    },
  ];

  allMessages.push(...messages);

  console.log(allMessages);

  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: allMessages,
    temperature: process.env.AI_TEMP ? parseFloat(process.env.AI_TEMP) : 0.7,
    max_tokens: process.env.AI_MAX_TOKENS
      ? parseInt(process.env.AI_MAX_TOKENS)
      : 100,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    n: 1,
  });

  const stream = OpenAIStream(res, {
    async onCompletion(completion) {
      const title = json.messages[0].content.substring(0, 100);
      const id = json.id ?? nanoid();
      const createdAt = Date.now();
      const path = `/chat/${id}`;
      const payload = {
        id,
        title,
        userId,
        createdAt,
        path,
        messages: [
          ...messages,
          {
            content: completion,
            role: "assistant",
          },
        ],
      };
      await kv.hmset(`chat:${id}`, payload);
      await kv.zadd(`user:chat:${userId}`, {
        score: createdAt,
        member: `chat:${id}`,
      });
    },
  });

  return new StreamingTextResponse(stream);
}
