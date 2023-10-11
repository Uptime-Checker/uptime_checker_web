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

export enum ResponseTraceKey {
  TotalTime = 'TotalTime',
  DNSLookupTime = 'DNSLookupTime',
  TCPConnectTime = 'TCPConnectTime',
  TLSHandshakeTime = 'TLSHandshakeTime',
  ServerProcessingTime = 'ServerProcessingTime',
  TransferTime = 'TransferTime',
}

export interface HitResponse {
  StatusCode: number;
  Duration: number;
  Size: number;
  ContentType: string;
  Body?: string;
  Headers: { [key: string]: string };
  Traces: { [key: string]: string };
}

export interface SingleHitResponse {
  data: HitResponse;
  error?: string;
}
