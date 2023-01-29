/** @format */

import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
} from '@chakra-ui/react';

function CustomCardMisServiciosT(props) {
  return (
    <Card>
      <CardHeader>
        <Heading size='md'>Fecha: {props.fecha}</Heading>
      </CardHeader>
      <CardBody>
        <Text>Cliente asociado: {props.cliente}</Text>
        <Text>Labor: {props.labor}</Text>
        <Text>Calificacion: {props.calificacion}</Text>
        <Text>Pagado: {props.pagado ? 'Si' : 'No'}</Text>
      </CardBody>
    </Card>
  );
}

export default CustomCardMisServiciosT;
