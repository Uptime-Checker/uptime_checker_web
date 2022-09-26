import axios from 'axios';

export const elixirClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ELIXIR_API,
  timeout: 10000,
  headers: { X_API_KEY: process.env.NEXT_PUBLIC_ELIXIR_API_KEY },
});
