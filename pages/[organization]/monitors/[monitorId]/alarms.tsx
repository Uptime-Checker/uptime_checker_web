import AlarmsComponent from 'components/dashboard/monitor/alarms';
import DashboardLayout from 'layout/dashboard-layout';
import MonitorDetailLayout from 'layout/monitor-detail-layout';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../../../_app';

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
    <section className="mt-5">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Alarms</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the alarms that fired when running checks for this monitor
          </p>
        </div>
      </div>
      <AlarmsComponent alarms={alarms} />
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
