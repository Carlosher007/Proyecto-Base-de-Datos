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
        <Heading size='md'>
          Fecha: {props.fecha_transaccion.split('T')[0]}
        </Heading>
      </CardHeader>
      <CardBody>
        <Text>monto: {props.monto_transaccion}</Text>
        <Text>Cuenta que recibio el pago: {props.cuenta_recibio}</Text>
        <Text>Cuenta que envio el pago: {props.cuenta_envio}</Text>
        <Text>Labor realizada: {props.labor_}</Text>
      </CardBody>
    </Card>
  );
}

export default CustomCardHistorialPagosC;
