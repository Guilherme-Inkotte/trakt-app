import axios from 'axios';
import { Alert } from 'react-native';
import appConfig from '../../secret/appConfig.json';

if (!appConfig?.OMDB_API_KEY)
  Alert.alert(
    'Erro',
    'A key da api no OMDb é necessária em um arquivo secret/appConfig.json para realizar as requisições na api'
  );

export const host = 'http://www.omdbapi.com/';

const api = axios.create({
  baseURL: host,
});

export default api;
