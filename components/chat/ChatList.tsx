import { type Message } from "ai";

import { Separator } from "@/components/ui/separator";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatScrollAnchor } from "./ChatScrollAnchor";

export interface ChatList {
  messages: Message[];
  isLoading: boolean;
}

export function ChatList({ messages, isLoading }: ChatList) {
  if (!messages.length) {
    return null;
  }

  return (
    <div className='flex-1 w-full relative mx-auto max-w-2xl px-4'>
      {messages.map((message, index) => (
        <div key={index}>
          <ChatMessage message={message} />
          {index < messages.length - 1 && (
            <Separator className='my-4 md:my-8' />
          )}
        </div>
      ))}
      <ChatScrollAnchor trackVisibility={isLoading} />
    </div>
  );
}
