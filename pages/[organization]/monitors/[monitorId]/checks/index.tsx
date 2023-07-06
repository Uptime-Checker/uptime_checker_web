import { CheckIcon, HandThumbUpIcon, UserIcon } from '@heroicons/react/20/solid';
import ChecksComponent from 'components/dashboard/monitor/checks';
import DashboardLayout from 'layout/dashboard-layout';
import MonitorDetailLayout from 'layout/monitor-detail-layout';
import { Check } from 'models/check';
import { ReactElement } from 'react';
import { NextPageWithLayout } from 'pages/_app';

const timeline: Check[] = [
  {
    id: 1,
    content: 'Check failed with Status Code 400 - Bad Request',
    location: '🇬🇲 Frankfurt, Germany',
    date: 'A few seconds ago',
    icon: UserIcon,
    iconBackground: 'bg-gray-400',
  },
  {
    id: 2,
    content: 'Check failed with Status Code 400 - Bad Request',
    location: '🇺🇸 California, USA',
    date: '4 minutes ago',
    icon: HandThumbUpIcon,
    iconBackground: 'bg-blue-500',
  },
  {
    id: 3,
    content: 'Check passed with Status Code 200 - OK',
    location: '🇬🇲 Frankfurt, Germany',
    date: '5:36 PM, Oct 4, 2022',
    icon: CheckIcon,
    iconBackground: 'bg-green-500',
  },
  {
    id: 4,
    content: 'Check failed with Status Code 400 - Bad Request',
    location: '🇺🇸 California, USA',
    date: '12:36 PM, Nov 4, 2022',
    icon: HandThumbUpIcon,
    iconBackground: 'bg-blue-500',
  },
  {
    id: 5,
    content: 'Check passed with Status Code 200 - OK',
    location: '🇬🇲 Frankfurt, Germany',
    date: '11:36 PM, Dec 4, 2022',
    icon: CheckIcon,
    iconBackground: 'bg-green-500',
  },
];

const Feed: NextPageWithLayout = () => {
  return (
    <div className="mt-6 flow-root">
      <ChecksComponent checks={timeline} monitorId={1} />
    </div>
  );
};

Feed.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      <MonitorDetailLayout>{page}</MonitorDetailLayout>
    </DashboardLayout>
  );
};

export default Feed;
