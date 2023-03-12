import AlertDetailLayout from 'layout/alert-detail-layout';
import DashboardLayout from 'layout/dashboard-layout';
import { NextPageWithLayout } from 'pages/_app';
import { ReactElement } from 'react';

const AlertDetail: NextPageWithLayout = () => {
  return (
    <>
      <h1>hello</h1>
    </>
  );
};

AlertDetail.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      <AlertDetailLayout>{page}</AlertDetailLayout>
    </DashboardLayout>
  );
};

export default AlertDetail;
