import produce from 'immer';
import { useAtom } from 'jotai';
import { classNames } from 'lib/tailwind/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import { globalAtom } from 'store/global';
import { TabNavigationItem } from 'types/main';

export enum Breakpoint {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}

type Props = {
  baseURL: string;
  tabs: TabNavigationItem[];
  children: ReactNode;
  breakpoint: Breakpoint;
  routeIndex: number;
};

const Tabs = ({ baseURL, tabs, children, breakpoint, routeIndex }: Props) => {
  const router = useRouter();
  const [global, _] = useAtom(globalAtom);
  const orgSlug = global.currentUser?.organization.slug;
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [selectedBreakpoint, setSelectedBreakpoint] = useState({ select: 'md:hidden', tab: 'md:block' });

  useEffect(() => {
    if (router.isReady) {
      const getActiveTab = () => {
        for (const tab of tabs) {
          if (isNavActive(tab)) {
            return tab;
          }
        }
        return tabs[0];
      };

      setSelectedTab(getActiveTab());
    }

    if (breakpoint === Breakpoint.LG) {
      setSelectedBreakpoint(
        produce((draft) => {
          draft.select = 'lg:hidden';
          draft.tab = 'lg:block';
        })
      );
    }
  }, [router]);

  const isNavActive = (navItem: TabNavigationItem) => {
    let splitRouterHref = router.pathname.split('/');
    return splitRouterHref[routeIndex] === navItem.href;
  };

  const onTabChange = async (event: ChangeEvent) => {
    let target = event.currentTarget as HTMLInputElement;
    const selectedTab = tabs.find((tab) => tab.name === target.value);
    setSelectedTab(selectedTab!);

    await router.push(`/${orgSlug}/${baseURL}/${selectedTab!.href}`, undefined, { scroll: false });
  };

  return (
    <section className="py-5">
      {/* Tabs */}
      <div className={selectedBreakpoint.select}>
        <label htmlFor="selected-tab" className="sr-only">
          Select a tab
        </label>
        <select
          id="selected-tab"
          name="selected-tab"
          className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          value={selectedTab.name}
          onChange={onTabChange}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className={classNames('hidden', selectedBreakpoint.tab)}>
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                scroll={false}
                href={`/${orgSlug}/${baseURL}/${tab.href}`}
                className={classNames(
                  isNavActive(tab)
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
                )}
              >
                {tab.name}
                {tab.count ? (
                  <span
                    className={classNames(
                      isNavActive(tab) ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-900',
                      'ml-3 hidden rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block'
                    )}
                  >
                    {tab.count}
                  </span>
                ) : null}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {children}
    </section>
  );
};

export default Tabs;
