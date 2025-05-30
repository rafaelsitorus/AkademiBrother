// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      roleName?: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    id: string;
    roleName?: string;
  }
}