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
  NotEmpty = 6,
  Contain = 7,
  NotContain = 8,
  Null = 9,
  NotNull = 10,
  HasKey = 11,
  NotHasKey = 12,
  HasValue = 13,
  NotHasValue = 14,
}

export const getAssertionComparisonString = (assertionComparison: AssertionComparison) => {
  switch (assertionComparison) {
    case AssertionComparison.Equal:
      return 'Equals';
    case AssertionComparison.NotEqual:
      return 'Not equals';
    case AssertionComparison.Greater:
      return 'Greater than';
    case AssertionComparison.Lesser:
      return 'Lesser than';
    case AssertionComparison.Empty:
      return 'Empty';
    case AssertionComparison.NotEmpty:
      return 'Not empty';
    case AssertionComparison.Contain:
      return 'Contains';
    case AssertionComparison.NotContain:
      return 'Not contains';
    case AssertionComparison.Null:
      return 'Null';
    case AssertionComparison.NotNull:
      return 'Not null';
    case AssertionComparison.HasKey:
      return 'Has key';
    case AssertionComparison.NotHasKey:
      return 'Not has key';
    case AssertionComparison.HasValue:
      return 'Has value';
    case AssertionComparison.NotHasValue:
      return 'Not has value';
  }
};

export interface Assertion {
  ID?: number;
  Property?: string;
  Value: string;
  Source: AssertionSource;
  Comparison: AssertionComparison;
  MonitorID?: number;
}

export interface AssertionRequestBody {
  property?: string;
  value: string;
  source: AssertionSource;
  comparison: AssertionComparison;
}
