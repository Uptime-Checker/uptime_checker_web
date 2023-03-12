import Tabs, { Breakpoint } from 'components/dashboard/tabs';
import Link from 'next/link';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

interface NavigationItem {
  name: string;
  href: string;
  count?: number;
}

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
    starts_at: '2023-02-17T20:34:28Z',
    status: 'active',
  },
};

const tabs: NavigationItem[] = [
  { name: 'Raw', href: 'raw' },
  { name: 'Preview', href: 'preview' },
];

export default function CheckDetailLayout({ children }: Props) {
  return (
    <section className="mx-auto mt-6 max-w-7xl px-4 pb-10 sm:px-6 md:px-8">
      <div className="px-1 sm:px-6 md:px-0">
        <h1 className="mb-2 text-2xl font-semibold text-gray-900">Check #47</h1>
        <Link href="https://api.textrapp.me/api/v1/full_user_info" className="text-indigo-600 underline">
          https://api.textrapp.me/api/v1/full_user_info
        </Link>
      </div>

      <div className="mt-10 lg:grid lg:grid-cols-2 lg:divide-x">
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
                  <td className="px-4 py-2 text-gray-700">f69df0f1-ded7-45ac-93a8-6eb69783eae5</td>
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
            <div className="bg-gray-50 px-4 py-2">
              <pre>{JSON.stringify(requestBody, null, 2)}</pre>
            </div>
          </article>
        </section>
        <section className="mt-10 lg:mt-0 lg:pl-5">
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
                  <td className="px-4 py-2 text-gray-700">max-age=0, private, must-revalidate</td>
                </tr>

                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Content-Type</td>
                  <td className="px-4 py-2 text-gray-700">application/json; charset=utf-8</td>
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

          <article className="mt-5 overflow-hidden rounded shadow">
            <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
              <thead>
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Tracing Info</th>
                  <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Total Time</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">2.562416041s</td>
                </tr>

                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">DNS Lookup Time</td>
                  <td className="px-4 py-2 text-gray-700">445.246375ms</td>
                </tr>

                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">TCP Connect Time</td>
                  <td className="px-4 py-2 text-gray-700">428.458µs</td>
                </tr>

                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">TLS Handshake Time</td>
                  <td className="px-4 py-2 text-gray-700">825.888208ms</td>
                </tr>

                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Server Processing Time</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">1.289082208s</td>
                </tr>

                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Transfer Time</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">1.712375ms</td>
                </tr>

                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Remote Address</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">98.126.155.187:443</td>
                </tr>
              </tbody>
            </table>
          </article>
        </section>
      </div>

      <div className="mt-10">
        <h2 className="-mb-2 text-xl font-medium">Response Preview</h2>
        <Tabs className="mt-5" baseURL={`monitors/1/checks/1`} tabs={tabs} breakpoint={Breakpoint.MD} routeIndex={6}>
          {children}
        </Tabs>
      </div>
    </section>
  );
}
