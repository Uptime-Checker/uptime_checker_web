import { HttpStatusCode } from 'axios';
import { STRIPE_API_VERSION } from 'constants/default';
import { InternalServerError } from 'constants/errors';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: STRIPE_API_VERSION,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = String(req.query.id);
  try {
    if (!id.startsWith('cs_')) {
      res.status(HttpStatusCode.InternalServerError).json({ message: 'Incorrect CheckoutSession ID' });
      return;
    }
    const checkout_session = await stripe.checkout.sessions.retrieve(id, {
      expand: ['payment_intent'],
    });

    res.status(200).json(checkout_session);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : InternalServerError;
    res.status(HttpStatusCode.InternalServerError).json({ message: errorMessage });
  }
}
