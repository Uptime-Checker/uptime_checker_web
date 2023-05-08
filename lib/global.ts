import { setUserId, setUserProperties } from '@firebase/analytics';
import * as Sentry from '@sentry/nextjs';
import axios from 'axios';
import { analytics } from 'lib/firebase';
import { ProductTier } from 'models/subscription';
import { User } from 'models/user';
import { signOut } from 'next-auth/react';
import { CacheKey, cacheUtil } from './cache';

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

export const isFreeSubscription = (user: User | null) => {
  if (!user) return true;
  if (!user.Subscription) return true;
  if (!user.Subscription.Product) return true;
  return user.Subscription.Product.Tier === ProductTier.free;
};

export const logout = async () => {
  try {
    // iron session
    await axios.post('/api/logout');
    cacheUtil.remove(CacheKey.AccessToken);
    cacheUtil.remove(CacheKey.CurrentUser);
    // next auth
    await signOut({ callbackUrl: `${window.location.origin}/auth` });
  } catch (error) {
    Sentry.captureException(error);
  }
};

export const redirectToAuth = () => {
  window.location.replace(`${window.location.origin}/auth`);
};

export const redirectToDashboard = (user: User) => {
  const nextPath = user.Organization ? `${user.Organization.Slug}/monitors` : 'onboarding';
  window.location.replace(`${window.location.origin}/${nextPath}`);
};

export const AppName = process.env.APP_NAME || process.env.NEXT_PUBLIC_APP_NAME;
