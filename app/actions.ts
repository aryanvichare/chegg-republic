"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { kv } from "@vercel/kv";

import { type Chat } from "@/lib/types";

export async function getChat(id: string) {
  console.log("ID: ", id);
  const chat = await kv.hgetall<Chat>(`chat:${id}`);

  if (!chat) {
    return null;
  }

  return chat;
}
