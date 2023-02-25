import CheckDetailLayout from 'layout/check-detail-layout';
import DashboardLayout from 'layout/dashboard-layout';
import { NextPageWithLayout } from 'pages/_app';
import { ReactElement } from 'react';

const html = `<!DOCTYPE html>
<html>
<body>

<h1>My First Heading</h1>
<p>My first paragraph.</p>

</body>
</html>`;

const ResponseRawView: NextPageWithLayout = () => {
  return <pre className="mt-4 -mb-8 text-sm">{html}</pre>;
};

ResponseRawView.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      <CheckDetailLayout>{page}</CheckDetailLayout>
    </DashboardLayout>
  );
};

export default ResponseRawView;
