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
