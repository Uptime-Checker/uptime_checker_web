import { PauseIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import Tabs, { Breakpoint } from 'components/dashboard/tabs';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

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
  { name: 'SSL Expiration', stat: '129 Days' },
  { name: 'Checks', stat: '289' },
  { name: 'Alarms', stat: 'None' },
];

const tabs: NavigationItem[] = [
  { name: 'Overview', href: 'overview' },
  { name: 'Checks', href: 'checks' },
  { name: 'Error Logs', href: 'error-logs' },
  { name: 'Alerts', href: 'alerts' },
];

export default function MonitorDetailLayout({ children }: Props) {
  const router = useRouter();
  const { monitorId } = router.query;

  const getStat = (item: StatItem) => {
    if (item.name == 'Status') {
      return (
        <span className="rounded-full bg-green-100 px-2 py-1 text-sm leading-5 text-green-800 md:text-xs lg:text-sm">
          {item.stat}
        </span>
      );
    }
    return <span className="truncate">{item.stat}</span>;
  };

  return (
    <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-5 lg:px-8">
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
          <p className="mt-2 text-sm font-medium text-gray-600">Next Check In: 2 Minutes</p>
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
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Last 10 days · <span className="text-sm text-gray-600">Checked every 3 minutes</span>
        </h3>
        <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg border bg-white drop-shadow md:grid-cols-5 md:divide-x md:divide-y-0">
          {stats.map((item) => (
            <div key={item.name} className="px-4 py-5 sm:p-4">
              <dt className="truncate text-sm font-normal text-gray-900 md:text-xs lg:text-sm">{item.name}</dt>
              <dd className="mt-1 flex items-baseline justify-between text-lg font-semibold text-indigo-600 md:text-base lg:text-lg">
                {getStat(item)}
              </dd>
            </div>
          ))}
        </dl>
      </section>
      <Tabs className="my-5" baseURL={`monitors/${monitorId}`} tabs={tabs} breakpoint={Breakpoint.MD} routeIndex={4}>
        {children}
      </Tabs>
    </section>
  );
}
