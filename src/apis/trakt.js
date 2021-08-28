import axios from 'axios';
import { Alert } from 'react-native';
import appConfig from '../../secret/appConfig.json';

export const host = 'https://api.trakt.tv';

if (!appConfig?.TRAKT_API_CLIENT_ID)
  Alert.alert(
    'Erro',
    'O ClientId na api da Trakt é necessária em um arquivo secret/appConfig.json para realizar as requisições na api'
  );

const api = axios.create({
  baseURL: host,
});

api.interceptors.request.use(async (config) => {
  // Setting required headers for trakt API
  config.headers['Content-type'] = 'application/json';
  config.headers['trakt-api-key'] = appConfig.TRAKT_API_CLIENT_ID;
  config.headers['trakt-api-version'] = '2';
  return config;
});

export default api;
