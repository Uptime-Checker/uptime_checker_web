import ErrorBoundary from 'components/error-boundary';
import { Provider } from 'jotai';
import RootLayout from 'layout/root-layout';
import { NextPage } from 'next';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';

import 'react-loading-skeleton/dist/skeleton.css';
import 'styles/globals.css';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  session: Session;
};

const layoutEnabledPage = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(<Component {...pageProps} />);
};

function App(appPropsWithLayout: AppPropsWithLayout) {
  return (
    <SessionProvider session={appPropsWithLayout.session}>
      <Provider>
        <RootLayout>
          <ErrorBoundary>{layoutEnabledPage(appPropsWithLayout)}</ErrorBoundary>
        </RootLayout>
      </Provider>
    </SessionProvider>
  );
}

export default App;
