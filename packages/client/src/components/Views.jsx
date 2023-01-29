/** @format */

import { Route, Routes } from 'react-router-dom';
import Inicio from '../pages/inicio/Inicio';
import LoginT from '../pages/auth/LoginT';
import RegistroT from '../pages/auth/RegistroT';
import LoginC from '../pages/auth/LoginC';
import RegistroC from '../pages/auth/RegistroC';
import DashboardT from '../pages/dashboradT/dashboradT';
import DashboardC from '../pages/dashboradC/dashboradC';
import PaginaNoEncontrada from '../pages/error/paginNoEncontrada';
import UsuarioInvalido from '../pages/error/usuarioInvalido';
import PrivateRoutes from './PrivateRoutes';
import ElegirLabor from '../pages/dashboradT/ElegirLabor';

const Views = () => {
  return (
    <Routes>
      <Route path='/' element={<Inicio />} />
      <Route path='/loginC' element={<LoginC />} />
      <Route path='/registroC' element={<RegistroC />} />
      <Route path='/loginT' element={<LoginT />} />
      <Route path='/registroT' element={<RegistroT />} />
      {/* <Route element={<PrivateRoutes />}> */}
      <Route path='/dashboardT' element={<DashboardT />} /> {/* </Route> */}
      <Route path='/dashboardC' element={<DashboardC />} />
      <Route path='/error' element={<PaginaNoEncontrada />} />
      <Route path='/usuarioInvalido' element={<UsuarioInvalido />} />
      <Route path='/elegirLabor' element={<ElegirLabor />} />
    </Routes>
  );
};

export default Views;
