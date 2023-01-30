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

import { useContext } from 'react';
import { AccountContext } from './AccountContex';

const { Outlet, Navigate, useLocation } = require('react-router');

const useAuth = () => {
  const { user } = useContext(AccountContext);
  return user && user.loggedIn;
};

const PrivateRoutes = () => {
  const isAuth = useAuth();
  const location = useLocation();
  // return isAuth ? (
    // <Outlet />
  // ) : (
    // <Navigate to={location.pathname === '/' ? '/loginT' : location.pathname} />
  // );
  return <Outlet/>
};

export default PrivateRoutes;
