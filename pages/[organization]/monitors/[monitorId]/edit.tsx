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

const MonitorAdd: NextPageWithLayout = () => {
  const router = useRouter();
  const [monitorForm, setMonitorForm] = useAtom(monitorFormAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;
    authRequest<SingleMonitorResponse>({
      method: HTTPMethod.GET,
      url: `/monitor/${router.query.monitorId as string}/all`,
    })
      .then((resp) => {
        setMonitorForm((draft) => {
          draft.monitor = resp.data.data;
        });
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
      setMonitorForm((draft) => {
        draft.isSubmitting = false;
        draft.monitor = null;
      });
    };
  }, [router, setMonitorForm]);

  return (
    <section className="mx-auto max-w-7xl">
      {loading ? (
        <Spinner className="mx-auto mt-20" size={50} />
      ) : (
        <>
          <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white bg-opacity-75 px-4 py-6 backdrop-blur backdrop-filter sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Update [{monitorForm.monitor?.Name}]</h1>
            <div className="flex gap-2">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:w-auto"
              >
                Test Run
              </button>
              <button
                type="submit"
                form="monitorForm"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                Update
              </button>
            </div>
          </div>
          <div className="mt-6 px-4 sm:px-6 md:px-8">
            <MonitorForm />
          </div>
        </>
      )}
    </section>
  );
};

MonitorAdd.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default MonitorAdd;
