import DashboardLayout from 'layout/dashboard-layout';
import SettingsLayout from 'layout/settings-layout';
import { NextPageWithLayout } from 'pages/_app';
import { ReactElement } from 'react';

const Support: NextPageWithLayout = () => {
  return (
    <div className="mt-5 space-y-4">
      <h1 className="text-3xl font-semibold">Help &amp; Support</h1>
      <p className="text-gray-600">Get in touch anytime via email for help, or to give feedback.</p>
      <p className="text-gray-600">
        You can reach us at&nbsp;
        <a className="text-indigo-600 underline" href="mailto:support@uptimecheckr.com">
          support@uptimecheckr.com
        </a>
        . We&apos;ll get back to you as soon as we can, typically within a few hours.
      </p>
    </div>
  );
};

Support.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      <SettingsLayout>{page}</SettingsLayout>
    </DashboardLayout>
  );
};

export default Support;
