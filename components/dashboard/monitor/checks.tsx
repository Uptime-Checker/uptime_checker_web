import { classNames } from 'lib/tailwind/utils';
import { Check } from 'models/check';
import Link from 'next/link';

interface ChecksProps {
  checks: Check[];
  topLevel: boolean;
  detailPath: string;
  className?: string;
}

const ChecksComponent = ({ checks, topLevel, detailPath, className }: ChecksProps) => {
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
                <div className="min-w-0">
                  <div className="text-sm">
                    <a href="" className="font-medium text-gray-900">
                      {event.content}
                    </a>
                  </div>
                  <div className="mt-1 whitespace-nowrap text-sm text-gray-500">
                    <time>{event.date}</time>
                  </div>
                  <div className="mt-3 text-sm text-gray-500">
                    <p>Duration: 324ms</p>
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    <p>{event.location}</p>
                  </div>
                </div>
                <div className="whitespace-nowrap text-right text-sm font-medium sm:pr-6">
                  <Link href={`${detailPath}/raw`} className="ml-4 text-indigo-600 hover:text-indigo-900">
                    View
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ChecksComponent;
