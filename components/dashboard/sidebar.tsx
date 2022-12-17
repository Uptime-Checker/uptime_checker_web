import { Dialog, Popover, Transition } from '@headlessui/react';
import {
  CalendarIcon,
  ChartBarIcon,
  ChevronUpDownIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UserGroupIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import FullLogo from 'components/logo/full-logo';
import { useAtom } from 'jotai';
import { getCurrentUser } from 'lib/global';
import { Fragment, useEffect, useState } from 'react';
import { globalAtom } from 'store/global';
import { classNames } from 'utils/misc';

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Team', href: '#', icon: UsersIcon, current: false },
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  { name: 'Documents', href: '#', icon: InboxIcon, current: false },
  { name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
];

const solutions = [
  {
    name: 'Insights',
    description: 'Measure actions your users take',
    href: '#',
  },
  {
    name: 'Automations',
    description: 'Create your own targeted content',
    href: '#',
  },
  {
    name: 'Reports',
    description: 'Keep track of your growth',
    href: '#',
  },
];

const SideBar = () => {
  const [global, setGlobal] = useAtom(globalAtom);

  useEffect(() => {
    let user = getCurrentUser();
    if (user !== null && user.organization !== null) {
      setOrgName(user.organization.name);
    } else if (global.currentUser !== null) {
      setOrgName(global.currentUser.organization.name);
    }
  }, [global]);

  const toggleSidebar = () =>
    setGlobal((draft) => {
      draft.sidebar = !draft.sidebar;
    });

  const [orgName, setOrgName] = useState('');

  const logo = (
    <div className="flex flex-shrink-0 items-center px-4">
      <FullLogo className="h-8 w-auto" />
    </div>
  );

  const firstNav = (
    <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
      {navigation.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className={classNames(
            item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
            'group flex items-center rounded-md px-2 py-2 text-sm font-medium'
          )}
        >
          <item.icon
            className={classNames(
              item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
              'mr-3 h-6 w-6 flex-shrink-0'
            )}
            aria-hidden="true"
          />
          {item.name}
        </a>
      ))}
    </nav>
  );

  const orgSelector = (
    <div className="flex flex-shrink-0 border-t border-gray-200">
      <Popover className="block w-full flex-shrink-0">
        <Popover.Button className="block w-full flex-shrink-0 p-4 focus:outline-none">
          <div className="flex items-center">
            <div className="flex flex-grow">
              <UserGroupIcon className="inline-block h-9 w-9 rounded-full text-gray-700 group-hover:text-gray-900" />
              <div className="ml-3 text-left font-medium">
                <p className="text-xs text-gray-500 group-hover:text-gray-700">Organization</p>
                <p className="text-sm text-gray-700 group-hover:text-gray-900">{orgName}</p>
              </div>
            </div>
            <ChevronUpDownIcon className="h-6 w-6 text-gray-700 group-hover:text-gray-900" />
          </div>
        </Popover.Button>

        <Popover.Panel className="absolute bottom-20 z-10 mt-3 w-full px-4">
          <div className="overflow-hidden rounded-lg shadow-xl ring-1 ring-black ring-opacity-5">
            <div className="flex flex-col bg-white pt-2 pb-2">
              {solutions.map((item) => (
                <Popover.Button className="rounded-lg p-2 text-start transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                  <p className="ml-3 text-sm font-medium text-gray-900">{item.name}</p>
                </Popover.Button>
              ))}
            </div>
          </div>
        </Popover.Panel>
      </Popover>
    </div>
  );

  return (
    <>
      <Transition.Root show={global.sidebar} as={Fragment}>
        <Dialog as="div" className="relative z-40 md:hidden" onClose={toggleSidebar}>
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
                  <div className="absolute top-0 right-0 mr-2 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-md bg-gray-100"
                      onClick={toggleSidebar}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
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
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
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
