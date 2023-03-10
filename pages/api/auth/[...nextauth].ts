import { PrismaAdapter } from '@next-auth/prisma-adapter';
import * as Sentry from '@sentry/nextjs';
import { AuthSchemeJWT } from 'constants/default';
import { GetLoginProvider } from 'lib/auth';
import { apiClient } from 'lib/axios';
import { prisma } from 'lib/prisma';
import { AccessTokenResponse } from 'models/user';
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
    strategy: AuthSchemeJWT,
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      let returnUrl = baseUrl;
      if (url.startsWith('/')) {
        returnUrl = `${baseUrl}${url}`;
      } else if (new URL(url).origin === baseUrl) {
        returnUrl = url;
      }
      return returnUrl;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        // After sign in

        try {
          const { data } = await apiClient.post<AccessTokenResponse>('/user/provider/login', {
            name: token.name,
            email: token.email,
            provider: GetLoginProvider(account.provider),
            picture: token.picture,
            providerUID: account.providerAccountId,
          });

          token.accessToken = data.data.Token;
        } catch (error) {
          Sentry.captureException(error);
        }
      }
      return token;
    },
  },
});
