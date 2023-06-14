import 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    /** The user's access token. */
    provider: string;
    accessToken: string;
  }

  interface Profile {
    picture?: string;
    avatar_url?: string;
  }
}
