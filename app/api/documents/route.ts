import fs from "fs";
import prisma from "@/lib/prisma";
import { initializePinecone } from "@/lib/pinecone";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { type Document } from "langchain/dist/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PineconeStore } from "langchain/vectorstores/pinecone";

import axios from "axios";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { Document as PrismaDocument } from "@prisma/client";

export async function POST(request: Request, response: Response) {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized Request." },
      { status: 401 }
    );
  }

  const {
    uploadedFiles: files,
    namespace,
  }: { uploadedFiles: PrismaDocument[]; namespace: string } =
    await request.json();

  if (!files || !Array.isArray(files)) {
    return NextResponse.json(
      { error: "Invalid request. Missing required params" },
      { status: 429 }
    );
  }

  const augmentedFiles = files.map((file) => {
    return {
      ...file,
      userId: session.user.id,
    };
  });

  const prismaDocuments = await prisma.document.createMany({
    data: augmentedFiles,
  });

  let loader: PDFLoader;
  let rawDocuments: Document[] = [];

  await Promise.all(
    files.map(async (file: PrismaDocument) => {
      const res = await axios.get(file.url, { responseType: "arraybuffer" });
      fs.writeFileSync(`/tmp/${file.id}.pdf`, res.data);

      loader = new PDFLoader(`/tmp/${file.id}.pdf`);
      const document = await loader.load();

      rawDocuments = [...rawDocuments, ...document];
    })
  );

  // console.log("rawDocuments", rawDocuments);

  /* Split text into chunks */
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1536,
    chunkOverlap: 200,
  });

  const documents = await textSplitter.splitDocuments(rawDocuments);

  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPEN_AI_API_KEY as string,
    stripNewLines: true,
    verbose: true,
    timeout: 60000,
    maxConcurrency: 5,
  });

  const pinecone = await initializePinecone();
  const index = pinecone.Index(process.env.PINECONE_INDEX_NAME!);

  console.log(
    "🌲",
    `Uploading embeddings to Pinecone with index ${index} and namespace ${namespace}`
  );

  try {
    await PineconeStore.fromDocuments(documents, embeddings, {
      pineconeIndex: index,
      namespace: namespace,
    });

    return NextResponse.json(prismaDocuments, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: e }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const namespace = searchParams.get("namespace");

  if (!namespace) {
    return NextResponse.json(
      { error: "Invalid request. Missing required params" },
      { status: 429 }
    );
  }

  const data = await prisma.document.findMany({
    where: {
      namespace: namespace,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return NextResponse.json(data, { status: 200 });
}
