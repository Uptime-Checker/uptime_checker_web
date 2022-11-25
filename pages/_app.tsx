import ErrorBoundary from 'components/error-boundary';
import RootLayout from 'layout/root-layout';
import type { AppProps } from 'next/app';
import 'styles/globals.css';

import '@tremor/react/dist/esm/tremor.css';

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
