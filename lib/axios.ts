import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getAccessToken, logout } from './global';

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

export const authRequest = async <T = any, R = AxiosResponse<T>, D = any>(
  config: AxiosRequestConfig<D>
): Promise<R> => {
  try {
    const token = getAccessToken();
    if (token === null) {
      return <R>await logout();
    } else {
      addToken(token);
    }
    return await client.request<T, R, D>(config);
  } catch (error) {
    if (error instanceof AxiosError && error.response && error.response.status === UNAUTHENTICATED) {
      await logout();
    }
    throw error;
  }
};

export const elixirClient = client;
