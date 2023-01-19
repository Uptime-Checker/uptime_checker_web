import { PauseIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import DashboardLayout from 'layout/dashboard-layout';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

const Monitor = () => {
  const router = useRouter();
  const { monitorId } = router.query;

  return (
    <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 md:px-8">
      <div className="flex justify-between">
        <div className="w-full md:flex md:items-center md:justify-between md:space-x-4 xl:border-b xl:pb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Textr API</h1>
            <p className="mt-2 text-sm text-gray-500">
              <a
                className="text-indigo-500 underline hover:text-indigo-700"
                target="_blank"
                rel="noopener noreferrer"
                href="https://api.textrapp.me/v1/status"
              >
                https://api.textrapp.me/v1/status
              </a>
            </p>
          </div>
          <div className="mt-4 flex space-x-3 md:mt-0">
            <button
              role="menuitem"
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            >
              <PauseIcon className="-ml-2 mr-1 h-5 w-5 text-gray-400" />
              Pause
            </button>
            <a
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              href="/app/checks/7aGxA7Kd/edit"
            >
              <PencilSquareIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
              <span>Edit</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

Monitor.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Monitor;
