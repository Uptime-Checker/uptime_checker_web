import { User } from 'models/user';
import { CacheKey, cacheUtil } from './cache';

export let CurrentUser: User | null = null;

export const setCurrentUser = (user: User) => {
  CurrentUser = user;
  cacheUtil.set(CacheKey.CurrentUser, user);
};
