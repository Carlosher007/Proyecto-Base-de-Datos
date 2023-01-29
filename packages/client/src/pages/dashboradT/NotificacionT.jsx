/** @format */

import React from 'react';
import CardList from '../../components/CardList';

const notificaciones = [
  {
    fecha: '01/01/2022',
    asunto: 'Asunto',
    mensaje:
      'Lorem wdowd wdpwdi wdowd wdowd dwowd wdowd dwdowwd dwowd wdowd wdowd ',
  },
  {
    fecha: '01/01/2022',
    asunto: 'Asunto',
    mensaje:
      'Lorem wdowd wdpwdi wdowd wdowd dwowd wdowd dwdowwd dwowd wdowd wdowd ',
  },
  {
    fecha: '01/01/2022',
    asunto: 'Asunto',
    mensaje:
      'Lorem wdowd wdpwdi wdowd wdowd dwowd wdowd dwdowwd dwowd wdowd wdowd ',
  },
  {
    fecha: '01/01/2022',
    asunto: 'Asunto',
    mensaje:
      'Lorem wdowd wdpwdi wdowd wdowd dwowd wdowd dwdowwd dwowd wdowd wdowd ',
  },
  {
    fecha: '01/01/2022',
    asunto: 'Asunto',
    mensaje:
      'Lorem wdowd wdpwdi wdowd wdowd dwowd wdowd dwdowwd dwowd wdowd wdowd ',
  },
];

const NotificacionesT = () => {
  return <CardList data={notificaciones} renderType='notificacionT' />;
};

export default NotificacionesT;
