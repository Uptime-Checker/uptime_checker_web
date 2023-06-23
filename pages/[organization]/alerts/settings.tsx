import AlertSettingsComponent from 'components/dashboard/monitor/alert-settings';
import DashboardLayout from 'layout/dashboard-layout';
import { AppName } from 'lib/global';
import { NextPageWithLayout } from 'pages/_app';
import { ReactElement } from 'react';

const GlobalAlertSettings: NextPageWithLayout = () => {
  return (
    <section className="mx-auto mb-10 mt-6 max-w-7xl px-4 sm:px-6 md:px-8">
      <div className="px-1 sm:px-6 md:px-0">
        <h1 className="text-2xl font-semibold text-gray-900">Alert Settings</h1>
        <p className="mt-2 text-sm text-gray-700">{`Global alert settings determine when and how often ${AppName!} sends you notifications on your configured alert
  channels. You can override the global settings at monitor level`}</p>
      </div>
      <AlertSettingsComponent />
    </section>
  );
};

GlobalAlertSettings.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default GlobalAlertSettings;
