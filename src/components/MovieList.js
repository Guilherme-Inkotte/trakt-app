import React from 'react';
import { Text, Image, View } from 'react-native';
import styled from 'styled-components/native';
import Fonts from '../constants/Fonts';
import { screenFont } from '../constants/Screen';

function MovieList({ categoryTitle, movies }) {
  return (
    <Container>
      <CategoryTitle>{categoryTitle}</CategoryTitle>
      <MovieFlatList
        data={movies}
        renderItem={({ item }) => {
          console.log(item.Poster);
          return (
            <View>
              <Text>{item.movie.title}</Text>
              <Image
                source={{
                  uri: item.Poster,
                }}
                style={{ height: 100 }}
              />
            </View>
          );
        }}
        horizontal={true}
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
  font-size: ${screenFont + 4};
  margin-left: 16;
`;

const MovieFlatList = styled.FlatList`
  width: 100%;
`;

export default MovieList;
