import Stripe from 'stripe';
import { STRIPE_API_VERSION } from '/lib/constants';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: STRIPE_API_VERSION,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const priceId = req.body.priceId;
    try {
      // Create Checkout Sessions from body params.
      const params = {
        customer: 'cus_MRDvgTwgO0SIZ4',
        payment_method_types: ['card'],
        mode: 'setup',
        success_url: `${req.headers.origin}/dashboard/payment/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/dashboard/payment/canceled?session_id={CHECKOUT_SESSION_ID}`,
      };
      const checkoutSession = await stripe.checkout.sessions.create(params);

      res.status(200).json(checkoutSession);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else if (req.method === 'GET') {
    const { sessionId } = req.query;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.send(session);
  } else {
    res.status(405).end('Method Not Allowed');
  }
}
