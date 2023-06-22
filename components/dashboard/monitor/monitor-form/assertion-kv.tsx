import { PlusIcon } from '@heroicons/react/24/solid';
import { AssertionComparison, AssertionSource } from 'models/assertion';
import { useFieldArray } from 'react-hook-form';
import AssertionKVRow from './assertion-kv-row';

type Props = {
  className?: string;
  name: string;
};

const AssertionKV = ({ className, name }: Props) => {
  const { fields, append, remove } = useFieldArray({ name: name });

  return (
    <div className={className}>
      {fields.length > 0 && (
        <section className="mt-5 grid w-full grid-cols-11 gap-3">
          <div className="col-span-3 block w-full text-sm font-medium text-gray-500 lg:col-span-2">Source</div>
          <div className="col-span-3 block w-full text-sm font-medium text-gray-500 lg:col-span-3">Property</div>
          <div className="hidden w-full text-sm font-medium text-gray-500 lg:col-span-2 lg:block">Comparison</div>
          <div className="col-span-5 block w-full text-sm font-medium text-gray-500 lg:col-span-3">Expected value</div>
          <div className="hidden w-full lg:col-span-1 lg:block"></div>
        </section>
      )}
      <section className="mt-3 flex flex-col gap-3">
        {fields.map((field, index) => (
          <AssertionKVRow key={field.id} name={name} index={index} remove={remove} />
        ))}
      </section>
      <button
        type="button"
        onClick={() =>
          append({
            source: AssertionSource.StatusCode,
            property: undefined,
            comparison: AssertionComparison.Equal,
            value: undefined,
          })
        }
        className="mt-3 inline-flex items-center gap-1 rounded border border-gray-300 bg-white px-2.5 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
      >
        <PlusIcon className="h-4 w-4" />
        <span>Add assertion</span>
      </button>
    </div>
  );
};

export default AssertionKV;
