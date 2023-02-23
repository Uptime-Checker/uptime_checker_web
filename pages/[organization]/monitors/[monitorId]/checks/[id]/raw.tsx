import CheckDetailLayout from 'layout/check-detail-layout';
import DashboardLayout from 'layout/dashboard-layout';
import { NextPageWithLayout } from 'pages/_app';
import { ReactElement } from 'react';

const ResponseRawView: NextPageWithLayout = () => {
  return <h1>Raw</h1>;
};

ResponseRawView.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      <CheckDetailLayout>{page}</CheckDetailLayout>
    </DashboardLayout>
  );
};

export default ResponseRawView;
