import { STRIPE_API_VERSION } from 'lib/constants';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: STRIPE_API_VERSION,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = String(req.query.id);
  try {
    if (!id.startsWith('cs_')) {
      throw Error('Incorrect CheckoutSession ID');
    }
    const checkout_session = await stripe.checkout.sessions.retrieve(id, {
      expand: ['payment_intent'],
    });

    res.status(200).json(checkout_session);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Internal server error';
    res.status(500).json({ statusCode: 500, message: errorMessage });
  }
}
