import { CheckIcon, HandThumbUpIcon, UserIcon } from '@heroicons/react/20/solid';
import ChecksComponent from 'components/dashboard/monitor/checks';
import DashboardLayout from 'layout/dashboard-layout';
import { HTTPMethod } from 'lib/axios';
import { Check } from 'models/check';
import { Monitor, MonitorStatus } from 'models/monitor';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';

const monitor: Monitor = {
  id: 1,
  name: 'Textr API',
  url: 'https://textrapp.me',
  method: HTTPMethod.GET,
  status: MonitorStatus.PASSING,
  interval: 20,
  body: 'Hello',
  user_ids: [1, 2],
};

const timeline: Check[] = [
  {
    id: 1,
    content: 'Check failed with Status Code 400 - Bad Request',
    location: '🇬🇲 Frankfurt, Germany',
    date: 'A few seconds ago',
    icon: UserIcon,
    iconBackground: 'bg-gray-400',
    monitor: monitor,
  },
  {
    id: 2,
    content: 'Check failed with Status Code 400 - Bad Request',
    location: '🇺🇸 California, USA',
    date: '4 minutes ago',
    icon: HandThumbUpIcon,
    iconBackground: 'bg-blue-500',
    monitor: monitor,
  },
  {
    id: 3,
    content: 'Check passed with Status Code 200 - OK',
    location: '🇬🇲 Frankfurt, Germany',
    date: '5:36 PM, Oct 4, 2022',
    icon: CheckIcon,
    iconBackground: 'bg-green-500',
    monitor: monitor,
  },
  {
    id: 4,
    content: 'Check failed with Status Code 400 - Bad Request',
    location: '🇺🇸 California, USA',
    date: '12:36 PM, Nov 4, 2022',
    icon: HandThumbUpIcon,
    iconBackground: 'bg-blue-500',
    monitor: monitor,
  },
  {
    id: 5,
    content: 'Check passed with Status Code 200 - OK',
    location: '🇬🇲 Frankfurt, Germany',
    date: '11:36 PM, Dec 4, 2022',
    icon: CheckIcon,
    iconBackground: 'bg-green-500',
    monitor: monitor,
  },
];

const Checks: NextPageWithLayout = () => {
  return (
    <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 md:px-8">
      <div className="border-b px-1 pb-6 sm:px-6 md:px-0">
        <h1 className="text-2xl font-semibold text-gray-900">Checks</h1>
        <p className="mt-2 text-sm text-gray-700">A list of all the checks that are running</p>
      </div>
      <div className="mt-6">
        <ChecksComponent checks={timeline} className="-mb-8" />
      </div>
    </section>
  );
};

Checks.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Checks;
