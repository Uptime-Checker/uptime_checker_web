import { AxisBottom, AxisLeft } from '@visx/axis';
import { localPoint } from '@visx/event';
import { EventType } from '@visx/event/lib/types';
import { GlyphCircle } from '@visx/glyph';
import { GridColumns, GridRows } from '@visx/grid';
import { Group } from '@visx/group';
import { scaleLinear } from '@visx/scale';
import { Line, LinePath } from '@visx/shape';
import { defaultStyles, TooltipWithBounds, useTooltip } from '@visx/tooltip';
import { bisector, extent } from 'd3-array';
import { useCallback, useEffect, useMemo } from 'react';
import { ChartData, ChartPoint, defaultValueFormatter, ValueFormatter } from './utils';

interface ChartProps {
  width: number;
  height: number;
  data: ChartData;
  showGridRows?: boolean;
  showGridColumns?: boolean;
  spatialValueFormatter?: ValueFormatter;
  temporalValueFormatter?: ValueFormatter;
}

const LineChart = ({
  width,
  height,
  data,
  showGridRows = true,
  showGridColumns = true,
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
    // backgroundColor: 'rgba(0,0,0,0.9)',
    // color: 'white',
  };

  useEffect(() => {
    console.log(width);
  }, [width]);

  const handleTooltip = useCallback(
    (event: EventType) => {
      const { x, y } = localPoint(event) || { x: 0 };
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
        tooltipTop: y,
      });
    },
    [bisectDate, getD, getFlatPoints, margin.left, rdScale, showTooltip, timeScale]
  );

  const renderTooltipLine = useCallback(() => {
    if (!tooltipData) return null;

    let toolData = tooltipData as ChartPoint[];
    if (toolData.length === 0) return null;
    let d = toolData[0];

    return (
      <Line
        from={{ x: timeScale(d.temporalValue), y: 0 }}
        to={{ x: timeScale(d.temporalValue), y: innerHeight }}
        stroke={'#E5E5E5'}
        strokeWidth={1.5}
        pointerEvents="none"
      />
    );
  }, [innerHeight, timeScale, tooltipData]);

  const renderGlyphs = useCallback(() => {
    if (!tooltipData) return null;

    let toolData = tooltipData as ChartPoint[];
    let circles = toolData.map((d, i) => {
      return (
        <GlyphCircle
          key={i}
          left={timeScale(d.temporalValue)}
          top={rdScale(d.spatialValue)}
          size={50}
          fill={colors[i]}
          stroke={'white'}
          strokeWidth={1}
        />
      );
    });

    return <g>{circles}</g>;
  }, [colors, rdScale, timeScale, tooltipData]);

  const tooltipRect = useCallback(() => {
    if (width === 0 || height === 0) return null;
    return (
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
    );
  }, [handleTooltip, height, hideTooltip, innerHeight, innerWidth, width]);

  return (
    <div className="relative">
      <svg width={width} height={height}>
        {/*<rect x={0} y={0} width={width} height={height} fill={'#718096'} rx={14} />*/}
        <Group left={margin.left} top={margin.top}>
          {showGridRows ? (
            <GridRows
              scale={rdScale}
              width={innerWidth}
              height={innerHeight - margin.top}
              stroke="#A3A3A3"
              numTicks={4}
              strokeDasharray="4,2"
              strokeOpacity={0.4}
            />
          ) : null}
          {showGridColumns ? (
            <GridColumns
              scale={timeScale}
              width={innerWidth}
              height={innerHeight}
              stroke="#EDF2F7"
              strokeOpacity={0.2}
            />
          ) : null}
          <AxisLeft
            stroke={'white'}
            tickStroke={'white'}
            scale={rdScale}
            tickLabelProps={() => ({
              fill: '#71717A',
              fontSize: 11,
              textAnchor: 'end',
            })}
          />
          <AxisBottom
            scale={timeScale}
            stroke={'white'}
            tickStroke={'white'}
            top={innerHeight}
            tickLabelProps={() => ({
              fill: '#71717A',
              fontSize: 12,
              textAnchor: 'middle',
            })}
          />
          {data.lines.map((sData, i) => (
            <LinePath
              key={i}
              stroke={colors[i]}
              strokeWidth={2}
              data={sData.points}
              x={(d) => timeScale(getDate(d))}
              y={(d) => rdScale(getRD(d))}
            />
          ))}
          {renderTooltipLine()}
          {renderGlyphs()}
          {tooltipRect()}
        </Group>
      </svg>
      {tooltipData ? (
        <TooltipWithBounds key={Math.random()} top={tooltipTop} left={tooltipLeft} style={tooltipStyles}>
          <p>{`Total Spend: $111`}</p>
          <p>{`Renewable Spend: $111`}</p>
          <p>{`Year: 111`}</p>
        </TooltipWithBounds>
      ) : null}
    </div>
  );
};

export default LineChart;
