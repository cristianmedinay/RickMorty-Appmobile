import React from 'react';
import {Character} from '../interfaces';
import styled from 'styled-components/native';

import {useNavigate} from '../hooks/navigation';

const StyledCharacterItem = styled.TouchableOpacity`
  flex: 1;
`;

const StyledCharacterImage = styled.Image`
  flex: 1;
  aspect-ratio: 1/1;
  border-radius: 4px;
`;

const StyledCharacterContent = styled.View`
  height: 50px;
  line-height: 6px;
  background-color: #8da8ff;
`;

const StyledCharacterName = styled.Text`
  weight: bold;
  text-align: center;
  font-family: ${props => props.theme.fontFamily};
`;

export const CharacterItem = ({item}: {item: Character}) => {
  const navigation = useNavigate();

  return (
    <StyledCharacterItem
      onPress={() => navigation.navigate('Detail', {id: item.id})}>
      <StyledCharacterImage source={{uri: item.image}} />

      <StyledCharacterContent>
        <StyledCharacterName>{item.name}</StyledCharacterName>
        <StyledCharacterName>Info</StyledCharacterName>
      </StyledCharacterContent>
    </StyledCharacterItem>
  );
};
