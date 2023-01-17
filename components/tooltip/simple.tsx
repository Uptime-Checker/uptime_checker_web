import { ReactNode, useState } from 'react';
import { classNames } from 'utils/misc';

const SimpleTooltip = ({ message, children }: { message: string; children: ReactNode }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="group relative flex flex-col items-center">
      <span className="flex justify-center" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
        {children}
      </span>
      <div
        className={classNames(
          !show ? 'hidden' : '',
          'absolute bottom-full flex flex-col items-center whitespace-nowrap pb-0.5 group-hover:flex'
        )}
      >
        <span
          className="whitespace-no-wrap relative z-10 rounded-md bg-gray-600 p-2 text-xs leading-none text-white
          drop-shadow-lg"
        >
          {message}
        </span>
        <div className="-mt-2 h-3 w-3 rotate-45 bg-gray-600" />
      </div>
    </div>
  );
};

export default SimpleTooltip;
