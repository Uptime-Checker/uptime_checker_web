export type ValueFormatter = {
  (value: number): string;
};

interface BaseChartProps {
  data: any[];
  categories: string[];
  dataKey: string;
  colors?: string[];
  valueFormatter?: ValueFormatter;
  startEndOnly?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  yAxisWidth?: number;
  showAnimation?: boolean;
  showTooltip?: boolean;
  showGradient?: boolean;
  showLegend?: boolean;
  showGridLines?: boolean;
  autoMinValue?: boolean;
  minValue?: number;
  maxValue?: number;
  className?: string;
}

export default BaseChartProps;
