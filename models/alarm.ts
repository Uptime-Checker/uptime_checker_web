import { Monitor } from './monitor';

export interface Alarm {
  id: number;
  status: string;
  startedAt: string;
  resolvedAt: string;
  duration: string;
  monitor?: Monitor;
}
