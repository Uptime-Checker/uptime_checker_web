import * as Sentry from '@sentry/nextjs';
import { HttpStatusCode } from 'axios';
import { STRIPE_API_VERSION } from 'constants/default';
import { MethodNotAllowed } from 'constants/errors';
import { HTTPMethod } from 'lib/axios';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: STRIPE_API_VERSION,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === HTTPMethod.POST) {
    try {
      const session = await stripe.billingPortal.sessions.create({
        customer: req.body.customerId as string,
        return_url: `${req.headers.origin!}/${req.body.relativePath as string}`,
      });

      res.status(HttpStatusCode.Ok).json(session);
    } catch (err) {
      Sentry.captureException(err);
      res.status(HttpStatusCode.InternalServerError).json(err);
    }
  } else {
    res.status(HttpStatusCode.MethodNotAllowed).end(MethodNotAllowed);
  }
}
