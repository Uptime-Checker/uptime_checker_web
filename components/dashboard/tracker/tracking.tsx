import { ReactNode } from 'react';
import { classNames } from 'utils/misc';

type Props = {
  className?: string;
  children?: ReactNode;
};

const Tracking = ({ className, children }: Props) => {
  return <div className={classNames('flex justify-center', className || '')}>{children}</div>;
};

export default Tracking;
