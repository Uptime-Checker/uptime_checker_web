import DashboardLayout from 'layout/dashboard-layout';
import MonitorDetailLayout from 'layout/monitor-detail-layout';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../../_app';

const Feed: NextPageWithLayout = () => {
  return <h1>Checks</h1>;
};

Feed.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      <MonitorDetailLayout>{page}</MonitorDetailLayout>
    </DashboardLayout>
  );
};

export default Feed;
