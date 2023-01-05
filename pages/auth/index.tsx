import { FirebaseError } from '@firebase/util';
import * as Sentry from '@sentry/nextjs';
import { AxiosError } from 'axios';
import SimpleAlert from 'components/alert/simple';
import GoogleIcon from 'components/icon/google';
import LoadingIcon from 'components/icon/loading';
import LogoWithoutText from 'components/logo/logo-without-text';
import {
  AUTH_FAIL_COULD_NOT_SEND_MAGIC_LINK,
  AUTH_FAIL_TO_LOGIN_USING_GOOGLE,
  PLEASE_CONTACT_SUPPORT,
} from 'constants/ui-text';
import {
  getIdToken,
  getRedirectResult,
  GoogleAuthProvider,
  sendSignInLinkToEmail,
  signInWithRedirect,
} from 'firebase/auth';
import produce from 'immer';
import { authClientRequest, elixirClient, HTTPMethod } from 'lib/axios';
import { CacheKey, cacheUtil } from 'lib/cache';
import { auth } from 'lib/firebase';
import { getCurrentUser, redirectToDashboard, setAccessToken, setCurrentUser } from 'lib/global';
import { AccessToken, AuthProvider, GuestUserResponse, UserResponse } from 'models/user';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FormEvent, MouseEvent, useEffect, useState } from 'react';
import { ElixirError } from 'types/error';
import { toUpper } from 'utils/misc';

const provider = new GoogleAuthProvider();

export default function Auth() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [alertState, setAlertState] = useState({ on: false, success: true, title: '', detail: '' });

  async function getMe() {
    try {
      const { data } = await authClientRequest<UserResponse>({ method: HTTPMethod.GET, url: '/me' });
      await setCurrentUser(data.data);
      redirectToDashboard(data.data);
    } catch (error) {
      Sentry.captureException(error);
    }
  }

  useEffect(() => {
    const user = getCurrentUser();
    if (user !== null) {
      redirectToDashboard(user);
    } else {
      setLoading(true);
      getRedirectResult(auth)
        .then((result) => {
          if (result === null) {
            setLoading(false);
            return;
          }
          setLoading(true);
          const user = result.user;
          getIdToken(user).then((token) => {
            elixirClient
              .post<AccessToken>('/provider_login', {
                id_token: token,
                provider: AuthProvider.google,
              })
              .then((response) => {
                setAccessToken(response.data.access_token);
                getMe().then(() => {});
              })
              .catch((e) => {
                setAlertState({
                  on: true,
                  success: false,
                  title: AUTH_FAIL_TO_LOGIN_USING_GOOGLE,
                  detail: PLEASE_CONTACT_SUPPORT,
                });
                Sentry.captureException(e);
                setLoading(false);
              });
          });
        })
        .catch((error) => {
          if (error instanceof FirebaseError) {
            Sentry.captureException(error);
          }
        });
    }
  }, []);

  const handleGoogleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    closeAlert();
    setLoading(true);
    await signInWithRedirect(auth, provider);
  };

  const handleEmailSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailRef = event.currentTarget.elements[0] as HTMLInputElement;

    closeAlert();
    setLoading(true);

    try {
      const { data } = await elixirClient.post<GuestUserResponse>('/guest_user', {
        email: emailRef.value,
      });

      try {
        await sendSignInLinkToEmail(auth, emailRef.value, {
          url: `${window.location.origin}/auth/email-result?code=${data.data.code!}&email=${emailRef.value}`,
          handleCodeInApp: true,
        });
        cacheUtil.set(CacheKey.Email, emailRef.value);
        await router.push('/auth/email-sent');
      } catch (error) {
        Sentry.captureException(error);
      } finally {
        setLoading(false);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const elixirError = (error as AxiosError).response?.data as ElixirError;
        setAlertState({
          on: true,
          success: false,
          title: AUTH_FAIL_COULD_NOT_SEND_MAGIC_LINK,
          detail: toUpper(elixirError.message),
        });
      }
    } finally {
      setLoading(false);
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
                    disabled={loading}
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
                  disabled={loading}
                >
                  {loading ? <LoadingIcon className="-ml-1 mr-3 h-5 w-5 animate-spin text-white" /> : null}
                  {loading ? 'Loading' : 'Sign in'}
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
                    onClick={handleGoogleClick}
                    disabled={loading}
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
