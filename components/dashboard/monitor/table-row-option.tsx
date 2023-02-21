import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import { classNames } from 'lib/tailwind/utils';
import { Fragment } from 'react';
import { RowOption } from 'types/main';

type Props = {
  top?: boolean;
  options: RowOption[];
  optionTapped: (arg: string) => void;
};

const TableRowOption = ({ top, options, optionTapped }: Props) => {
  let positionTop = true;

  if (top !== undefined) {
    positionTop = top!;
  }

  return (
    <Menu as="div" className="relative ml-6">
      <Menu.Button className="flex max-w-xs items-center rounded-md p-3 text-sm">
        <EllipsisVerticalIcon className="h-7 w-7 text-gray-500" />
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
        <Menu.Items
          className={classNames(
            'absolute right-12 z-10 w-32 origin-top-right divide-y divide-gray-200 rounded-md bg-white ring-1 ring-black ring-opacity-5 drop-shadow-xl focus:outline-none',
            positionTop ? 'top-10' : 'bottom-8'
          )}
        >
          {options.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : '',
                    'flex w-full py-2 px-4 text-sm text-gray-700',
                    item.name === 'Delete' ? 'text-red-600' : ''
                  )}
                  onClick={() => {
                    optionTapped(item.name);
                  }}
                >
                  <item.icon
                    className={classNames(
                      'mr-3 h-5 w-5 flex-shrink-0 text-gray-500',
                      item.destruct ? 'text-red-600' : ''
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default TableRowOption;
