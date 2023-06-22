import { useAtom } from 'jotai/index';
import { classNames } from 'lib/tailwind/utils';
import { Alarm } from 'models/alarm';
import Link from 'next/link';
import { globalAtom } from 'store/global';

interface AlertProps {
  alarms: Alarm[];
  topLevel: boolean;
}

const AlertsComponent = ({ alarms, topLevel }: AlertProps) => {
  const [global] = useAtom(globalAtom);
  const orgSlug = global.currentUser?.Organization.Slug;

  return (
    <table className="min-w-full divide-y divide-gray-300">
      <thead className={classNames(topLevel ? 'bg-gray-50' : '')}>
        <tr>
          <th
            scope="col"
            className={classNames(
              topLevel ? 'pl-4 sm:pl-6' : 'hidden',
              'py-3.5 pr-3 text-left text-sm font-semibold text-gray-900'
            )}
          >
            Monitor
          </th>
          <th
            scope="col"
            className={classNames(
              topLevel ? 'hidden pl-3 lg:table-cell' : 'pl-0',
              'py-3.5 pr-3 text-left text-sm font-semibold text-gray-900'
            )}
          >
            Status
          </th>
          <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
            Detected At
          </th>
          <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 xl:table-cell">
            Resolved At
          </th>
          <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
            Duration
          </th>
          <th scope="col" className={classNames(topLevel ? 'pr-4 sm:pr-6' : 'pr-0', 'relative py-3.5 pl-3 ')}>
            <span className="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {alarms.map((alarm) => (
          <tr key={alarm.id}>
            <td
              className={classNames(
                topLevel ? 'pl-6 lg:table-cell' : '',
                'hidden px-3 py-4 text-sm font-medium text-indigo-600'
              )}
            >
              Textr Migration API
            </td>
            <td
              className={classNames(
                topLevel ? 'pl-4 sm:pl-6 lg:pl-0' : 'pl-0',
                'py-4 pr-3 text-sm font-medium text-gray-900'
              )}
            >
              <span
                className={classNames(
                  topLevel ? 'hidden lg:inline-flex' : 'inline-flex',
                  'rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800'
                )}
              >
                Resolved
              </span>
              <dl className="font-normal lg:hidden">
                <dt className="sr-only">Monitor</dt>
                <dd className={classNames(topLevel ? '' : 'hidden', 'truncate text-sm font-medium text-indigo-600')}>
                  Textr Migration API
                </dd>
                <span
                  className={classNames(
                    topLevel ? '' : 'hidden',
                    'mt-2 inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800'
                  )}
                >
                  Resolved
                </span>
                <dt className="sr-only">Duration</dt>
                <dd className="mt-2 truncate text-gray-700">Duration: {alarm.duration}</dd>
                <dt className="sr-only sm:hidden">Email</dt>
                <dd className="mt-1 truncate text-gray-700 sm:hidden">Detected At: {alarm.startedAt}</dd>
              </dl>
            </td>
            <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{alarm.startedAt}</td>
            <td className="hidden px-3 py-4 text-sm text-gray-500 xl:table-cell">{alarm.resolvedAt}</td>
            <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{alarm.duration}</td>
            <td className={classNames(topLevel ? 'pr-4 sm:pr-6' : 'pr-0', 'py-4 pl-3 text-right text-sm font-medium')}>
              <Link href={`/${orgSlug!}/alerts/1`} className="text-indigo-600 hover:text-indigo-900">
                View<span className="sr-only">, {alarm.id}</span>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AlertsComponent;
