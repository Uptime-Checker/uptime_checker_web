export enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  HEAD = 'HEAD',
}

export interface Monitor {
  id?: number;
  name: string;
  url: string;
  method: HTTPMethod;
  interval: number;
  user_ids: [number];
  body: string;
}

export interface MonitorResponse {
  data: [Monitor];
}
