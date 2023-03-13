import AlertDetailComponent from 'components/dashboard/monitor/alert-detail';
import AlertDetailLayout from 'layout/alert-detail-layout';
import DashboardLayout from 'layout/dashboard-layout';
import { NextPageWithLayout } from 'pages/_app';
import { ReactElement } from 'react';

const TopAlertDetail: NextPageWithLayout = () => {
  return <AlertDetailComponent />;
};

TopAlertDetail.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      <AlertDetailLayout>{page}</AlertDetailLayout>
    </DashboardLayout>
  );
};

export default TopAlertDetail;
