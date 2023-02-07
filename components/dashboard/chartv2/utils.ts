export interface ChartPoint {
  spatialValue: number;
  temporalValue: number;
}

export interface ChartLine {
  key: string;
  color: string;
  points: ChartPoint[];
}

export interface ChartData {
  lines: ChartLine[];
  spatialKey: string;
  temporalKey: string;
}

export type ValueFormatter = {
  (value: number): string;
};

export const defaultValueFormatter: ValueFormatter = (value: number) => value.toString();
