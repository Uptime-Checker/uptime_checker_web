import { ShieldCheckIcon, ShieldExclamationIcon } from '@heroicons/react/24/solid';
import { Color, Icon } from '@tremor/react';
import DashboardLayout from 'layout/dashboard-layout';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { classNames } from 'utils/misc';
import { NextPageWithLayout } from '../_app';

interface MetricCard {
  title: string;
  metric: string;
  icon: any;
  color: Color;
}

const categories: MetricCard[] = [
  {
    title: 'Passing',
    metric: '5',
    icon: ShieldCheckIcon,
    color: 'teal',
  },
  {
    title: 'Failing',
    metric: '2',
    icon: ShieldExclamationIcon,
    color: 'red',
  },
  {
    title: 'Incidents',
    metric: '456',
    icon: ShieldExclamationIcon,
    color: 'amber',
  },
];

const Monitors: NextPageWithLayout = () => {
  const router = useRouter();

  const handleMetricCardClick = async (item: MetricCard) => {
    if (item.title.includes('Incidents')) {
    } else if (router.query.filter && router.query.filter.includes(item.title)) {
      await router.replace(`?filter=`, undefined, { shallow: true });
    } else {
      await router.push(`?filter=${item.title}`, undefined, { shallow: true });
    }
  };

  const getCardDecoration = (item: MetricCard) => {
    return router.query.filter && router.query.filter.includes(item.title) ? item.color : 'white';
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((item) => (
          <button
            onClick={() => handleMetricCardClick(item)}
            key={item.title}
            className={classNames(
              'relative overflow-hidden rounded-lg border-t-4 px-4 py-5 shadow sm:px-6 sm:pt-6',
              `border-${item.color}-400`,
              `hover:bg-${item.color}-50`,
              getCardDecoration(item) === 'white' ? 'bg-white' : `bg-${getCardDecoration(item)}-50`
            )}
          >
            <dt>
              <div className="absolute">
                <Icon icon={item.icon} variant="light" size="xl" color={item.color} />
              </div>
              <p className="ml-16 truncate pl-2 text-left text-sm text-gray-500">{item.title}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pl-2">
              <p className="text-3xl font-semibold text-gray-900">{item.metric}</p>
              <p className="ml-2 flex items-baseline truncate text-sm text-slate-500">
                {item.title == 'Incidents' ? 'Last 7 Days' : ''}
              </p>
            </dd>
          </button>
        ))}
      </dl>

      <section className="mt-10 flex">
        <h1 className="flex-auto text-3xl font-semibold text-gray-900">Monitors</h1>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
        >
          Add Monitor
        </button>
      </section>
      {/* <section className="mt-5 justify-between sm:flex">
        <div className="relative mt-1 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="email"
            name="email"
            id="email"
            className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="search"
          />
        </div>
        <select
          id="location"
          name="location"
          className="mt-1 rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          defaultValue="All"
        >
          <option>All</option>
          <option>Passing</option>
          <option>Failing</option>
        </select>
      </section> */}
    </div>
  );
};

Monitors.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Monitors;
