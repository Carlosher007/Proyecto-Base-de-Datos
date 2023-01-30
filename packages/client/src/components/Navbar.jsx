/** @format */

import { useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useContext } from 'react';
import { AccountContext } from '../components/AccountContex';
import '../styles/navbar.css';
import ToggleColorMode from './ToggleColorMode.jsx';
const currentPath = window.location.pathname;
const isHomePage = /^\/(loginT|registroT|loginC|registroC)$/.test(currentPath);

function Navbar({ condition }) {
  const {user, setUser } = useContext(AccountContext);
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle('responsive_nav');
  };

  return (
    <header>
      {/* <ToggleColorMode /> */}
      {isHomePage || currentPath === '/' ? (
        <>
          <h3>Titulo</h3>
          <ToggleColorMode />
          <button onClick={() => (window.location.href = '/')}>
            Ir a inicio
          </button>
        </>
      ) : (
        <>
          <h3>LOGO</h3> 
          <ToggleColorMode />
          <nav ref={navRef}>
            {/* <a href='/#'>Home</a> */}
            {/* <a href='/#'>My work</a> */}
            {/* <a href='/#'>Blog</a> */}
            <a href='/dashboardT'>Home</a>
            <button className='nav-btn nav-close-btn' onClick={showNavbar}>
              <FaTimes />
            </button>
          </nav>
          <button className='nav-btn' onClick={showNavbar}>
            <FaBars />
          </button>
        </>
      )}
    </header>
  );
}

export default Navbar;
