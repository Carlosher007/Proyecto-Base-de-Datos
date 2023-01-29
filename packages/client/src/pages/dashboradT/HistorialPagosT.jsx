import React from 'react'
import CardList from '../../components/CardList';


const pagos = [
  {
    fecha: '01/01/2022',
    monto: '$50',
    nombre: 'Juan Pérez',
    cuenta: '1234',
  },
  {
    fecha: '01/02/2022',
    monto: '$100',
    nombre: 'Maria Rodriguez',
    cuenta: '5678',
  },
];

const HistorialPagosT = () => {
   return <CardList data={pagos} renderType='historialPagosT' />;

}

export default HistorialPagosT