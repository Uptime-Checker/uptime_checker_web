export const getYAxisDomain = (autoMinValue: boolean, minValue: number | undefined, maxValue: number | undefined) => {
  const minDomain = autoMinValue ? 'auto' : minValue ?? 0;
  const maxDomain = maxValue ?? 'auto';
  return [minDomain, maxDomain];
};

export const constructCategoryColors = (categories: string[], colors: string[]): Map<string, string> => {
  const categoryColors = new Map<string, string>();
  categories.forEach((category, idx) => {
    categoryColors.set(category, colors[idx]);
  });
  return categoryColors;
};

export type ValueFormatter = {
  (value: number): string;
};
