/** @format */

import React from 'react';
import CardList from '../../components/CardList';

const servicios = [
  {
    nombre: 'Juan',
    distancia: '1km',
    estrellas: 4,
    precio: '$50',
    labor: 'Plomero',
  },
  {
    nombre: 'Maria',
    distancia: '2km',
    estrellas: 5,
    precio: '$75',
    labor: 'Electricista',
  },
  // má
];

const BuscarServiciosC = () => {
  return <CardList data={servicios} renderType='buscarServicioC' />;
};

export default BuscarServiciosC;
