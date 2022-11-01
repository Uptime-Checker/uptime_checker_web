import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getAccessToken } from './global';

const UNAUTHENTICATED = 401;

export enum HTTPMethod {
  DELETE = 'DELETE',
  GET = 'GET',
  HEAD = 'HEAD',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT',
}

const client: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ELIXIR_API,
  timeout: 10000,
  headers: { X_API_KEY: process.env.NEXT_PUBLIC_ELIXIR_API_KEY! },
});

export const addToken = (token: string) => {
  client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const authClientRequest = async <T = any, R = AxiosResponse<T>, D = any>(
  config: AxiosRequestConfig<D>
): Promise<R> => {
  try {
    const token = getAccessToken();
    if (token === null) {
      redirectToAuth();
      return <R>await Promise.resolve();
    } else {
      addToken(token);
    }
    return await client.request<T, R, D>(config);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      if (error.response.status === UNAUTHENTICATED) {
        redirectToAuth();
        return <R>await Promise.resolve();
      } else {
        throw error;
      }
    } else {
      throw error;
    }
  }
};

const redirectToAuth = () => {
  window.location.replace(`${window.location.origin}/auth`);
};

export const elixirClient = client;
