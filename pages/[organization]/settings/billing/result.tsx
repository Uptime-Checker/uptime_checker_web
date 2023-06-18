import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import * as Sentry from '@sentry/nextjs';
import axios from 'axios';
import Spinner from 'components/icon/spinner';
import SuccessIcon from 'components/icon/success';
import { produce } from 'immer';
import { useAtom } from 'jotai';
import DashboardLayout from 'layout/dashboard-layout';
import SettingsLayout from 'layout/settings-layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from 'pages/_app';
import { ReactElement, useEffect, useState } from 'react';
import { globalAtom } from 'store/global';
import Stripe from 'stripe';

const Result: NextPageWithLayout = () => {
  const router = useRouter();

  const [uiState, setUIState] = useState({ loading: true, success: false });
  const [global] = useAtom(globalAtom);
  const orgSlug = global.currentUser?.Organization.Slug;

  useEffect(() => {
    if (!router.isReady) return;
    const { session_id, success } = router.query;

    if (!session_id) {
      router.back();
      return;
    }

    axios
      .get<Stripe.Checkout.Session>(`/api/billing/checkout_sessions/${session_id as string}`)
      .then((data) => {
        const checkoutSuccess = success === 'true' && data.data.payment_status === 'paid';
        setUIState(
          produce((draft) => {
            draft.loading = false;
            draft.success = checkoutSuccess;
          })
        );
      })
      .catch((err) => {
        setUIState(
          produce((draft) => {
            draft.loading = false;
            draft.success = false;
          })
        );
        Sentry.captureException(err);
      });
  }, [router]);

  const getTitle = () => {
    return uiState.success ? 'Payment Successful!' : 'Payment Failed!';
  };

  const getDescription = () => {
    return uiState.success
      ? 'Thank you for completing your secure online payment.'
      : 'We failed to charge you. Please try again. If you need assistance, please contact support.';
  };

  const getBackURL = () => {
    return uiState.success ? `/${orgSlug!}/monitors` : `/${orgSlug!}/settings/billing`;
  };

  return (
    <div className="p-6 md:mx-auto">
      {uiState.loading ? <Spinner className="mx-auto mt-20" size={50} /> : null}
      {uiState.loading ? null : (
        <section>
          {uiState.success ? (
            <SuccessIcon className="mx-auto my-6 h-16 w-16 text-green-600" />
          ) : (
            <ExclamationCircleIcon className="mx-auto my-6 h-16 w-16 text-rose-500" />
          )}
          <div className="text-center">
            <h3 className="text-center text-base font-semibold text-gray-900 md:text-2xl">{getTitle()}</h3>
            <p className="my-2 text-gray-600">{getDescription()}</p>
            {uiState.success ? <p> Have a great day! </p> : null}
            <div className="py-10 text-center">
              <Link
                type="button"
                href={getBackURL()}
                className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                Go Back
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

Result.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      <SettingsLayout>{page}</SettingsLayout>
    </DashboardLayout>
  );
};

export default Result;
