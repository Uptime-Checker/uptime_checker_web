import { setUserId, setUserProperties } from '@firebase/analytics';
import * as Sentry from '@sentry/nextjs';
import { analytics } from 'lib/firebase';
import { User } from 'models/user';
import { CacheKey, cacheUtil } from './cache';
import axios from 'axios';

let CurrentUser: User | null = null;
let AccessToken: string | null = null;

export const setCurrentUser = async (user: User) => {
  CurrentUser = user;
  cacheUtil.set(CacheKey.CurrentUser, user);
  Sentry.setUser({ id: `${user.ID}`, email: user.Email });

  const firAnalytics = await analytics;
  if (firAnalytics) {
    setUserId(firAnalytics, `${user.ID}`);
    setUserProperties(firAnalytics, { email: user.Email, name: user.Name });
  }
};

export const setAccessToken = (token: string) => {
  AccessToken = token;
  cacheUtil.set(CacheKey.AccessToken, token);
};

export const getCurrentUser = () => {
  if (CurrentUser) {
    return CurrentUser;
  }
  const user = cacheUtil.get(CacheKey.CurrentUser);
  if (user) {
    CurrentUser = user;
  }
  return user;
};

export const getAccessToken = () => {
  if (AccessToken) {
    return AccessToken;
  }
  const token = cacheUtil.get(CacheKey.AccessToken);
  if (token) {
    AccessToken = token;
  }
  return token;
};

export const logout = async () => {
  try {
    await axios.post('/api/logout');
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
  const nextPath = user.Organization ? `${user.Organization.Slug}/monitors` : 'onboarding';
  window.location.replace(`${window.location.origin}/${nextPath}`);
};
