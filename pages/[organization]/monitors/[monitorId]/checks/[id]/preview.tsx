import CheckDetailLayout from 'layout/check-detail-layout';
import DashboardLayout from 'layout/dashboard-layout';
import { NextPageWithLayout } from 'pages/_app';
import { ReactElement } from 'react';
import Frame from 'react-frame-component';

const html = `<!DOCTYPE html>
<html>
<head>
<style>
body {background-color: powderblue;}
h1   {color: blue;}
p    {color: red;}
</style>
</head>
<body>

<h1>This is a heading</h1>
<p>This is a paragraph.</p>

</body>
</html>`;

const ResponsePreview: NextPageWithLayout = () => {
  return (
    <Frame initialContent={html} className="h-80 w-full">
      <></>
    </Frame>
  );
};

ResponsePreview.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      <CheckDetailLayout>{page}</CheckDetailLayout>
    </DashboardLayout>
  );
};

export default ResponsePreview;
