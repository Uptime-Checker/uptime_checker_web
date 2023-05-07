import DashboardLayout from 'layout/dashboard-layout';
import SettingsLayout from 'layout/settings-layout';
import { NextPageWithLayout } from 'pages/_app';
import { ReactElement } from 'react';

const Result: NextPageWithLayout = () => {
  return <div>Result</div>;
};

Result.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      <SettingsLayout>{page}</SettingsLayout>
    </DashboardLayout>
  );
};

export default Result;
