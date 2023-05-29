import axios from 'axios';
import { ContentTypeFormUrlEncoded, SLACK_OAUTH_API_V2 } from 'constants/default';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const host = req.headers['host']!;
  const path = req.headers['x-invoke-path']!.toString();

  const form = new FormData();
  form.append('code', req.query.code!.toString());
  form.append('client_id', process.env.SLACK_CLIENT_ID!);
  form.append('client_secret', process.env.SLACK_CLIENT_SECRET!);
  form.append('redirect_uri', `https://${host}${path}`);

  const { data } = await axios.post(SLACK_OAUTH_API_V2, form, {
    headers: {
      'Content-Type': ContentTypeFormUrlEncoded,
    },
  });
  console.log(data);

  res.status(200).json(data);
}
