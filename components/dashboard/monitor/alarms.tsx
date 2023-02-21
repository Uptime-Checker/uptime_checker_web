import { Alarm } from 'models/alarm';

interface AlarmProps {
  alarms: Alarm[];
}

const AlarmsComponent = ({ alarms }: AlarmProps) => {
  return (
    <div className="mt-8">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th scope="col" className="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
              Status
            </th>
            <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
              Detected At
            </th>
            <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell">
              Resolved At
            </th>
            <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
              Duration
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-6 sm:pr-0">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {alarms.map((alarm) => (
            <tr key={alarm.id}>
              <td className="py-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                  Resolved
                </span>
                <dl className="font-normal lg:hidden">
                  <dt className="sr-only">Duration</dt>
                  <dd className="mt-2 truncate text-gray-700">Duration: {alarm.duration}</dd>
                  <dt className="sr-only sm:hidden">Email</dt>
                  <dd className="mt-1 truncate text-gray-700 sm:hidden">Detected At: {alarm.startedAt}</dd>
                  <dt className="sr-only md:hidden">Email</dt>
                  <dd className="mt-1 truncate text-gray-700 md:hidden">Resolved At: {alarm.resolvedAt}</dd>
                </dl>
              </td>
              <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{alarm.startedAt}</td>
              <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">{alarm.resolvedAt}</td>
              <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{alarm.duration}</td>
              <td className="py-4 pl-3 pr-6 text-right text-sm font-medium sm:pr-0">
                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                  View<span className="sr-only">, {alarm.id}</span>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlarmsComponent;
