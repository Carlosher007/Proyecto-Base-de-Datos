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
    <Card style={{ width: '270px' }}>
      <CardHeader>
        <Heading size='md'>
          Fecha: {props.fecha_transaccion.split('T')[0]}
        </Heading>
      </CardHeader>
      <CardBody>
        <Text>monto: {props.monto_transaccion}</Text>
        <Text>Cuenta: {props.cuenta_recibio}</Text>
        <Text>Labor realizada: {props.labor_}</Text>
      </CardBody>
    </Card>
  );
}

export default CustomCardHistorialPagosC;
