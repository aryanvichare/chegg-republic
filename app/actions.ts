"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { kv } from "@vercel/kv";

import { type Chat } from "@/lib/types";

export async function getChat(id: string) {
  console.log(`💬 Retrieving chat context for chat id: ${id}`);
  const chat = await kv.hgetall<Chat>(`chat:${id}`);

  if (!chat) {
    return null;
  }

  return chat;
}

export async function getChats(userId?: string | null) {
  if (!userId) {
    return [];
  }

  try {
    const pipeline = kv.pipeline();
    const chats: string[] = await kv.zrange(`user:chat:${userId}`, 0, -1, {
      rev: true,
    });

    for (const chat of chats) {
      pipeline.hgetall(chat);
    }

    const results = await pipeline.exec();

    return results as Chat[];
  } catch (error) {
    return [];
  }
}
