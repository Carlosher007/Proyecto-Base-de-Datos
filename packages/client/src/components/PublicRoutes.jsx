/** @format */

// /** @format */
// import { useContext } from 'react';
// import { AccountContext } from './AccountContex.jsx';
// import { useLocation } from 'react-router-dom';
// import { useEffect } from 'react';
// import { useState } from 'react';
// const { Outlet, Navigate } = require('react-router-dom');

// const useAuth = () => {
//   const { user } = useContext(AccountContext);
//   return user && user.loggedIn;
// };

// const PrivateRoutes = () => {
//   const isAuth = useAuth();
//   const location = useLocation();

//   const [estado, setEstado] = useState(1);

//   const notAllowedPaths = [
//     '/',
//     '/loginT',
//     '/registroT',
//     '/loginC',
//     '/registroT',
//   ];

//   useEffect(() => {
//     // console.log(isAuth)
//     // console.log(notAllowedPaths.includes(location.pathname));
//     if (!isAuth && !notAllowedPaths.includes(location.pathname)) {
//       // console.log('alb');
//       setEstado(2);
//     } else if (isAuth && notAllowedPaths.includes(location.pathname)) {
//       // console.log("nooooo");
//       setEstado(3);
//     }
//     // console.log(estado);
//   }, [isAuth, location.pathname]);

//   if (estado === 2) {
//     return <Navigate to='/' />;
//   } else if (estado === 3) {
//     return <Navigate to='/dashboardT' />;
//   } else {
//     return <Outlet />;
//   }
// };

// // return isAuth ? <Outlet /> : <Navigate to='/' />;

// export default PrivateRoutes;

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

  console.log('user p', user);
  console.log('user tipo p', user.tipo);
  if (isAuth && user.tipo === 'trabajador') {
    console.log('trabjador');
    return <Navigate to='/dashboardT' />;
  } else if (isAuth && user.tipo === 'cliente') {
    console.log('trabjador');
    return <Navigate to='/dashboardC' />;
  } else {
    return <Outlet />;
  }
};

export default PublicRoutes;
