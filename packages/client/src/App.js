/** @format */

import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Views from './components/Views';
import { ColorModeScript } from '@chakra-ui/color-mode';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import ToggleColorMode from './components/ToggleColorMode.jsx';
import UserContext from './components/AccountContex.jsx';
import Navbar from './components/Navbar.jsx';
import container2 from './styles/container2.css';
import containernavbar from './styles/containernavbar.css';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <UserContext>
          <div className="navbar-container">
            <Navbar />
          </div>
          <div className='container2'>
            <Views />
          </div>
          {/* <ToggleColorMode /> */}
        </UserContext>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
