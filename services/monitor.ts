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
