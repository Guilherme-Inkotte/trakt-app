// Registra os métodos que alteram o estado do Redux
export default function reducer(state = [], action) {
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
