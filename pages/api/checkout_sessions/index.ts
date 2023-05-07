import * as Sentry from '@sentry/nextjs';
import { HttpStatusCode } from 'axios';
import { STRIPE_API_VERSION, STRIPE_CHECKOUT_MODE } from 'constants/default';
import { HTTPMethod } from 'lib/axios';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: STRIPE_API_VERSION,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === HTTPMethod.POST) {
    try {
      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        customer: req.body.customerId,
        mode: STRIPE_CHECKOUT_MODE,
        line_items: [
          {
            price: req.body.priceId,
            quantity: 1,
          },
        ],
        success_url: `${req.headers.origin!}/result?session_id={CHECKOUT_SESSION_ID}&success=true`,
        cancel_url: `${req.headers.origin!}/result?session_id={CHECKOUT_SESSION_ID}&canceled=true`,
      };
      const checkoutSession = await stripe.checkout.sessions.create(params);

      res.status(HttpStatusCode.Ok).json(checkoutSession);
    } catch (err) {
      Sentry.captureException(err);
      const errorMessage = err instanceof Error ? err.message : 'Internal server error';
      res.status(HttpStatusCode.InternalServerError).json({ message: errorMessage });
    }
  } else if (req.method === HTTPMethod.GET) {
    const { sessionId } = req.query;
    const session = await stripe.checkout.sessions.retrieve(String(sessionId));
    res.send(session);
  } else {
    res.status(HttpStatusCode.MethodNotAllowed).end('Method Not Allowed');
  }
}
