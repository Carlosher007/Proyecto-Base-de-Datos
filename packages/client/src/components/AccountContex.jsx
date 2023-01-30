/** @format */

import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';

const { createContext, useState, useEffect } = require('react');

export const AccountContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({ loggedIn: null });
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (
      user.tipo === 'trabajador' ||
      location.pathname === '/loginT' ||
      location.pathname === '/registroT' ||
      location.pathname === '/dashboardT' ||
      location.pathname === '/historialPagosT' ||
      location.pathname === '/elegirLaborT' ||
      location.pathname === '/notificacionT'
    ) {
      fetch('http://localhost:8000/auth/loginT', {
        credentials: 'include',
      })
        .catch((err) => {
          setUser({ loggedIn: false });
          return;
        })
        .then((r) => {
          if (!r || !r.ok || r.status >= 400) {
            setUser({ loggedIn: false });
            return;
          }
          return r.json();
        })
        .then((data) => {
          if (!data) {
            setUser({ loggedIn: false });
            return;
          }
          setUser({ ...data });
          // navigate('/dashboardT');
        });
    } else if (
      user.tipo === 'trabajador' ||
      location.pathname === '/loginC' ||
      location.pathname === '/registroC' ||
      location.pathname === '/dashboardC' ||
      location.pathname === '/notificacionC' ||
      location.pathname === '/historialPagosC' ||
      location.pathname === '/buscarServicioC'
    ) {
      fetch('http://localhost:8000/auth/loginC', {
        credentials: 'include',
      })
        .catch((err) => {
          setUser({ loggedIn: false });
          return;
        })
        .then((r) => {
          if (!r || !r.ok || r.status >= 400) {
            setUser({ loggedIn: false });
            return;
          }
          return r.json();
        })
        .then((data) => {
          if (!data) {
            setUser({ loggedIn: false });
            return;
          }
          setUser({ ...data });
          // navigate('/dashboardT');
        });
    } else if (location.pathname === '/' && !user.loggedIn) {
      setUser({ loggedIn: false });
    } else {
      setUser({ loggedIn: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AccountContext.Provider value={{ user, setUser }}>
      {children}
    </AccountContext.Provider>
  );
};

export default UserContext;
