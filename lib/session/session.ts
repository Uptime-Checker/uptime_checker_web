// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import type { IronSessionOptions } from 'iron-session';
import { NODE_ENV_PROD } from 'constants/default';

export const sessionOptions: IronSessionOptions = {
  password: process.env.NEXTAUTH_SECRET!,
  cookieName: `${process.env.APP_NAME!}-email-session-auth`.replace(/\s+/g, '-'),
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === NODE_ENV_PROD,
  },
};

// This is where we specify the typings of req.session.*
declare module 'iron-session' {
  interface IronSessionData {
    accessToken: string;
  }
}
