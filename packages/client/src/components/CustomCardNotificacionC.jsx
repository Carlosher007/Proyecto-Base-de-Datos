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

function CustomCardNotificacionC(props) {
  return (
    <Card style={{ width: '270px' }}>
      <CardHeader>
        <Heading size='md'>Fecha: {props.fecha.split('T')[0]}</Heading>
      </CardHeader>
      <CardBody>
        <Text>Asunto: {props.asunto}</Text>
        <Text>Mensaje: {props.mensaje}</Text>
      </CardBody>
    </Card>
  );
}

export default CustomCardNotificacionC;
