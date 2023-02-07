import { ChartData, ChartPoint, defaultValueFormatter, ValueFormatter } from './utils';
import { defaultStyles, useTooltip } from '@visx/tooltip';
import { bisector, extent } from 'd3-array';
import { scaleLinear } from '@visx/scale';
import { useCallback, useMemo } from 'react';
import { localPoint } from '@visx/event';
import { EventType } from '@visx/event/lib/types';
import { Group } from '@visx/group';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { LinearGradient } from '@visx/gradient';
import { GridColumns, GridRows } from '@visx/grid';
import { LinePath } from '@visx/shape';

interface ChartProps {
  width: number;
  height: number;
  data: ChartData;
  spatialValueFormatter?: ValueFormatter;
  temporalValueFormatter?: ValueFormatter;
}

const LineChart = ({
  width,
  height,
  data,
  spatialValueFormatter = defaultValueFormatter,
  temporalValueFormatter = defaultValueFormatter,
}: ChartProps) => {
  const { tooltipData, tooltipLeft = 0, tooltipTop = 0, showTooltip, hideTooltip } = useTooltip();

  // define margins from where to start drawing the chart
  const margin = { top: 40, right: 40, bottom: 40, left: 40 };

  // defining inner measurements
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Defining selector functions
  const getRD = (d: ChartPoint) => d.spatialValue;
  const getDate = (d: ChartPoint) => d.temporalValue;
  const bisectDate = bisector((d: ChartPoint) => d.temporalValue).left;

  const getFlatPoints = useMemo(() => {
    return data.lines.reduce((accumulator: ChartPoint[], value) => accumulator.concat(value.points), []);
  }, [data]);

  const colors = useMemo(() => {
    return data.lines.map((line) => line.color);
  }, [data]);

  // get data from a year
  const getD = useCallback(
    (temporalValue: number) => {
      return getFlatPoints.filter((el) => {
        return el.temporalValue === temporalValue;
      });
    },
    [getFlatPoints]
  );

  // Defining scales
  // horizontal, x scale
  const timeScale = scaleLinear({
    range: [0, innerWidth],
    domain: extent(getFlatPoints, getDate) as [number, number],
    nice: true,
  });

  // vertical, y scale
  const rdScale = scaleLinear({
    range: [innerHeight, 0],
    domain: extent(getFlatPoints, getRD) as [number, number],
    nice: true,
  });

  // defining tooltip styles
  const tooltipStyles = {
    ...defaultStyles,
    minWidth: 60,
    backgroundColor: 'rgba(0,0,0,0.9)',
    color: 'white',
  };

  const handleTooltip = useCallback(
    (event: EventType) => {
      const { x } = localPoint(event) || { x: 0 };
      const x0 = timeScale.invert(x - margin.left); // get Date from the scale

      const index = bisectDate(getFlatPoints, x0, 1); // get index of this date from the array
      const d0 = getFlatPoints[index - 1];
      const d1 = getFlatPoints[index];
      let d = d0;
      // is previous data point available?
      if (d1 && getDate(d1)) {
        d = x0.valueOf() - getDate(d0).valueOf() > getDate(d1).valueOf() - x0.valueOf() ? d1 : d0;
      }
      showTooltip({
        tooltipData: getD(d.temporalValue),
        tooltipLeft: x,
        tooltipTop: rdScale(getRD(d)),
      });
    },
    [bisectDate, getD, getFlatPoints, margin.left, rdScale, showTooltip, timeScale]
  );

  return (
    <div style={{ position: 'relative' }}>
      <svg width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill={'#718096'} rx={14} />
        <Group left={margin.left} top={margin.top}>
          <GridRows
            scale={rdScale}
            width={innerWidth}
            height={innerHeight - margin.top}
            stroke="#EDF2F7"
            strokeOpacity={0.2}
          />
          <GridColumns scale={timeScale} width={innerWidth} height={innerHeight} stroke="#EDF2F7" strokeOpacity={0.2} />
          <LinearGradient id="area-gradient" from={'#43b284'} to={'#43b284'} toOpacity={0.1} />
          <AxisLeft
            stroke={'#EDF2F7'}
            tickStroke={'#EDF2F7'}
            scale={rdScale}
            tickLabelProps={() => ({
              fill: '#EDF2F7',
              fontSize: 11,
              textAnchor: 'end',
            })}
          />
          <text x="-125" y="20" transform="rotate(-90)" fontSize={12} fill="#EDF2F7">
            R&D Spend, RDDUSD
          </text>
          <AxisBottom
            scale={timeScale}
            stroke={'#EDF2F7'}
            tickStroke={'#EDF2F7'}
            top={innerHeight}
            tickLabelProps={() => ({
              fill: '#EDF2F7',
              fontSize: 11,
              textAnchor: 'middle',
            })}
          />
          {data.lines.map((sData, i) => (
            <LinePath
              key={i}
              stroke={colors[i]}
              strokeWidth={3}
              data={sData.points}
              x={(d) => timeScale(getDate(d)) ?? 0}
              y={(d) => rdScale(getRD(d)) ?? 0}
            />
          ))}
          <rect
            x={0}
            y={0}
            width={innerWidth}
            height={innerHeight}
            onTouchStart={handleTooltip}
            fill={'transparent'}
            onTouchMove={handleTooltip}
            onMouseMove={handleTooltip}
            onMouseLeave={() => hideTooltip()}
          />
        </Group>
      </svg>
    </div>
  );
};

export default LineChart;
