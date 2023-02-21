import DashboardLayout from 'layout/dashboard-layout';
import MonitorDetailLayout from 'layout/monitor-detail-layout';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../../../_app';

const people = [
  { name: 'Lindsay Walton', title: '5:36 PM, Oct 4, 2022', email: '5:39 PM, Oct 4, 2022', role: '3 Minutes' },
  // More people...
];

const Alarms: NextPageWithLayout = () => {
  return (
    <section className="mt-5">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Alarms</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the alarms that fired when running checks for this monitor
          </p>
        </div>
      </div>
      <div className="mt-8">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th scope="col" className="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Status
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Detected At
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
              >
                Resolved At
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Duration
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-6 sm:pr-0">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {people.map((person) => (
              <tr key={person.email}>
                <td className="py-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                  <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                    Resolved
                  </span>
                  <dl className="font-normal lg:hidden">
                    <dt className="sr-only">Duration</dt>
                    <dd className="mt-2 truncate text-gray-700">Duration: {person.role}</dd>
                    <dt className="sr-only sm:hidden">Email</dt>
                    <dd className="mt-1 truncate text-gray-700 sm:hidden">Detected At: {person.title}</dd>
                    <dt className="sr-only md:hidden">Email</dt>
                    <dd className="mt-1 truncate text-gray-700 md:hidden">Resolved At: {person.email}</dd>
                  </dl>
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{person.title}</td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">{person.email}</td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{person.role}</td>
                <td className="py-4 pl-3 pr-6 text-right text-sm font-medium sm:pr-0">
                  <a href="#" className="text-indigo-600 hover:text-indigo-900">
                    View<span className="sr-only">, {person.name}</span>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

Alarms.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      <MonitorDetailLayout>{page}</MonitorDetailLayout>
    </DashboardLayout>
  );
};

export default Alarms;
