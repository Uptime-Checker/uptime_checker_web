import { render } from '@react-email/render';
import * as Sentry from '@sentry/nextjs';
import { AxiosError, HttpStatusCode } from 'axios';
import Email from 'components/email/guest-login';
import { getDefaultFromEmail } from 'constants/default';
import { ERROR_FAILED_TO_SEND_EMAIL } from 'constants/errors';
import { sendEmail } from 'lib/aws/email';
import { apiClient, HTTPMethod } from 'lib/axios';
import { ErrorResponse } from 'models/error';
import { GuestUserResponse } from 'models/user';
import type { NextApiRequest, NextApiResponse } from 'next';

const emailHtml = render(Email({ url: 'https://example.com' }), { pretty: true });

export default async function handler(req: NextApiRequest, res: NextApiResponse<GuestUserResponse | ErrorResponse>) {
  if (req.method !== HTTPMethod.POST) {
    res.status(HttpStatusCode.MethodNotAllowed).end();
    return;
  }

  try {
    const { data } = await apiClient.post<GuestUserResponse>('/user/guest', { email: req.body.email });
    try {
      await sendEmail(getDefaultFromEmail(), data.data.Email, `Sign in to ${process.env.APP_NAME!}`, emailHtml);
      res.status(200).json({ data: { ID: data.data.ID, Email: data.data.Email, ExpiresAt: data.data.ExpiresAt } });
    } catch (error) {
      Sentry.captureException(error);
      res.status(HttpStatusCode.InternalServerError).send({ error: ERROR_FAILED_TO_SEND_EMAIL });
    }
  } catch (error) {
    let errorMessage = ERROR_FAILED_TO_SEND_EMAIL;
    if (error instanceof AxiosError && error.response) {
      errorMessage = error.response.data.message;
    }
    res.status(HttpStatusCode.BadRequest).send({ error: errorMessage });
  }
}
