import * as Sentry from '@sentry/nextjs';
import LoadingBubbleIcon from 'components/icon/loading-bubble';
import TwoFactorAuthIcon from 'components/icon/two-factor-auth';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { elixirClient } from 'lib/axios';
import { CacheKey, cacheUtil } from 'lib/cache';
import { auth } from 'lib/firebase';
import { AuthProvider, LoginResponse } from 'models/user';
import { useEffect, useState } from 'react';

export default function EmailResult() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (!urlParams.has('email') || !urlParams.has('code')) {
      activateError();
      return;
    }
    const email = urlParams.get('email')!;
    const code = urlParams.get('code')!;
    setEmail(email);

    if (isSignInWithEmailLink(auth, window.location.href) && email !== '') {
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          elixirClient
            .post<LoginResponse>('/email_link_login', {
              code: code,
              email: result.user.email,
              provider: AuthProvider.email,
              firebase_uid: result.user.uid,
            })
            .then((response) => {
              console.log(response);
              cacheUtil.set(CacheKey.AccessToken, response.data.data.access_token);
            })
            .catch((error) => {
              console.error(error);
              activateError();
            });
        })
        .catch((error) => {
          Sentry.captureException(error);
          activateError();
        });
    }
  }, [email]);

  const activateError = () => {
    setHasError(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {hasError ? 'Verification failed' : 'Confirming your account'}
          </h2>
        </div>
        <div className="mt-8 mb-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex flex-col items-center bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <TwoFactorAuthIcon className="h-32" />
            <div className="mt-8 space-y-6">
              <div className="flex flex-col items-center text-center">
                <p>
                  {hasError
                    ? 'Failed to log you in, contact support'
                    : email === ''
                    ? 'Checking your email'
                    : `Confirming your email ${email}`}
                </p>
                {loading ? <LoadingBubbleIcon className="mt-4 w-32" /> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
