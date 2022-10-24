interface Value {}

export enum CacheKey {
  Email = 'email',
}

interface CacheValues {
  [CacheKey.Email]: Value;
}

interface CacheUtil {
  set: <T extends CacheKey>(key: T, object: CacheValues[T]) => void;
  get: <T extends CacheKey>(key: T) => CacheValues[T];
  remove: (key: CacheKey) => void;
  removeAll: () => void;
}

export const cacheUtil: CacheUtil = {
  set: (key, object) => {
    localStorage.setItem(key, JSON.stringify(object));
  },
  get: (key) => {
    const val = localStorage.getItem(key);
    return val == null ? {} : JSON.parse(val);
  },
  remove: (key) => localStorage.removeItem(key),
  removeAll: () => localStorage.clear(),
};
