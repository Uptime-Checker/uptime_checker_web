import MonitorForm from 'components/dashboard/monitor/monitor-form';
import DashboardLayout from 'layout/dashboard-layout';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../../_app';

const MonitorAdd: NextPageWithLayout = () => {
  return (
    <section className="mx-auto max-w-7xl">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white bg-opacity-75 px-4 py-6 backdrop-blur backdrop-filter sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Add a new Monitor</h1>
        <div className="flex gap-2">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:w-auto"
          >
            Test Run
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Save
          </button>
        </div>
      </div>
      <div className="mt-6 px-4 sm:px-6 md:px-8">
        <MonitorForm />
      </div>
    </section>
  );
};

MonitorAdd.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default MonitorAdd;
