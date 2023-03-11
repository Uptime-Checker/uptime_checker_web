import * as Sentry from '@sentry/nextjs';
import axios, { AxiosError } from 'axios';
import SimpleAlert from 'components/alert/simple';
import GithubIcon from 'components/icon/github';
import GoogleIcon from 'components/icon/google';
import LoadingIcon from 'components/icon/loading';
import LogoWithoutText from 'components/logo/logo-without-text';
import { ProviderNameGithub, ProviderNameGoogle, SESSION_STATUS_AUTHENTICATED } from 'constants/default';
import { AUTH_FAIL_COULD_NOT_SEND_MAGIC_LINK } from 'constants/ui-text';
import produce from 'immer';
import { authRequest, HTTPMethod } from 'lib/axios';
import { CacheKey, cacheUtil } from 'lib/cache';
import { getCurrentUser, redirectToDashboard, setAccessToken, setCurrentUser } from 'lib/global';
import { GuestUserResponse, UserResponse } from 'models/user';
import { signIn, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import { ElixirError } from 'types/error';
import { toUpper } from 'utils/misc';

export default function Auth() {
  const router = useRouter();
  const [loading, setLoading] = useState({ on: false, email: false, google: false, github: false });
  const [alertState, setAlertState] = useState({ on: false, success: true, title: '', detail: '' });

  const { data: session, status } = useSession();

  useEffect(() => {
    if (!router.isReady) return;

    async function getMe() {
      try {
        const { data } = await authRequest<UserResponse>({ method: HTTPMethod.GET, url: '/user/me' }, false);
        await setCurrentUser(data.data);
        redirectToDashboard(data.data);
      } catch (error) {
        Sentry.captureException(error);
        processLoading(false, false, false, false);
      }
    }

    const user = getCurrentUser();
    if (user) {
      redirectToDashboard(user);
    } else {
      if (status === SESSION_STATUS_AUTHENTICATED && session.accessToken) {
        processProviderLoading(session?.provider);
        setAccessToken(session.accessToken);
        getMe().then(() => {});
      } else {
        processLoading(false, false, false, false);
      }
    }
    return () => {
      processLoading(false, false, false, false);
    };
  }, [router, session, status]);

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

  const processProviderLoading = (provider: string) => {
    if (provider === ProviderNameGoogle) {
      processLoading(true, false, true, false);
    } else if (provider === ProviderNameGithub) {
      processLoading(true, false, false, true);
    }
  };

  const handleProviderClick = async (provider: string) => {
    closeAlert();
    processProviderLoading(provider);
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
      if (error instanceof AxiosError) {
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
    <div className="min-h-screen bg-gray-50">
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
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
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
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4
                    text-sm font-medium text-white shadow-sm hover:bg-indigo-700
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
                    className="flex w-full items-center justify-center rounded-md border border-indigo-600 bg-white py-2 px-4 font-medium text-indigo-600 shadow-sm hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => handleProviderClick(ProviderNameGithub)}
                    disabled={loading.on}
                  >
                    <GithubIcon />
                    Continue with Github
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <div>
                  <button
                    type="button"
                    className="flex w-full items-center justify-center rounded-md border border-indigo-600 bg-white py-2 px-4 font-medium text-indigo-600 shadow-sm hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => handleProviderClick(ProviderNameGoogle)}
                    disabled={loading.on}
                  >
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
