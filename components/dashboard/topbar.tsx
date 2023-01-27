import { Menu, Transition } from '@headlessui/react';
import HeadwayWidget, { HeadwayWidgetTrigger } from '@headwayapp/react-widget';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, ReactNode, useEffect, useState } from 'react';
import { globalAtom } from 'store/global';
import { classNames } from 'utils/misc';

const userNavigation = [
  { name: 'Your Profile', href: '/settings/account' },
  { name: 'Plan & Billing', href: '/settings/billing' },
  { name: 'Support', href: '#' },
];

type Props = {
  className?: string;
  children?: ReactNode;
};

const TopBar = ({ className }: Props) => {
  const router = useRouter();
  const [, setGlobal] = useAtom(globalAtom);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      setShowSearch(router.pathname === '/monitors');
    }
  }, [router]);

  const toggleSidebar = () =>
    setGlobal((draft) => {
      draft.sidebar = !draft.sidebar;
    });

  const searchBar = showSearch ? (
    <div className="flex flex-1 pt-1 md:pt-0">
      <form className="flex w-full md:ml-0" action="#" method="GET">
        <label htmlFor="search-field" className="sr-only">
          Search
        </label>
        <div className="relative w-full text-gray-400 focus-within:text-gray-600">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
            <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
          </div>
          <input
            id="search-field"
            className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
            placeholder="Search"
            type="search"
            name="search"
          />
        </div>
      </form>
    </div>
  ) : null;

  return (
    <div className={className}>
      <div className="mx-auto flex h-16 max-w-7xl flex-shrink-0 bg-white px-4 sm:px-6 md:px-8">
        <div className="sticky top-0 z-10 bg-white pl-1 pt-3 sm:pl-3 md:hidden">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={toggleSidebar}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="flex flex-1 justify-end px-4 md:px-0">
          {searchBar}
          <section className="ml-4 flex items-center md:ml-6">
            <HeadwayWidget account={process.env.NEXT_PUBLIC_HEADWAY_WEBSITE_ID!}>
              <HeadwayWidgetTrigger>
                <button type="button" className="rounded-md bg-gray-100 p-1 text-gray-500">
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </HeadwayWidgetTrigger>
            </HeadwayWidget>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-6">
              <Menu.Button className="flex max-w-xs items-center rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 rounded-md"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-4 py-3">
                    <p className="text-sm">Signed in as</p>
                    <p className="truncate text-sm font-medium text-gray-900">tom@example.com</p>
                  </div>
                  <div className="py-1">
                    {userNavigation.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          <Link
                            href={item.href}
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : '',
                              'block py-2 px-4 text-sm text-gray-700'
                            )}
                          >
                            {item.name}
                          </Link>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block w-full px-4 py-2 text-left text-sm'
                          )}
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
