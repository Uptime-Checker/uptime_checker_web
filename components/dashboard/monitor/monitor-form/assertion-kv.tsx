import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import { AssertionSource, getAssertionComparisonString } from 'models/assertion';
import { ChangeEvent, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { getAssertionComparisonSelectionOptions, getAssertionSourceSelectionOptions } from 'services/monitor';

type Props = {
  className?: string;
  name: string;
};

const AssertionKV = ({ className, name }: Props) => {
  const { register } = useFormContext();
  const { fields, append, remove } = useFieldArray({ name: name });

  const [assertionSource, setAssertionSource] = useState(AssertionSource.StatusCode); // default 5 minutes interval

  const assertionSourceChanged = (event: ChangeEvent<HTMLSelectElement>) => {
    setAssertionSource(parseInt(event.target.value));
  };

  return (
    <div className={className}>
      <section className="mt-5 grid w-full grid-cols-11 gap-3">
        <div className="col-span-2 block w-full text-sm font-medium text-gray-500">Source</div>
        <div className="col-span-3 block w-full text-sm font-medium text-gray-500">Property</div>
        <div className="col-span-2 block w-full text-sm font-medium text-gray-500">Comparison</div>
        <div className="col-span-3 block w-full text-sm font-medium text-gray-500">Expected value</div>
        <div className="col-span-1 block w-full"></div>
      </section>
      <section className="mt-3 flex flex-col gap-3">
        {fields.map((field, index) => (
          <div className="grid w-full grid-cols-11 gap-3" key={field.id}>
            <select
              {...register(`${name}.${index}.source` as const, { required: true })}
              onChange={assertionSourceChanged}
              className="col-span-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              {getAssertionSourceSelectionOptions().map((option) => (
                <option key={option.value} value={option.value} disabled={option.disabled}>
                  {option.label}
                </option>
              ))}
            </select>
            <input
              type="text"
              {...register(`${name}.${index}.property` as const, { required: true })}
              placeholder="key"
              className="col-span-3 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <select
              {...register(`${name}.${index}.source` as const, { required: true })}
              className="col-span-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              {getAssertionComparisonSelectionOptions(assertionSource).map((option) => (
                <option key={option} value={option}>
                  {getAssertionComparisonString(option)}
                </option>
              ))}
            </select>
            <input
              type="text"
              {...register(`${name}.${index}.value` as const, { required: true })}
              placeholder="value"
              className="col-span-3 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />

            <button
              type="button"
              onClick={() => remove(index)}
              className="col-span-1 inline-flex items-center justify-center rounded border border-gray-300 bg-white p-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        ))}
      </section>
      <button
        type="button"
        onClick={() => append({ name: '', value: '' })}
        className="mt-3 inline-flex items-center gap-1 rounded border border-gray-300 bg-white px-2.5 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
      >
        <PlusIcon className="h-4 w-4" />
        <span>Add assertion</span>
      </button>
    </div>
  );
};

export default AssertionKV;
