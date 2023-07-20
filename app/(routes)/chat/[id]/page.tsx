import { FC } from "react";
import Chat from "@/components/chat/Chat";
import { getChat } from "@/app/actions";

export const preferredRegion = "home";

interface ChatPageProps {
  params: {
    id: string;
  };
}

const ChatPage: FC<ChatPageProps> = async ({ params: { id } }) => {
  const chat = await getChat(id);

  console.log("Chat Reference:", chat);

  return <Chat initialMessages={chat?.messages} id={id} />;
};

export default ChatPage;
