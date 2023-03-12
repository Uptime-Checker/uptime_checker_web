import { classNames } from 'lib/tailwind/utils';
import { ReactNode, useState } from 'react';

const SimpleTooltip = ({
  message,
  children,
  className,
}: {
  message: string;
  children: ReactNode;
  className?: string;
}) => {
  const [show, setShow] = useState(false);
  return (
    <div
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      className={classNames('group relative flex flex-col items-center', className ?? '')}
    >
      {children}
      <div
        className={classNames(
          !show ? 'hidden' : '',
          'absolute bottom-full flex flex-col items-center pb-0.5 group-hover:flex'
        )}
      >
        <span
          className="relative w-auto whitespace-pre-wrap rounded-md bg-gray-600 p-2 text-center text-xs text-white
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
