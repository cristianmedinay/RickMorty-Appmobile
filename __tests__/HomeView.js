import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import HomeScreen from './HomeView';

jest.mock('../utils', () => ({
  API: {
    getCharacters: jest.fn(() => Promise.resolve({ data: [] })),
  },
  SEARCH: {
    getCharacters: jest.fn(() => Promise.resolve({ data: { results: [] } })),
  },
}));

test('botón "Mostrar Más" carga más personajes', async () => {
  const { getByText } = render(<HomeScreen />);

  // Verifica que el botón "Mostrar Más" está presente
  const button = getByText('Mostrar Mas');
  expect(button).toBeTruthy();

  //pulsar el boton
  fireEvent.press(button);

  //verifica caracteres
  expect(require('../utils').API.getCharacters).toHaveBeenCalled();
});
