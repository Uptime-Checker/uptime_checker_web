import { HeroIcon } from 'types/main';
import { Monitor } from './monitor';

export interface Check {
  id: number;
  content: string;
  location: string;
  date: string;
  icon: HeroIcon;
  iconBackground: string;
  monitor?: Monitor;
}
