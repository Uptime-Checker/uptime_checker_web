import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const host = req.headers['host']!;
  const path = req.headers['x-invoke-path']!.toString();

  const form = new FormData();
  form.append('code', req.query.code!.toString());
  form.append('client_id', process.env.SLACK_CLIENT_ID!);
  form.append('client_secret', process.env.SLACK_CLIENT_SECRET!);
  form.append('redirect_uri', `https://${host}${path}`);

  const { data } = await axios.post('https://slack.com/api/oauth.v2.access', form, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  console.log(data);

  res.status(200).json(data);
}
