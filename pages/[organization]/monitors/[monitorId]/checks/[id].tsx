import Link from 'next/link';
import { ReactElement } from 'react';
import DashboardLayout from '../../../../../layout/dashboard-layout';
import { NextPageWithLayout } from '../../../../_app';

const CheckDetail: NextPageWithLayout = () => {
  return (
    <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 md:px-8">
      <div className="px-1 sm:px-6 md:px-0">
        <h1 className="text-2xl font-semibold text-gray-900">Check #47</h1>
        <Link href="https://api.textrapp.me/api/v1/full_user_info" className="text-indigo-600 underline">
          https://api.textrapp.me/api/v1/full_user_info
        </Link>
      </div>

      <div className="flex flex-col">
        <section></section>
        <section></section>
      </div>
    </section>
  );
};

CheckDetail.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default CheckDetail;
