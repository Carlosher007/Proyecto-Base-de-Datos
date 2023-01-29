/** @format */

import React from 'react';
import CardList from '../../components/CardList';

const misServicios = [
  {
    fecha: '01/01/2022',
    cliente: 'John Doe',
    labor: 'Corte de césped',
    calificacion: '5 estrellas',
    pagado: true,
  },
  {
    fecha: '02/01/2022',
    cliente: 'Jane Smith',
    labor: 'Limpieza de piscina',
    calificacion: '4 estrellas',
    pagado: true,
  },
  {
    fecha: '03/01/2022',
    cliente: 'Bob Johnson',
    labor: 'Jardinería',
    calificacion: '3 estrellas',
    pagado: false,
  },
  {
    fecha: '01/01/2022',
    cliente: 'John Doe',
    labor: 'Corte de césped',
    calificacion: '5 estrellas',
    pagado: true,
  },
  {
    fecha: '02/01/2022',
    cliente: 'Jane Smith',
    labor: 'Limpieza de piscina',
    calificacion: '4 estrellas',
    pagado: true,
  },
  {
    fecha: '03/01/2022',
    cliente: 'Bob Johnson',
    labor: 'Jardinería',
    calificacion: '3 estrellas',
    pagado: false,
  },
];


const DashboardT = () => {
  return <CardList data={misServicios} renderType='misServiciosT' />;
};

export default DashboardT;
