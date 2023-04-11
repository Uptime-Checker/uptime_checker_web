import { RadioGroup } from '@headlessui/react';
import { CheckIcon, KeyIcon } from '@heroicons/react/24/outline';
import DashboardLayout from 'layout/dashboard-layout';
import SettingsLayout from 'layout/settings-layout';
import { classNames } from 'lib/tailwind/utils';
import { ReactElement, useState } from 'react';
import { NextPageWithLayout } from '../../_app';

const pricing = {
  frequencies: [
    { value: 'monthly', label: 'Monthly', priceSuffix: '/month' },
    { value: 'annually', label: 'Annually', priceSuffix: '/year' },
  ],
  tiers: [
    {
      title: 'Freelancer',
      price: 24,
      frequency: '/month',
      description: 'The essentials to provide your best work for clients.',
      features: ['5 products', 'Up to 1,000 subscribers', 'Basic analytics', '48-hour support response time'],
      cta: 'Monthly billing',
      mostPopular: false,
    },
    {
      title: 'Developer',
      price: 28,
      frequency: '/month',
      description: 'The essentials to provide your best work for clients.',
      features: ['15 products', 'Up to 1,500 subscribers', 'Basic analytics', '24-hour support response time'],
      cta: 'Monthly billing',
      mostPopular: false,
    },
    {
      title: 'Startup',
      price: 32,
      frequency: '/month',
      description: 'A plan that scales with your rapidly growing business.',
      features: [
        '25 products',
        'Up to 10,000 subscribers',
        'Advanced analytics',
        '24-hour support response time',
        'Marketing automations',
      ],
      cta: 'Monthly billing',
      mostPopular: true,
    },
    {
      title: 'Enterprise',
      price: 48,
      frequency: '/month',
      description: 'Dedicated support and infrastructure for enterprise.',
      features: [
        'Unlimited products',
        'Unlimited subscribers',
        'Advanced analytics',
        '1-hour, dedicated support response time',
        'Marketing automations',
        'Custom integrations',
      ],
      cta: 'Monthly billing',
      mostPopular: false,
    },
  ],
};

const Billing: NextPageWithLayout = () => {
  const [frequency, setFrequency] = useState(pricing.frequencies[0]);

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
            {pricing.frequencies.map((option) => (
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
        {pricing.tiers.map((tier) => (
          <div
            key={tier.title}
            className="relative flex flex-col divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white shadow-sm"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">{tier.title}</h3>
              {tier.mostPopular ? (
                <p className="absolute top-0 -translate-y-1/2 transform rounded-full bg-indigo-500 px-4 py-1.5 text-sm font-semibold text-white">
                  Most popular
                </p>
              ) : null}
              <p className="mt-4 flex items-baseline text-gray-900">
                <span className="text-4xl font-bold tracking-tight">${tier.price}</span>
                <span className="ml-1 text-xl font-semibold">{tier.frequency}</span>
              </p>
              <p className="mt-6 text-gray-500">{tier.description}</p>

              <a
                href="#"
                className={classNames(
                  tier.mostPopular
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
