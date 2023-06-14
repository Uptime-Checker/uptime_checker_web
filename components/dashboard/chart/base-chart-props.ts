import { Color } from 'lib/tailwind/color';
import { ValueFormatter } from './utils';

interface BaseChartProps {
  data: any[];
  categories: string[];
  dataKey: string;
  colors?: Color[];
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
