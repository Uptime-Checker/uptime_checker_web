import AlertSettingsComponent from 'components/dashboard/monitor/alert-settings';
import AlertsComponent from 'components/dashboard/monitor/alerts';
import DashboardLayout from 'layout/dashboard-layout';
import { AppName } from 'lib/global';
import { ReactElement } from 'react';
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
  return (
    <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 md:px-8">
      <AlertSettingsComponent
        text={`Global alert settings determine when and how often ${AppName} sends you notifications on your configured alert
          channels. You can override the global settings at monitor level`}
      />
      <div className="mt-8">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
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
