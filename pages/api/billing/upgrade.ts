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
      const subscription = await stripe.subscriptions.retrieve(req.body.subscriptionId as string);
      const updatedSubscription = await stripe.subscriptions.update(subscription.id, {
        cancel_at_period_end: false,
        proration_behavior: 'create_prorations',
        items: [
          {
            id: subscription.items.data[0].id,
            price: req.body.priceId,
          },
        ],
      });

      res.status(HttpStatusCode.Ok).json(updatedSubscription);
    } catch (err) {
      Sentry.captureException(err);
      res.status(HttpStatusCode.InternalServerError).json(err);
    }
  } else {
    res.status(HttpStatusCode.MethodNotAllowed).end(MethodNotAllowed);
  }
}
