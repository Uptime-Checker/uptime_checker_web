import CheckDetailLayout from 'layout/check-detail-layout';
import DashboardLayout from 'layout/dashboard-layout';
import { NextPageWithLayout } from 'pages/_app';
import { ReactElement } from 'react';

const ResponsePreview: NextPageWithLayout = () => {
  return <h1>Preview</h1>;
};

ResponsePreview.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      <CheckDetailLayout>{page}</CheckDetailLayout>
    </DashboardLayout>
  );
};

export default ResponsePreview;
