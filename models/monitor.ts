import { Assertion } from './assertion';

export interface Region {
  ID: number;
  Name: string;
  Key: string;
  IPAddress?: string;
  Default: boolean;
  Checked: boolean;
}

export interface RegionResponse {
  data: Region[];
}

export enum ResponseTimeKey {
  TotalTime = 'TotalTime',
  DNSLookupTime = 'DNSLookupTime',
  TCPConnectTime = 'TCPConnectTime',
  TLSHandshakeTime = 'TLSHandshakeTime',
  ServerProcessingTime = 'ServerProcessingTime',
  TransferTime = 'TransferTime',
}

export enum MonitorStatus {
  PASSING = 'passing',
  FAILING = 'failing',
  DEGRADED = 'degraded',
  MAINTENANCE = 'maintenance',
}

export enum MonitorMethod {
  Get = 1,
  Post = 2,
  Put = 3,
  Patch = 4,
  Delete = 5,
}

export interface Monitor {
  ID?: number;
  Name: string;
  URL: string;
  Method: MonitorMethod;
  Status: MonitorStatus;
  Interval: number;
  Timeout: number;
  CheckSsl: boolean;
  FollowRedirects: boolean;
  Body: string;
  Headers: string;
  Username?: string;
  Password?: string;
  GlobalAlarmSettings: boolean;
}

export interface MonitorAll extends Monitor {
  Regions: Region[];
  Assertions: Assertion[];
}

export interface SingleMonitorResponse {
  data: MonitorAll;
}

export interface MonitorResponse {
  data: Monitor[];
}

export enum IntegrationType {
  Email = 1,
  Webhook = 2,
  Slack = 3,
  Teams = 4,
  Discord = 5,
}

export interface Integration {
  ID: number;
  Type: IntegrationType;
  ExternalID: string | null;
  OrganizationID: number;
  Config: string;
}

export interface SingleIntegrationResponse {
  data: Integration;
}

export interface IntegrationResponse {
  data: Integration[];
}
