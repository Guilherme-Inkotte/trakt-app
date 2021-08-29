import React, { useState, useEffect } from 'react';
import {
  Container,
  NoneMessageContainer,
  NoneMessage,
  MovieList,
} from './styles.js';
import FavoriteCard from '../../components/FavoriteCard';
import store from '../../store';
import { RefreshControl, ScrollView } from 'react-native';

const Favorites = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });

    store.subscribe(() => {
      getData();
    });
    return unsubscribe;
  }, [navigation]);

  function getData() {
    setLoading(true);
    setMovies(store.getState());
    setLoading(false);
  }

  return (
    <Container>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => getData()} />
        }
      >
        {movies.length > 0 ? (
          <MovieList
            numColumns={2}
            contentContainerStyle={{
              paddingHorizontal: 16,
            }}
            data={movies}
            renderItem={FavoriteCard}
            keyExtractor={(item) => item.imdbID}
          />
        ) : (
          <NoneMessageContainer>
            <NoneMessage>Você ainda não favoritou nenhum filme</NoneMessage>
          </NoneMessageContainer>
        )}
      </ScrollView>
    </Container>
  );
};

export default Favorites;
