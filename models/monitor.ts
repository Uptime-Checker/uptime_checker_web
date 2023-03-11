import { HTTPMethod } from 'lib/axios';

export enum ResponseTimeKey {
  TotalTime = 'TotalTime',
  DNSLookupTime = 'DNSLookupTime',
  TCPConnectTime = 'TCPConnectTime',
  TLSHandshakeTime = 'TLSHandshakeTime',
  FirstResponseTime = 'FirstResponseTime',
  ResponseTime = 'ResponseTime',
}

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
  body: string;
}

export interface MonitorResponse {
  data: Monitor[];
}
