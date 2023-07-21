import { FC } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface EmptyChatHistoryProps {}

const EmptyChatHistory: FC<EmptyChatHistoryProps> = ({}) => {
  return (
    <div className='mt-12 flex flex-row space-x-8'>
      <div className='relative flex h-80 grow items-center justify-center rounded-lg border border-gray-6'>
        <div className='mx-auto flex max-w-md flex-col justify-center space-y-8 text-center'>
          <div className='flex flex-col space-y-2'>
            <h3 className='text-xl tracking-[-0.16px] text-slate-12 font-bold'>
              You don't have any chats yet
            </h3>
            <span className='text-md text-gray-300 leading-relaxed font-normal'>
              Once you create your first chat, it will appear here
            </span>
          </div>
          <Button asChild className='mx-auto'>
            <Link href='/welcome'>Create new chat</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmptyChatHistory;
