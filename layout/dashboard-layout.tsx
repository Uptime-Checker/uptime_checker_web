import SideBar from 'components/dashboard/sidebar';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="dashboard">
      <SideBar />
      {children}
    </div>
  );
}
