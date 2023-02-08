import { Color, ColorsHex, ColorType } from './color';

export const getHexFromColorThemeValue = (colorThemeValue: string): string => {
  const colorThemeValueParts = colorThemeValue.split('-');

  if (!colorThemeValue || colorThemeValueParts.length !== 3) return '';
  const baseColor = colorThemeValueParts[1];
  // Currently only 500 is supported
  return ColorsHex[baseColor][500];
};

interface StringJoiner {
  (...classes: string[]): string;
}

export const classNames: StringJoiner = (...classes: string[]): string => {
  return classes.filter(Boolean).join(' ');
};

export const composeColor = (colorType: ColorType, color: Color, intensity: number) => {
  return `${colorType}-${color}-${intensity}`;
};
