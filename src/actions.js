import omdb from './apis/omdb';
import appConfig from '../secret/appConfig.json';

// Registra e exporta as ações utilizadas pelos dispatches do Redux
export const addFavorite = (movie) => ({
  type: 'ADD_FAVORITE',
  payload: { movie },
});

export const removeFavorite = (movie) => ({
  type: 'REMOVE_FAVORITE',
  payload: { movie },
});

export const toggleFavorite = (movie) => ({
  type: 'TOGGLE_FAVORITE',
  payload: { movie },
});

export const fetchSelectedMovie = (imdbID) => ({
  type: 'FETCH_SELECTED_MOVIE',
  payload: omdb
    .get(`?apikey=${appConfig.OMDB_API_KEY}&i=${imdbID}`)
    .then((response) => response.data),
});

export const removeSelectedMovie = () => ({
  type: 'REMOVE_SELECTED_MOVIE',
  payload: null,
});
