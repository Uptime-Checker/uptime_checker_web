import { RadioGroup } from '@headlessui/react';
import { CheckIcon, KeyIcon } from '@heroicons/react/24/outline';
import { useAtom } from 'jotai';
import DashboardLayout from 'layout/dashboard-layout';
import SettingsLayout from 'layout/settings-layout';
import { classNames } from 'lib/tailwind/utils';
import { ReactElement, useState } from 'react';
import { globalAtom } from 'store/global';
import { NextPageWithLayout } from '../../_app';

const frequencies = [
  { value: 'monthly', label: 'Monthly', priceSuffix: '/month' },
  { value: 'annually', label: 'Annually', priceSuffix: '/year' },
];

const Billing: NextPageWithLayout = () => {
  const [global] = useAtom(globalAtom);
  const [frequency, setFrequency] = useState(frequencies[0]);

  return (
    <div className="mx-auto mt-5 max-w-7xl bg-white pb-10 sm:mt-10">
      <div className="relative sm:flex sm:flex-col">
        <div className="absolute text-center sm:right-0 lg:mt-2">
          <a href="" className="flex items-center gap-1 text-sm text-indigo-600">
            <KeyIcon className="h-5 w-5" />
            <p>Customer Portal</p>
          </a>
        </div>
        <h2 className="pt-8 text-3xl font-bold tracking-tight text-gray-900 sm:pt-0 sm:text-2xl sm:leading-none lg:text-center lg:text-3xl">
          Upgrade your subscription
        </h2>
        <p className="mt-3 text-gray-500 lg:text-center">All plans come with a 30-day money-back guarantee</p>

        {/* Toggle */}
        <div className="relative mt-6 flex justify-center sm:mt-8">
          <RadioGroup
            value={frequency}
            onChange={setFrequency}
            className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200"
          >
            <RadioGroup.Label className="sr-only">Payment frequency</RadioGroup.Label>
            {frequencies.map((option) => (
              <RadioGroup.Option
                key={option.value}
                value={option}
                className={({ checked }) =>
                  classNames(
                    checked ? 'bg-indigo-600 text-white' : 'text-gray-500',
                    'cursor-pointer rounded-full px-2.5 py-1'
                  )
                }
              >
                <span>{option.label}</span>
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        </div>
      </div>

      {/* Tiers */}
      <div className="mt-12 space-y-8 sm:mt-16 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
        {global.products.map((product) => (
          <div
            key={product.Name}
            className="relative flex flex-col divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white shadow-sm"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">{product.Name}</h3>
              {product.Popular ? (
                <p className="absolute top-0 -translate-y-1/2 transform rounded-full bg-indigo-500 px-4 py-1.5 text-sm font-semibold text-white">
                  Most popular
                </p>
              ) : null}
              <p className="mt-4 flex items-baseline text-gray-900">
                <span className="text-4xl font-bold tracking-tight">${tier.price}</span>
                <span className="ml-1 text-xl font-semibold">{tier.frequency}</span>
              </p>
              <p className="mt-6 text-gray-500">{product.Description}</p>

              <a
                href="#"
                className={classNames(
                  product.Popular
                    ? 'bg-indigo-500 text-white hover:bg-indigo-600'
                    : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100',
                  'mt-8 block w-full rounded-md border border-transparent px-6 py-3 text-center font-medium'
                )}
              >
                Upgrade
              </a>
            </div>

            {/* Feature list */}
            <div className="px-6 pb-8 pt-6">
              <h3 className="text-sm font-medium text-gray-900">What&apos;s included</h3>
              <ul role="list" className="mt-6 space-y-4">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex space-x-3">
                    <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                    <span className="text-sm text-gray-500">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Billing.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      <SettingsLayout>{page}</SettingsLayout>
    </DashboardLayout>
  );
};

export default Billing;
