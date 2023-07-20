"use client";

import { UseChatHelpers } from "ai/react";

import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@/components/ui/icons";

const exampleMessages = [
  {
    heading: "📝 Provide an example",
    message: `Give me an example of: \n`,
  },
  {
    heading: "💡 Explain a concept",
    message: "Explain the following concept: \n",
  },
  {
    heading: "📚 Create a study guide",
    message: `Create me a study guide about the following topic: \n`,
  },
];

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, "setInput">) {
  return (
    <div className='mx-auto max-w-2xl px-4'>
      <div className='rounded-lg border bg-background p-8'>
        <h1 className='mb-2 text-lg font-semibold'>
          Welcome to Chegg Republic
        </h1>
        <p className='mb-2 leading-normal text-muted-foreground'>
          Chat with your AI assistant to get help with your homework, study for
          exams, and more.
        </p>
        <p className='leading-normal text-muted-foreground'>
          You can start a conversation here or try the following examples:
        </p>
        <div className='mt-4 flex flex-col items-start space-y-2'>
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant='link'
              className='h-auto p-0 text-base'
              onClick={() => setInput(message.message)}>
              <IconArrowRight className='mr-2 text-muted-foreground' />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
