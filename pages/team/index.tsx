import { NextPageWithLayout } from '../_app';
import { ReactElement } from 'react';
import DashboardLayout from 'layout/dashboard-layout';

const Team: NextPageWithLayout = () => {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Team</h1>
        <div className="mb-5"></div>
      </div>
    </>
  );
};

Team.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Team;
