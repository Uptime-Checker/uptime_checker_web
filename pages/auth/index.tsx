import * as Sentry from '@sentry/nextjs';
import axios, { AxiosError } from 'axios';
import SimpleAlert from 'components/alert/simple';
import GithubIcon from 'components/icon/github';
import GoogleIcon from 'components/icon/google';
import LoadingIcon from 'components/icon/loading';
import LogoWithoutText from 'components/logo/logo-without-text';
import { ProviderNameGithub, ProviderNameGoogle } from 'constants/default';
import { AUTH_FAIL_COULD_NOT_SEND_MAGIC_LINK } from 'constants/ui-text';
import { produce } from 'immer';
import { CacheKey, cacheUtil } from 'lib/cache';
import { redirectToDashboard, setAccessToken, setCurrentUser } from 'lib/global';
import { getSessionUser } from 'lib/session/user';
import { withSessionSsr } from 'lib/session/withSession';
import { classNames } from 'lib/tailwind/utils';
import { GuestUserResponse, User } from 'models/user';
import { signIn } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { ElixirError } from 'types/error';
import { toUpper } from 'utils/misc';

interface Props {
  user: User | null;
}

export default function Auth({ user }: Props) {
  const router = useRouter();
  const [hidden, setHidden] = useState(true);
  const [loading, setLoading] = useState({ on: false, email: false, google: false, github: false });
  const [alertState, setAlertState] = useState({ on: false, success: true, title: '', detail: '' });

  const processLoading = (on: boolean, email: boolean, google: boolean, github: boolean) => {
    setLoading(
      produce((draft) => {
        draft.on = on;
        draft.email = email;
        draft.google = google;
        draft.github = github;
      })
    );
  };

  const processProviderLoading = useCallback((provider: string, on: boolean) => {
    if (provider === ProviderNameGoogle) {
      processLoading(on, false, on, false);
    } else if (provider === ProviderNameGithub) {
      processLoading(on, false, false, on);
    }
  }, []);

  useEffect(() => {
    if (!router.isReady) return;

    if (user) {
      setCurrentUser(user).catch(Sentry.captureException);
      setAccessToken(user.Token!);
      redirectToDashboard(user);
    } else {
      setHidden(false);
      processLoading(false, false, false, false);
    }
  }, [router.isReady, user]);

  const handleProviderClick = async (provider: string) => {
    closeAlert();
    processProviderLoading(provider, true);
    await signIn(provider);
  };

  const handleEmailSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailRef = event.currentTarget.elements[0] as HTMLInputElement;
    const email = emailRef.value;

    closeAlert();
    processLoading(true, true, false, false);

    try {
      const { data } = await axios.post<GuestUserResponse>('/api/guest', { email: email });

      cacheUtil.set(CacheKey.Email, data.data.Email);
      await router.push('/auth/email-sent');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const elixirError = (error as AxiosError).response?.data as ElixirError;
        setAlertState({
          on: true,
          success: false,
          title: AUTH_FAIL_COULD_NOT_SEND_MAGIC_LINK,
          detail: toUpper(elixirError.message ?? elixirError.error),
        });
      }
    } finally {
      processLoading(false, false, false, false);
    }
  };

  const onAlertClose = () => closeAlert();

  const closeAlert = () => {
    setAlertState(
      produce((draft) => {
        draft.on = false;
      })
    );
  };

  return (
    <div className={classNames('min-h-screen bg-gray-50', hidden ? 'hidden' : '')}>
      <Head>
        <title>Auth</title>
      </Head>
      <SimpleAlert
        on={alertState.on}
        success={alertState.success}
        title={alertState.title}
        detail={alertState.detail}
        onClose={onAlertClose}
      />
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <LogoWithoutText className="mx-auto h-12 w-auto" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              start your 14-day free trial
            </a>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleEmailSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    disabled={loading.on}
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2
                    text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none
                    focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:pointer-events-none"
                  disabled={loading.on}
                >
                  {loading.email ? <LoadingIcon className="-ml-1 mr-3 h-5 w-5 animate-spin text-white" /> : null}
                  {loading.email ? 'Loading' : 'Sign in'}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6">
                <div>
                  <button
                    type="button"
                    className="flex w-full items-center justify-center rounded-md border border-indigo-600 bg-white
                      px-4 py-2 font-medium text-indigo-600 shadow-sm hover:bg-indigo-100 focus:outline-none
                      focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:pointer-events-none"
                    onClick={() => handleProviderClick(ProviderNameGithub)}
                    disabled={loading.on}
                  >
                    {loading.github ? (
                      <LoadingIcon className="-ml-1 mr-3 h-5 w-5 animate-spin text-indigo-600" />
                    ) : null}
                    <GithubIcon />
                    Continue with Github
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <div>
                  <button
                    type="button"
                    className="flex w-full items-center justify-center rounded-md border border-indigo-600 bg-white
                      px-4 py-2 font-medium text-indigo-600 shadow-sm hover:bg-indigo-100 focus:outline-none
                      focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:pointer-events-none"
                    onClick={() => handleProviderClick(ProviderNameGoogle)}
                    disabled={loading.on}
                  >
                    {loading.google ? (
                      <LoadingIcon className="-ml-1 mr-3 h-5 w-5 animate-spin text-indigo-600" />
                    ) : null}
                    <GoogleIcon />
                    Continue with Google
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(ctx) {
  const user = await getSessionUser(ctx);
  return { props: { user: user } };
});
