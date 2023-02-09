import { Color, ColorType, themeColorRange } from 'lib/tailwind/color';
import { classNames, composeColor } from 'lib/tailwind/utils';

export interface LegendItemProps {
  name: string;
  color: Color;
}

const LegendItem = ({ name, color }: LegendItemProps) => (
  <li className={classNames('mr-2.5 inline-flex items-center truncate text-gray-700')}>
    <svg
      className={classNames('h-2, mr-1.5 w-2 flex-none', composeColor(ColorType.text, color, 500))}
      fill="currentColor"
      viewBox="0 0 8 8"
    >
      <circle cx={4} cy={4} r={4} />
    </svg>
    <p className="truncate whitespace-nowrap text-sm">{name}</p>
  </li>
);

export interface LegendProps {
  categories: string[];
  colors?: Color[];
  className?: string;
}

const Legend = ({ categories, colors = themeColorRange, className }: LegendProps) => {
  return (
    <div className={className}>
      <ol className="m-0 flex list-none flex-wrap overflow-hidden truncate p-0">
        {categories.map((category, idx) => (
          <LegendItem key={`item-${idx}`} name={category} color={colors[idx]} />
        ))}
      </ol>
    </div>
  );
};

export default Legend;
