import DashboardLayout from 'layout/dashboard-layout';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';

const Settings: NextPageWithLayout = () => {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {/* Replace with your content */}
        <div className="py-4">
          <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" />
        </div>
        {/* /End replace */}
      </div>
    </>
  );
};

Settings.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Settings;
