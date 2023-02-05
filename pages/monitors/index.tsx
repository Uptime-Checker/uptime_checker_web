import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { ShieldCheckIcon, ShieldExclamationIcon } from '@heroicons/react/24/solid';
import MonitorRowOption from 'components/dashboard/monitor/monitor-row-option';
import { Tracking, TrackingBlock } from 'components/dashboard/tracker';
import DashboardLayout from 'layout/dashboard-layout';
import { classNames } from 'lib/tailwind/utils';
import { MonitorStatus } from 'models/monitor';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { HeroIcon, RowOption } from 'types/main';
import { NextPageWithLayout } from '../_app';

interface MetricCard {
  title: string;
  metric: string;
  icon: HeroIcon;
  color: string;
}

interface Person {
  name: string;
  url: string;
  email: string;
  lastChecked: string;
  downtime: string;
}

const monitorRowOptions: RowOption[] = [
  {
    name: 'Edit',
    icon: PencilSquareIcon,
  },
  {
    name: 'Delete',
    icon: TrashIcon,
  },
];

const categories: MetricCard[] = [
  {
    title: 'Passing',
    metric: '5',
    icon: ShieldCheckIcon,
    color: 'teal',
  },
  {
    title: 'Degraded',
    metric: '3',
    icon: ShieldExclamationIcon,
    color: 'amber',
  },
  {
    title: 'Failing',
    metric: '2',
    icon: ShieldExclamationIcon,
    color: 'red',
  },
];

const people: Person[] = [
  {
    name: 'Textr API',
    url: 'https://api.textrapp.me/v1/status',
    email: 'lindsay.walton@example.com',
    lastChecked: '2 hours ago',
    downtime: '3 hours 29 minutes',
  },
  {
    name: 'Textr API',
    url: 'https://api.textrapp.me/v1/statuss',
    email: 'lindsay.walton@example.com',
    lastChecked: '2 hours ago',
    downtime: '3 hours 29 minutes',
  },
  {
    name: 'Textr API',
    url: 'https://api.textrapp.me/v1/statusss',
    email: 'lindsay.walton@example.com',
    lastChecked: '2 hours ago',
    downtime: '3 hours 29 minutes',
  },
  {
    name: 'Textr API',
    url: 'https://api.textrapp.me/v1/statusssss',
    email: 'lindsay.walton@example.com',
    lastChecked: '2 hours ago',
    downtime: '3 hours 29 minutes',
  },
  {
    name: 'Textr API',
    url: 'https://api.textrapp.me/v1/stat',
    email: 'lindsay.walton@example.com',
    lastChecked: '2 hours ago',
    downtime: '3 hours 29 minutes',
  },
];

const data = [
  { id: 1, status: MonitorStatus.PASSING, message: '27th Oct, 96.5% Uptime' },
  { id: 2, status: MonitorStatus.PASSING, message: 'Operational' },
  { id: 3, status: MonitorStatus.MAINTENANCE, message: 'Maintenance' },
  { id: 4, status: MonitorStatus.FAILING, message: 'Operational' },
  { id: 5, status: MonitorStatus.PASSING, message: 'Operational' },
  { id: 6, status: MonitorStatus.PASSING, message: 'Operational' },
  { id: 7, status: MonitorStatus.DEGRADED, message: 'Degraded' },
  { id: 8, status: MonitorStatus.PASSING, message: 'Operational' },
  { id: 9, status: MonitorStatus.PASSING, message: 'Operational' },
  { id: 10, status: MonitorStatus.PASSING, message: 'Operational' },
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

  const monitorRowOptionTapped = (item: Person, optionaName: string) => {
    console.log(item);
    console.log(optionaName);
  };

  const getMonitorRowOption = (item: Person) => {
    let postionTop = true;
    const lastItem = people[people.length - 1];
    if (lastItem.url === item.url && people.length > 1) {
      postionTop = false;
    }
    return (
      <MonitorRowOption
        top={postionTop}
        options={monitorRowOptions}
        optionTapped={(optionaName) => {
          monitorRowOptionTapped(item, optionaName);
        }}
      />
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 md:px-8">
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
              <div className={classNames('absolute rounded-lg p-2.5', `bg-${item.color}-100`)}>
                <item.icon className={classNames('h-9 w-9', `text-${item.color}-500`)} aria-hidden="true" />
              </div>
              <p className="ml-16 truncate pl-2 text-left text-sm text-gray-500">{item.title}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pl-2">
              <p className="text-3xl font-semibold text-gray-900">{item.metric}</p>
            </dd>
          </button>
        ))}
      </dl>
      <section className="mt-10 flex">
        <div className="flex flex-auto items-baseline">
          <p className="text-3xl font-semibold text-gray-900">Monitors</p>
          <p className="ml-2 flex items-baseline truncate text-sm text-slate-500">Last 10 Days</p>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
        >
          Add Monitor
        </button>
      </section>

      <div className="-mx-4 mt-8 overflow-auto shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-white">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                SITE
              </th>
              <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                STATUS
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-center text-sm font-semibold text-gray-900 lg:table-cell"
              >
                UPTIME
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                LAST CHECKED
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 xl:table-cell"
              >
                DOWNTIME
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {people.map((person) => (
              <tr key={person.url}>
                <td className="whitespace-nowrap text-sm text-gray-900 hover:cursor-pointer hover:underline">
                  <Link className="block py-4 pl-4 pr-3 sm:pl-6" href="monitors/1/overview">
                    <div className="font-medium text-indigo-600">{person.name}</div>
                    <div className="pt-1 text-gray-500">{person.url}</div>
                  </Link>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-600">
                  <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                    Degraded
                  </span>
                </td>
                <td className="hidden whitespace-nowrap px-3 py-4 text-center text-gray-500 lg:table-cell">
                  <Tracking>
                    {data.map((item) => (
                      <TrackingBlock key={item.id} status={item.status} text={item.message} />
                    ))}
                  </Tracking>
                </td>
                <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {person.lastChecked}
                </td>
                <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 xl:table-cell">
                  {person.downtime}
                </td>
                <td className="whitespace-nowrap">{getMonitorRowOption(person)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Monitors.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Monitors;
