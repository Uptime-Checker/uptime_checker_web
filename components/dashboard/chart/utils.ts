import { Color } from 'lib/tailwind/color';
import { AxisDomainItem } from 'recharts/types/util/types';

export const getYAxisDomain = (
  autoMinValue: boolean,
  minValue: number | undefined,
  maxValue: number | undefined
): [AxisDomainItem, AxisDomainItem] => {
  const minDomain = autoMinValue ? 'auto' : minValue ?? 0;
  const maxDomain = maxValue ?? 'auto';
  return [minDomain, maxDomain];
};

export const constructCategoryColors = (categories: string[], colors: Color[]): Map<string, Color> => {
  const categoryColors = new Map<string, Color>();
  categories.forEach((category, idx) => {
    categoryColors.set(category, colors[idx]);
  });
  return categoryColors;
};

export type ValueFormatter = {
  (value: number): string;
};

export const defaultValueFormatter: ValueFormatter = (value: number) => value.toString();
