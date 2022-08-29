import getStripe from '../../lib/stripe';

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
  const res = await fetch('http://localhost:3000/api/checkout_sessions/products');
  const products = await res.json();

  return {
    props: {
      products,
    },
  };
}
