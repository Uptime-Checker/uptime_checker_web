import * as Sentry from '@sentry/nextjs';
import SideBar from 'components/dashboard/sidebar';
import TopBar from 'components/dashboard/topbar';
import { FREE_PLAN_ID } from 'constants/payment';
import { useAtom } from 'jotai';
import { authRequest, elixirClient, HTTPMethod } from 'lib/axios';
import * as LiveChat from 'lib/crisp';
import { getCurrentUser, logout, redirectToDashboard, setCurrentUser } from 'lib/global';
import { ProductResponse } from 'models/subscription';
import { OrganizationUserResponse, User, UserResponse } from 'models/user';
import { useRouter } from 'next/router';
import { ReactNode, useCallback, useEffect } from 'react';
import { globalAtom } from 'store/global';
import { booleanify } from 'utils/misc';

type Props = {
  children: ReactNode;
};

let gotUserInfo = false;

export default function DashboardLayout({ children }: Props) {
  const router = useRouter();
  const [, setGlobal] = useAtom(globalAtom);

  const runDeferred = useCallback(
    async (user: User) => {
      // Do everything that was deferred
      try {
        const getOrganizationUserResponse = authRequest<OrganizationUserResponse>({
          method: HTTPMethod.GET,
          url: '/organization/list',
        });
        const getProductResponse = elixirClient.get<ProductResponse>('product/list/internal');

        const organizationUserResponse = await getOrganizationUserResponse;
        setGlobal((draft) => {
          draft.organizations = organizationUserResponse.data.data;
        });

        const productResponse = await getProductResponse;
        setGlobal((draft) => {
          draft.products = productResponse.data.data.sort((a, b) => a.Tier - b.Tier);
        });

        if (user.Subscription.Plan.ID !== FREE_PLAN_ID && booleanify(process.env.NEXT_PUBLIC_SHOW_CRISP!)) {
          LiveChat.load();
          LiveChat.configureUser(user, user.Subscription);
        }
      } catch (e) {
        Sentry.captureException(e);
      }
    },
    [setGlobal]
  );

  useEffect(() => {
    if (!router.isReady || gotUserInfo) return;

    const currentUser = getCurrentUser();
    if (currentUser && currentUser.Organization) {
      setGlobal((draft) => {
        draft.currentUser = currentUser;
      });
    }

    authRequest<UserResponse>({ method: HTTPMethod.GET, url: '/user/me' })
      .then((fullInfoResp) => {
        const user = fullInfoResp.data.data;
        setCurrentUser(user).catch((e) => Sentry.captureException(e));
        setGlobal((draft) => {
          draft.currentUser = user;
        });

        if (!user.Organization) {
          redirectToDashboard(user);
        } else if (user.Organization.Slug !== router.query.organization) {
          logout().catch(console.error);
        } else {
          runDeferred(user).catch(console.error);
        }
      })
      .catch((error) => {
        Sentry.captureException(error);
      })
      .finally(() => {
        gotUserInfo = true;
      });
  }, [router.isReady, router.query.organization, runDeferred, setGlobal]);

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
