import { Menu, Transition } from '@headlessui/react';
import HeadwayWidget, { HeadwayWidgetTrigger } from '@headwayapp/react-widget';
import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline';
import { useAtom } from 'jotai';
import { Fragment, ReactNode } from 'react';
import { globalAtom } from 'store/global';
import { classNames } from 'utils/misc';

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];

type Props = {
  className?: string;
  children?: ReactNode;
};

export type Ref = HTMLSpanElement;

const TopBar = ({ className }: Props) => {
  const [, setGlobal] = useAtom(globalAtom);

  const toggleSidebar = () =>
    setGlobal((draft) => {
      draft.sidebar = !draft.sidebar;
    });

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
          <section className="ml-4 flex items-center md:ml-6">
            <HeadwayWidget account={process.env.NEXT_PUBLIC_HEADWAY_WEBSITE_ID!}>
              <HeadwayWidgetTrigger>
                <button type="button" className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </HeadwayWidgetTrigger>
            </HeadwayWidget>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <Menu.Button className="flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {userNavigation.map((item) => (
                    <Menu.Item key={item.name}>
                      {({ active }) => (
                        <a
                          href={item.href}
                          className={classNames(active ? 'bg-gray-100' : '', 'block py-2 px-4 text-sm text-gray-700')}
                        >
                          {item.name}
                        </a>
                      )}
                    </Menu.Item>
                  ))}
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
