import { TrashIcon } from '@heroicons/react/24/solid';
import { classNames } from 'lib/tailwind/utils';
import { AssertionSource, getAssertionComparisonString } from 'models/assertion';
import { ChangeEvent, useState } from 'react';
import { UseFieldArrayRemove, useFormContext } from 'react-hook-form';
import { getAssertionComparisonSelectionOptions, getAssertionSourceSelectionOptions } from 'services/monitor';

type Props = {
  name: string;
  index: number;
  remove: UseFieldArrayRemove;
};

const AssertionKVRow = ({ name, index, remove }: Props) => {
  const { register } = useFormContext();

  const [assertionSource, setAssertionSource] = useState(AssertionSource.StatusCode); // default 5 minutes interval

  const assertionSourceChanged = (event: ChangeEvent<HTMLSelectElement>) => {
    setAssertionSource(parseInt(event.target.value));
  };

  return (
    <div className="grid w-full grid-cols-11 gap-3">
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
        {...register(`${name}.${index}.property` as const)}
        placeholder="key"
        required={assertionSource === AssertionSource.Headers}
        disabled={!(assertionSource === AssertionSource.Headers)}
        className={classNames(
          assertionSource === AssertionSource.Headers ? 'opacity-100' : 'opacity-25',
          'col-span-3 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
        )}
      />
      <select
        {...register(`${name}.${index}.comparison` as const, { required: true })}
        className="col-span-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
      >
        {getAssertionComparisonSelectionOptions(assertionSource).map((option) => (
          <option key={option} value={option}>
            {getAssertionComparisonString(option)}
          </option>
        ))}
      </select>
      <input
        required
        type={
          assertionSource === AssertionSource.StatusCode || assertionSource === AssertionSource.ResponseTime
            ? 'number'
            : 'text'
        }
        {...register(`${name}.${index}.value` as const)}
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
  );
};

export default AssertionKVRow;
