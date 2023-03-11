import * as Sentry from '@sentry/nextjs';
import SideBar from 'components/dashboard/sidebar';
import TopBar from 'components/dashboard/topbar';
import { FREE_PLAN_ID } from 'constants/payment';
import { useAtom } from 'jotai';
import { authRequest, HTTPMethod } from 'lib/axios';
import * as LiveChat from 'lib/crisp';
import { getCurrentUser, logout, redirectToDashboard, setCurrentUser } from 'lib/global';
import { OrganizationUserResponse, UserResponse } from 'models/user';
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

    const currentUser = getCurrentUser();
    if (getCurrentUser()) {
      setGlobal((draft) => {
        draft.currentUser = currentUser;
      });
    }

    authRequest<UserResponse>({ method: HTTPMethod.GET, url: '/user/me' })
      .then((fullInfoResp) => {
        let user = fullInfoResp.data.data;
        setCurrentUser(user).then(() => {});
        setGlobal((draft) => {
          draft.currentUser = user;
        });

        if (!user.Organization) {
          redirectToDashboard(user);
        } else if (user.Organization.Slug !== router.query.organization) {
          logout().then((_) => {});
        } else {
          // Do everything that was deferred
          authRequest<OrganizationUserResponse>({ method: HTTPMethod.GET, url: '/organization/list' })
            .then((organizationUserResponse) => {
              setGlobal((draft) => {
                draft.organizations = organizationUserResponse.data.data;
              });
            })
            .catch((error) => {
              Sentry.captureException(error);
            });

          if (user.Subscription.Plan.ID !== FREE_PLAN_ID) {
            LiveChat.load();
            LiveChat.configureUser(user, user.Subscription);
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
