import { Inter } from '@next/font/google';
import Head from 'next/head';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: Props) {  
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className={inter.className}>{children}</div>
    </>
  );
}
