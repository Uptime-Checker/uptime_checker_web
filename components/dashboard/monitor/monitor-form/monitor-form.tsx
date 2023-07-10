import UpgradeBanner from 'components/dashboard/monitor/monitor-form/upgrade-banner';
import { AllGoodStatusCode } from 'constants/api';
import { RegionSelectionRequired } from 'constants/errors';
import { useAtom } from 'jotai';
import { elixirClient } from 'lib/axios';
import { AssertionComparison, AssertionRequestBody, AssertionSource } from 'models/assertion';
import { MonitorMethod, MonitorRequestBody, Region, RegionResponse } from 'models/monitor';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import {
  dryRunRequest,
  getAssertions,
  getMonitorIntervalDefault,
  getMonitorIntervalSelectionOptions,
  getMonitorMethodString,
  getNameValuePair,
  getNameValuePairFromURLQuery,
} from 'services/monitor';
import { globalAtom, monitorFormAtom } from 'store/global';
import { produce } from 'immer';
import LoadingIcon from 'components/icon/loading';

export enum AlertSettingsType {
  local = 'local',
  global = 'global',
}

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
  alertSettings: string;
}

type Props = {
  isEditing: boolean;
};

const MonitorFormComponent = ({ isEditing }: Props) => {
  const [global] = useAtom(globalAtom);
  const [dryRun, setDryRun] = useState(false);
  const [interval, setInterval] = useState(300); // default 5 minutes interval
  const [regions, setRegions] = useState<Region[]>([]);
  const [regionSelectionError, setRegionSelectionError] = useState<string | null>(null);
  const [alertSettings, setAlertSettings] = useState<AlertSettingsType>(AlertSettingsType.global);
  const [monitorForm, setMonitorForm] = useAtom(monitorFormAtom);
  const [loading, setLoading] = useState({ on: false, dry: false, save: false });

  const bottomRef = useRef<HTMLDivElement>(null);

  const processLoading = (on: boolean, dry: boolean, save: boolean) => {
    setLoading(
      produce((draft) => {
        draft.on = on;
        draft.dry = dry;
        draft.save = save;
      })
    );
  };

  const getDefaultValues = (): MonitorFormInput | undefined => {
    if (!monitorForm) return undefined;
    return {
      name: monitorForm.Name,
      url: monitorForm.URL,
      interval: monitorForm.Interval,
      timeout: monitorForm.Timeout,
      ssl: monitorForm.CheckSSL,
      redirect: monitorForm.FollowRedirect,
      method: monitorForm.Method,
      regions: monitorForm.Regions.map((region) => region.Key),
      headers: getNameValuePair(monitorForm.Headers),
      query: getNameValuePairFromURLQuery(monitorForm.URL),
      username: monitorForm.Username,
      password: monitorForm.Password,
      assertions: getAssertions(monitorForm.Assertions),
      alertSettings: monitorForm.GlobalAlarmSettings ? AlertSettingsType.global : AlertSettingsType.local,
    };
  };

  const formMethods = useForm<MonitorFormInput>({ defaultValues: getDefaultValues() });

  useEffect(() => {
    elixirClient
      .get<RegionResponse>('regions')
      .then((res) => {
        setRegions(
          res.data.data
            .sort((a, b) => a.ID - b.ID)
            .map((region) => {
              region.Checked = region.Default;
              return region;
            })
        );
      })
      .catch(console.error);
  }, []);

  const intervalChanged = (event: ChangeEvent<HTMLSelectElement>) => {
    setInterval(parseInt(event.target.value));
  };

  const regionSelectionChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedRegions = regions.map((region) => {
      if (region.Key === event.target.value) {
        region.Checked = event.target.checked;
      }
      return region;
    });
    setRegions(updatedRegions);
    const checkedRegions = updatedRegions.filter((region) => region.Checked);
    checkedRegions.length > 0 ? setRegionSelectionError(null) : setRegionSelectionError(RegionSelectionRequired);
  };

  const onSubmit: SubmitHandler<MonitorFormInput> = (data) => {
    if (data.regions.length === 0) {
      setRegionSelectionError(RegionSelectionRequired);
      return;
    }

    const statusCodeAssertion: AssertionRequestBody = {
      // hard-coded
      source: AssertionSource.StatusCode,
      comparison: AssertionComparison.Equal,
      value: AllGoodStatusCode,
    };

    const interval = parseInt(String(data.interval));
    let timeout = parseInt(String(data.timeout)) || interval / 2;
    if (timeout > 30) {
      timeout = 30; // max timeout
    }
    const monitorRequestBody: MonitorRequestBody = {
      name: data.name,
      url: data.url,
      method: getMonitorMethodString(MonitorMethod.Get), // hard-coded
      interval: interval,
      timeout: timeout,
      checkSSL: false, // hard-coded
      followRedirect: false, // hard-coded
      globalAlarmSettings: true, // hard-coded
      assertions: [statusCodeAssertion],
    };

    processLoading(true, dryRun, !dryRun);

    // handle dry run or submit
    if (dryRun) {
      dryRunRequest(monitorRequestBody)
        .then((res) => {
          processLoading(false, false, false);
        })
        .catch((err) => {
          processLoading(false, false, false);
        });
    }
  };

  return (
    <>
      <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white bg-opacity-75 px-4 py-6 backdrop-blur backdrop-filter sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          {isEditing ? `Update [${monitorForm!.Name}]` : 'Add a new Monitor'}
        </h1>
        <div className="flex gap-2">
          <button
            type="submit"
            form="monitorForm"
            onClick={() => setDryRun(true)}
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:w-auto"
          >
            {loading.dry ? <LoadingIcon className="-ml-1 mr-3 h-5 w-5 animate-spin text-indigo-700" /> : null}
            Test Run
          </button>
          <button
            type="submit"
            form="monitorForm"
            onClick={() => setDryRun(false)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            {loading.save ? <LoadingIcon className="-ml-1 mr-3 h-5 w-5 animate-spin text-white" /> : null}
            Save
          </button>
        </div>
      </div>
      <div className="mt-6 px-4 sm:px-6 md:px-8">
        <FormProvider {...formMethods}>
          <form id="monitorForm" onSubmit={formMethods.handleSubmit(onSubmit)}>
            <div className="space-y-6 pb-12">
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
                <div>
                  <h2 className="text-base font-semibold leading-7 text-gray-900">Monitor</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    This is the basic information we need to start monitoring. We will use sane defaults for other
                    settings. You can configure them by opening the tabs below.
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
                        disabled={loading.on}
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
                        disabled={loading.on}
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
                      <UpgradeBanner />
                    </div>
                  )}
                  <div className="sm:col-span-3">
                    <p className="mb-1 text-sm font-medium">Where should we check from?</p>
                    {regions.length === 0 ? <Skeleton /> : null}
                    <fieldset className="flex flex-wrap gap-x-4">
                      {regions.map((region) => (
                        <div key={region.Key} className="flex h-6 min-w-0 items-center gap-2">
                          <input
                            id={region.Key}
                            defaultChecked={region.Default && !monitorForm}
                            value={region.Key}
                            {...formMethods.register('regions')}
                            onChange={regionSelectionChanged}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label htmlFor={region.Key} className="text-sm font-normal text-gray-900">
                            {region.Name}
                          </label>
                        </div>
                      ))}
                    </fieldset>
                    {regionSelectionError && <p className="mt-2 text-sm text-red-600">{regionSelectionError}</p>}
                  </div>
                </div>
              </div>

              {/* <Accordion text={'HTTP Request Settings'} defaultOpen={false}>
            <RequestSettings interval={interval} />
          </Accordion>

          <Accordion text={'Assertions'} defaultOpen={false}>
            <p className="text-sm leading-6 text-gray-600">
              Use assertions to validate the status code, body, headers and response time of your API request. When one
              (or more) assertions fails, an alert is triggered.
            </p>

            <AssertionKV name="assertions" />
          </Accordion>

          <Accordion text={'Alert Settings'} defaultOpen={true}>
            <p className="text-sm leading-6 text-gray-600">
              The alert settings determine when and how often we will alert you on your alert channels. You can choose
              to use the global account level settings or override them with check specific settings.
            </p>
            <fieldset className="mt-6 space-y-3">
              <div className="flex items-center gap-x-3">
                <input
                  id={AlertSettingsType.global}
                  {...formMethods.register('alertSettings')}
                  value={AlertSettingsType.global}
                  defaultChecked={!monitorForm.monitor}
                  onChange={() => setAlertSettings(AlertSettingsType.global)}
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor={AlertSettingsType.global} className="block text-sm leading-6 text-gray-900">
                  Use the{' '}
                  <Link className="text-indigo-600 hover:underline" href={`/${orgSlug!}/alerts/settings`}>
                    global alert settings
                  </Link>
                  .
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  id={AlertSettingsType.local}
                  {...formMethods.register('alertSettings')}
                  onChange={() => {
                    setAlertSettings(AlertSettingsType.local);
                    setTimeout(() => {
                      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
                    }, 300);
                  }}
                  type="radio"
                  value={AlertSettingsType.local}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor={AlertSettingsType.local} className="block text-sm leading-6 text-gray-900">
                  Use specific alert settings only for this monitor.
                </label>
              </div>
            </fieldset>
            {alertSettings === AlertSettingsType.local ? <AlertSettingsComponent resource="check" /> : null}
          </Accordion> */}
              {alertSettings === AlertSettingsType.local ? <div ref={bottomRef}></div> : null}
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default MonitorFormComponent;
