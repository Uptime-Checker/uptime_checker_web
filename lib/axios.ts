import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, HttpStatusCode } from 'axios';
import { getAccessToken, logout } from './global';

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

export const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.ELIXIR_API,
  timeout: 10000,
  headers: { X_API_KEY: process.env.ELIXIR_API_KEY! },
});

export const addToken = (token: string) => {
  client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const authRequest = async <T = any, R = AxiosResponse<T>, D = any>(
  config: AxiosRequestConfig<D>,
  shouldLogout = true
): Promise<R> => {
  try {
    const token = getAccessToken();
    if (!token) {
      return <R>await logout();
    } else {
      addToken(token);
    }
    return await client.request<T, R, D>(config);
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.status === HttpStatusCode.Unauthorized &&
      shouldLogout
    ) {
      await logout();
    }
    throw error;
  }
};

export const elixirClient = client;
