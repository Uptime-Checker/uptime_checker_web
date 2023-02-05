import { BaseColors, BaseColorTheme, colorTheme, twColorsHex } from './color';
import { ColorTypes, colorVariantMapping } from './color-variant-mapping';
import { Color } from './input-types';

export const getColorVariantsFromColorThemeValue = (colorThemeValue: string): ColorTypes => {
  const colorThemeValueParts = colorThemeValue.split('-');
  const baseColor = colorThemeValueParts[0];
  const colorValue = colorThemeValueParts[1];
  return colorVariantMapping[baseColor][colorValue];
};

export const getHexFromColorThemeValue = (colorThemeValue: string): string => {
  const colorThemeValueParts = colorThemeValue.split('-');
  if (!colorThemeValue || colorThemeValueParts.length != 2) return '';
  const baseColor = colorThemeValueParts[0];
  // Currently only 500 is supported
  return twColorsHex[baseColor][500];
};

export const isBaseColor = (baseColor: Color): boolean => {
  return Object.values(BaseColors).includes(baseColor);
};

export const getColorTheme = (
  baseColor: Color | null | undefined,
  defaultColor: Color = BaseColors.Blue
): BaseColorTheme => {
  if (!baseColor || !isBaseColor(baseColor)) {
    return colorTheme[defaultColor];
  }
  return colorTheme[baseColor];
};
