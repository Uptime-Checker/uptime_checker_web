import { PauseIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import { classNames } from 'utils/misc';

type Props = {
  children: ReactNode;
};

interface NavigationItem {
  name: string;
  href: string;
  count?: number;
}

interface StatItem {
  name: string;
  stat: string;
}

const stats: StatItem[] = [
  { name: 'Status', stat: 'Passing' },
  { name: 'Uptime', stat: '58.16%' },
  { name: 'Avg. Response Time', stat: '186ms' },
  { name: 'Checks', stat: '289' },
  { name: 'Incidents', stat: 'None' },
];

const tabs: NavigationItem[] = [
  { name: 'Overview', href: 'overview' },
  { name: 'Feed', href: 'feed' },
  { name: 'Error Logs', href: 'error-logs' },
  { name: 'Incidents', href: 'incidents' },
];

export default function MonitorDetailLayout({ children }: Props) {
  const router = useRouter();
  const { monitorId } = router.query;
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  useEffect(() => {
    if (router.isReady) {
      const getActiveTab = () => {
        for (const tab of tabs) {
          if (router.pathname.includes(tab.href)) {
            return tab;
          }
        }
        return tabs[0];
      };

      setSelectedTab(getActiveTab());
    }
  }, [router]);

  const isNavActive = (navItem: NavigationItem) => {
    return router.pathname.includes(navItem.href);
  };

  const onTabChange = async (event: ChangeEvent) => {
    let target = event.currentTarget as HTMLInputElement;
    const selectedTab = tabs.find((tab) => tab.name === target.value);
    setSelectedTab(selectedTab!);

    await router.push(`/monitors/${monitorId}/` + selectedTab!.href);
  };

  const getStat = (item: StatItem) => {
    if (item.name == 'Status') {
      return <span className="rounded-full bg-green-100 px-2 py-1 text-sm leading-5 text-green-800">{item.stat}</span>;
    }
    return item.stat;
  };

  return (
    <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 md:px-8">
      <section className="w-full border-b pb-6 md:flex md:items-center md:justify-between md:space-x-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Textr API</h1>
          <p className="mt-2 text-sm text-gray-500">
            <a
              className="text-indigo-500 underline hover:text-indigo-700"
              target="_blank"
              rel="noopener noreferrer"
              href="https://api.textrapp.me/v1/status"
            >
              https://api.textrapp.me/v1/status
            </a>
          </p>
        </div>
        <div className="mt-4 flex space-x-3 md:mt-0">
          <button
            role="menuitem"
            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            <PauseIcon className="-ml-2 mr-1 h-5 w-5 text-gray-400" />
            Pause
          </button>
          <a
            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            href="/app/checks/7aGxA7Kd/edit"
          >
            <PencilSquareIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
            <span>Edit</span>
          </a>
        </div>
      </section>
      <section className="pt-5">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Last 10 days</h3>
        <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg border bg-white drop-shadow md:grid-cols-5 md:divide-y-0 md:divide-x">
          {stats.map((item) => (
            <div key={item.name} className="px-4 py-5 sm:p-4">
              <dt className="truncate text-sm font-normal text-gray-900">{item.name}</dt>
              <dd className="mt-1 flex items-baseline justify-between text-lg font-semibold text-indigo-600">
                {getStat(item)}
              </dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="py-5">
        {/* Tabs */}
        <div className="md:hidden">
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
        <div className="hidden md:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <Link
                  key={tab.name}
                  href={`/monitors/${monitorId}/` + tab.href}
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
      </section>
    </section>
  );
}
