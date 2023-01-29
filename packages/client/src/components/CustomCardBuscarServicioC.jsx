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

function CustomCardBuscarServicioC(props) {
  return (
    <Card style={{ width: '200px' }}>
      <CardHeader>
        <Heading size='md'>Nombre Trabajador: {props.nombre}</Heading>
      </CardHeader>
      <CardBody>
        <Text>Distancia: {props.distancia}</Text>
        <Text>Estrellas: {props.estrellas}</Text>
        <Text>Precio: {props.precio}</Text>
        <Text>Labor: {props.labor}</Text>
      </CardBody>
    </Card>
  );
}


export default CustomCardBuscarServicioC;
