import React from 'react';

import {ThemeProvider} from 'styled-components';
import {Navigation} from './app/navigation/navigation';

const App: React.FC = () => {
  return (
    <ThemeProvider
      theme={{
        fontFamily: 'MontserratAlternates-Bold',
        backgroundColor: '#02afc5',
      }}>
      <Navigation />
    </ThemeProvider>
  );
};

export default App;
