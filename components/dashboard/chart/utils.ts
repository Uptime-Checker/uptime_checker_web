import { Color } from 'lib/tailwind/input-types';

export const getYAxisDomain = (autoMinValue: boolean, minValue: number | undefined, maxValue: number | undefined) => {
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
