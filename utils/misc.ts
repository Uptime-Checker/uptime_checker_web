export const randomString = (length: number) =>
  [...Array(length)].map(() => (~~(Math.random() * 36)).toString(36)).join('');

export const toUpper = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
