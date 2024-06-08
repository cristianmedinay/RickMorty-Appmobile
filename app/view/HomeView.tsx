import React, {useCallback, useEffect, useState} from 'react';
// eslint-disable-next-line prettier/prettier
import {FlatList,Button} from 'react-native';
import styled from 'styled-components/native';

import {CharacterItem} from '../components';
import {Character} from '../interfaces';
import {API, SEARCH} from '../utils';

const Container = styled.View`
  flex: 1;
  background-color: #02afc5;
  color: #a9f3fd;
`;

const FilterInput = styled.TextInput`
  margin: 10px;
  padding: 10px;
  border-width: 1px;
  border-color: white;
  border-radius: 10px;
`;

const CharacterList = styled.FlatList`
  flex: 1;
` as typeof FlatList<Character>;

const HomeScreen: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [count, Count] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [limit, setLimit] = useState(10);
  const [inicio, setInicio] = useState(0);
  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => {
    const fetchCharacters = async () => {
      let response: any = '';
      if (nameFilter.length > 0) {
        response = await SEARCH.getCharacters(page, nameFilter);
        const data = response.data.results as Character[];
        setCharacters(data);
      } else {
        response = await API.getCharacters(limit).then(data => data);
        const data = response as Character[];
        setCharacters(data);
      }
    };

    fetchCharacters();
  }, [page, limit, nameFilter, inicio]);

  const handleLoadMore = useCallback(() => {
    Count(count + 1);
    // eslint-disable-next-line eqeqeq
    if (count == 2) {
      setPage(page + 1);
      Count(0);
    } else {
      setPage(page);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const n = limit > 20 ? limit - 10 : 10;
    setInicio(n);
    setLimit(limit + 10);
  }, [page, limit, count]);

  const handleFilterChange = useCallback((text: string) => {
    setNameFilter(text);
  }, []);

  return (
    <Container>
      <FilterInput
        value={nameFilter}
        onChangeText={handleFilterChange}
        placeholder="Filtrar por nombres"
      />
      <CharacterList
        numColumns={2}
        data={characters}
        renderItem={({item}) => <CharacterItem item={item} />}
        keyExtractor={(item: Character) => item.id.toString()}
      />

      <Button title="Mostrar Mas" onPress={handleLoadMore} />
    </Container>
  );
};

export default HomeScreen;
