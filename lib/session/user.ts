import { GetServerSidePropsContext } from 'next';
import { isEmpty } from 'utils/misc';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { apiClient } from 'lib/axios';
import { UserResponse } from 'models/user';

export const getSessionUser = async (ctx: GetServerSidePropsContext) => {
  // if iron session has the token
  let accessToken = ctx.req.session.accessToken;

  if (isEmpty(accessToken)) {
    // if next auth has the token
    const session = await getServerSession(ctx.req, ctx.res, authOptions);
    if (!session || isEmpty(session.accessToken)) {
      return null;
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
    user.Token = accessToken;
    return user;
  } catch (error) {
    return null;
  }
};
