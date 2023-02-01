/** @format */

import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Button,
} from '@chakra-ui/react';
import ButtonSeguir from './ButtonSeguir';
import { toast } from 'react-toastify';
import { useState } from 'react';

function CustomCardMisServiciosC(props) {
  const [showButton, setShowButton] = useState(props.calificacion === null);
  const [showButton2, setShowButton2] = useState(props.fecha === null);

  const handleClickCalificar = (cid) => {
    console.log('calificar');
  };

  const handleClickPagar = (cid) => {
    console.log('pagar');
  };

  return (
    <Card>
      <CardHeader>
        <Heading size='md'>Fecha: {props.fecha_i.split('T')[0]}</Heading>
      </CardHeader>
      <CardBody>
        <Text>Trabajador asociado: {props.nombre_trabajador}</Text>
        <Text>Labor: {props.nombre_labor}</Text>
        <Text>Descripcion: {props.descripcion}</Text>
        <Text>Monto: {props.monto}</Text>
        <Text>Pagado: {props.is_pagado ? 'Si' : 'No'}</Text>
        {!showButton ? (
          <Text>Calificacion: {props.calificacion} </Text>
        ) : (
          <ButtonSeguir
            text='Calificar'
            onClick={() => handleClickCalificar(props.contrato_id)}
          />
        )}
        {!showButton2 ? (
          <Text>Ya se ha pagado</Text>
        ) : (
          <ButtonSeguir
            text='Pagar'
            onClick={() => handleClickPagar(props.contrato_id)}
          />
        )}
      </CardBody>
    </Card>
  );
}

export default CustomCardMisServiciosC;
