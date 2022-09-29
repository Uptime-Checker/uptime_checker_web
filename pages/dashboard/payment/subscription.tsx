import { MouseEvent } from 'react';
import axios, { AxiosError } from 'axios';
import getStripe from 'lib/stripe';
import { elixirClient } from 'lib/axios';
import { ProductResponse, Product } from 'models/product';
import { GetServerSideProps } from 'next';

interface SubscriptionProps {
  products: [Product];
}

export default function Subscription({ products }: SubscriptionProps) {
  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      const { data, status } = await axios.post('/api/checkout_sessions', {
        priceId: products[0].prices[0].id,
      });

      const stripe = await getStripe();
      const { error } = await stripe!.redirectToCheckout({
        sessionId: data.id,
      });
      console.warn(error.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.message);
      }
    }
  };

  return (
    <div className="payment_container">
      <button onClick={handleClick}>Pay</button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data, status } = await elixirClient.get<ProductResponse>(`/external_products`);
  const products = data.data;

  return { props: { products } };
};
