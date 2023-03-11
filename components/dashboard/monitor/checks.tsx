import { useAtom } from 'jotai';
import { classNames } from 'lib/tailwind/utils';
import { Check } from 'models/check';
import Link from 'next/link';
import { globalAtom } from 'store/global';

interface ChecksProps {
  checks: Check[];
  monitorId?: number;
  className?: string;
}

const ChecksComponent = ({ checks, monitorId, className }: ChecksProps) => {
  const [global, _] = useAtom(globalAtom);
  const orgSlug = global.currentUser?.Organization.Slug;

  const getLink = (check: Check) => {
    if (monitorId) {
      return `/${orgSlug}/monitors/${monitorId}/checks/${check.id}`;
    }
    return `/${orgSlug}/monitors/${check.monitor?.id}/checks/${check.id}`;
  };

  const getMonitor = (check: Check) => {
    return check.monitor ? (
      <div className="mt-1 text-sm font-medium text-indigo-600">
        <Link href={`/${orgSlug}/monitors/${check.monitor.id}/overview`}>{check.monitor.name}</Link>
      </div>
    ) : null;
  };

  return (
    <ul role="list" className={className}>
      {checks.map((event, eventIdx) => (
        <li key={event.id}>
          <div className="relative pb-8">
            {eventIdx !== checks.length - 1 ? (
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
                <div className="w-4/5 sm:w-2/3 xl:w-1/2">
                  <div className="text-sm">
                    <a href="" className="font-medium text-gray-900">
                      {event.content}
                    </a>
                  </div>
                  {getMonitor(event)}
                  <div className="mt-1 whitespace-nowrap text-sm text-gray-500">
                    <time>{event.date}</time>
                  </div>
                  <div className="mt-5 text-sm text-gray-500">
                    <p>{event.location}</p>
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    <p>Duration: 324ms</p>
                  </div>
                  <div className="mb-2 mt-2 flex h-2.5 overflow-hidden rounded bg-emerald-200 text-xs">
                    <div className="flex w-1/4 flex-col justify-center whitespace-nowrap bg-red-500 text-center text-white shadow-none"></div>
                    <div className="flex w-1/4 flex-col justify-center whitespace-nowrap bg-orange-500 text-center text-white shadow-none"></div>
                    <div className="flex w-2/4 flex-col justify-center whitespace-nowrap bg-emerald-500 text-center text-white shadow-none"></div>
                  </div>
                </div>
                <Link
                  className="ml-4 whitespace-nowrap text-right text-sm font-medium text-indigo-600 hover:text-indigo-900 sm:pr-6"
                  href={`${getLink(event)}/raw`}
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ChecksComponent;
