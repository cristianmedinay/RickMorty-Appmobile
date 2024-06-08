import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import DetailScreen from './DetailScreen';
import { API } from '../../app/utils/API';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('../../app/utils/API', () => ({
  API: {
    getCharacter: jest.fn(),
  },
}));

const characterMock = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  origin: { name: 'Earth' },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: ['Episode 1', 'Episode 2'],
};

API.getCharacter.mockResolvedValue({ data: characterMock });

test('renderiza el componente DetailScreen correctamente', async () => {
  const route = { params: { id: 1 } };

  const { getByText, getByPlaceholderText, getByRole } = render(
    <NavigationContainer>
      <DetailScreen route={route} />
    </NavigationContainer>
  );

  // Espera a que los datos del personaje se carguen y se rendericen
  await waitFor(() => {
    expect(getByText('Rick Sanchez')).toBeTruthy();
    expect(getByText('Estatus: Alive')).toBeTruthy();
    expect(getByText('Especie: Human')).toBeTruthy();
    expect(getByText('Género: Male')).toBeTruthy();
    expect(getByText('Origen: Earth')).toBeTruthy();
    expect(getByText('Episodios: Episode 1, Episode 2')).toBeTruthy();
  });
});