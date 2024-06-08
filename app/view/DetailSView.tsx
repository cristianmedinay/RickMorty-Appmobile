import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, Text} from 'react-native';
import styled from 'styled-components/native';

import {Bounce} from '../animations/animation';
import OpenLinkInBrowser from '../components/OpenDetail';
import {Character} from '../interfaces';
import {API} from '../utils';

const Container = styled.View`
  flex: 1;
  background-color: #a3c3ff;
  color: black;
`;

const Image = styled.Image`
  width: 150px;
  height: 150px;
  text-align: center;
`;

const Info = styled.View`
  padding: 10px;
  padding-top: 10px;
`;

const Title = styled.Text`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #303032;
`;

const Detail = styled.Text`
  font-size: 18px;
  margin-bottom: 5px;
  color: black;
  font-family: ${props => props.theme.fontFamily};
`;

const DetailScreen: React.FC = () => {
  const [character, setCharacter] = useState<Character | null>(null);
  const route = useRoute();
  const params = route.params as {id: number};

  useEffect(() => {
    const fetchCharacter = async () => {
      const response = await API.getCharacter(params?.id);
      const data = response.data as Character;
      setCharacter(data);
    };

    fetchCharacter();
  }, [params]);

  if (!character) {
    return <Text>Cargando...</Text>;
  }

  return (
    <Container>
      <Bounce>
        <Image source={{uri: character.image}} />
      </Bounce>
      <Info>
        <Title>{character.name}</Title>
        <Detail>Estatus: {character.status}</Detail>
        <Detail>Especie: {character.species}</Detail>
        <Detail>
          Episodios:
          <FlatList
            numColumns={1}
            data={character.episode}
            renderItem={OpenLinkInBrowser}
            keyExtractor={(item: string) => item}
          />
        </Detail>
      </Info>
    </Container>
  );
};

export default DetailScreen;
