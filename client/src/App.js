/** @format */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from './pages/inicio/Inicio';
import LoginT from './pages/auth/LoginT';
import RegistroT from './pages/auth/RegistroT';
import LoginC from './pages/auth/LoginC';
import RegistroC from './pages/auth/RegistroC';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/loginC' element={<LoginC />} />
        <Route path='/registroC' element={<RegistroC />} />
        <Route path='/loginT' element={<LoginT />} />
        <Route path='/registroT' element={<RegistroT />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
