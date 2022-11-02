import * as Sentry from '@sentry/nextjs';
import { signOut } from 'firebase/auth';
import { auth } from 'lib/firebase';
import { User } from 'models/user';
import { CacheKey, cacheUtil } from './cache';

let CurrentUser: User | null = null;
let AccessToken: string | null = null;

export const setCurrentUser = (user: User) => {
  CurrentUser = user;
  cacheUtil.set(CacheKey.CurrentUser, user);
};

export const setAccessToken = (token: string) => {
  AccessToken = token;
  cacheUtil.set(CacheKey.AccessToken, token);
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

export const getAccessToken = () => {
  if (AccessToken !== null) {
    return AccessToken;
  }
  const token = cacheUtil.get(CacheKey.AccessToken);
  if (token !== null) {
    AccessToken = token;
  }
  return token;
};

export const logout = async () => {
  try {
    await signOut(auth);
    cacheUtil.remove(CacheKey.AccessToken);
    cacheUtil.remove(CacheKey.CurrentUser);
    redirectToAuth();
  } catch (error) {
    Sentry.captureException(error);
  }
};

const redirectToAuth = () => {
  window.location.replace(`${window.location.origin}/auth`);
};

export const redirectToDashboard = (user: User) => {
  const nextPath = user.organization === null ? '/onboarding' : '/dashboard';
  window.location.replace(`${window.location.origin}/${nextPath}`);
};
