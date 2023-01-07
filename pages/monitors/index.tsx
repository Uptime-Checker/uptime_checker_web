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
    </div>
  );
};

Monitors.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Monitors;
