/** @format */

import React, { useState, useEffect } from 'react';
import { BrowserRouter} from 'react-router-dom';
import Views from './components/Views';
import { ColorModeScript } from '@chakra-ui/color-mode';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import ToggleColorMode from './components/ToggleColorMode.jsx';

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Views />
        <ToggleColorMode />
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
