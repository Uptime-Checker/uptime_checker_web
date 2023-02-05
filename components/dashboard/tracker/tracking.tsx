import { classNames } from 'lib/tailwind/utils';
import { ReactNode } from 'react';

type Props = {
  className?: string;
  children?: ReactNode;
};

const Tracking = ({ className, children }: Props) => {
  return <div className={classNames('flex justify-center', className || '')}>{children}</div>;
};

export default Tracking;
