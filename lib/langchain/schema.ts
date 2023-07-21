import {
  AIMessage,
  BaseMessage,
  HumanMessage,
  SystemMessage,
} from "langchain/schema";

export function mapStoredMessagesToChatMessages(
  messages: BaseMessage[]
): BaseMessage[] {
  return messages.map((message) => {
    switch (message.name) {
      case "human":
        return new HumanMessage(message.text);
      case "ai":
        return new AIMessage(message.text);
      case "system":
        return new SystemMessage(message.text);
      default:
        throw new Error("Role must be defined for generic messages");
    }
  });
}
