import { Transition } from '@headlessui/react';
import LineChart from 'components/dashboard/chart/line-chart';
import DashboardLayout from 'layout/dashboard-layout';
import MonitorDetailLayout from 'layout/monitor-detail-layout';
import { classNames } from 'lib/tailwind/utils';
import { ReactElement, useEffect, useState } from 'react';
import { NextPageWithLayout } from '../../_app';

const chartData = [
  {
    year: 1951,
    'Population growth rate': 1.74,
  },
  {
    year: 1952,
    'Population growth rate': 1.93,
  },
  {
    year: 1953,
    'Population growth rate': 1.9,
  },
  {
    year: 1954,
    'Population growth rate': 1.98,
  },
  {
    year: 1955,
    'Population growth rate': 2,
  },
  {
    year: 1956,
    'Population growth rate': 1.74,
  },
  {
    year: 1957,
    'Population growth rate': 1.84,
  },
  {
    year: 1958,
    'Population growth rate': 1.56,
  },
  {
    year: 1959,
    'Population growth rate': 1.48,
  },
  {
    year: 1960,
    'Population growth rate': 1.32,
  },
];

const people = [
  {
    name: 'Lindsay Walton',
    title: 'Oct 4, 2022,  03:34:31 AM',
    email: 'Oct 4, 2023,  03:34:31 AM',
    role: '2 hours, 38 Minutes',
  },
  // More people...
];

const dataFormatter = (number: number) => `${Intl.NumberFormat('us').format(number).toString()}%`;

const Overview: NextPageWithLayout = () => {
  const [showChart, setShowChart] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowChart(true);
    }, 100);
  }, []);

  return (
    <div className="mt-5">
      <section className="flex flex-col items-baseline justify-between lg:flex-row">
        <h2 className="mb-2 lg:mb-0 lg:pr-4">Response times across regions in the last day</h2>
        <div
          className="flex items-baseline rounded bg-neutral-100 p-[2px] text-sm font-medium text-gray-600"
          data-target="endpoints--response-times-tabs.tabs"
        >
          <div
            className="cursor-pointer rounded bg-white px-4 py-1 shadow"
            data-action="click->endpoints--response-times-tabs#changeTab"
            data-preference="day"
            data-url="/team/44631/monitors/751810/response-chart?days=1"
          >
            Day
          </div>
          <div
            className="cursor-pointer rounded px-4 py-1"
            data-action="click->endpoints--response-times-tabs#changeTab"
            data-preference="week"
            data-url="/team/44631/monitors/751810/response-chart?days=7"
          >
            Week
          </div>
          <div
            className="cursor-pointer rounded px-4 py-1"
            data-action="click->endpoints--response-times-tabs#changeTab"
            data-preference="month"
            data-url="/team/44631/monitors/751810/response-chart?days=30"
          >
            Month
          </div>
        </div>
      </section>
      <section className={classNames('mt-5 h-80 w-full', showChart ? 'hidden' : '')}></section>
      <Transition
        appear={true}
        show={showChart}
        enter="transition-opacity duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
      >
        <LineChart
          data={chartData}
          showLegend={true}
          showAnimation={true}
          dataKey="year"
          autoMinValue={true}
          categories={['Population growth rate']}
          colors={['blue']}
          valueFormatter={dataFormatter}
          className="mt-5 h-80"
          maxValue={2.2}
        />
      </Transition>
      <div className="mt-10 bg-white">
        <div className="flex items-center pb-6 sm:border-b">
          <div className="flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Status Changes</h1>
            <p className="mt-2 text-sm text-gray-700">Uptime status change feed</p>
          </div>
        </div>
        <div className="sm:hidden">
          <div className="rounded-sm bg-white shadow">
            <ul role="list" className="divide-y divide-gray-200">
              <li className="relative bg-white py-5 px-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 hover:bg-gray-50">
                <div className="flex justify-between space-x-3">
                  <div className="min-w-0 flex-1">
                    <a href="#" className="block focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true"></span>
                      <p className="truncate text-sm font-medium text-gray-900">Check is UP</p>
                      <p className="truncate text-sm text-gray-500">For 24 days</p>
                    </a>
                  </div>
                  <time
                    dateTime="2023-01-17T21:40:01.424Z"
                    className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500"
                  >
                    24 days ago
                  </time>
                </div>
              </li>
              <li className="relative bg-white py-5 px-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 hover:bg-gray-50">
                <div className="flex justify-between space-x-3">
                  <div className="min-w-0 flex-1">
                    <a href="#" className="block focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true"></span>
                      <p className="truncate text-sm font-medium text-gray-900">Check was DOWN</p>
                      <p className="truncate text-sm text-gray-500">Lasted 5 minutes</p>
                    </a>
                  </div>
                  <time
                    dateTime="2023-01-17T21:35:00.885Z"
                    className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500"
                  >
                    24 days ago
                  </time>
                </div>
              </li>
              <li className="relative bg-white py-5 px-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 hover:bg-gray-50">
                <div className="flex justify-between space-x-3">
                  <div className="min-w-0 flex-1">
                    <a href="#" className="block focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true"></span>
                      <p className="truncate text-sm font-medium text-gray-900">Check was PENDING</p>
                      <p className="truncate text-sm text-gray-500">Lasted less than a minute</p>
                    </a>
                  </div>
                  <time
                    dateTime="2023-01-17T21:34:31.237Z"
                    className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500"
                  >
                    24 days ago
                  </time>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <section className="hidden sm:block">
          <div className="flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
                      >
                        STATUS
                      </th>
                      <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                        FROM
                      </th>
                      <th
                        scope="col"
                        className="hidden py-3.5 px-3 text-left text-sm font-semibold text-gray-900 md:table-cell"
                      >
                        TO
                      </th>
                      <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                        DURATION
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {people.map((person) => (
                      <tr key={person.email}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6 md:pl-0">
                          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                            Degraded
                          </span>
                        </td>
                        <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{person.title}</td>
                        <td className="hidden whitespace-nowrap py-4 px-3 text-sm text-gray-500 md:table-cell">
                          {person.email}
                        </td>
                        <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{person.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

Overview.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      <MonitorDetailLayout>{page}</MonitorDetailLayout>
    </DashboardLayout>
  );
};

export default Overview;
