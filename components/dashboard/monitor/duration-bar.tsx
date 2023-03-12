import { classNames } from 'lib/tailwind/utils';
import { ResponseTimeKey } from 'models/monitor';
import { useEffect, useState } from 'react';
import { SimpleTooltip } from 'components/tooltip';

type Props = {
  responseTimes: Map<ResponseTimeKey, number>;
};

type ResponsePercentage = {
  responseKey: ResponseTimeKey;
  percentage: number;
  time: string;
};

enum BackgroundColors {
  Main = 'bg-indigo-400',
  DNS = 'bg-blue-400',
  TCP = 'bg-blue-600',
  TLS = 'bg-indigo-600',
  Server = 'bg-orange-500',
  Transfer = 'bg-emerald-500',
}

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

        if (percentage === 0) continue;
        let responsePercentage: ResponsePercentage = {
          responseKey: key,
          percentage: percentage,
          time: `${value.toFixed(2)}`,
        };
        responsePercentages.push(responsePercentage);
      }
    }

    setResponsePercentages(responsePercentages);
  }, [responseTimes]);

  const getBar = (responsePercentage: ResponsePercentage) => {
    let bg = BackgroundColors.Main;
    switch (responsePercentage.responseKey) {
      case ResponseTimeKey.DNSLookupTime:
        bg = BackgroundColors.DNS;
        break;
      case ResponseTimeKey.TCPConnectTime:
        bg = BackgroundColors.TCP;
        break;
      case ResponseTimeKey.TLSHandshakeTime:
        bg = BackgroundColors.TLS;
        break;
      case ResponseTimeKey.ServerProcessingTime:
        bg = BackgroundColors.Server;
        break;
      case ResponseTimeKey.TransferTime:
        bg = BackgroundColors.Transfer;
        break;
    }
    const width = `w-[${responsePercentage.percentage}%]`;
    const message = `${responsePercentage.responseKey} ${responsePercentage.percentage}%: ${responsePercentage.time}ms`;
    return (
      <SimpleTooltip key={responsePercentage.responseKey} message={message} className={classNames(width)}>
        <div className={classNames('h-full w-full', bg)}></div>
      </SimpleTooltip>
    );
  };

  return (
    <div className={classNames('mb-2 mt-2 flex h-2.5 rounded', BackgroundColors.Main)}>
      {responsePercentages.map((responsePercentage) => getBar(responsePercentage))}
    </div>
  );
};

export default DurationBarComponent;
