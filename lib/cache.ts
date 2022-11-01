import { User } from 'models/user';

export enum CacheKey {
  Email = 'email',
  AccessToken = 'access_token',
  CurrentUser = 'current_user',
}

interface CacheValues {
  [CacheKey.Email]: string | null;
  [CacheKey.AccessToken]: string | null;
  [CacheKey.CurrentUser]: User | null;
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
    return val === null ? null : JSON.parse(val);
  },
  remove: (key) => localStorage.removeItem(key),
  removeAll: () => localStorage.clear(),
};
