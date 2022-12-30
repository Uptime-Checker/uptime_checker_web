import DashboardLayout from 'layout/dashboard-layout';
import SettingsLayout from 'layout/settings-layout';
import { FormEvent, ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';

const Profile: NextPageWithLayout = () => {
  const handleProfileSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className="max-w-2xl" onSubmit={handleProfileSubmit}>
      <div className="grid max-w-2xl grid-cols-1 gap-y-6 pt-8 sm:grid-cols-6 sm:gap-x-6">
        <div className="sm:col-span-6">
          <h2 className="text-blue-gray-900 text-xl font-medium">Profile Information</h2>
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">
            Full name
          </label>
          <input
            type="text"
            name="full-name"
            id="full-name"
            autoComplete="cc-given-name"
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">
            Phone number
          </label>
          <input
            type="text"
            name="phone-number"
            id="phone-number"
            placeholder="+1 415 630 8215"
            autoComplete="tel"
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="sm:col-span-6">
          <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            disabled
            type="email"
            name="email-address"
            id="email-address"
            autoComplete="email"
            className="mt-1 block w-full cursor-not-allowed rounded-md border border-gray-300 bg-gray-100 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="flex justify-end pt-8">
        <button
          type="submit"
          className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4
          text-sm font-medium text-white shadow-sm hover:bg-indigo-700
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save
        </button>
      </div>
    </form>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      <SettingsLayout>{page}</SettingsLayout>
    </DashboardLayout>
  );
};

export default Profile;
