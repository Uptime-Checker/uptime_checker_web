import { Bars3Icon } from '@heroicons/react/24/outline';
import SideBar from 'components/dashboard/sidebar';
import { useAtom } from 'jotai';
import { authClientRequest, HTTPMethod } from 'lib/axios';
import { getCurrentUser, logout, redirectToDashboard, setCurrentUser } from 'lib/global';
import { OrganizationUserResponse, UserResponse } from 'models/user';
import { ReactNode, useEffect } from 'react';
import { globalAtom } from 'store/global';

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  useEffect(() => {
    let user = getCurrentUser();
    if (user === null) {
      logout().then((_) => {});
    } else if (user.organization === null) {
      redirectToDashboard(user);
    } else {
      authClientRequest<UserResponse>({ method: HTTPMethod.GET, url: '/me' }).then((userResp) => {
        setCurrentUser(userResp.data.data);
        authClientRequest<OrganizationUserResponse>({ method: HTTPMethod.GET, url: '/organizations' }).then(
          (orgResp) => {
            setGlobal((draft) => {
              draft.currentUser = userResp.data.data;
              draft.organizations = orgResp.data.data;
            });
          }
        );
      });
    }
  }, []);

  const [, setGlobal] = useAtom(globalAtom);
  const toggleSidebar = () =>
    setGlobal((draft) => {
      draft.sidebar = !draft.sidebar;
    });

  return (
    <div className="dashboard">
      <SideBar />
      <div className="flex flex-1 flex-col md:pl-64">
        <div className="sticky top-0 z-10 bg-white pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={toggleSidebar}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <main className="flex-1">
          <div className="py-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
