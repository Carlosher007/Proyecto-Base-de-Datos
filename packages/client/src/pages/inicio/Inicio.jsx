/** @format */

import React from 'react';
import Card from '../../components/Card';
import trabajador from '../../assets/images/trabajador.png';
import usuario from '../../assets/images/usuario.png';
import '../../styles/Inicio.css';
import { AccountContext } from '../../components/AccountContex';
import { useContext } from 'react';
import Navbar from '../../components/Navbar.jsx';
import { useEffect } from 'react';

const Inicio = () => {
  // const { user, updateUserType } = useContext(AccountContext);
  

  //hacemos los dos handle, para trabajador y cliente que modificque el updateLogginIn
  // const handleTrabajador = () => {
    // updateUserType('trabajador');
  // }

    // const handleCLiente = () => {
      // updateUserType('cliente');
    // };


  return (
    <div className='body'>
      <div className='container'>
        <Card
          image={trabajador}
          title='Trabajador'
          text='Únete a Mande como trabajador y ofrece tus habilidades y servicios en el hogar. Regístrate y publica las labores que puedes realizar, incluyendo una descripción y precio.'
          link='/loginT'
          // handleClick={handleTrabajador}
        />

        <Card
          image={usuario}
          title='Cliente'
          text='Busca expertos y trabajadores confiables en el hogar con Mande. Regístrate y encuentra la solución perfecta para tus necesidades diarias. Solicita el servicio y califica la experiencia.'
          link='/loginC'
          // handleClick={handleCLiente}
        />
      </div>
    </div>
  );
};

export default Inicio;
