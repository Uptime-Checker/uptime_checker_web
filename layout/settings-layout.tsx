import Tabs, { Breakpoint } from 'components/dashboard/tabs';
import { ReactNode } from 'react';
import { TabNavigationItem } from 'types/main';

type Props = {
  children: ReactNode;
};

const tabs: TabNavigationItem[] = [
  { name: 'Account', href: 'account' },
  // { name: 'Organization', href: 'organization' },
  // { name: 'Notifications', href: 'notifications' },
  { name: 'Billing', href: 'billing' },
  // { name: 'Invitations', href: 'invitations', count: 5 },
  { name: 'Support', href: 'support' },
];

export default function SettingsLayout({ children }: Props) {
  return (
    <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 md:px-8">
      <div className="px-1 sm:px-6 md:px-0">
        <h1 className="mb-4 text-2xl font-semibold text-gray-900 lg:mb-2">Settings</h1>
        <Tabs baseURL={'settings'} tabs={tabs} breakpoint={Breakpoint.LG} routeIndex={3}>
          {children}
        </Tabs>
      </div>
    </section>
  );
}
