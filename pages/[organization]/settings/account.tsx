import { useAtom } from 'jotai';
import DashboardLayout from 'layout/dashboard-layout';
import SettingsLayout from 'layout/settings-layout';
import { NextPageWithLayout } from 'pages/_app';
import { FormEvent, ReactElement } from 'react';
import { globalAtom } from 'store/global';

const Account: NextPageWithLayout = () => {
  const [global] = useAtom(globalAtom);

  const handleProfileSubmit = (event: FormEvent<HTMLFormElement>) => {
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
            defaultValue={global.currentUser?.Name}
            type="text"
            name="full-name"
            id="full-name"
            autoComplete="full-name"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            disabled
            defaultValue={global.currentUser?.Email}
            type="email"
            name="email-address"
            id="email-address"
            autoComplete="email"
            className="mt-1 block w-full cursor-not-allowed rounded-md border border-gray-300 bg-gray-100 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="photo" className="text-blue-gray-900 block text-sm font-medium">
            Photo
          </label>
          <div className="mt-1 flex items-center">
            <img
              className="inline-block h-12 w-12 rounded-full"
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80"
              alt=""
            />
            <div className="ml-4 flex">
              <div className="border-blue-gray-300 focus-within:ring-offset-blue-gray-50 hover:bg-blue-gray-50 relative flex cursor-pointer items-center rounded-md border bg-white px-3 py-2 shadow-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">
                <label
                  htmlFor="user-photo"
                  className="text-blue-gray-900 pointer-events-none relative text-sm font-medium"
                >
                  <span>Change</span>
                  <span className="sr-only"> user photo</span>
                </label>
                <input
                  id="user-photo"
                  name="user-photo"
                  type="file"
                  className="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
                />
              </div>
              <button
                type="button"
                className="text-blue-gray-900 hover:text-blue-gray-700 focus:border-blue-gray-300 focus:ring-offset-blue-gray-50 ml-3 rounded-md border border-transparent bg-transparent px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Remove
              </button>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <div className="flex min-h-full items-end justify-end">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

Account.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      <SettingsLayout>{page}</SettingsLayout>
    </DashboardLayout>
  );
};

export default Account;
