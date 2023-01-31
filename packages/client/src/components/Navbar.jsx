/** @format */

import { useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useContext } from 'react';
import { AccountContext } from '../components/AccountContex';
import { useNavigate } from 'react-router';
import '../styles/navbar.css';
import ToggleColorMode from './ToggleColorMode.jsx';


function Navbar({ condition }) {
    const currentPath = window.location.pathname;
  const navigate = useNavigate();

  const { user, setUser } = useContext(AccountContext);
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle('responsive_nav');
  };

  const desloguearse = () => {
    setUser({ loggedIn: false });
    navigate('/');

  };

  function userNav() {
    return (
        <>
        <nav ref={navRef}>
            <a href='/buscarServicioC'>Buscar servicios</a>
            <a href='/notificacionT'>Notificaciones</a>
            <a href='/dashboard'>Mis servicios</a>
            <a href='/historialPagosC'>Historial de pagos</a>
          </nav>
        </>
    )
  }

  function workerNav() {
    return (
        <>
        <nav ref={navRef}>
            <a href='/dashboardT'>Mis servicios</a>
            <a href='/historialPagosT'>Historial de pagos</a>
            <a href='/notificacionT'>Notificaciones</a>
          </nav>
        </>
    )
  }

  function checkDashboard(path) {
    return (path === '/' || path === '/loginC' ||
    path === '/loginT' || path === '/registroT' ||
    path === '/registroC')
  }
  console.log(currentPath)
  return (
    <header>
      {checkDashboard(currentPath) ? (
        <>
          <h3>Mande</h3>
          <ToggleColorMode />
          <button onClick={() => (window.location.href = '/')}>
            Ir a inicio
          </button>
        </>
      ) : (
        <>
            <h2>Mande</h2>
            <h3>{user.nombre}</h3>
            {user.tipo == "trabajador" ? workerNav() : userNav()}

            <ToggleColorMode />

            <button onClick = {desloguearse}>
                Salir
            </button>
        </>)
      }
    </header>
  );
}

export default Navbar;


// <button className='nav-btn nav-close-btn' onClick = {showNavbar}>
//  <FaTimes />
// </button>