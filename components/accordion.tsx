import { Disclosure, Transition } from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid';
import { ReactNode } from 'react';

type Props = {
  text: string;
  panelClassName?: string;
  children: ReactNode;
  defaultOpen: boolean;
};

export default function Accordion(props: Props) {
  return (
    <Disclosure defaultOpen={props.defaultOpen}>
      {({ open }) => (
        <>
          <Disclosure.Button as="div">
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex items-center justify-between">
                <span id="http-request-settings" className="bg-white pr-2 text-lg font-medium text-gray-900">
                  {props.text}
                </span>
                <button
                  type="button"
                  className="mr-4 inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none sm:mr-0"
                >
                  {!open ? (
                    <PlusIcon className="-ml-1.5 mr-1 h-5 w-5 text-gray-400" />
                  ) : (
                    <MinusIcon className="-ml-1.5 mr-1 h-5 w-5 text-gray-400" />
                  )}
                  <span>{!open ? 'Open' : 'Close'}</span>
                </button>
              </div>
            </div>
          </Disclosure.Button>
          <Transition
            enter="transition ease duration-200 transform"
            enterFrom="opacity-0 -translate-y-6"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease duration-100 transform"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-6"
          >
            <Disclosure.Panel className={props.panelClassName}>{props.children}</Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}
