import AlarmsComponent from 'components/dashboard/monitor/alarms';
import DashboardLayout from 'layout/dashboard-layout';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';

const alarms = [
  {
    id: 1,
    status: 'Lindsay Walton',
    startedAt: '5:36 PM, Oct 4, 2022',
    resolvedAt: '5:39 PM, Oct 4, 2022',
    duration: '3 Minutes',
  },
  // More people...
];

const Alarms: NextPageWithLayout = () => {
  return (
    <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 md:px-8">
      <div className="px-1 sm:px-6 md:px-0">
        <h1 className="text-2xl font-semibold text-gray-900">Alarms</h1>
        <p className="mt-2 text-sm text-gray-700">A list of all the alarms that fired when running checks</p>
      </div>
      <AlarmsComponent alarms={alarms} />
    </section>
  );
};

Alarms.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Alarms;
