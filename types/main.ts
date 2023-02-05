import { JSXElementConstructor, ReactElement, SVGProps } from 'react';

export type HeroIcon = (
  props: SVGProps<SVGSVGElement> & {
    title?: string | undefined;
    titleId?: string | undefined;
  }
) => ReactElement<any, string | JSXElementConstructor<any>> | null;

export interface RowOption {
  name: string;
  icon: HeroIcon;
}

export interface TabNavigationItem {
  name: string;
  href: string;
  count?: number;
}
