import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { randomString } from 'utils/misc';

type Props = {
  className?: string;
  keyPlaceholder: string;
  valuePlaceholder: string;
  button: string;
};

type kvKey = {
  key: string;
};

const KV = (props: Props) => {
  const [kvKeys, setKVKeys] = useState<kvKey[]>([]);

  const addKvKey = () => {
    setKVKeys([...kvKeys, { key: randomString(5) }]);
  };

  const remove = (key: string) => {
    setKVKeys(kvKeys.filter((kvKey) => kvKey.key !== key));
  };

  return (
    <div className={props.className}>
      <section className="flex flex-col gap-2">
        {kvKeys.map((kvKey) => (
          <div className="flex items-center gap-2" key={kvKey.key}>
            <input
              type="text"
              name="key"
              id="key"
              placeholder={props.keyPlaceholder}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <input
              type="text"
              name="key"
              id="key"
              placeholder={props.valuePlaceholder}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <button
              type="button"
              onClick={() => remove(kvKey.key)}
              className="rounded border border-gray-300 bg-white p-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        ))}
      </section>
      <button
        type="button"
        onClick={addKvKey}
        className="mt-2 inline-flex items-center gap-1 rounded border border-gray-300 bg-white px-2.5 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
      >
        <PlusIcon className="h-4 w-4" />
        <span>Add {props.button}</span>
      </button>
    </div>
  );
};

export default KV;
