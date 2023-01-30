

import { useEffect } from 'react';
import { useContext } from 'react';
import { AccountContext } from './AccountContex';

const { Outlet, Navigate, useLocation } = require('react-router');

const useAuth = () => {
  const { user } = useContext(AccountContext);
  return user && user.loggedIn;
};

const PrivateRoutes = () => {
  const { user } = useContext(AccountContext);
  const isAuth = useAuth();
  const location = useLocation();

  return isAuth ? <Outlet /> : <Navigate to='/' />;
};

export default PrivateRoutes;
