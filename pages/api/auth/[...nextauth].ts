import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from 'lib/prisma';
import NextAuth from 'next-auth';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Github({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
});
