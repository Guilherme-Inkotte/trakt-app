import React from 'react';
import styled from 'styled-components/native';
import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';
import { screenFont } from '../constants/Screen';
import store from '../store';
import { toggleFavorite } from '../actions';
import Ionicons from 'react-native-vector-icons/Ionicons';

function MovieCard({ item, index }) {
  if (item.Error) return <></>;
  return (
    <Container>
      {item?.Poster != 'N/A' ? (
        <CardImage
          source={{
            uri: item?.Poster,
          }}
        />
      ) : (
        <NotAvailableContainer>
          <NotAvailable>Imagem indisponível :(</NotAvailable>
        </NotAvailableContainer>
      )}
      <BottomInfo>
        <MovieTitle numberOfLines={1}>{item?.Title}</MovieTitle>
        <Ionicons
          name={item.isFavorite ? 'heart' : 'heart-outline'}
          size={20}
          color={item.isFavorite ? Colors.mainRed : '#FFF'}
          onPress={() => store.dispatch(toggleFavorite(item))}
        />
      </BottomInfo>
    </Container>
  );
}

const Container = styled.View`
  height: 280px;
  width: 160px;
  margin-right: 16px;
  border-color: ${Colors.mainRed};
  border-left-width: 4px;
`;

const CardImage = styled.Image`
  flex: 1;
`;

const BottomInfo = styled.View`
  height: 40px;
  background-color: #000;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const MovieTitle = styled.Text`
  color: #fff;
  font-size: ${screenFont + 3}px;
  margin-left: 6px;
  flex: 1;
`;

const NotAvailableContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const NotAvailable = styled.Text`
  color: #fff;
  font-size: ${screenFont}px;
  text-align: center;
`;

export default MovieCard;
