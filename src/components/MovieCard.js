import React from 'react';
import { Text, Image } from 'react-native';
import styled from 'styled-components/native';
import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';
import { screenFont } from '../constants/Screen';

function components({ item }) {
  if (item.Error) return <></>;
  return (
    <Container key={item?.imdbID}>
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
      </BottomInfo>
    </Container>
  );
}

const Container = styled.TouchableOpacity`
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
`;

const MovieTitle = styled.Text`
  color: #fff;
  font-size: ${screenFont + 3}px;
  margin-left: 6px;
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

export default components;
