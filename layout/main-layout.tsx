import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  return <div className="min-h-screen">{children}</div>;
}
