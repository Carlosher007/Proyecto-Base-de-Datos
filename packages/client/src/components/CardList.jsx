/** @format */

import React from 'react';
import CustomCardHistorialPagosT from './CustomCardHistorialPagosT';
import CustomCardNotificacionT from './CustomCardNotificacionT';
import CustomCardMisServiciosT from './CustomCardMisServiciosT';
import CustomCardBuscarServicioC from './CustomCardBuscarServicioC';
import CustomCardHistorialPagosC from './CustomCardHistorialPagosC';
import CustomCardMisServiciosC from './CustomCardMisServiciosC';
import CustomCardNotificacionC from './CustomCardNotificacionC';



function CardList(props) {
  if (props.renderType === 'misServiciosT') {
    return (
      <div className='grid-container'>
        {props.data.map((item, index) => (
          <div className='grid-item' key={index}>
            <CustomCardMisServiciosT {...item} />
          </div>
        ))}
      </div>
    );
  } else if (props.renderType === 'historialPagosT') {
    return (
      <div className='grid-container'>
        {props.data.map((item, index) => (
          <div className='grid-item' key={index}>
            <CustomCardHistorialPagosT {...item} />
          </div>
        ))}
      </div>
    );
  } else if (props.renderType === 'notificacionT') {
    return (
      <div className='grid-container'>
        {props.data.map((item, index) => (
          <div className='grid-item' key={index}>
            <CustomCardNotificacionT {...item} />
          </div>
        ))}
      </div>
    );
  } else if (props.renderType === 'buscarServicioC') {
    return (
      <div className='grid-container'>
        {props.data.map((item, index) => (
          <div className='grid-item' key={index}>
            <CustomCardBuscarServicioC {...item} />
          </div>
        ))}
      </div>
    );
  } else if (props.renderType === 'historialPagosC') {
    return (
      <div className='grid-container'>
        {props.data.map((item, index) => (
          <div className='grid-item' key={index}>
            <CustomCardHistorialPagosC {...item} />
          </div>
        ))}
      </div>
    );
  } else if (props.renderType === 'misServiciosC') {
    return (
      <div className='grid-container'>
        {props.data.map((item, index) => (
          <div className='grid-item' key={index}>
            <CustomCardMisServiciosC {...item} />
          </div>
        ))}
      </div>
    );
  }  else if (props.renderType === 'notificacionC') {
    return (
      <div className='grid-container'>
        {props.data.map((item, index) => (
          <div className='grid-item' key={index}>
            <CustomCardNotificacionC {...item} />
          </div>
        ))}
      </div>
    );
  } else {
    return <div>No se</div>;
  }
}


export default CardList;
