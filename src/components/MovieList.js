import React from 'react';
import styled from 'styled-components/native';
import Fonts from '../constants/Fonts';
import { screenFont } from '../constants/Screen';
import MovieCard from './MovieCard';

function MovieList({ categoryTitle, movies }) {
  return (
    <Container>
      <CategoryTitle>{categoryTitle}</CategoryTitle>
      <MovieFlatList
        data={movies}
        renderItem={MovieCard}
        horizontal={true}
        contentContainerStyle={{ paddingLeft: 16 }}
      />
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
`;

const CategoryTitle = styled.Text`
  font-family: ${Fonts.main};
  color: #fff;
  font-size: ${screenFont + 6}px;
  margin-left: 16px;
  margin-bottom: 8px;
`;

const MovieFlatList = styled.FlatList`
  width: 100%;
  margin-bottom: 20px;
`;

export default MovieList;
