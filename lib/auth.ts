import NextAuth, { DefaultSession, NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      /** The user's id. */
      id: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma as PrismaClient),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    jwt: async ({ token, profile, user, trigger }) => {
      if (!token.email) {
        return {};
      }

      if (profile) {
        token.id = user.id;
        token.image = profile.picture;
      }

      if (trigger === "update") {
        const refreshedUser = await prisma.user.findUnique({
          where: { id: token.sub },
        });
        token.user = refreshedUser;
        token.name = refreshedUser?.name;
        token.email = refreshedUser?.email;
        token.image = refreshedUser?.image;
      }

      return token;
    },
    session: async ({ session, token }) => {
      console.log("Session Callback");

      session.user = {
        // @ts-ignore
        id: token.sub,
        ...session.user,
      };

      return session;
    },
  },
};

/*
export async function getSession(req: Request, res: Response) {
  // @ts-ignore
  return (await getServerSession(
    req as unknown as NextApiRequest,
    {
      ...res,
      getHeader: (name: string) => res.headers?.get(name),
      setHeader: (name: string, value: string) => res.headers?.set(name, value),
    } as unknown as NextApiResponse,
    authOptions
  )) as Session;
}

const withAuth =
  (handler: WithAuthNextApiHandler) => async (req: Request, res: Response) => {
    const session = await getSession(req, res);

    if (!session?.user.id) {
      return NextResponse.json("Unauthorized: Login required.", {
        status: 401,
      });
    }

    return handler(req, res, session);
  };

export { withAuth };
*/

export const {
  handlers: { GET, POST },
  auth,
  CSRF_experimental, // will be removed in future
} = NextAuth(authOptions);
