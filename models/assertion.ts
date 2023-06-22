export enum AssertionSource {
  StatusCode = 1,
  TextBody = 2,
  Headers = 3,
  ResponseTime = 4,
  JSONBody = 5,
}

export enum AssertionComparison {
  Equal = 1,
  NotEqual = 2,
  Greater = 3,
  Lesser = 4,
  Empty = 5,
  NotEmpty = 1,
  Contain = 2,
  NotContain = 3,
  Null = 4,
  NotNull = 5,
  HasKey = 2,
  NotHasKey = 3,
  HasValue = 4,
  NotHasValue = 5,
}

export interface Assertion {
  ID?: number;
  Property?: string;
  Value: string;
  Source: AssertionSource;
  Comparison: AssertionComparison;
  MonitorID: number;
}
