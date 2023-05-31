import { NextPageWithLayout } from 'pages/_app';
import { ReactElement, useEffect, useState } from 'react';
import DashboardLayout from 'layout/dashboard-layout';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { globalAtom } from 'store/global';
import BookFallingIcon from 'components/icon/book-falling';

const Result: NextPageWithLayout = () => {
  const router = useRouter();

  const [uiState, setUIState] = useState({ loading: true, success: false });
  const [global] = useAtom(globalAtom);
  const orgSlug = global.currentUser?.Organization.Slug;

  useEffect(() => {
    if (!router.isReady) return;
  }, [router]);

  return (
    <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 md:px-8">
      <div className="border-b px-1 pb-6 sm:px-6 md:px-0">
        <h1 className="text-2xl font-semibold text-gray-900">Integrations</h1>
      </div>
      <div className="p-6 md:mx-auto">{uiState.loading ? <BookFallingIcon className="mx-auto mt-4 w-20" /> : null}</div>
    </section>
  );
};

Result.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Result;
