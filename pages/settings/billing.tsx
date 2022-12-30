import { NextPageWithLayout } from '../_app';
import { ReactElement } from 'react';
import DashboardLayout from 'layout/dashboard-layout';
import SettingsLayout from 'layout/settings-layout';

const Billing: NextPageWithLayout = () => {
  return <>Hello</>;
};

Billing.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      <SettingsLayout>{page}</SettingsLayout>
    </DashboardLayout>
  );
};

export default Billing;
