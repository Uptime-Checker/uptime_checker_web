import { useState } from 'react';

const axisStyle = {
  fontSize: '12px',
  fontFamily: 'Inter; Helvetica',
};

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as ReChartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import BaseChartProps from './base-chart-props';
import ChartTooltip from './chart-tooltip';
import { constructCategoryColors, defaultValueFormatter, getYAxisDomain } from './utils';

import { ColorType, themeColorRange } from 'lib/tailwind/color';
import { composeColor, getHexFromColorThemeValue } from 'lib/tailwind/utils';
import ChartLegend from './chart-legend';

const LineChart = ({
  data = [],
  categories = [],
  dataKey,
  colors = themeColorRange,
  valueFormatter = defaultValueFormatter,
  startEndOnly = false,
  showXAxis = true,
  showYAxis = true,
  yAxisWidth = 60,
  showAnimation = true,
  showTooltip = true,
  showLegend = true,
  showGridLines = true,
  autoMinValue = false,
  minValue,
  maxValue,
  className = 'w-full',
}: BaseChartProps) => {
  const [legendHeight, setLegendHeight] = useState(60);
  const categoryColors = constructCategoryColors(categories, colors);

  const yAxisDomain = getYAxisDomain(autoMinValue, minValue, maxValue);

  return (
    <section className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <ReChartsLineChart data={data} margin={{ top: 5, bottom: 5, left: -10, right: 0 }}>
          {showGridLines ? <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} /> : null}
          <XAxis
            hide={!showXAxis}
            dataKey={dataKey}
            interval="preserveStartEnd"
            tick={{ transform: 'translate(0, 6)' }}
            ticks={startEndOnly ? [data[0][dataKey], data[data.length - 1][dataKey]] : undefined}
            style={axisStyle}
            tickLine={false}
            axisLine={false}
            padding={{ left: 10, right: 10 }}
            minTickGap={5}
          />
          <YAxis
            width={yAxisWidth}
            hide={!showYAxis}
            axisLine={false}
            tickLine={false}
            type="number"
            domain={yAxisDomain}
            tick={{ transform: 'translate(-3, 0)' }}
            style={axisStyle}
            tickFormatter={valueFormatter}
          />
          {showTooltip ? (
            <Tooltip
              // ongoing issue: https://github.com/recharts/recharts/issues/2920
              wrapperStyle={{ outline: 'none' }}
              isAnimationActive={false}
              cursor={{ stroke: '#d1d5db', strokeWidth: 1 }}
              content={({ active, payload, label }) => (
                <ChartTooltip
                  active={active}
                  payload={payload}
                  label={label}
                  valueFormatter={valueFormatter}
                  categoryColors={categoryColors}
                />
              )}
              position={{ y: 0 }}
            />
          ) : null}
          {showLegend ? (
            <Legend
              verticalAlign="top"
              height={legendHeight}
              content={({ payload }) => ChartLegend({ payload }, categoryColors, setLegendHeight)}
            />
          ) : null}
          {categories.map((category) => (
            <Line
              key={category}
              name={category}
              type="monotone"
              dataKey={category}
              stroke={getHexFromColorThemeValue(composeColor(ColorType.bg, categoryColors.get(category)!, 500))}
              strokeWidth={2}
              dot={false}
              isAnimationActive={showAnimation}
            />
          ))}
        </ReChartsLineChart>
      </ResponsiveContainer>
    </section>
  );
};

export default LineChart;
