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
        <Heading size='md'>
          Nombre Trabajador: {props.nombre} {props.apellido}
        </Heading>
      </CardHeader>
      <CardBody>
        <Text>Distancia: {props.distancia}</Text>
        <Text>
          Calificacion:{' '}
          {props.calificacion === null
            ? 'El trabajador aún no ha sido calificado'
            : props.calificacion}
        </Text>
        <Text>
          Modalidad de cobro:{' '}
          {props.tipo_trabajo === 'precio_por_hora'
            ? 'Por hora'
            : 'Por unidad de trabajo'}
        </Text>
        <Text>Precio: {props.precio}</Text>
        <Text>
          Modalidad de cobro:{' '}
          {props.tipo_trabajo === 'precio_por_hora'
            ? 'Por hora'
            : 'Por unidad de trabajo'}
        </Text>
        {props.descipcion && <Text>Descripcion: {props.descipcion}</Text>}
        <Text>Criterio: {props.criterio}</Text>
      </CardBody>
    </Card>
  );
}


export default CustomCardBuscarServicioC;
