import { SVGProps } from 'react';

export type HeroIcon = (
  props: SVGProps<SVGSVGElement> & {
    title?: string | undefined;
    titleId?: string | undefined;
  }
) => JSX.Element;
