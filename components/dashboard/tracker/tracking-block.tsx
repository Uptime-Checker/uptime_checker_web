import { classNames } from 'utils/misc';

type Props = {
  className?: string;
};

const TrackingBlock = ({ className }: Props) => {
  return <div className={classNames('mx-1 h-9 w-3 rounded-md bg-teal-500', className || '')}></div>;
};

export default TrackingBlock;
