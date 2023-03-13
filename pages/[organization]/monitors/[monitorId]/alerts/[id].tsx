import ErrorLogsComponent from 'components/dashboard/monitor/error-log';
import AlertDetailLayout from 'layout/alert-detail-layout';
import DashboardLayout from 'layout/dashboard-layout';
import { NextPageWithLayout } from 'pages/_app';
import { ReactElement } from 'react';

const AlertDetail: NextPageWithLayout = () => {
  return <ErrorLogsComponent />;
};

AlertDetail.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      <AlertDetailLayout>{page}</AlertDetailLayout>
    </DashboardLayout>
  );
};

export default AlertDetail;
