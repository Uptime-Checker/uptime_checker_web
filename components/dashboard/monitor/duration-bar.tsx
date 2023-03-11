import { ResponseTimeKey } from 'models/monitor';

type Props = {
  responseTimes: Map<ResponseTimeKey, number>;
};
const DurationBarComponent = ({ responseTimes }: Props) => {
  const getBar = (responseTimeKey: ResponseTimeKey) => {
    if (responseTimeKey === ResponseTimeKey.TotalTime) return null;

    let totalTime = 0;
    let currentValue = 0;
    for (const [key, value] of responseTimes) {
      if (key === ResponseTimeKey.TotalTime) {
        totalTime = value;
      }
      if (key === responseTimeKey) {
        currentValue = value;
      }
    }
    let percentage = Math.round((currentValue * 100) / totalTime);
    if (percentage === 0) return null;

    return <div key={responseTimeKey} className="w-1/4 bg-orange-500"></div>;
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
