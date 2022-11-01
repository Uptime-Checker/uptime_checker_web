import { User } from 'models/user';
import { CacheKey, cacheUtil } from './cache';

let CurrentUser: User | null = null;

export const setCurrentUser = (user: User) => {
  CurrentUser = user;
  cacheUtil.set(CacheKey.CurrentUser, user);
};

export const getCurrentUser = () => {
  if (CurrentUser !== null) {
    return CurrentUser;
  }
  const user = cacheUtil.get(CacheKey.CurrentUser);
  if (user !== null) {
    CurrentUser = user;
  }
  return user;
};
