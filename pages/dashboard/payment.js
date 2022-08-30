import axios from 'axios';
import getStripe from '../../lib/stripe';
import { elixirClient } from '../../lib/axios';

export default function Payment({ products }) {
  async function handleClick(e) {
    e.preventDefault();

    const response = await axios.post('/api/checkout_sessions', {
      priceId: products[0].prices[0].id,
    });

    if (response.statusCode === 500) {
      console.error(response.message);
      return;
    }

    // Redirect to Checkout.
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: response.data.id,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message);
  }

  return (
    <div className="payment_container">
      <button onClick={handleClick}>Pay</button>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await elixirClient.get(`/external_products`);
  const products = res.data.data;

  return {
    props: {
      products,
    },
  };
}
