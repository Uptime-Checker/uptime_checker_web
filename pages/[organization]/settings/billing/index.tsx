import { RadioGroup } from '@headlessui/react';
import { CheckIcon, KeyIcon } from '@heroicons/react/24/outline';
import * as Sentry from '@sentry/nextjs';
import axios from 'axios';
import SimpleAlert from 'components/alert/simple';
import LoadingIcon from 'components/icon/loading';
import { produce } from 'immer';
import { useAtom } from 'jotai';
import DashboardLayout from 'layout/dashboard-layout';
import SettingsLayout from 'layout/settings-layout';
import { HTTPMethod, authRequest } from 'lib/axios';
import { isFreeSubscription, setCurrentUser } from 'lib/global';
import getStripe from 'lib/stripe';
import { classNames } from 'lib/tailwind/utils';
import { PlanType, Product, ProductTier, SubscriptionStatus } from 'models/subscription';
import { UserResponse } from 'models/user';
import { NextPageWithLayout } from 'pages/_app';
import { ReactElement, useState } from 'react';
import { globalAtom } from 'store/global';
import Stripe from 'stripe';
import { DOWNGRADE_REQUEST, WE_UPGRADED_SUBSCRIPTION } from 'constants/ui-text';

const featureMap = [
  {
    tier: ProductTier.free,
    features: ['5 products', 'Up to 1,000 subscribers', 'Basic analytics', '48-hour support response time'],
  },
  {
    tier: ProductTier.developer,
    features: ['15 products', 'Up to 1,500 subscribers', 'Basic analytics', '24-hour support response time'],
  },
  {
    tier: ProductTier.startup,
    features: [
      '25 products',
      'Up to 10,000 subscribers',
      'Advanced analytics',
      '24-hour support response time',
      'Marketing automations',
    ],
  },
  {
    tier: ProductTier.enterprise,
    features: [
      'Unlimited products',
      'Unlimited subscribers',
      'Advanced analytics',
      '1-hour, dedicated support response time',
      'Marketing automations',
      'Custom integrations',
    ],
  },
];

interface Frequency {
  value: PlanType;
  label: string;
  priceSuffix: string;
}

const frequencies: Frequency[] = [
  { value: PlanType.Monthly, label: 'Monthly', priceSuffix: '/month' },
  { value: PlanType.Yearly, label: 'Annually', priceSuffix: '/year' },
];

const Billing: NextPageWithLayout = () => {
  const [global, setGlobal] = useAtom(globalAtom);
  const [frequency, setFrequency] = useState(frequencies[0]);
  const [portalLoading, setPortalLoading] = useState(false);
  const [productIntentId, setProductIntentId] = useState(0);
  const [alertState, setAlertState] = useState({ on: false, success: true, title: '', detail: '' });

  const orgSlug = global.currentUser?.Organization.Slug;

  const getPrice = (product: Product) => {
    const plan = product.Plans.find((plan) => plan.Type === frequency.value);
    if (plan) return plan.Price;
    return 0;
  };

  const getFeatures = (product: Product) => {
    return featureMap.find((feature) => feature.tier === product.Tier);
  };

  const getBuyButtonTitle = (product: Product) => {
    const plan = product.Plans.find((plan) => plan.Type === frequency.value);
    const currentPlan = global.currentUser?.Subscription.Plan;
    if (!currentPlan) return 'Subscribe';
    if (plan) {
      if (currentPlan.ID === plan.ID) {
        return 'Current';
      } else if (plan.Price < global.currentUser!.Subscription.Plan.Price) {
        return 'Downgrade';
      }
    } else {
      return 'Downgrade';
    }
    return 'Upgrade';
  };

  const handlePortalClick = async () => {
    setPortalLoading(true);
    const paymentCustomerID = global.currentUser?.PaymentCustomerID;
    if (!paymentCustomerID) {
      setPortalLoading(false);
      return;
    }
    try {
      const { data } = await axios.post<Stripe.BillingPortal.Session>('/api/billing/customer_portal', {
        customerId: paymentCustomerID,
        relativePath: `${orgSlug!}/settings/billing`,
      });
      window.location.replace(data.url);
    } catch (e) {
      setPortalLoading(false);
    }
  };

  const handleBuyClick = async (product: Product) => {
    const plan = product.Plans.find((plan) => plan.Type === frequency.value);
    if (!plan) {
      // free -yearly
      setAlertState({
        on: true,
        success: false,
        title: 'Downgrade Requested',
        detail: DOWNGRADE_REQUEST,
      });
      return;
    }

    const currentSubscription = global.currentUser!.Subscription;
    const currentPlan = currentSubscription.Plan;
    if (currentPlan && currentPlan.ID == plan.ID) return;

    setProductIntentId(product.ID);
    let paymentCustomerID = global.currentUser?.PaymentCustomerID;
    try {
      if (!paymentCustomerID) {
        const { data } = await authRequest<UserResponse>({
          method: HTTPMethod.GET,
          url: '/product/billing/customer',
        });
        paymentCustomerID = data.data.PaymentCustomerID;
      }
      if (currentSubscription.ExternalID && currentSubscription.Status === SubscriptionStatus.Active) {
        // Upgrade
        if (plan.Price > currentPlan.Price) {
          await axios.post<Stripe.Subscription>('/api/billing/upgrade', {
            subscriptionId: currentSubscription.ExternalID,
            priceId: plan.ExternalID,
          });
          const userResp = await authRequest<UserResponse>({
            method: HTTPMethod.GET,
            url: '/user/me',
            headers: { 'Cache-Control': 'no-store' },
          });
          const user = userResp.data.data;
          setCurrentUser(user).catch((e) => Sentry.captureException(e));
          setGlobal((draft) => {
            draft.currentUser = user;
          });
          setProductIntentId(0);
          setAlertState({
            on: true,
            success: true,
            title: 'Upgrade Successful',
            detail: WE_UPGRADED_SUBSCRIPTION,
          });
        } else {
          setProductIntentId(0);
          setAlertState({
            on: true,
            success: false,
            title: 'Downgrade Requested',
            detail: DOWNGRADE_REQUEST,
          });
        }
      } else {
        const { data } = await axios.post<Stripe.Checkout.Session>('/api/billing/checkout_sessions', {
          customerId: paymentCustomerID,
          priceId: plan.ExternalID,
          relativePath: `${orgSlug!}/settings/billing/result`,
        });
        // Redirect to check out.
        const stripe = await getStripe();
        const { error } = await stripe!.redirectToCheckout({
          // Make the id field from the Checkout Session creation API response
          // available to this file, so you can provide it as parameter here
          // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
          sessionId: data.id,
        });
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `error.message`.
        console.warn(error.message);
      }
    } catch (e) {
      setProductIntentId(0);
    }
  };

  const closeAlert = () => {
    setAlertState(
      produce((draft) => {
        draft.on = false;
      })
    );
  };

  return (
    <div className="mx-auto mt-5 max-w-7xl bg-white pb-10 sm:mt-10">
      <SimpleAlert
        on={alertState.on}
        success={alertState.success}
        title={alertState.title}
        detail={alertState.detail}
        onClose={closeAlert}
      />
      <div className="relative sm:flex sm:flex-col">
        <div className="absolute text-center lg:right-0">
          <button
            disabled={portalLoading}
            onClick={() => handlePortalClick()}
            className={classNames(
              isFreeSubscription(global.currentUser) ? 'hidden' : '',
              'flex rounded-md pb-2 pr-2 text-sm font-medium text-indigo-700 lg:px-4 lg:py-2'
            )}
          >
            {portalLoading ? <LoadingIcon className="mr-2 h-5 w-5 animate-spin text-indigo-700" /> : null}
            <KeyIcon className="mr-2 h-5 w-5" />
            <p>Customer Portal</p>
          </button>
        </div>
        <h2 className="pt-8 text-3xl font-bold tracking-tight text-gray-900 lg:pt-0 lg:text-2xl lg:leading-none xl:text-center xl:text-3xl">
          Upgrade your subscription
        </h2>
        <p className="mt-3 text-gray-500 xl:text-center">All plans come with a 30-day money-back guarantee</p>

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
            <div className="mt-5 p-6">
              <h3 className="text-xl font-semibold text-gray-900">{product.Name}</h3>
              {product.Popular ? (
                <p className="absolute top-0 -translate-y-1/2 transform rounded-full bg-indigo-500 px-4 py-1.5 text-sm font-semibold text-white">
                  Most popular
                </p>
              ) : null}
              <p className="mt-6 flex items-baseline text-gray-900">
                <span className="text-4xl font-bold tracking-tight">${getPrice(product)}</span>
                <span className="ml-1 text-xl font-semibold">{frequency.priceSuffix}</span>
              </p>

              <button
                disabled={productIntentId !== 0}
                onClick={() => handleBuyClick(product)}
                className={classNames(
                  product.Popular
                    ? 'bg-indigo-500 text-white hover:bg-indigo-600'
                    : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100',
                  'mt-8 flex w-full items-center justify-center rounded-md border border-transparent px-6 py-3 text-center font-medium'
                )}
              >
                {product.ID === productIntentId ? (
                  <LoadingIcon
                    className={classNames(
                      product.Popular ? 'text-white' : 'text-indigo-700',
                      'mr-2 h-6 w-6 animate-spin'
                    )}
                  />
                ) : (
                  <p>{getBuyButtonTitle(product)}</p>
                )}
              </button>
            </div>

            {/* Feature list */}
            <div className="px-6 pb-8 pt-6">
              <h3 className="text-sm font-medium text-gray-900">What&apos;s included</h3>
              <ul role="list" className="mt-6 space-y-4">
                {getFeatures(product)?.features.map((feature) => (
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
