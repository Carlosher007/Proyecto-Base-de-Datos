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

  //  console.log("user ", user)

  return (
    <div className='body'>
      <div className='container'>
        <Card
          image={trabajador}
          title='Trabajador'
          text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae quaerat ex nobis. Doloribus, deleniti?'
          link='/loginT'
          // handleClick={handleTrabajador}
        />

        <Card
          image={usuario}
          title='Cliente'
          text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae quaerat ex nobis. Doloribus, deleniti?'
          link='/loginC'
          // handleClick={handleCLiente}
        />
      </div>
    </div>
  );
};

export default Inicio;
