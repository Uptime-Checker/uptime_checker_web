import { HTTPMethod } from 'lib/axios';

export enum MonitorStatus {
  PASSING = 'passing',
  FAILING = 'failing',
  DEGRADED = 'degraded',
  MAINTENANCE = 'maintenance',
}

export interface Monitor {
  id?: number;
  name: string;
  url: string;
  method: HTTPMethod;
  status: MonitorStatus;
  interval: number;
  user_ids: number[];
  body: string;
}

export interface MonitorResponse {
  data: [Monitor];
}
