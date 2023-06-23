import { classNames } from 'lib/tailwind/utils';
import { ChangeEvent, useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { getMonitorMethodSelectionOptions, getMonitorTimeoutSelectionOptions } from 'services/monitor';
import KV from './kv';

type Props = {
  interval: number;
};

export enum httpRequestTab {
  Body = 'Body',
  RequestHeaders = 'Request Headers',
  QueryParameters = 'Query Parameters',
  Authentication = 'Authentication',
}

const httpRequestTabs = [
  { name: httpRequestTab.Body },
  { name: httpRequestTab.RequestHeaders },
  { name: httpRequestTab.QueryParameters },
  { name: httpRequestTab.Authentication },
];

const RequestSettings = ({ interval }: Props) => {
  const { register } = useFormContext();
  const [selectedHTTPRequestTab, setHTTPRequestTab] = useState(httpRequestTabs[0]);

  const getActiveHTTPRequestTab = useCallback(
    (httpRequestTabName: string) => {
      return httpRequestTabName === selectedHTTPRequestTab.name;
    },
    [selectedHTTPRequestTab.name]
  );

  const onHTTPRequestTabChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const selectedTab = httpRequestTabs.find((tab) => tab.name === target.value);
    setHTTPRequestTab(selectedTab!);
  };

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Customise the request, add necessary headers or turn on verifying the SSL certificates.
      </p>

      <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6 md:col-span-2">
        <div className="sm:col-span-3">
          <label htmlFor="method" className="block text-sm font-medium leading-6 text-gray-900">
            HTTP Method
          </label>
          <div className="mt-2">
            <select
              {...register('method')}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              {getMonitorMethodSelectionOptions().map((option) => (
                <option key={option.value} value={option.value} disabled={option.disabled}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="Timeout" className="block text-sm font-medium leading-6 text-gray-900">
            Request Timeout
          </label>
          <div className="mt-2">
            <select
              {...register('timeout')}
              defaultValue={30}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              {getMonitorTimeoutSelectionOptions(interval).map((option) => (
                <option key={option.value} value={option.value} disabled={option.disabled}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-span-full">
          <div className="lg:hidden">
            <label htmlFor="tabs" className="sr-only">
              Select a tab
            </label>
            <select
              id="tabs"
              name="tabs"
              className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              defaultValue={selectedHTTPRequestTab.name}
              onChange={onHTTPRequestTabChange}
            >
              {httpRequestTabs.map((tab) => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
          </div>
          <div className="hidden lg:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 overflow-auto" aria-label="Tabs">
                {httpRequestTabs.map((tab) => (
                  <button
                    type="button"
                    key={tab.name}
                    className={classNames(
                      getActiveHTTPRequestTab(tab.name)
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                      'whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium'
                    )}
                    onClick={() => {
                      setHTTPRequestTab(tab);
                    }}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {selectedHTTPRequestTab.name === httpRequestTab.Body ? (
          <div className="col-span-full">
            <p className="mb-2 block text-sm leading-6 text-gray-900">
              Don&apos;t forgot to add the correct <b>Content-Type</b> request header
            </p>
            <textarea
              rows={4}
              inputMode="text"
              name="body"
              id="body"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              spellCheck="false"
            ></textarea>
          </div>
        ) : null}

        {selectedHTTPRequestTab.name === httpRequestTab.RequestHeaders ? (
          <div className="col-span-full">
            <p className="mb-2 block text-sm leading-6 text-gray-900">
              Create header key/value pairs to set Cookie values, Bearer tokens or any other HTTP header
            </p>
            <KV keyPlaceholder="key" valuePlaceholder="value" button="Request Header" name="headers" />
          </div>
        ) : null}

        {selectedHTTPRequestTab.name === httpRequestTab.QueryParameters ? (
          <div className="col-span-full">
            <p className="mb-2 block text-sm leading-6 text-gray-900">
              Set query parameter key/value pairs, or make them part of the URL if you want
            </p>
            <KV
              className="col-span-full"
              keyPlaceholder="name"
              valuePlaceholder="value"
              button="Query Parameter"
              name="query"
            />
          </div>
        ) : null}

        {selectedHTTPRequestTab.name === httpRequestTab.Authentication ? (
          <>
            <div className="sm:col-span-3 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                HTTP Authorization Username
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('username')}
                  autoComplete="username"
                  placeholder="http username"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                HTTP Authorization Password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  {...register('password')}
                  placeholder="http password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </>
        ) : null}

        <div className="sm:col-span-3">
          <section className="flex h-6 min-w-0 items-center gap-2">
            <input
              id="ssl"
              defaultChecked={true}
              {...register('ssl')}
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label htmlFor="ssl" className="text-sm font-normal text-gray-900">
              Verify SSL certificate
            </label>
          </section>
          <p className="mt-2 text-sm font-light text-gray-500">
            When ticked, we will consider this monitor <b>down</b> and send alerts when your SSL certificate is invalid.
          </p>
        </div>

        <div className="sm:col-span-3">
          <section className="flex h-6 min-w-0 items-center gap-2">
            <input
              id="redirect"
              {...register('redirect')}
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label htmlFor="redirect" className="text-sm font-normal text-gray-900">
              Follow redirects
            </label>
          </section>
          <p className="mt-2 text-sm font-light text-gray-500">
            When ticked, we will follow a maximum of 3 redirects before we consider the check a failure.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RequestSettings;
