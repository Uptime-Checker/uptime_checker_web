import axios from 'axios';

export const basicClient = axios.create({
  baseURL: process.env.ELIXIR_API,
  timeout: 10000,
  headers: { X_API_KEY: process.env.ELIXIR_API_KEY },
});
