import DashboardLayout from "layout/dashboard-layout";
import SettingsLayout from "layout/settings-layout";
import { NextPageWithLayout } from "pages/_app";
import { ReactElement } from "react";

const Support: NextPageWithLayout = () => {
  return (
    <div className="space-y-4 mt-5">
      <h1 className="font-semibold text-3xl">Help &amp; Support</h1>
      <p className="text-gray-600">Get in touch anytime via email for help, or to give feedback.</p>
      <p className="text-gray-600">You can reach us at&nbsp;
        <a className="underline text-indigo-600" href="mailto:jarvis@support.uptimecheckr.com">
          jarvis@support.uptimecheckr.com
        </a>.
        We&apos;ll get back to you as soon as we can, typically within a few hours.
      </p>
    </div>
  )
}

Support.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      <SettingsLayout>{page}</SettingsLayout>
    </DashboardLayout>
  );
};

export default Support;
