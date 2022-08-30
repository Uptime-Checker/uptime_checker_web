import axios from 'axios';

export const elixirClient = axios.create({
  baseURL: process.env.ELIXIR_API,
  timeout: 10000,
  headers: { X_API_KEY: process.env.ELIXIR_API_KEY },
});
