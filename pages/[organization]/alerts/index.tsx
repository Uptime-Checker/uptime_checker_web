import AlertsComponent from 'components/dashboard/monitor/alerts';
import { useAtom } from 'jotai';
import DashboardLayout from 'layout/dashboard-layout';
import Link from 'next/link';
import { ReactElement } from 'react';
import { globalAtom } from 'store/global';
import { NextPageWithLayout } from '../../_app';

const alerts = [
  {
    id: 1,
    status: 'Lindsay Walton',
    startedAt: '5:36 PM, Oct 4, 2022',
    resolvedAt: '5:39 PM, Oct 4, 2022',
    duration: '3 Minutes 48 Seconds',
  },
  {
    id: 2,
    status: 'Lindsay Waltow',
    startedAt: '5:36 PM, Oct 4, 2022',
    resolvedAt: '5:39 PM, Oct 4, 2022',
    duration: '3 Minutes',
  },
];

const Alerts: NextPageWithLayout = () => {
  const [global] = useAtom(globalAtom);
  const orgSlug = global.currentUser?.Organization.Slug;

  return (
    <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 md:px-8">
      <div className="flex items-center">
        <div className="flex-auto px-1 sm:px-6 md:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">Alerts</h1>
          <p className="mt-2 text-sm text-gray-700">A list of all the alerts that fired when running checks</p>
        </div>
        <Link
          href={`/${orgSlug}/alerts/settings`}
          type="button"
          className="inline-flex cursor-pointer items-center justify-center rounded-md border border-transparent
          bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
        >
          Global Alert Settings
        </Link>
      </div>
      <div className="mt-8">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <AlertsComponent alarms={alerts} topLevel={true} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Alerts.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Alerts;
