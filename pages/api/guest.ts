import { render } from '@react-email/render';
import * as Sentry from '@sentry/nextjs';
import { AxiosError, HttpStatusCode } from 'axios';
import Email from 'components/email/guest-login';
import { getDefaultFromEmail } from 'constants/default';
import { ERROR_FAILED_TO_LOGIN_GUEST, ERROR_FAILED_TO_SEND_EMAIL } from 'constants/errors';
import { sendAWSEmail } from 'lib/aws/email';
import { HTTPMethod, apiClient } from 'lib/axios';
import { AppName } from 'lib/global';
import { withSessionRoute } from 'lib/session/withSession';
import { ErrorResponse } from 'models/error';
import { AccessTokenResponse, GuestUserResponse } from 'models/user';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ElixirError } from 'types/error';

const emailHtml = (origin: string, email: string, code: string) => {
  const link = `${origin}/api/guest?email=${email}&code=${code}`;
  return render(Email({ magicLink: link }), { pretty: true });
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AccessTokenResponse | GuestUserResponse | ErrorResponse>
) {
  if (req.method === HTTPMethod.GET) {
    if (req.query.email === '' || req.query.code === '') {
      res.status(HttpStatusCode.UnprocessableEntity).end();
      return;
    }
    try {
      const { data } = await apiClient.post<AccessTokenResponse>('/user/guest/login', {
        email: req.query.email,
        code: req.query.code,
      });

      // Save the token in the session
      req.session.accessToken = data.data.Token;
      await req.session.save();

      res.redirect(HttpStatusCode.TemporaryRedirect, '/auth/email-result');
    } catch (error) {
      Sentry.captureException(error);

      const elixirError = (error as AxiosError).response?.data as ElixirError;
      let err = ERROR_FAILED_TO_LOGIN_GUEST;
      if (elixirError && elixirError.message) {
        err = elixirError.message;
      }
      res.redirect(HttpStatusCode.TemporaryRedirect, `/auth/email-result?error=${err}`);
    }
    return;
  }
  if (req.method !== HTTPMethod.POST) {
    res.status(HttpStatusCode.MethodNotAllowed).end();
    return;
  }

  try {
    const { data } = await apiClient.post<GuestUserResponse>('/user/guest', { email: req.body.email });
    try {
      await sendAWSEmail(
        `${AppName!} <${getDefaultFromEmail()}>`,
        data.data.Email,
        `Sign in to ${AppName!}`,
        emailHtml(req.headers.origin!, data.data.Email, data.data.Code!)
      );
      res
        .status(HttpStatusCode.Ok)
        .json({ data: { ID: data.data.ID, Email: data.data.Email, ExpiresAt: data.data.ExpiresAt } });
    } catch (error) {
      Sentry.captureException(error);
      res.status(HttpStatusCode.InternalServerError).send({ error: ERROR_FAILED_TO_SEND_EMAIL });
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    const elixirError = axiosError.response?.data as ElixirError;
    res.status(axiosError.response!.status).send(elixirError);
  }
}

export default withSessionRoute(handler);
