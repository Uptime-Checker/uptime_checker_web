import { setUserId, setUserProperties } from '@firebase/analytics';
import { signOut } from '@firebase/auth';
import * as Sentry from '@sentry/nextjs';
import { analytics, auth } from 'lib/firebase';
import { User } from 'models/user';
import { CacheKey, cacheUtil } from './cache';

let CurrentUser: User | null = null;
let AccessToken: string | null = null;

export const setCurrentUser = async (user: User) => {
  CurrentUser = user;
  cacheUtil.set(CacheKey.CurrentUser, user);
  Sentry.setUser({ id: `${user.ID}`, email: user.Email });

  const firAnalytics = await analytics;
  if (firAnalytics !== null) {
    setUserId(firAnalytics, `${user.ID}`);
    setUserProperties(firAnalytics, { email: user.Email, name: user.Name });
  }
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
  const nextPath = user.Organization === null ? 'onboarding' : `${user.Organization.slug}/monitors`;
  window.location.replace(`${window.location.origin}/${nextPath}`);
};
