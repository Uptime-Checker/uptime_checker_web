import { NextApiRequest, NextApiResponse } from 'next';

import Stripe from 'stripe';
import { STRIPE_API_VERSION } from '../../../lib/constants';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: STRIPE_API_VERSION,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const priceId = req.body.priceId;
    try {
      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        customer: 'cus_MRHkuCXBxTdMby',
        mode: 'subscription',
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: `${req.headers.origin}/dashboard/payment/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/dashboard/payment/canceled?session_id={CHECKOUT_SESSION_ID}`,
      };
      const checkoutSession = await stripe.checkout.sessions.create(params);

      res.status(200).json(checkoutSession);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Internal server error';
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  } else if (req.method === 'GET') {
    const { sessionId } = req.query;
    const session = await stripe.checkout.sessions.retrieve(String(sessionId));
    res.send(session);
  } else {
    res.status(405).end('Method Not Allowed');
  }
}
