import { FC } from "react";
import { getChats } from "@/app/actions";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { type Chat } from "@/lib/types";
import { formatDate, truncate } from "@/lib/utils";
import Link from "next/link";
import EmptyChatHistory from "./EmptyChatHistory";

interface ChatHistoryProps {}

const ChatHistory: FC<ChatHistoryProps> = async ({}) => {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const chats = (await getChats(session.user.id)) as Chat[];

  if (!chats || chats.length === 0) {
    return <EmptyChatHistory />;
  }

  return (
    <div className='mt-12 flow-root'>
      <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
          <table className='min-w-full divide-y divide-gray-700'>
            <thead>
              <tr>
                <th
                  scope='col'
                  className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0'>
                  Name
                </th>
                <th
                  scope='col'
                  className='px-3 py-3.5 text-left text-sm font-semibold text-white'>
                  Date Created
                </th>
                <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-0'>
                  <span className='sr-only'>Open Chat</span>
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-800'>
              {chats.map((chat) => (
                <tr key={chat.title}>
                  <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0'>
                    {truncate(chat.title, 80)}
                  </td>
                  <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300'>
                    {formatDate(new Date(chat.createdAt))}
                  </td>
                  <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0'>
                    <Link
                      href={`/chat/${chat.id}`}
                      className='text-primary hover:text-primary/90'
                      target='_blank'>
                      Open Chat
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;
