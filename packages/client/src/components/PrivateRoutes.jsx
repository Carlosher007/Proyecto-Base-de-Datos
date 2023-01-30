/** @format */
import { useContext } from 'react';
import { AccountContext } from './AccountContex.jsx';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
const { Outlet, Navigate } = require('react-router-dom');

const useAuth = () => {
  const { user } = useContext(AccountContext);
  return user && user.loggedIn;
};

const PrivateRoutes = () => {
  //usamos useState para un estado
  const [estado, setEstado] = useState(true);

  const isAuth = useAuth();

  const location = useLocation();

  useEffect(() => {
    if (!isAuth) {
      const allowedPaths = [
        '/',
        '/loginT',
        '/registerT',
        '/loginC',
        '/registerC',
      ];
      if (!allowedPaths.includes(location.pathname)) {
        // Redirige al usuario a una ruta específica
        // o permite navegar solo entre ciertas rutas
        setEstado(false)
      }
    }
  }, [isAuth, location.pathname]);

  if (estado) {
    return <Outlet />;
  } else {
    return isAuth ? <Outlet /> : <Navigate to='/' />;
  }
};

export default PrivateRoutes;
