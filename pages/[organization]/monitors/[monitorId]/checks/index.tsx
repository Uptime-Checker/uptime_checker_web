import { CheckIcon, HandThumbUpIcon, UserIcon } from '@heroicons/react/20/solid';
import DashboardLayout from 'layout/dashboard-layout';
import MonitorDetailLayout from 'layout/monitor-detail-layout';
import { classNames } from 'lib/tailwind/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../../../../_app';

const timeline = [
  {
    id: 1,
    content: 'Check failed with Status Code 400 - Bad Request',
    target: '🇬🇲 Frankfurt, Germany',
    href: '#',
    date: 'A few seconds ago',
    datetime: '2020-09-20',
    icon: UserIcon,
    iconBackground: 'bg-gray-400',
  },
  {
    id: 2,
    content: 'Check failed with Status Code 400 - Bad Request',
    target: '🇺🇸 California, USA',
    href: '#',
    date: '4 minutes ago',
    datetime: '2020-09-22',
    icon: HandThumbUpIcon,
    iconBackground: 'bg-blue-500',
  },
  {
    id: 3,
    content: 'Check passed with Status Code 200 - OK',
    target: '🇬🇲 Frankfurt, Germany',
    href: '#',
    date: '5:36 PM, Oct 4, 2022',
    datetime: '2020-09-28',
    icon: CheckIcon,
    iconBackground: 'bg-green-500',
  },
  {
    id: 4,
    content: 'Check failed with Status Code 400 - Bad Request',
    target: '🇺🇸 California, USA',
    href: '#',
    date: '12:36 PM, Nov 4, 2022',
    datetime: '2020-09-30',
    icon: HandThumbUpIcon,
    iconBackground: 'bg-blue-500',
  },
  {
    id: 5,
    content: 'Check passed with Status Code 200 - OK',
    target: '🇬🇲 Frankfurt, Germany',
    href: '#',
    date: '11:36 PM, Dec 4, 2022',
    datetime: '2020-10-04',
    icon: CheckIcon,
    iconBackground: 'bg-green-500',
  },
];

const Feed: NextPageWithLayout = () => {
  const router = useRouter();

  return (
    <div className="mt-5 flow-root">
      <ul role="list" className="-mb-8">
        {timeline.map((event, eventIdx) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {eventIdx !== timeline.length - 1 ? (
                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
              ) : null}
              <div className="relative flex items-start space-x-3">
                <div>
                  <span
                    className={classNames(
                      event.iconBackground,
                      'flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white'
                    )}
                  >
                    <event.icon className="h-5 w-5 text-white" aria-hidden="true" />
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4">
                  <div className="min-w-0">
                    <div className="text-sm">
                      <a href="" className="font-medium text-gray-900">
                        {event.content}
                      </a>
                    </div>
                    <div className="mt-1 whitespace-nowrap text-sm text-gray-500">
                      <time dateTime={event.datetime}>{event.date}</time>
                    </div>
                    <div className="mt-3 text-sm text-gray-500">
                      <p>Duration: 324ms</p>
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      <p>{event.target}</p>
                    </div>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm font-medium sm:pr-6">
                    <Link href={`${router.asPath}/1`} className="ml-4 text-indigo-600 hover:text-indigo-900">
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
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
