import * as Sentry from '@sentry/nextjs';
import axios, { HttpStatusCode } from 'axios';
import { ContentTypeFormUrlEncoded, SLACK_OAUTH_API_V2 } from 'constants/default';
import { apiClient } from 'lib/axios';
import { IntegrationType, SingleIntegrationResponse } from 'models/monitor';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const host = req.headers['host']!;
  const path = req.headers['x-invoke-path']!.toString();

  const orgSlug = req.query.state!.toString();

  const form = new FormData();
  form.append('code', req.query.code!.toString());
  form.append('client_id', process.env.SLACK_CLIENT_ID!);
  form.append('client_secret', process.env.SLACK_CLIENT_SECRET!);
  form.append('redirect_uri', `https://${host}${path}`);

  try {
    const { data } = await axios.post(SLACK_OAUTH_API_V2, form, {
      headers: {
        'Content-Type': ContentTypeFormUrlEncoded,
      },
    });

    const response = await apiClient.post<SingleIntegrationResponse>('/integration', {
      type: IntegrationType.Slack,
      config: data,
    });

    return res.redirect(`/${orgSlug}/integration?slack=${response.status === HttpStatusCode.Ok ? 'true' : 'false'}`);
  } catch (error) {
    Sentry.captureException(error);
    return res.redirect(`/${orgSlug}/integrations?slack=false`);
  }
}
