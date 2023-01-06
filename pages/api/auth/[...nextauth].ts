import { PrismaAdapter } from '@next-auth/prisma-adapter';
import * as Sentry from '@sentry/nextjs';
import { elixirClient } from 'lib/axios';
import { prisma } from 'lib/prisma';
import { AccessToken } from 'models/user';
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
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      let returnUrl = baseUrl;
      if (url.startsWith('/')) {
        returnUrl = `${baseUrl}${url}`;
      } else if (new URL(url).origin === baseUrl) {
        returnUrl = url;
      }
      let finalUrl = new URL(returnUrl);
      finalUrl.searchParams.set('provider_redirect', 'true');
      return finalUrl.toString();
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        // After sign in

        try {
          const { data } = await elixirClient.post<AccessToken>('/provider_login', {
            name: token.name,
            email: token.email,
            provider: account.provider,
            picture_url: token.picture,
            provider_uid: account.providerAccountId,
          });

          token.accessToken = data.access_token;
        } catch (error) {
          Sentry.captureException(error);
        }
      }
      return token;
    },
  },
});
