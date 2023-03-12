import AlertsComponent from 'components/dashboard/monitor/alerts';
import DashboardLayout from 'layout/dashboard-layout';
import MonitorDetailLayout from 'layout/monitor-detail-layout';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../../../../_app';

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

const Alerts: NextPageWithLayout = () => {
  return (
    <section className="mt-5">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Alerts</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the alerts that fired when running checks for this monitor
          </p>
        </div>
      </div>
      <div className="mt-8">
        <AlertsComponent alarms={alarms} topLevel={false} />
      </div>
    </section>
  );
};

Alerts.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      <MonitorDetailLayout>{page}</MonitorDetailLayout>
    </DashboardLayout>
  );
};

export default Alerts;
