import React from 'react';
import styled from 'styled-components/native';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';
import { screenFont } from '../constants/Screen';
import store from '../store';
import { removeSelectedMovie } from '../actions';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MovieModal = ({ selectedMovie }) => {
  return (
    <BackgroundShadow
      activeOpacity={0.8}
      onPress={() => store.dispatch(removeSelectedMovie())}
    >
      <TouchableWithoutFeedback>
        <InnerContainer>
          <CloseContainer>
            <Ionicons
              name="close-circle-outline"
              color="#FFF"
              size={screenFont + 12}
              onPress={() => store.dispatch(removeSelectedMovie())}
            />
          </CloseContainer>
          {selectedMovie?.Poster != 'N/A' ? (
            <CardImage
              source={{
                uri: selectedMovie?.Poster,
              }}
            />
          ) : (
            <NotAvailableContainer>
              <NotAvailable>Imagem indisponível :(</NotAvailable>
            </NotAvailableContainer>
          )}
          <BottomContainer>
            <Row>
              <Title numberOfLines={1}>{selectedMovie?.Title}</Title>
              <RatingContainer>
                <Rating>{selectedMovie?.imdbRating}</Rating>
                <Ionicons
                  name="star"
                  color={Colors.mainRed}
                  size={screenFont + 4}
                />
              </RatingContainer>
            </Row>
            <Synopsis numberOfLines={10}>{selectedMovie?.Plot}</Synopsis>
          </BottomContainer>
        </InnerContainer>
      </TouchableWithoutFeedback>
    </BackgroundShadow>
  );
};

const BackgroundShadow = styled.TouchableOpacity`
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const InnerContainer = styled.View`
  background-color: #000;
  height: 90%;
  width: 90%;
  border-color: ${Colors.mainRed};
  border-left-width: 4px;
`;

const CloseContainer = styled.TouchableOpacity`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 100;
`;

const Title = styled.Text`
  color: #fff;
  font-family: ${Fonts.mainBold};
  font-size: ${screenFont + 8}px;
`;

const CardImage = styled.Image`
  flex: 1;
`;

const NotAvailableContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const NotAvailable = styled.Text`
  color: #fff;
  font-size: ${screenFont + 2}px;
  text-align: center;
`;

const BottomContainer = styled.View`
  flex: 1;
  padding: 16px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Rating = styled.Text`
  color: ${Colors.mainRed};
  font-family: ${Fonts.mainBold};
  font-size: ${screenFont + 2}px;
  margin: 0 8px;
`;

const Synopsis = styled.Text`
  margin-top: 16px;
  color: #fff;
  font-family: ${Fonts.main};
  font-size: ${screenFont + 2}px;
  line-height: ${screenFont + 8}px;
  flex: 1;
`;

export default MovieModal;
