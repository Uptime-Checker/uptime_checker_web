import axios from 'axios';
import getStripe from '../../../lib/stripe';
import { elixirClient } from '../../../lib/axios';

export default function Subscription({ products }) {
  async function handleClick(e) {
    e.preventDefault();

    const response = await axios.post('/api/checkout_sessions', {
      priceId: products[0].prices[0].id,
    });

    if (response.statusCode === 500) {
      console.error(response.message);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: response.data.id,
    });
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

  return { props: { products } };
}
