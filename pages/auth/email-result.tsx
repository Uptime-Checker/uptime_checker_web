import * as Sentry from '@sentry/nextjs';
import LoadingBubbleIcon from 'components/icon/loading-bubble';
import TwoFactorAuthIcon from 'components/icon/two-factor-auth';
import { authRequest, HTTPMethod } from 'lib/axios';
import { redirectToDashboard, setAccessToken, setCurrentUser } from 'lib/global';
import { withSessionSsr } from 'lib/session/withSession';
import { UserResponse } from 'models/user';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Props {
  accessToken: string | undefined | null;
}

export const getServerSideProps = withSessionSsr(function getServerSideProps(ctx) {
  return {
    props: {
      accessToken: ctx.req.session.accessToken ?? null,
    },
  };
});

export default function EmailResult({ accessToken }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has('error') || !accessToken) {
      activateError();
      return;
    }
    setAccessToken(accessToken);

    async function getMe() {
      try {
        const { data } = await authRequest<UserResponse>({ method: HTTPMethod.GET, url: '/user/me' });
        await setCurrentUser(data.data);
        redirectToDashboard(data.data);
      } catch (error) {
        Sentry.captureException(error);
      }
    }

    getMe().catch(console.error);
  }, [accessToken, router]);

  const activateError = () => {
    setHasError(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Auth</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {hasError ? 'Verification failed' : 'Confirming your account'}
          </h2>
        </div>
        <div className="mb-8 mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex flex-col items-center bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            <TwoFactorAuthIcon className="h-32" />
            <div className="mt-8 space-y-6">
              <div className="flex flex-col items-center text-center">
                <p>{hasError ? 'Failed to log you in, contact support' : 'Logging you in...'}</p>
                {loading ? <LoadingBubbleIcon className="mt-4 w-32" /> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
