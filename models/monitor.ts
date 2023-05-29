import { HTTPMethod } from 'lib/axios';

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

export interface Region {
  ID: number;
  Name: string;
  Key: string;
  IPAddress?: string;
  Default: boolean;
}

export interface RegionResponse {
  data: Region[];
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
