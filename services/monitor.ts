import { isFreeSubscription } from 'lib/global';
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

export const getMonitorIntervalSelectionOptions = (user: User): SelectOption[] => {
  return [
    {
      label: 'Every 10 seconds',
      value: 10,
      disabled: isFreeSubscription(user),
    },
    {
      label: 'Every 30 seconds',
      value: 30,
      disabled: isFreeSubscription(user),
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
