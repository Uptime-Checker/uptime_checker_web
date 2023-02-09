import React, { useEffect, useRef, useState } from 'react';

import Legend from 'components/dashboard/legend';
import { useOnWindowResize } from 'lib/hooks';
import { Color } from 'lib/tailwind/color';

const ChartLegend = (
  { payload }: any,
  categoryColors: Map<string, Color>,
  setLegendHeight: React.Dispatch<React.SetStateAction<number>>
) => {
  const calculateHeight = (height: number | undefined) =>
    height
      ? Number(height) + 20 // 20px extra padding
      : 60; // default height

  const legendRef = useRef<HTMLDivElement>(null);
  const [currentheight, setCurrentHeight] = useState(calculateHeight(undefined));

  useEffect(() => {
    setCurrentHeight(calculateHeight(currentheight));
    // setLegendHeight setState action from Chart parent
    setLegendHeight(calculateHeight(legendRef.current?.clientHeight));
  }, []);

  useOnWindowResize(() => {
    setCurrentHeight(calculateHeight(currentheight));
    // setLegendHeight setState action from Chart parent
    setLegendHeight(calculateHeight(legendRef.current?.clientHeight));
  });

  return (
    <div ref={legendRef} className="flex items-center justify-end">
      <Legend
        categories={payload.map((entry: any) => entry.value)}
        colors={payload.map((entry: any) => categoryColors.get(entry.value))}
      />
    </div>
  );
};

export default ChartLegend;
