import { ReactElement, RefAttributes, SVGProps } from 'react';

export type HeroIcon = (
  props: Omit<SVGProps<SVGSVGElement>, 'ref'> & {
    title?: string | undefined;
    titleId?: string | undefined;
  } & RefAttributes<SVGSVGElement>
) => ReactElement | null;

export type IconProps = {
  className?: string;
};

export type LocalIcon = ({ className }: IconProps) => JSX.Element;

export interface RowOption {
  name: string;
  icon: HeroIcon;
  destruct: boolean;
}

export interface TabNavigationItem {
  name: string;
  href: string;
  count?: number;
}
