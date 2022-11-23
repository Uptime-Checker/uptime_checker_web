export interface ElixirError {
  code: string;
  message: string;
  request_id: string;
  details: any;
}

interface ErrorDictionary<T> {
  [Key: string]: T;
}

export interface BackendError {
  errors: ErrorDictionary<string[]>;
}
