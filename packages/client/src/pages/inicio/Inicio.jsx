/** @format */

import React from 'react';
import Card from '../../components/Card';
import trabajador from '../../assets/images/trabajador.png';
import usuario from '../../assets/images/usuario.png';
import '../../styles/Inicio.css';

import Navbar from '../../components/Navbar.jsx';

const Inicio = () => {
  return (
      <div className='body'>
        <div className='container'>
          <Card
            image={trabajador}
            title='Trabajador'
            text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae quaerat ex nobis. Doloribus, deleniti?'
            link='/loginT'
          />

          <Card
            image={usuario}
            title='Cliente'
            text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae quaerat ex nobis. Doloribus, deleniti?'
            link='/loginC'
          />
        </div>
      </div>
  );
};

export default Inicio;
