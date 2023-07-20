import { kv } from "@vercel/kv";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";

import { nanoid } from "@/lib/utils";
import { auth } from "@/lib/auth";

export const runtime = "edge";

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(request: Request, response: Response) {
  const userId = (await auth())?.user.id;
  console.log("UserId: ", userId);

  const json = await request.json();
  const { messages } = json;

  console.log(messages);

  //   const userId = (await auth())?.user.id;

  if (!userId) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages,
    temperature: 0.7,
    stream: true,
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
