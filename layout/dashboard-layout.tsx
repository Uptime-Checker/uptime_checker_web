import SideBar from 'components/dashboard/sidebar';
import TopBar from 'components/dashboard/topbar';
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

  return (
    <div className="dashboard">
      <SideBar />
      <TopBar className="md:pl-64" />
      <div className="flex flex-1 flex-col md:pl-64">
        <main className="flex-1">
          <div className="py-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
