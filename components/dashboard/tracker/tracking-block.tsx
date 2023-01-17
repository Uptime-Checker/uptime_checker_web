import { SimpleTooltip } from 'components/tooltip';
import { MonitorStatus } from 'models/monitor';
import { classNames } from 'utils/misc';

type Props = {
  text: string;
  className?: string;
  status?: MonitorStatus;
};

const TrackingBlock = ({ text, className, status }: Props) => {
  let bg = 'bg-gray-500';

  if (status) {
    switch (status) {
      case MonitorStatus.FAILING:
        bg = 'bg-red-500';
        break;

      case MonitorStatus.MAINTENANCE:
        bg = 'bg-gray-500';
        break;

      case MonitorStatus.DEGRADED:
        bg = 'bg-amber-500';
        break;

      default:
        bg = 'bg-teal-500';
        break;
    }
  }

  return (
    <>
      <SimpleTooltip message={text}>
        <div className={classNames('mx-1 h-9 w-3 rounded-md', bg, className || '')}></div>
      </SimpleTooltip>
    </>
  );
};

export default TrackingBlock;
