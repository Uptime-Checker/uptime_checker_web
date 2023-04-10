import { GetServerSidePropsContext } from 'next';
import { isEmpty } from 'utils/misc';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import * as Sentry from '@sentry/nextjs';
import { apiClient } from 'lib/axios';
import { User, UserResponse } from 'models/user';

export const getUser = async (ctx: GetServerSidePropsContext, cb: (user: User | null) => void) => {
  // if iron session has the token
  let accessToken = ctx.req.session.accessToken;

  if (isEmpty(accessToken)) {
    // if next auth has the token
    const session = await getServerSession(ctx.req, ctx.res, authOptions);
    if (!session || isEmpty(session.accessToken)) {
      return { props: {} };
    }
    accessToken = session.accessToken;
  }

  try {
    const { data } = await apiClient.get<UserResponse>('/user/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const user = data.data;
    return cb(user);
  } catch (error) {
    Sentry.captureException(error);
  }

  return cb(null);
};
