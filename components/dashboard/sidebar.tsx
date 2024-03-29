import { Dialog, Popover, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon, CogIcon, HomeIcon, UserGroupIcon, XMarkIcon } from '@heroicons/react/24/outline';
import FullLogo from 'components/logo/full-logo';
import { useAtom } from 'jotai';
import { classNames } from 'lib/tailwind/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useRef } from 'react';
import { globalAtom } from 'store/global';
import { HeroIcon } from 'types/main';

interface NavigationItem {
  name: string;
  href: string;
  icon: HeroIcon;
}

const navigation: NavigationItem[] = [
  { name: 'Monitors', href: 'monitors', icon: HomeIcon },
  // { name: 'Checks', href: 'checks', icon: CheckBadgeIcon },
  // { name: 'Alerts', href: 'alerts', icon: ShieldExclamationIcon },
  // { name: 'Integrations', href: 'integrations', icon: SquaresPlusIcon },
  // { name: 'Team', href: 'team', icon: UsersIcon },
  { name: 'Settings', href: 'settings/account', icon: CogIcon },
];

const SideBar = () => {
  const router = useRouter();
  const [global, setGlobal] = useAtom(globalAtom);
  const orgSlug = global.currentUser?.Organization.Slug;
  const orgName = global.currentUser?.Organization.Name;

  // For initial focus https://headlessui.com/react/dialog#managing-initial-focus
  const completeButtonRef = useRef(null);

  const toggleSidebar = () =>
    setGlobal((draft) => {
      draft.sidebar = !draft.sidebar;
    });

  const isNavActive = (navItem: NavigationItem) => {
    const splitNavHref = navItem.href.split('/');
    const splitRouterHref = router.pathname.split('/');
    return splitRouterHref[2] === splitNavHref[0];
  };

  const logo = (
    <Link href={`/${orgSlug!}/monitors`} className="flex flex-shrink-0 items-center px-4">
      <FullLogo className="h-8 w-auto" />
    </Link>
  );

  const firstNav = (
    <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={`/${orgSlug!}/${item.href}`}
          onClick={toggleSidebar}
          className={classNames(
            isNavActive(item) ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
            'group flex items-center rounded-md p-2 text-sm font-medium'
          )}
        >
          <item.icon
            className={classNames(
              isNavActive(item) ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
              'mr-3 h-6 w-6 flex-shrink-0'
            )}
            aria-hidden="true"
          />
          {item.name}
        </Link>
      ))}
    </nav>
  );

  const orgSelector = (
    <div className="flex flex-shrink-0 border-t border-gray-200">
      <Popover className="block w-full flex-shrink-0">
        <Popover.Button className="block w-full flex-shrink-0 p-4 focus:outline-none">
          <div className="flex items-center">
            <div className="flex flex-grow items-center">
              <UserGroupIcon className="inline-block h-9 w-9 rounded-full text-gray-700 group-hover:text-gray-900" />
              <div className="ml-3 text-left font-medium">
                <p className="text-xs text-gray-500 group-hover:text-gray-700">Organization</p>
                <p className="text-sm text-gray-700 group-hover:text-gray-900">{orgName}</p>
              </div>
            </div>
            <ChevronUpDownIcon className="h-6 w-6 text-gray-700 group-hover:text-gray-900" />
          </div>
        </Popover.Button>

        <Transition
          as={Fragment}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Popover.Panel className="absolute bottom-20 z-10 mt-3 w-full px-4">
            {({ close }) => (
              <div className="overflow-hidden rounded-lg shadow-xl ring-1 ring-black ring-opacity-5">
                <div className="flex flex-col bg-white px-1 py-2">
                  {global.organizations.map((org) => (
                    <button
                      onClick={() => {
                        close();
                      }}
                      key={org.Organization.ID}
                      className="flex items-center justify-between rounded-lg p-2 transition duration-150 ease-in-out
                  hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <div className="flex items-center">
                        <UserGroupIcon className="ml-1 h-7 w-7 rounded-full text-gray-700 group-hover:text-gray-900" />
                        <p className="ml-2 text-sm font-medium text-gray-900">{org.Organization.Name}</p>
                      </div>

                      <CheckIcon className="mr-1 h-5 w-5 text-gray-600" />
                    </button>
                  ))}

                  {/* <button
                    onClick={() => {
                      close();
                    }}
                    className="border-neutral-40 mt-2 block rounded border-t px-1 py-3 text-center hover:bg-gray-100"
                  >
                    Manage Organizations
                  </button> */}
                </div>
              </div>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );

  return (
    <>
      <Transition.Root show={global.sidebar} as={Fragment}>
        <Dialog as="div" className="relative z-40 md:hidden" onClose={toggleSidebar} initialFocus={completeButtonRef}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute right-0 top-0 mr-2 pt-2">
                    <button
                      ref={completeButtonRef}
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-md bg-gray-100"
                      onClick={toggleSidebar}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="h-0 flex-1 overflow-y-auto pb-4 pt-5">
                  {logo}
                  {firstNav}
                </div>
                {orgSelector}
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0">{/* Force sidebar to shrink to fit close icon */}</div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-48 md:flex-col lg:w-64">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
          <div className="flex flex-1 flex-col overflow-y-auto pb-4 pt-5">
            {logo}
            {firstNav}
          </div>
          {orgSelector}
        </div>
      </div>
    </>
  );
};

export default SideBar;
