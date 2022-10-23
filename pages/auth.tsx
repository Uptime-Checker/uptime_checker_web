import { FirebaseError } from '@firebase/util';
import { AxiosError } from 'axios';
import LogoWithoutText from 'components/logo/logo-without-text';
import { getIdToken, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { elixirClient } from 'lib/axios';
import { auth } from 'lib/firebase';
import { GuestUserResponse } from 'models/user';
import { FormEvent, MouseEvent, useState } from 'react';

const provider = new GoogleAuthProvider();

export default function Auth() {
  const [loading, setLoading] = useState(false);

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

    setLoading(true);

    try {
      const { data, status } = await elixirClient.post<GuestUserResponse>('/guest_user', {
        email: emailRef.value,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.response?.data);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
                    <svg className="mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M5.31890625,14.5035 L4.4835,17.6221875 L1.43010937,17.6867812 C0.51759375,15.9942656 0,14.0578125 0,12 C0,10.0101094 0.4839375,8.13360938 1.34175,6.4813125 L1.34240625,6.4813125 L4.06078125,6.9796875 L5.25159375,9.68175 C5.00235937,10.4083594 4.86651562,11.1883594 4.86651562,12 C4.86660937,12.880875 5.02617187,13.7248594 5.31890625,14.5035 Z"
                        fill="#FBBB00"
                      ></path>
                      <path
                        d="M23.7903281,9.75825 C23.9281406,10.4841563 24,11.2338281 24,12 C24,12.859125 23.9096719,13.6971563 23.7375937,14.5055156 C23.1534375,17.2562813 21.6270469,19.65825 19.5125625,21.3580313 L19.5119062,21.357375 L16.0879687,21.1826719 L15.603375,18.1575938 C17.0064375,17.33475 18.1029375,16.0470469 18.6805312,14.5055156 L12.2638125,14.5055156 L12.2638125,9.75825 L18.7741406,9.75825 L23.7903281,9.75825 L23.7903281,9.75825 Z"
                        fill="#518EF8"
                      ></path>
                      <path
                        d="M19.5118594,21.357375 L19.5125156,21.3580313 C17.4560625,23.0109844 14.8437188,24 12,24 C7.43010937,24 3.4569375,21.4457344 1.43010937,17.6868281 L5.31890625,14.5035469 C6.33229687,17.2081406 8.9413125,19.1334375 12,19.1334375 C13.3147031,19.1334375 14.5463906,18.7780313 15.6032812,18.1575938 L19.5118594,21.357375 Z"
                        fill="#28B446"
                      ></path>
                      <path
                        d="M19.6595625,2.762625 L15.7720781,5.94525 C14.67825,5.26153125 13.38525,4.8665625 12,4.8665625 C8.87207812,4.8665625 6.21426562,6.88017188 5.25164062,9.68175 L1.34240625,6.4813125 L1.34175,6.4813125 C3.33890625,2.63076562 7.3621875,0 12,0 C14.9116406,0 17.5813125,1.03715625 19.6595625,2.762625 Z"
                        fill="#F14336"
                      ></path>
                    </svg>
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
