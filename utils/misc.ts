export const randomString = (length: number) =>
  [...Array(length)].map(() => (~~(Math.random() * 36)).toString(36)).join('');

export const booleanify = (value: string): boolean => {
  const truthy: string[] = ['true', 'True', '1'];

  return truthy.includes(value);
};

export const toUpper = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const sanitizeString = (str: string) => {
  const newStr = str.replace(/[^a-z0-9áéíóúñü _-]/gim, '');
  return newStr.trim();
};

export const addDays = (date: Date, days: number) => {
  date.setDate(date.getDate() + days);
  return date;
};

export const isEmpty = (str: string) => {
  if (str === undefined || str === null) {
    return true;
  }
  return str === '';
};
