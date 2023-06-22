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
      return 'Equal';
    case AssertionComparison.NotEqual:
      return 'Not equal';
    case AssertionComparison.Greater:
      return 'Greater';
    case AssertionComparison.Lesser:
      return 'Lesser';
    case AssertionComparison.Empty:
      return 'Empty';
    case AssertionComparison.NotEmpty:
      return 'Not empty';
    case AssertionComparison.Contain:
      return 'Contain';
    case AssertionComparison.NotContain:
      return 'Not contain';
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
  MonitorID: number;
}
