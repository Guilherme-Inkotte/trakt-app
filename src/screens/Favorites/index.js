import React, { useState, useEffect } from 'react';
import { Container, NoneMessageContainer, NoneMessage } from './styles.js';
import store from '../../store';

const Favorites = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    console.log(store.getState());
    // setMovies();
  }, []);

  return (
    <Container>
      {movies.length > 0 ? (
        <MovieList />
      ) : (
        <NoneMessageContainer>
          <NoneMessage>Você ainda não favoritou nenhum filme</NoneMessage>
        </NoneMessageContainer>
      )}
    </Container>
  );
};

export default Favorites;
