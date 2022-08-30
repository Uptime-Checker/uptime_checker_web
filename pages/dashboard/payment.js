import { basicClient } from '../../lib/axios';

export default function Payment(products) {
  async function handleClick(e) {
    e.preventDefault();
    console.log(products);
  }

  return (
    <div className="payment_container">
      <button onClick={handleClick}>Pay</button>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await basicClient.get(`/external_products`);
  const products = res.data.data;

  return {
    props: {
      products,
    },
  };
}
