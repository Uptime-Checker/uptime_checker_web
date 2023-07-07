const baseColorValues = [
  'white',
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
] as const;

export type Color = (typeof baseColorValues)[number];

export enum BaseColor {
  White = 'white',
  Slate = 'slate',
  Gray = 'gray',
  Zinc = 'zinc',
  Neutral = 'neutral',
  Stone = 'stone',
  Red = 'red',
  Orange = 'orange',
  Amber = 'amber',
  Yellow = 'yellow',
  Lime = 'lime',
  Green = 'green',
  Emerald = 'emerald',
  Teal = 'teal',
  Cyan = 'cyan',
  Sky = 'sky',
  Blue = 'blue',
  Indigo = 'indigo',
  Violet = 'violet',
  Purple = 'purple',
  Fuchsia = 'fuchsia',
  Pink = 'pink',
  Rose = 'rose',
}

export const themeColorRange: Color[] = [
  BaseColor.Cyan,
  BaseColor.Sky,
  BaseColor.Blue,
  BaseColor.Indigo,
  BaseColor.Violet,
  BaseColor.Purple,
  BaseColor.Fuchsia,
  BaseColor.Slate,
  BaseColor.Gray,
  BaseColor.Zinc,
  BaseColor.Neutral,
  BaseColor.Stone,
  BaseColor.Red,
  BaseColor.Orange,
  BaseColor.Amber,
  BaseColor.Yellow,
  BaseColor.Lime,
  BaseColor.Green,
  BaseColor.Emerald,
  BaseColor.Teal,
  BaseColor.Pink,
  BaseColor.Rose,
];

export type ColorValues = {
  500: string;
};

export const ColorsHex: { [baseColor: string]: ColorValues } = {
  [BaseColor.Slate]: {
    500: '#64748b',
  },
  [BaseColor.Gray]: {
    500: '#6b7280',
  },
  [BaseColor.Zinc]: {
    500: '#71717a',
  },
  [BaseColor.Neutral]: {
    500: '#737373',
  },
  [BaseColor.Stone]: {
    500: '#78716c',
  },
  [BaseColor.Red]: {
    500: '#ef4444',
  },
  [BaseColor.Orange]: {
    500: '#f97316',
  },
  [BaseColor.Amber]: {
    500: '#f59e0b',
  },
  [BaseColor.Yellow]: {
    500: '#eab308',
  },
  [BaseColor.Lime]: {
    500: '#84cc16',
  },
  [BaseColor.Green]: {
    500: '#22c55e',
  },
  [BaseColor.Emerald]: {
    500: '#10b981',
  },
  [BaseColor.Teal]: {
    500: '#14b8a6',
  },
  [BaseColor.Cyan]: {
    500: '#06b6d4',
  },
  [BaseColor.Sky]: {
    500: '#0ea5e9',
  },
  [BaseColor.Blue]: {
    500: '#3b82f6',
  },
  [BaseColor.Indigo]: {
    500: '#6366f1',
  },
  [BaseColor.Violet]: {
    500: '#8b5cf6',
  },
  [BaseColor.Purple]: {
    500: '#a855f7',
  },
  [BaseColor.Fuchsia]: {
    500: '#d946ef',
  },
  [BaseColor.Pink]: {
    500: '#ec4899',
  },
  [BaseColor.Rose]: {
    500: '#f43f5e',
  },
};

export enum ColorType {
  bg = 'bg',
  hoverBg = 'hover:bg',
  text = 'text',
  hoverText = 'hover:text',
  border = 'border',
  hoverBorder = 'hover:border',
  ring = 'ring',
  hoverRing = 'hover:ring',
  divide = 'divide',
  outline = 'outline',
  focusRing = 'focus:ring',
}
