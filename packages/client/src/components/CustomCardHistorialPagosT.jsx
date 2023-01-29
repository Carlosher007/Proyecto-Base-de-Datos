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

function CustomCardHistorialPagosT(props) {
  return (
    <Card style={{ width: '200px' }}>
      <CardHeader>
        <Heading size='md'>Fecha: {props.fecha}</Heading>
      </CardHeader>
      <CardBody>
        <Text>monto: {props.monto}</Text>
        <Text>nombre usuario: {props.nombre}</Text>
        <Text>cuenta: {props.cuenta}</Text>
      </CardBody>
    </Card>
  );
}

export default CustomCardHistorialPagosT;
