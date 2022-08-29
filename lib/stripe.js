import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise = null;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_API_KEY);
  }
  return stripePromise;
};

export const stripe = await getStripe();
