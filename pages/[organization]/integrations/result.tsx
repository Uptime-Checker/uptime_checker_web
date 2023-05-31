import { NextPageWithLayout } from 'pages/_app';
import { ReactElement } from 'react';
import DashboardLayout from 'layout/dashboard-layout';

const Result: NextPageWithLayout = () => {
  return (
    <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 md:px-8">
      <div className="border-b px-1 pb-6 sm:px-6 md:px-0">
        <h1 className="text-2xl font-semibold text-gray-900">Integrations</h1>
      </div>
    </section>
  );
};

Result.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Result;
