import DashboardLayout from 'layout/dashboard-layout';
import Link from 'next/link';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../../../../_app';

const requestBody = {
  subscription: {
    expires_at: '2033-02-17T20:34:28Z',
    id: 1,
    is_trial: false,
    plan: {
      id: 1,
      price: 0,
      product: null,
      type: 'monthly',
    },
    product: {
      description: 'Free for lifetime',
      external_id: null,
      features: null,
      id: 1,
      name: 'Free',
      plans: null,
    },
    starts_at: '2023-02-17T20:34:28Z',
    status: 'active',
  },
};

const CheckDetail: NextPageWithLayout = () => {
  return (
    <section className="mx-auto mt-6 max-w-7xl px-4 pb-16 sm:px-6 md:px-8">
      <div className="px-1 sm:px-6 md:px-0">
        <h1 className="mb-2 text-2xl font-semibold text-gray-900">Check #47</h1>
        <Link href="https://api.textrapp.me/api/v1/full_user_info" className="text-indigo-600 underline">
          https://api.textrapp.me/api/v1/full_user_info
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-2 divide-x">
        <section className="pr-5">
          <h2 className="text-xl font-medium">Request Info</h2>
          <article className="mt-5 overflow-hidden rounded shadow">
            <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
              <thead>
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Properties</th>
                  <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Method</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">GET</td>
                </tr>

                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Checked At</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">5:36 PM, Oct 4, 2022</td>
                </tr>

                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Checked From</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">🇬🇲 Frankfurt, Germany</td>
                </tr>
              </tbody>
            </table>
          </article>

          <article className="mt-5 overflow-hidden rounded shadow">
            <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
              <thead>
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Headers</th>
                  <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">x-api-key</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">f69df0f1-ded7-45ac-93a8-6eb69783eae5</td>
                </tr>

                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Accept-Language</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">en-US</td>
                </tr>

                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Content-Type</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">application-json</td>
                </tr>
              </tbody>
            </table>
          </article>

          <article className="mt-5 min-w-full divide-y-2 divide-gray-200 overflow-hidden rounded text-sm shadow">
            <div className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Body</div>
            <div className="px-4 py-2">
              <pre>{JSON.stringify(requestBody, null, 2)}</pre>
            </div>
          </article>
        </section>
        <section className="pl-5">
          <h2 className="text-xl font-medium">Response Info</h2>
          <article className="mt-5 overflow-hidden rounded shadow">
            <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
              <thead>
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Properties</th>
                  <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Status</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                      Passed
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Status Code</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">201 - No Content</td>
                </tr>

                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Duration</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">30 seconds</td>
                </tr>

                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Content Size</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">434 Kilobytes</td>
                </tr>
              </tbody>
            </table>
          </article>

          <article className="mt-5 overflow-hidden rounded shadow">
            <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
              <thead>
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Headers</th>
                  <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Server</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">Cowboy</td>
                </tr>

                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Cache-Control</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">max-age=0, private, must-revalidate</td>
                </tr>

                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Content-Type</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">application/json; charset=utf-8</td>
                </tr>

                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">X-Request-Id</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">F0aOBe7nUsF49A8AAAAI</td>
                </tr>

                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Date</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">Thu, 23 Feb 2023 20:27:46 GMT</td>
                </tr>
              </tbody>
            </table>
          </article>
        </section>
      </div>
    </section>
  );
};

CheckDetail.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default CheckDetail;
