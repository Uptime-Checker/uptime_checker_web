import ErrorBoundary from 'components/error-boundary';
import RootLayout from 'layout/root-layout';
import type { AppProps } from 'next/app';
import 'styles/globals.css';

import '@tremor/react/dist/esm/tremor.css';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const layoutEnabledPage = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(<Component {...pageProps} />);
};

function MyApp(appPropsWithLayout: AppPropsWithLayout) {
  return (
    <RootLayout>
      <ErrorBoundary>{layoutEnabledPage(appPropsWithLayout)}</ErrorBoundary>
    </RootLayout>
  );
}

export default MyApp;
