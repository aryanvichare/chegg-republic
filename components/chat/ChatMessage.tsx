import { Message } from "ai";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/chat/ui/Codeblock";
import { MemoizedReactMarkdown } from "@/components/chat/ui/Markdown";
import { IconOpenAI, IconUser } from "@/components/ui/icons";
import { ChatMessageActions } from "@/components/chat/ChatMessageActions";
import BlurImage from "../BlurImage";

export interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message, ...props }: ChatMessageProps) {
  return (
    <div
      className={cn("group relative mb-4 flex items-start md:-ml-12")}
      {...props}>
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow",
          message.role === "user"
            ? "bg-background"
            : "bg-primary text-primary-foreground"
        )}>
        {message.role === "user" ? (
          <IconUser />
        ) : (
          <BlurImage
            src={"/images/C.svg"}
            alt='Chegg Icon'
            width={13}
            height={13}
          />
        )}
      </div>
      <div className='ml-4 flex-1 space-y-2 overflow-hidden px-1'>
        <MemoizedReactMarkdown
          className='prose break-words prose-invert prose-p:leading-relaxed prose-pre:p-0'
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className='mb-2 last:mb-0'>{children}</p>;
            },
            code({ node, inline, className, children, ...props }) {
              if (children.length) {
                if (children[0] == "▍") {
                  return (
                    <span className='mt-1 animate-pulse cursor-default'>▍</span>
                  );
                }

                children[0] = (children[0] as string).replace("`▍`", "▍");
              }

              const match = /language-(\w+)/.exec(className || "");

              if (inline) {
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }

              return (
                <CodeBlock
                  key={Math.random()}
                  language={(match && match[1]) || ""}
                  value={String(children).replace(/\n$/, "")}
                  {...props}
                />
              );
            },
          }}>
          {message.content}
        </MemoizedReactMarkdown>
        <ChatMessageActions message={message} />
      </div>
    </div>
  );
}
