import { PineconeClient } from "@pinecone-database/pinecone";

const pinecone = new PineconeClient();

export async function initializePinecone() {
  if (!pinecone) {
    throw new Error("Pinecone client does not exist");
  }

  console.log("Initializing Pinecone client");

  await pinecone.init({
    environment: process.env.PINECONE_ENVIRONMENT as string,
    apiKey: process.env.PINECONE_API_KEY as string,
  });
}

initializePinecone();

export default pinecone;
