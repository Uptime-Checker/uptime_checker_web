import * as Sentry from '@sentry/nextjs';
import MonitorForm from 'components/dashboard/monitor/monitor-form/monitor-form';
import Spinner from 'components/icon/spinner';
import { useAtom } from 'jotai';
import DashboardLayout from 'layout/dashboard-layout';
import { HTTPMethod, authRequest } from 'lib/axios';
import { SingleMonitorResponse } from 'models/monitor';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from 'pages/_app';
import { ReactElement, useEffect, useState } from 'react';
import { monitorFormAtom } from 'store/global';
import { AxiosError, HttpStatusCode } from 'axios';

const MonitorEdit: NextPageWithLayout = () => {
  const router = useRouter();
  const [, setMonitorForm] = useAtom(monitorFormAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;
    authRequest<SingleMonitorResponse>({
      method: HTTPMethod.GET,
      url: `/monitor/${router.query.monitorId as string}/all`,
    })
      .then((resp) => {
        setMonitorForm(resp.data.data);
        setLoading(false);
      })
      .catch((e) => {
        const errorResponse = (e as AxiosError).response;
        if (errorResponse && errorResponse.status === HttpStatusCode.NotFound) {
          router.back();
        } else {
          Sentry.captureException(e);
        }
      });
    return () => {
      setMonitorForm(null);
    };
  }, [router, setMonitorForm]);

  return (
    <section className="mx-auto max-w-7xl">
      {loading ? <Spinner className="mx-auto mt-20" size={50} /> : <MonitorForm isEditing={true} />}
    </section>
  );
};

MonitorEdit.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default MonitorEdit;
