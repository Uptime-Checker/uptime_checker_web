import MonitorForm from 'components/dashboard/monitor/monitor-form/monitor-form';
import DashboardLayout from 'layout/dashboard-layout';
import { NextPageWithLayout } from 'pages/_app';
import { ReactElement } from 'react';

const MonitorAdd: NextPageWithLayout = () => {
  return (
    <section className="mx-auto max-w-7xl">
      <MonitorForm isEditing={false} />
    </section>
  );
};

MonitorAdd.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default MonitorAdd;
