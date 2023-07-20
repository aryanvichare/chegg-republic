"use client";

import { useChat, Message } from "ai/react";
import { FC } from "react";
import { ChatList } from "./ChatList";
import { cn } from "@/lib/utils";
import { EmptyScreen } from "./EmptyScreen";
import { ChatScrollAnchor } from "./ChatScrollAnchor";
import { toast } from "sonner";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import { ChatPanel } from "./ChatPanel";

export interface ChatProps extends React.ComponentProps<"div"> {
  initialMessages?: Message[];
  id?: string;
}

const Chat: FC<ChatProps> = ({ id, initialMessages, className }) => {
  const [previewToken, setPreviewToken] = useLocalStorage<string | null>(
    "chegg-republic-token",
    null
  );

  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
      initialMessages,
      id,
      body: {
        id,
        previewToken,
      },
      onResponse(response) {
        if (response.status === 401) {
          toast.error(response.statusText);
        }
      },
    });

  return (
    <>
      <div className={cn("pb-[200px] w-full pt-4 md:pt-10", className)}>
        {messages.length ? (
          <>
            <ChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        ) : (
          <EmptyScreen setInput={setInput} />
        )}
      </div>
      <ChatPanel
        id={id}
        isLoading={isLoading}
        stop={stop}
        append={append}
        reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
      />
    </>
  );
};

export default Chat;
