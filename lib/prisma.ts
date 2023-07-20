import { PrismaClient } from "@prisma/client/edge";

declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient;
    }
  }
}

let prisma: PrismaClient | null = null;

if (typeof window === "undefined") {
  if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
  } else {
    //@ts-ignore
    if (!global.prisma) {
      //@ts-ignore
      global.prisma = new PrismaClient();
    }

    //@ts-ignore
    prisma = global.prisma;
  }
}

export default prisma as PrismaClient;
