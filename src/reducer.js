import { combineReducers } from 'redux';

// Registra os métodos que alteram o estado do Redux
function favoriteReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return [...state, action.payload.movie];
    case 'REMOVE_FAVORITE':
      return state.filter(
        (movie) => movie.imdbID !== action.payload.movie.imdbID
      );
    case 'TOGGLE_FAVORITE':
      if (state.some((movie) => movie.imdbID === action.payload.movie.imdbID))
        return state.filter(
          (movie) => movie.imdbID !== action.payload.movie.imdbID
        );
      else return [...state, action.payload.movie];
    default:
      return state;
  }
}

const defaultState = {
  isPending: true,
  movie: null,
};

function selectedMovieReducer(state = defaultState, action) {
  switch (action.type) {
    case 'FETCH_SELECTED_MOVIE_PENDING':
      return defaultState;

    case 'FETCH_SELECTED_MOVIE_FULFILLED':
      return {
        isPending: false,
        image: action.payload.movie,
      };

    default:
      return state;
  }
}

export default rootReducer = combineReducers({
  favorite: favoriteReducer,
  selectedMovie: selectedMovieReducer,
});
