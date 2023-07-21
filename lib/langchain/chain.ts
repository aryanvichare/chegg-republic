// langchain/chain.ts
import { VectorDBQAChain } from "langchain/chains";
import { ChatMessageHistory } from "langchain/memory";
import { mapStoredMessagesToChatMessages } from "@/lib/langchain/schema";
import { BufferMemory } from "langchain/memory";
import { BaseMessage, ChainValues } from "langchain/schema";
import { BaseLanguageModel } from "langchain/dist/base_language";
import { VectorStore } from "langchain/dist/vectorstores/base";

/**
 * Executes a language chain for question-answering tasks and returns the response.
 *
 * @param {BaseLanguageModel} model - An instance of the BaseLanguageModel class representing the language model to be used for question-answering.
 * @param {VectorStore} vectorStore - An instance of the VectorStore class representing the vector store used for similarity calculations and document retrieval in the language chain.
 * @param {string} sanitizedQuestion - The sanitized input question or query that will be used for generating a response from the language chain.
 * @param {BaseMessage[]} history - An array of BaseMessage objects representing the chat message history to be used as context for the language chain.
 *
 * @returns {string | ChainValues} - The response from the language chain. It can be a string or a ChainValues object depending on the generated output.
 */

export function getChain(
  model: BaseLanguageModel,
  vectorStore: VectorStore,
  sanitizedQuestion: string,
  history: BaseMessage[]
) {
  const lcChatMessageHistory = new ChatMessageHistory(
    mapStoredMessagesToChatMessages(history)
  );
  const memory = new BufferMemory({
    chatHistory: lcChatMessageHistory,
    returnMessages: true,
    memoryKey: "history",
  });

  const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
    returnSourceDocuments: true,
  });

  const response: string | ChainValues = chain.call({
    query: sanitizedQuestion,
    chat_history: history,
    memory: memory,
  });

  return response;
}
