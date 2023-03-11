import { classNames } from 'lib/tailwind/utils';
import { ResponseTimeKey } from 'models/monitor';
import { useEffect, useState } from 'react';

type Props = {
  responseTimes: Map<ResponseTimeKey, number>;
};

type ResponsePercentage = {
  responseKey: ResponseTimeKey;
  percentage: number;
};

const DurationBarComponent = ({ responseTimes }: Props) => {
  const [responsePercentages, setResponsePercentages] = useState<ResponsePercentage[]>([]);

  useEffect(() => {
    let responsePercentages: ResponsePercentage[] = [];

    let i = 0;
    let totalTime = 0;
    let totalPercentage = 0;

    for (const [key, value] of responseTimes) {
      i = i + 1;
      if (key === ResponseTimeKey.TotalTime) {
        totalTime = value;
      } else {
        let percentage = Math.round((value * 100) / totalTime);
        totalPercentage = totalPercentage + percentage;

        if (!Array.from(responseTimes.keys())[i] && totalPercentage < 100) {
          percentage = percentage + 1;
        }
        let responsePercentage: ResponsePercentage = { responseKey: key, percentage: percentage };
        responsePercentages.push(responsePercentage);
      }
    }

    setResponsePercentages(responsePercentages);
  }, [responseTimes]);

  const getBar = (responseTimeKey: ResponseTimeKey) => {
    if (responseTimeKey === ResponseTimeKey.TotalTime) return null;

    let percentage = responsePercentages.filter((responsePercentage) => {
      return responsePercentage.responseKey === responseTimeKey;
    })[0];

    const width = `w-[${percentage}%]`;
    return <div key={responseTimeKey} className={classNames(width, 'bg-red-500')}></div>;
  };

  return (
    <div className="mb-2 mt-2 flex h-2.5 overflow-hidden rounded bg-emerald-200">
      {/* <div className="w-1/4 bg-red-500"></div>
      <div className="w-1/4 bg-orange-500"></div>
      <div className="w-2/4 bg-emerald-500"></div> */}
      {Array.from(responseTimes.keys()).map((responseTimeKey) => getBar(responseTimeKey))}
    </div>
  );
};

export default DurationBarComponent;
