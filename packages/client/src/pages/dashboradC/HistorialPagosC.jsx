/** @format */

import React from 'react';
import CardList from '../../components/CardList';

const pagos = [
  {
    fecha: '01/01/2021',
    monto: '$100',
    nombre: 'Juan',
    cuenta: 'xxxx-xxxx-xxxx-1234',
  },
  {
    fecha: '01/02/2021',
    monto: '$150',
    nombre: 'Maria',
    cuenta: 'xxxx-xxxx-xxxx-5678',
  },
  // más pagos
];

const HistorialPagosC = () => {
  return <CardList data={pagos} renderType='historialPagosC' />;
};

export default HistorialPagosC;
