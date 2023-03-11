type Props = {
  responseTimes: Map<string, number>;
};

const DurationBarComponent = ({ responseTimes }: Props) => {
  const getBar = (responseTime) => {};

  return (
    <div className="mb-2 mt-2 flex h-2.5 overflow-hidden rounded bg-emerald-200">
      <div className="w-1/4 bg-red-500"></div>
      <div className="w-1/4 bg-orange-500"></div>
      <div className="w-2/4 bg-emerald-500"></div>
    </div>
  );
};

export default DurationBarComponent;
