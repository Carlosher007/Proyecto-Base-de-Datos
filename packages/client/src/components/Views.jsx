/** @format */

import { Route, Routes } from 'react-router-dom';
import Inicio from '../pages/inicio/Inicio';
import LoginT from '../pages/auth/LoginT';
import RegistroT from '../pages/auth/RegistroT';
import LoginC from '../pages/auth/LoginC';
import RegistroC from '../pages/auth/RegistroC';
import DashboardT from '../pages/dashboradT/dashboradT';
import HistorialPagosT from '../pages/dashboradT/HistorialPagosT';
import NotificacionT from '../pages/dashboradT/NotificacionT';

import DashboardC from '../pages/dashboradC/dashboradC';
import PaginaNoEncontrada from '../pages/error/paginNoEncontrada';
import UsuarioInvalido from '../pages/error/usuarioInvalido';
import PrivateRoutes from './PrivateRoutes';
import ElegirLabor from '../pages/dashboradT/ElegirLabor';
import BuscarServiciosC from '../pages/dashboradC/BuscarServiciosC';
import HistorialPagosC from '../pages/dashboradC/HistorialPagosC';
import NotificacionesC from '../pages/dashboradC/NotificacionesC';
import { AccountContext } from '../components/AccountContex';
import { useContext } from 'react';
import { Text } from '@chakra-ui/react';
import PublicRoutes from './PublicRoutes';
import Contratar from '../pages/dashboradC/Contratar';

const Views = () => {
  const { user } = useContext(AccountContext);

  return user.loggedIn === null ? (
    <Text>Loading...</Text>
  ) : (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path='/' element={<Inicio />} />
        <Route path='/loginC' element={<LoginC />} />
        <Route path='/registroC' element={<RegistroC />} />
        <Route path='/loginT' element={<LoginT />} />
        <Route path='/registroT' element={<RegistroT />} />
      </Route>

      <Route element={<PrivateRoutes />}>
        <Route path='/dashboardC' element={<DashboardC />} />
        <Route path='/buscarServicioC' element={<BuscarServiciosC />} />
        <Route path='/historialPagosC' element={<HistorialPagosC />} />
        <Route path='/notificacionC' element={<NotificacionesC />} />
        <Route path='/dashboardT' element={<DashboardT />} />
        <Route path='/historialPagosT' element={<HistorialPagosT />} />
        <Route path='/elegirLaborT' element={<ElegirLabor />} />
        <Route path='/notificacionT' element={<NotificacionT />} />
        <Route path='/contratar/:eid' element={<Contratar />} />
      </Route>

      <Route path='/usuarioInvalido' element={<UsuarioInvalido />} />
      <Route path='/*' element={<PaginaNoEncontrada />} />
    </Routes>
  );
};

export default Views;
