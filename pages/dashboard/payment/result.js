import useSWR from 'swr';
import { useRouter } from 'next/router';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Result() {
  const router = useRouter();

  // Fetch CheckoutSession from static page via
  // https://nextjs.org/docs/basic-features/data-fetching#static-generation
  const { data, error } = useSWR(
    router.query.session_id ? `/api/checkout_sessions/${router.query.session_id}` : null,
    fetcher
  );

  if (error) return <div>failed to load</div>;

  return (
    <div className="page-container">
      <h2>Status: {data?.payment_intent?.status ?? 'loading...'}</h2>
      <h3>CheckoutSession response:</h3>
      <p>{data ? JSON.stringify(data, null, 2) : 'loading...'}</p>
    </div>
  );
}
