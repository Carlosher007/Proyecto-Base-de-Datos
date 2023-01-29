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

function CustomCardHistorialPagosC(props) {
  return (
    <Card style={{ width: '200px' }}>
      <CardHeader>
        <Heading size='md'>Fecha: {props.fecha}</Heading>
      </CardHeader>
      <CardBody>
        <Text>Monto: {props.monto}</Text>
        <Text>Nombre Trabajador: {props.nombre}</Text>
        <Text>Cuenta: {props.cuenta}</Text>
      </CardBody>
    </Card>
  );
}

export default CustomCardHistorialPagosC;
