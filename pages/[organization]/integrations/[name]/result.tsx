import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import * as Sentry from '@sentry/nextjs';
import axios from 'axios';
import BookFallingIcon from 'components/icon/book-falling';
import SuccessIcon from 'components/icon/success';
import {
  ContentTypeFormUrlEncoded,
  IntegrationNameDiscord,
  IntegrationNameSlack,
  IntegrationNameTeams,
  IntegrationNameWebhook,
  SLACK_OAUTH_API_V2,
} from 'constants/default';
import { useAtom } from 'jotai';
import DashboardLayout from 'layout/dashboard-layout';
import { apiClient } from 'lib/axios';
import { IntegrationType, SingleIntegrationResponse } from 'models/monitor';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from 'pages/_app';
import { ReactElement, useEffect, useState } from 'react';
import { globalAtom } from 'store/global';

const getIntegration = (path: string) => {
  const splitPath = path.split('/');
  const integration = splitPath[splitPath.length - 2].toLocaleLowerCase();
  switch (integration) {
    case 'slack':
      return IntegrationNameSlack;
    case 'discord':
      return IntegrationNameDiscord;
    case 'teams':
      return IntegrationNameTeams;
    default:
      return IntegrationNameWebhook;
  }
};

const Result: NextPageWithLayout = () => {
  const router = useRouter();

  const [uiState, setUIState] = useState({ loading: true, success: false });
  const [global] = useAtom(globalAtom);
  const orgSlug = global.currentUser?.Organization.Slug;

  useEffect(() => {
    if (!router.isReady) return;

    const integration = getIntegration(router.asPath);
    if (integration === IntegrationNameSlack) {
      const form = new FormData();
      form.append('code', router.query.code as string);
      form.append('client_id', process.env.NEXT_PUBLIC_SLACK_CLIENT_ID!);
      form.append('client_secret', process.env.NEXT_PUBLIC_SLACK_CLIENT_SECRET!);
      form.append('redirect_uri', window.location.href);

      axios
        .post(SLACK_OAUTH_API_V2, form, {
          headers: {
            'Content-Type': ContentTypeFormUrlEncoded,
          },
        })
        .then((res) => {
          if (res.data.ok) {
            apiClient
              .post<SingleIntegrationResponse>('/integration', {
                type: IntegrationType.Slack,
                config: res.data,
              })
              .then(() => {
                setUIState({ loading: false, success: true });
              })
              .catch((e) => {
                console.error(e);
                setUIState({ loading: false, success: false });
              });
          } else {
            setUIState({ loading: false, success: false });
          }
        })
        .catch((err) => {
          Sentry.captureException(err);
          setUIState({ loading: false, success: false });
        });
    }
  }, [router]);

  const getTitle = () => {
    const integration = getIntegration(router.asPath);
    return uiState.success ? `${integration} Integration Successful!` : `${integration} Integration Failed!`;
  };

  const getDescription = () => {
    const integration = getIntegration(router.asPath);
    return uiState.success
      ? `We have Successfully integrated ${integration}. You can now get alerts in ${integration} channels.`
      : `We failed to integrate ${integration}. Please try again. If you need assistance, please contact support.`;
  };

  return (
    <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 md:px-8">
      <div className="border-b px-1 pb-6 sm:px-6 md:px-0">
        <h1 className="text-2xl font-semibold text-gray-900">Integrations</h1>
      </div>
      <div className="p-6 md:mx-auto">{uiState.loading ? <BookFallingIcon className="mx-auto mt-4 w-20" /> : null}</div>
      {uiState.loading ? null : (
        <section>
          {uiState.success ? (
            <SuccessIcon className="mx-auto my-6 h-16 w-16 text-green-600" />
          ) : (
            <ExclamationCircleIcon className="mx-auto my-6 h-16 w-16 text-rose-500" />
          )}
          <div className="text-center">
            <h3 className="text-center text-base font-semibold text-gray-900 md:text-2xl">{getTitle()}</h3>
            <p className="my-2 text-gray-600">{getDescription()}</p>
            {uiState.success ? <p> Have a great day! </p> : null}
            <div className="py-10 text-center">
              <Link
                type="button"
                href={`/${orgSlug!}/integrations`}
                className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                Go Back
              </Link>
            </div>
          </div>
        </section>
      )}
    </section>
  );
};

Result.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Result;
