import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useFieldArray, useFormContext } from 'react-hook-form';

type Props = {
  className?: string;
  keyPlaceholder: string;
  valuePlaceholder: string;
  button: string;
  name: string;
};

const KV = (props: Props) => {
  const { register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: props.name,
  });

  return (
    <div className={props.className}>
      <section className="flex flex-col gap-2">
        {fields.map((field, index) => (
          <div className="flex items-center gap-2" key={field.id}>
            <input
              type="text"
              {...register(`${props.name}.${index}.name` as const, { required: true })}
              placeholder={props.keyPlaceholder}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <input
              type="text"
              {...register(`${props.name}.${index}.value` as const, { required: true })}
              placeholder={props.valuePlaceholder}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="rounded border border-gray-300 bg-white p-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        ))}
      </section>
      <button
        type="button"
        onClick={() => append({ name: '', value: '' })}
        className="mt-2 inline-flex items-center gap-1 rounded border border-gray-300 bg-white px-2.5 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
      >
        <PlusIcon className="h-4 w-4" />
        <span>Add {props.button}</span>
      </button>
    </div>
  );
};

export default KV;
