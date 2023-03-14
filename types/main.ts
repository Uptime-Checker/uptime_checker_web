import { ReactElement, SVGProps } from 'react';

export type HeroIcon = (
  props: SVGProps<SVGSVGElement> & {
    title?: string | undefined;
    titleId?: string | undefined;
  }
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
