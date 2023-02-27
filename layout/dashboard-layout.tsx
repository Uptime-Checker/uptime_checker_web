import * as Sentry from '@sentry/nextjs';
import SideBar from 'components/dashboard/sidebar';
import TopBar from 'components/dashboard/topbar';
import { FREE_PLAN_ID } from 'constants/payment';
import { useAtom } from 'jotai';
import { authRequest, HTTPMethod } from 'lib/axios';
import * as LiveChat from 'lib/crisp';
import { logout, redirectToDashboard, setCurrentUser } from 'lib/global';
import { FullInfoResponse } from 'models/user';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { globalAtom } from 'store/global';

type Props = {
  children: ReactNode;
};

let gotUserInfo = false;

export default function DashboardLayout({ children }: Props) {
  const router = useRouter();
  const [, setGlobal] = useAtom(globalAtom);

  useEffect(() => {
    if (!router.isReady || gotUserInfo) return;

    authRequest<FullInfoResponse>({ method: HTTPMethod.GET, url: '/full_user_info' })
      .then((fullInfoResp) => {
        let fullInfo = fullInfoResp.data.data;
        setCurrentUser(fullInfo.user).then(() => {});
        setGlobal((draft) => {
          draft.currentUser = fullInfo.user;
          draft.organizations = fullInfo.organization_users;
        });

        if (fullInfo.user.organization === null) {
          redirectToDashboard(fullInfo.user);
        } else if (fullInfo.user.organization.slug !== router.query.organization) {
          logout().then((_) => {});
        } else {
          // Do everything that was deferred
          if (fullInfo.subscription.plan.id !== FREE_PLAN_ID) {
            LiveChat.load();
            LiveChat.configureUser(fullInfo.user, fullInfo.subscription);
          }
        }
      })
      .catch((error) => {
        Sentry.captureException(error);
      })
      .finally(() => {
        gotUserInfo = true;
      });
  }, [router, setGlobal]);

  return (
    <>
      <SideBar />
      <TopBar className="md:pl-48 lg:pl-64" />
      <div className="flex flex-col md:pl-48 lg:pl-64">
        <main className="flex-1">{children}</main>
      </div>
    </>
  );
}
