import ErrorBoundary from 'components/error-boundary';
import { Provider } from 'jotai';
import RootLayout from 'layout/root-layout';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import 'styles/globals.css';

import '@tremor/react/dist/esm/tremor.css';

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
    <Provider>
      <RootLayout>
        <ErrorBoundary>{layoutEnabledPage(appPropsWithLayout)}</ErrorBoundary>
      </RootLayout>
    </Provider>
  );
}

export default MyApp;
