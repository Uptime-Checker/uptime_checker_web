import ErrorLogsComponent from 'components/dashboard/monitor/error-log';
import DashboardLayout from 'layout/dashboard-layout';
import MonitorDetailLayout from 'layout/monitor-detail-layout';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../../../_app';

const ErrorLogs: NextPageWithLayout = () => {
  return <ErrorLogsComponent />;
};

ErrorLogs.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      <MonitorDetailLayout>{page}</MonitorDetailLayout>
    </DashboardLayout>
  );
};

export default ErrorLogs;
