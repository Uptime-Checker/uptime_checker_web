import ErrorBoundary from 'components/error-boundary';
import type { AppProps } from 'next/app';
import 'styles/globals.css';
import RootLayout from '../layout/root-layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </RootLayout>
  );
}

export default MyApp;
