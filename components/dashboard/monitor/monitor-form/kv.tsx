import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid';

type Props = {
  className?: string;
  keyPlaceholder: string;
  valuePlaceholder: string;
  button: string;
};

const KV = (props: Props) => {
  return (
    <div className={props.className}>
      <section className="flex items-center gap-2">
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
          className="rounded border border-gray-300 bg-white p-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </section>
      <button
        type="button"
        className="mt-2 inline-flex items-center gap-1 rounded border border-gray-300 bg-white px-2.5 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
      >
        <PlusIcon className="h-4 w-4" />
        <span>Add {props.button}</span>
      </button>
    </div>
  );
};

export default KV;
