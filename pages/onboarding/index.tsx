import * as Sentry from '@sentry/nextjs';
import LoadingIcon from 'components/icon/loading';
import { FREE_PLAN_ID } from 'constants/payment';
import { authClientRequest, HTTPMethod } from 'lib/axios';
import { getCurrentUser, logout } from 'lib/global';
import { UserResponse } from 'models/user';
import Head from 'next/head';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { sanitizeString } from '../../utils/misc';

let nameUpdated = false;

export default function Onboarding() {
  const [orgSlug, setOrgSlug] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getCurrentUser() === null) {
      logout().then((_) => {});
    }
  }, []);

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const firstNameRef = event.currentTarget.elements[0] as HTMLInputElement;
    const lastNameRef = event.currentTarget.elements[1] as HTMLInputElement;
    const orgRef = event.currentTarget.elements[2] as HTMLInputElement;
    const slugRef = event.currentTarget.elements[3] as HTMLInputElement;

    setLoading(true);
    if (!nameUpdated) {
      await updateName(`${firstNameRef.value} ${lastNameRef.value}`);
      nameUpdated = true;
    }
    try {
      await authClientRequest<UserResponse>({
        method: HTTPMethod.POST,
        url: '/organizations',
        data: { name: orgRef.value, slug: slugRef.value, plan_id: FREE_PLAN_ID },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateName = async (name: string) => {
    try {
      await authClientRequest<UserResponse>({ method: HTTPMethod.PATCH, url: '/users', data: { name: name } });
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  const handleOrganizationChange = (event: ChangeEvent) => {
    let target = event.currentTarget as HTMLInputElement;
    let slug = makeKey(target.value);
    setOrgSlug(slug);
  };

  const handleOrganizationSlugChange = (event: ChangeEvent) => {
    let target = event.currentTarget as HTMLInputElement;
    let slug = makeKey(target.value);
    setOrgSlug(slug);
  };

  const makeKey = (title: string) => {
    let newStr = title.replaceAll(' ', '-');
    return sanitizeString(newStr);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Onboarding</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="w-full py-10 sm:mx-auto sm:max-w-lg sm:py-32 sm:px-6 lg:px-8">
        <form
          className="flex flex-col items-center justify-center space-y-6 sm:mx-auto sm:w-full sm:max-w-2xl"
          onSubmit={handleFormSubmit}
        >
          <h1 className="px-4 text-center text-4xl font-bold text-gray-900 sm:px-0">Let&apos;s get started</h1>
          <div className="w-full bg-white px-4 py-5 drop-shadow-md sm:rounded-lg sm:p-6">
            <div className="mt-0 md:col-span-2">
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First name
                    </label>
                    <div className="mt-1">
                      <input
                        required
                        minLength={3}
                        pattern="[a-zA-Z]*"
                        disabled={loading}
                        type="text"
                        name="firstName"
                        id="firstName"
                        autoComplete="given-name"
                        placeholder="Aaron"
                        aria-invalid="false"
                        aria-describedby="error-firstName-required"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last name
                    </label>
                    <div className="mt-1">
                      <input
                        required
                        minLength={3}
                        pattern="[a-zA-Z]*"
                        disabled={loading}
                        type="text"
                        name="lastName"
                        id="lastName"
                        autoComplete="family-name"
                        placeholder="Jones"
                        aria-invalid="false"
                        aria-describedby="error-lastName-required"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-6">
                    <label htmlFor="organisation" className="block text-sm font-medium text-gray-700">
                      Organisation
                    </label>
                    <div className="mt-1">
                      <input
                        required
                        minLength={4}
                        disabled={loading}
                        onChange={handleOrganizationChange}
                        type="text"
                        name="organisation"
                        id="organisation"
                        autoComplete="organization"
                        placeholder="Twitter Inc."
                        aria-invalid="false"
                        aria-describedby="error-organisation-required"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <label htmlFor="organisation-slug" className="mt-5 block text-sm font-medium text-gray-700">
                      Organisation Slug
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <div className="relative flex flex-grow items-stretch focus-within:z-10">
                        <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                          https://
                        </span>
                        <input
                          required
                          minLength={4}
                          disabled={loading}
                          value={orgSlug}
                          onChange={handleOrganizationSlugChange}
                          type="text"
                          name="organisation-slug"
                          id="organisation-slug"
                          autoComplete="organization-slug"
                          placeholder="twtr"
                          aria-invalid="false"
                          aria-describedby="error-organisation-slug-required"
                          className="block w-full rounded-none border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                        .uptimecheckr.com
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-10 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {loading ? <LoadingIcon className="-ml-1 mr-3 h-5 w-5 animate-spin text-indigo-700" /> : null}
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
