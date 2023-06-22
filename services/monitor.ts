import { isEnterPriseSubscription, isFreeSubscription, isStartupSubscription } from 'lib/global';
import { Assertion, AssertionComparison, AssertionSource } from 'models/assertion';
import { MonitorMethod } from 'models/monitor';
import { User } from 'models/user';
import { SelectOption } from 'types/main';
import { isEmpty } from 'utils/misc';

export const getNameValuePair = (nameValuePairInString: string) => {
  const pair: { name: string; value: string }[] = [];
  if (isEmpty(nameValuePairInString)) return pair;

  const parsedPair: { [key: string]: string } = JSON.parse(nameValuePairInString);
  for (const [key, value] of Object.entries(parsedPair)) {
    pair.push({ name: key, value });
  }
  return pair;
};

export const getNameValuePairFromURLQuery = (url: string) => {
  const query: { name: string; value: string }[] = [];
  if (isEmpty(url)) return query;

  const urlParams = new URLSearchParams(url.split('?')[1]); // Extract query parameters from URL
  urlParams.forEach((value, name) => {
    query.push({ name, value });
  });
  return query;
};

export const getAssertions = (assertions: Assertion[]) => {
  return assertions.map((assertion) => {
    return {
      source: assertion.Source,
      property: assertion.Property,
      comparison: assertion.Comparison,
      value: assertion.Value,
    };
  });
};

export const getAssertionSourceSelectionOptions = (): SelectOption[] => {
  return [
    {
      label: 'Status code',
      value: AssertionSource.StatusCode,
    },
    {
      label: 'Headers',
      value: AssertionSource.Headers,
    },
    {
      label: 'Text body',
      value: AssertionSource.TextBody,
    },
    {
      label: 'Response time',
      value: AssertionSource.ResponseTime,
    },
  ];
};

export const getAssertionComparisonSelectionOptions = (source: AssertionSource): AssertionComparison[] => {
  const allComparisons = Object.values(AssertionComparison)
    .filter((v) => !isNaN(Number(v)))
    .map((x) => Number(x));

  if (source === AssertionSource.StatusCode) {
    return [
      AssertionComparison.Equal,
      AssertionComparison.NotEqual,
      AssertionComparison.Greater,
      AssertionComparison.Lesser,
    ];
  } else if (source === AssertionSource.ResponseTime) {
    return [AssertionComparison.Greater, AssertionComparison.Lesser];
  } else if (source === AssertionSource.Headers || source === AssertionSource.TextBody) {
    return [
      AssertionComparison.Equal,
      AssertionComparison.NotEqual,
      AssertionComparison.Contain,
      AssertionComparison.NotContain,
      AssertionComparison.Empty,
      AssertionComparison.NotEmpty,
    ];
  }
  return allComparisons;
};

export const getMonitorMethodSelectionOptions = (): SelectOption[] => {
  return [
    {
      label: 'GET',
      value: MonitorMethod.Get,
    },
    {
      label: 'POST',
      value: MonitorMethod.Post,
    },
    {
      label: 'PUT',
      value: MonitorMethod.Put,
    },
    {
      label: 'PATCH',
      value: MonitorMethod.Patch,
    },
    {
      label: 'DELETE',
      value: MonitorMethod.Delete,
    },
  ];
};

export const getMonitorTimeoutSelectionOptions = (interval: number): SelectOption[] => {
  const allOptions = [
    {
      label: '5 seconds',
      value: 5,
    },
    {
      label: '10 seconds',
      value: 10,
    },
    {
      label: '30 seconds',
      value: 30,
    },
    {
      label: '60 seconds',
      value: 60,
    },
  ];

  return allOptions.filter((option) => option.value <= interval / 2);
};

export const getMonitorIntervalDefault = (user: User): number => {
  return isFreeSubscription(user) ? 300 : 60;
};

export const getMonitorIntervalSelectionOptions = (user: User): SelectOption[] => {
  return [
    {
      label: 'Every 10 seconds',
      value: 10,
      disabled: !isEnterPriseSubscription(user),
    },
    {
      label: 'Every 30 seconds',
      value: 30,
      disabled: !isStartupSubscription(user) && !isEnterPriseSubscription(user),
    },
    {
      label: 'Every minute',
      value: 60,
      disabled: isFreeSubscription(user),
    },
    {
      label: 'Every 2 minutes',
      value: 60 * 2,
      disabled: isFreeSubscription(user),
    },
    {
      label: 'Every 3 minutes',
      value: 60 * 3,
      disabled: isFreeSubscription(user),
    },
    {
      label: 'Every 5 minutes',
      value: 60 * 5,
      disabled: false,
    },
    {
      label: 'Every 15 minutes',
      value: 60 * 15,
      disabled: false,
    },
    {
      label: 'Every 30 minutes',
      value: 60 * 30,
      disabled: false,
    },
    {
      label: 'Every 1 hour',
      value: 60 * 60,
      disabled: false,
    },
    {
      label: 'Every 3 hours',
      value: 60 * 60 * 3,
      disabled: false,
    },
    {
      label: 'Every 6 hours',
      value: 60 * 60 * 6,
      disabled: false,
    },
    {
      label: 'Every 12 hours',
      value: 60 * 60 * 12,
      disabled: false,
    },
    {
      label: 'Every day',
      value: 60 * 60 * 24,
      disabled: false,
    },
  ];
};
