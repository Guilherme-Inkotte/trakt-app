import styled from 'styled-components/native';
import { screenFont } from '../../constants/Screen';
import Fonts from '../../constants/Fonts';

export const Container = styled.View`
  flex: 1;
  background-color: #000;
`;

export const MovieList = styled.FlatList`
  flex: 1;
  background-color: 'red';
`;

export const NoneMessageContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const NoneMessage = styled.Text`
  color: #fff;
  font-size: ${screenFont + 3}px;
  font-family: ${Fonts.mainBold};
`;
