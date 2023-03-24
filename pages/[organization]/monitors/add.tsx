import { NextPageWithLayout } from '../../_app';
import { ReactElement } from 'react';
import DashboardLayout from 'layout/dashboard-layout';
import MonitorForm from 'components/dashboard/monitor/monitor-form';

const MonitorAdd: NextPageWithLayout = () => {
  return (
    <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 md:px-8">
      <div className="border-b px-1 pb-6 sm:px-6 md:px-0">
        <h1 className="text-2xl font-semibold text-gray-900">Add a new Monitor</h1>
      </div>
      <div className="mt-6">
        <MonitorForm />
      </div>
    </section>
  );
};

MonitorAdd.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default MonitorAdd;
