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
//usestate import
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import ButtonSeguir from './ButtonSeguir';
import { useNavigate } from 'react-router';

function CustomCardBuscarServicioC(props) {
  const [criterio, setCriterio] = useState('');
  const [showButton, setShowButton] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setCriterio(props.criterio);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickContratar = (eid) => {
    navigate(`/contratar/${eid}`);
  };

  return (
    <Card style={{ width: '270px' }}>
      <CardHeader>
        <Heading size='md'>
          Nombre Trabajador: {props.nombre} {props.apellido}
        </Heading>
      </CardHeader>
      <CardBody>
        {/* sSi criterio es distancia ponemos primero la distancia, si es precio ponemos primero el precio y si es calificaicon ponemos primero la calificaicon */}
        {criterio === 'distancia' && (
          <>
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
            {props.descipcion && <Text>Descripcion: {props.descipcion}</Text>}
          </>
        )}
        {criterio === 'precio' && (
          <>
            <Text>Precio: {props.precio}</Text>
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
            {props.descipcion && <Text>Descripcion: {props.descipcion}</Text>}
          </>
        )}
        {criterio === 'calificacion' && (
          <>
            <Text>
              Calificacion:{' '}
              {props.calificacion === null
                ? 'El trabajador aún no ha sido calificado'
                : props.calificacion}
            </Text>
            <Text>Distancia: {props.distancia}</Text>
            <Text>Precio: {props.precio}</Text>
            <Text>
              Modalidad de cobro:{' '}
              {props.tipo_trabajo === 'precio_por_hora'
                ? 'Por hora'
                : 'Por unidad de trabajo'}
            </Text>
            {props.descipcion && <Text>Descripcion: {props.descipcion}</Text>}
          </>
        )}
        {!showButton ? (
          <Text>Terminado: Ya ha terminado</Text>
        ) : (
          <ButtonSeguir
            text='Contratar'
            onClick={() => handleClickContratar(props.ejerce_id)}
          />
        )}
      </CardBody>
    </Card>
  );
}

export default CustomCardBuscarServicioC;
