
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

test('input de filtro actualiza el estado y realiza la búsqueda', async () => {
  const { getByPlaceholderText } = render(<HomeScreen />);
  
  const input = getByPlaceholderText('Filtrar por nombres');
  
  // Simula la entrada de texto en el input
  fireEvent.changeText(input, 'Rick');

  expect(require('../utils').SEARCH.getCharacters).toHaveBeenCalledWith(1, 'Rick');
});
