import ErrorBoundary from 'components/error-boundary';
import type { AppProps } from 'next/app';
import 'styles/globals.css';
import MainLayout from '../layout/main-layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </MainLayout>
  );
}

export default MyApp;
