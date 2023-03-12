import { SimpleTooltip } from 'components/tooltip';
import { classNames } from 'lib/tailwind/utils';
import { MonitorStatus } from 'models/monitor';

type Props = {
  text: string;
  className?: string;
  status?: MonitorStatus;
};

enum BackgroundColors {
  Main = 'bg-gray-300',
  FAILING = 'bg-red-500',
  MAINTENANCE = 'bg-gray-500',
  DEGRADED = 'bg-amber-500',
  PASSING = 'bg-teal-500',
}

const TrackingBlock = ({ text, className, status }: Props) => {
  let bg = BackgroundColors.Main;

  if (status) {
    switch (status) {
      case MonitorStatus.FAILING:
        bg = BackgroundColors.FAILING;
        break;

      case MonitorStatus.MAINTENANCE:
        bg = BackgroundColors.MAINTENANCE;
        break;

      case MonitorStatus.DEGRADED:
        bg = BackgroundColors.DEGRADED;
        break;

      case MonitorStatus.PASSING:
        bg = BackgroundColors.PASSING;
        break;
    }
  }

  return (
    <SimpleTooltip message={text}>
      <div className={classNames('mx-1 h-9 w-3 rounded-md', bg, className || '')}></div>
    </SimpleTooltip>
  );
};

export default TrackingBlock;
