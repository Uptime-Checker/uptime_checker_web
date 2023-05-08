import DashboardLayout from 'layout/dashboard-layout';
import SettingsLayout from 'layout/settings-layout';
import { NextPageWithLayout } from 'pages/_app';
import { ReactElement } from 'react';
import { useAtom } from 'jotai';
import { globalAtom } from 'store/global';
import Link from 'next/link';
import SuccessIcon from 'components/icon/success';

const Result: NextPageWithLayout = () => {
  const [global] = useAtom(globalAtom);
  const orgSlug = global.currentUser?.Organization.Slug;

  return (
    <div className="p-6 md:mx-auto">
      <SuccessIcon className="mx-auto my-6 h-16 w-16 text-green-600" />
      <div className="text-center">
        <h3 className="text-center text-base font-semibold text-gray-900 md:text-2xl">Payment Done!</h3>
        <p className="my-2 text-gray-600">Thank you for completing your secure online payment.</p>
        <p> Have a great day! </p>
        <div className="py-10 text-center">
          <Link
            type="button"
            href={`/${orgSlug!}/monitors`}
            className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
};

Result.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      <SettingsLayout>{page}</SettingsLayout>
    </DashboardLayout>
  );
};

export default Result;
