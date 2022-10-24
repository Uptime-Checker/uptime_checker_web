import { FirebaseError } from '@firebase/util';
import { AxiosError } from 'axios';
import SimpleAlert from 'components/alert/simple';
import GoogleIcon from 'components/icon/google';
import LogoWithoutText from 'components/logo/logo-without-text';
import { AUTH_FAIL_COULD_NOT_SEND_MAGIC_LINK } from 'constants/ui-text';
import { getIdToken, GoogleAuthProvider, sendSignInLinkToEmail, signInWithPopup } from 'firebase/auth';
import produce from 'immer';
import { elixirClient } from 'lib/axios';
import { auth } from 'lib/firebase';
import { GuestUserResponse } from 'models/user';
import { FormEvent, MouseEvent, useState } from 'react';
import { ElixirError } from 'types/error';
import { toUpper } from 'utils/misc';

const provider = new GoogleAuthProvider();

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [alertState, setAlertState] = useState({ on: false, success: true, title: '', detail: '' });

  const handleGoogleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      let result = await signInWithPopup(auth, provider);
      const user = result.user;
      let token = await getIdToken(user);
      console.log(token);
    } catch (error) {
      console.error(error);
      // Handle Errors here.
      if (error instanceof FirebaseError) {
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData!.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      }
    }
  };

  const handleEmailSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailRef = event.currentTarget.elements[0] as HTMLInputElement;

    closeAlert();
    setLoading(true);

    try {
      const { data, status } = await elixirClient.post<GuestUserResponse>('/guest_user', {
        email: emailRef.value,
      });

      try {
        await sendSignInLinkToEmail(auth, emailRef.value, {
          url: `${window.location.origin}/auth/email-result?code=${data.data.code!}`,
          handleCodeInApp: true,
        });
      } catch (error) {
        console.error(error);
        // Handle Errors here.
        if (error instanceof FirebaseError) {
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData!.email;
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const elixirError = error.response?.data as ElixirError;
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
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sign in
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
