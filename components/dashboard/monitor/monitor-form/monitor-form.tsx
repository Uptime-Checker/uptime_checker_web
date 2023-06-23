import Accordion from 'components/accordion';
import { useAtom } from 'jotai';
import { elixirClient } from 'lib/axios';
import { AssertionComparison, AssertionSource } from 'models/assertion';
import { MonitorMethod, Region, RegionResponse } from 'models/monitor';
import Link from 'next/link';
import { ChangeEvent, useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import {
  getAssertions,
  getMonitorIntervalDefault,
  getMonitorIntervalSelectionOptions,
  getNameValuePair,
  getNameValuePairFromURLQuery,
} from 'services/monitor';
import { globalAtom, monitorFormAtom } from 'store/global';
import AssertionKV from './assertion-kv';
import RequestSettings from './request-settings';

export interface MonitorFormInput {
  name: string;
  url: string;
  interval: number;
  timeout: number;
  ssl: boolean;
  redirect: boolean;
  method: MonitorMethod;
  regions: string[];
  query: { name: string; value: string }[];
  headers: { name: string; value: string }[];
  username?: string;
  password?: string;
  assertions: {
    source: AssertionSource;
    property: string | undefined;
    comparison: AssertionComparison;
    value: string | undefined;
  }[];
}

const MonitorFormComponent = () => {
  const [global] = useAtom(globalAtom);
  const [interval, setInterval] = useState(300); // default 5 minutes interval
  const [regions, setRegions] = useState<Region[]>([]);
  const [monitorForm, setMonitorForm] = useAtom(monitorFormAtom);

  const orgSlug = global.currentUser?.Organization.Slug;

  const getDefaultValues = (): MonitorFormInput | undefined => {
    if (!monitorForm.monitor) return undefined;
    return {
      name: monitorForm.monitor.Name,
      url: monitorForm.monitor.URL,
      interval: monitorForm.monitor.Interval,
      timeout: monitorForm.monitor.Timeout,
      ssl: monitorForm.monitor.CheckSsl,
      redirect: monitorForm.monitor.FollowRedirects,
      method: monitorForm.monitor.Method,
      regions: monitorForm.monitor.Regions.map((region) => region.Key),
      headers: getNameValuePair(monitorForm.monitor.Headers),
      query: getNameValuePairFromURLQuery(monitorForm.monitor.URL),
      username: monitorForm.monitor.Username,
      password: monitorForm.monitor.Password,
      assertions: getAssertions(monitorForm.monitor.Assertions),
    };
  };

  const formMethods = useForm<MonitorFormInput>({ defaultValues: getDefaultValues() });

  useEffect(() => {
    elixirClient
      .get<RegionResponse>('regions')
      .then((res) => {
        setRegions(res.data.data);
      })
      .catch(console.error);
  }, []);

  const intervalChanged = (event: ChangeEvent<HTMLSelectElement>) => {
    setInterval(parseInt(event.target.value));
  };

  const onSubmit: SubmitHandler<MonitorFormInput> = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...formMethods}>
      <form id="monitorForm" onSubmit={formMethods.handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">Monitor</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This is the basic information we need to start monitoring. For more settings, keep scrolling.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3 md:col-span-2">
              <div className="sm:col-span-3">
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Name
                </label>
                <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    id="name"
                    {...formMethods.register('name')}
                    required
                    minLength={3}
                    autoComplete="name"
                    disabled={monitorForm.isSubmitting}
                    className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Twitter Website"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="url" className="block text-sm font-medium leading-6 text-gray-900">
                  Website
                </label>
                <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    id="url"
                    type="url"
                    {...formMethods.register('url')}
                    required
                    autoComplete="url"
                    disabled={monitorForm.isSubmitting}
                    className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="https://www.example.com"
                  />
                </div>
              </div>
              {global.currentUser && (
                <div className="sm:col-span-3">
                  <label htmlFor="interval" className="block text-sm font-medium leading-6 text-gray-900">
                    Frequency
                  </label>
                  <select
                    id="interval"
                    {...formMethods.register('interval')}
                    required
                    defaultValue={getMonitorIntervalDefault(global.currentUser)}
                    onChange={intervalChanged}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    {getMonitorIntervalSelectionOptions(global.currentUser).map((option) => (
                      <option key={option.value} value={option.value} disabled={option.disabled}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="relative isolate mt-2 gap-x-6 overflow-hidden rounded-md bg-gray-50 px-6 py-2.5 sm:col-span-3 sm:px-3.5 sm:before:flex-1">
                    <div
                      className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
                      aria-hidden="true"
                    >
                      <div
                        className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
                        style={{
                          clipPath:
                            'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
                        }}
                      />
                    </div>
                    <div
                      className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
                      aria-hidden="true"
                    >
                      <div
                        className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
                        style={{
                          clipPath:
                            'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
                        }}
                      />
                    </div>
                    <Link href={`/${orgSlug!}/settings/billing`}>
                      <p className="text-center font-semibold">Unlock faster monitoring</p>
                      <p className="text-center font-semibold">Try it in our 14-day free trial</p>
                    </Link>
                  </div>
                </div>
              )}
              <div className="sm:col-span-3">
                <p className="mb-1 text-sm font-medium">Where should we check from?</p>
                {regions.length === 0 ? <Skeleton /> : null}
                <section className="flex flex-wrap gap-x-4">
                  {regions.map((region) => (
                    <div key={region.Key} className="flex h-6 min-w-0 items-center gap-2">
                      <input
                        id={region.Key}
                        checked={region.Default}
                        value={region.Key}
                        {...formMethods.register('regions')}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label htmlFor={region.Key} className="text-sm font-normal text-gray-900">
                        {region.Name}
                      </label>
                    </div>
                  ))}
                </section>
              </div>
            </div>
          </div>

          <Accordion text={'HTTP Request Settings'}>
            <RequestSettings interval={interval} />
          </Accordion>

          <Accordion text={'Assertions'}>
            <p className="text-sm leading-6 text-gray-600">
              Use assertions to validate the status code, body, headers and response time of your API request. When one
              (or more) assertions fails, an alert is triggered.
            </p>

            <AssertionKV name="Assertions" />
          </Accordion>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Well always let you know about important changes, but you pick what else you want to hear about.
              </p>
            </div>

            <div className="max-w-2xl space-y-10 md:col-span-2">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label htmlFor="comments" className="font-medium text-gray-900">
                        Comments
                      </label>
                      <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label htmlFor="candidates" className="font-medium text-gray-900">
                        Candidates
                      </label>
                      <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label htmlFor="offers" className="font-medium text-gray-900">
                        Offers
                      </label>
                      <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  These are delivered via SMS to your mobile phone.
                </p>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-everything"
                      name="push-notifications"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                      Everything
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-email"
                      name="push-notifications"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                      Same as email
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-nothing"
                      name="push-notifications"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                      No push notifications
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default MonitorFormComponent;
