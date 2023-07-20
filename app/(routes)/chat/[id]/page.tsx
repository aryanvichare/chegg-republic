import { FC } from "react";
import Chat from "@/components/chat/Chat";

export const runtime = "edge";
export const preferredRegion = "home";

interface ChatPageProps {
  params: {
    id: string;
  };
}

const ChatPage: FC<ChatPageProps> = ({ params: { id } }) => {
  return <Chat id={id} />;
};

export default ChatPage;
