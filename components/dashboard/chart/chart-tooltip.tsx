import React from 'react';

import { Color } from 'lib/tailwind/input-types';
import { classNames, getColorTheme, getColorVariantsFromColorThemeValue } from 'lib/tailwind/utils';
import { ValueFormatter } from './utils';

export const ChartTooltipFrame = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-md border bg-white text-sm shadow-lg">{children}</div>
);

export interface ChartTooltipRowProps {
  value: string;
  name: string;
  color: Color | null | undefined;
}

export const ChartTooltipRow = ({ value, name, color }: ChartTooltipRowProps) => (
  <div className="flex items-center justify-between space-x-8">
    <div className="flex items-center space-x-2">
      <span
        className={classNames(
          'h-3 w-3 shrink-0 rounded-full border-2 border-white shadow-md',
          getColorVariantsFromColorThemeValue(getColorTheme(color).background).bgColor
        )}
      />
      <p className="whitespace-nowrap text-right font-medium tabular-nums text-gray-700">{value}</p>
    </div>
    <p className="whitespace-nowrap text-right font-normal text-gray-500">{name}</p>
  </div>
);

export interface ChartTooltipProps {
  active: boolean | undefined;
  payload: any;
  label: string;
  categoryColors: Map<string, Color>;
  valueFormatter: ValueFormatter;
}

const ChartTooltip = ({ active, payload, label, categoryColors, valueFormatter }: ChartTooltipProps) => {
  if (active && payload) {
    return (
      <ChartTooltipFrame>
        <div className="border-b border-gray-200 px-4 py-2">
          <p className="font-medium text-gray-700">{label}</p>
        </div>

        <div className="space-y-1 px-4 py-2">
          {payload.map(({ value, name }: { value: number; name: string }, idx: number) => (
            <ChartTooltipRow
              key={`id-${idx}`}
              value={valueFormatter(value)}
              name={name}
              color={categoryColors.get(name)}
            />
          ))}
        </div>
      </ChartTooltipFrame>
    );
  }
  return null;
};

export default ChartTooltip;
