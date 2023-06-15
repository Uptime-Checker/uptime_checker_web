import { PlusIcon } from '@heroicons/react/24/solid';

type Props = {
  className?: string;
  keyPlaceholder: string;
  valuePlaceholder: string;
  button: string;
};

const KV = (props: Props) => {
  return (
    <div className={props.className}>
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
