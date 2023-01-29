/** @format */

import React from 'react';
import CardList from '../../components/CardList';

const misServicios = [
  {
    fechaInicio: '01/01/2022',
    trabajador: 'Juan Perez',
    labor: 'Limpieza de piscina',
    calificacion: 4,
    fechaFinalizado: '05/01/2022',
    pagado: true,
  },
  {
    fechaInicio: '02/01/2022',
    trabajador: 'Maria Rodriguez',
    labor: 'Jardinería',
    calificacion: null,
    fechaFinalizado: null,
    pagado: false,
  },
];


const DashboardC = () => {
  return <CardList data={misServicios} renderType='misServiciosC' />;
};

export default DashboardC;
