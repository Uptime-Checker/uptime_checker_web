import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import { classNames } from '../utils/misc';

type Props = {
  children: ReactNode;
};

interface NavigationItem {
  name: string;
  href: string;
}

const tabs: NavigationItem[] = [
  { name: 'Account', href: '/settings/account' },
  { name: 'Organization', href: '/settings/organization' },
  { name: 'Notifications', href: '/settings/notifications' },
  { name: 'Billing', href: '/settings/billing' },
  { name: 'Invitations', href: '/settings/invitations' },
];

export default function SettingsLayout({ children }: Props) {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  useEffect(() => {
    if (router.isReady) {
      const getActiveTab = () => {
        for (const tab of tabs) {
          let splitNavHref = tab.href.split('/');
          if (router.pathname.includes(splitNavHref[2])) {
            return tab;
          }
        }
        return tabs[0];
      };

      setSelectedTab(getActiveTab());
    }
  }, [router]);

  const isNavActive = (navItem: NavigationItem) => {
    let splitNavHref = navItem.href.split('/');
    return router.pathname.includes(splitNavHref[2]);
  };

  const onTabChange = async (event: ChangeEvent) => {
    let target = event.currentTarget as HTMLInputElement;
    const selectedTab = tabs.find((tab) => tab.name === target.value);
    setSelectedTab(selectedTab!);

    await router.push(selectedTab!.href);
  };

  return (
    <section className="mt-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <h1 className="px-1 text-2xl font-semibold text-gray-900 sm:px-6 md:px-0">Settings</h1>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="px-1 sm:px-6 md:px-0">
          <div className="py-6">
            {/* Tabs */}
            <div className="lg:hidden">
              <label htmlFor="selected-tab" className="sr-only">
                Select a tab
              </label>
              <select
                id="selected-tab"
                name="selected-tab"
                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                value={selectedTab.name}
                onChange={onTabChange}
              >
                {tabs.map((tab) => (
                  <option key={tab.name}>{tab.name}</option>
                ))}
              </select>
            </div>
            <div className="hidden lg:block">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  {tabs.map((tab) => (
                    <Link
                      key={tab.name}
                      href={tab.href}
                      className={classNames(
                        isNavActive(tab)
                          ? 'border-indigo-500 text-indigo-600'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                        'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
                      )}
                    >
                      {tab.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>

            <div className="mt-1 divide-y divide-gray-200">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
