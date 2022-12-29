import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function SettingsLayout({ children }: Props) {
  return <>{children}</>;
}
