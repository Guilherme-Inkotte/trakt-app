import axios from 'axios';

export const host = 'https://api.trakt.tv';

const api = axios.create({
  baseURL: host,
});

api.interceptors.request.use(async (config) => {
  // Setting required headers for trakt API
  config.headers['Content-type'] = 'application/json';
  config.headers['trakt-api-key'] = process.env.TRAKT_API_CLIENT_ID;
  config.headers['trakt-api-version'] = '2';
  return config;
});

export default api;
