

import { useEffect } from 'react';
import { useContext } from 'react';
import { AccountContext } from './AccountContex';

const { Outlet, Navigate, useLocation } = require('react-router');

const useAuth = () => {
  const { user } = useContext(AccountContext);
  return user && user.loggedIn;
};

const PublicRoutes = () => {
  const { user } = useContext(AccountContext);
  const isAuth = useAuth();
  const location = useLocation();

  if (isAuth && user.tipo === 'trabajador') {
    return <Navigate to='/dashboardT' />;
  } else if (isAuth && user.tipo === 'cliente') {
    return <Navigate to='/dashboardC' />;
  } else {
    return <Outlet />;
  }
};

export default PublicRoutes;
