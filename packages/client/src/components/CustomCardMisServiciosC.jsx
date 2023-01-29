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

function CustomCardMisServiciosC(props) {
  return (
    <Card style={{ width: '200px' }}>
      <CardHeader>
        <Heading size='md'>Fecha Inicio: {props.fechaInicio}</Heading>
      </CardHeader>
      <CardBody>
        <Text>Trabajador: {props.trabajador}</Text>
        <Text>Labor: {props.labor}</Text>
        <Text>Calificacion: {props.calificacion}</Text>
        {props.fechaFinalizado ? (
          <Text>Fecha Finalizado: {props.fechaFinalizado}</Text>
        ) : null}
      </CardBody>
      <CardFooter>
        {props.fechaFinalizado ? (
          <Text>Pagado: {props.pagado ? 'Si' : 'No'}</Text>
        ) : (
          <>
            <Button>Calificar</Button>
            <Button>Pagar</Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}

export default CustomCardMisServiciosC;
