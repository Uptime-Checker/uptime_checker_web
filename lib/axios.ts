import axios, { AxiosInstance } from 'axios';

const client: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ELIXIR_API,
  timeout: 10000,
  headers: { X_API_KEY: process.env.NEXT_PUBLIC_ELIXIR_API_KEY! },
});

export const elixirClient = client;
