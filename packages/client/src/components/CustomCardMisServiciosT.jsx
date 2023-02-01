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
import ButtonSeguir from './ButtonSeguir';
import { toast } from 'react-toastify';
import { useState } from 'react';

function CustomCardMisServiciosT(props) {
  const [showButton, setShowButton] = useState(props.fecha_f === null);

  const handleClickTerminar = (cid) => {
    console.log(cid);
    fetch(`http://localhost:8000/finalizarContrato/${cid}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .catch((err) => {
        return;
      })
      .then((res) => {
        if (!res || !res.ok || res.status >= 400) {
          toast.warning('No se pudo finalizar el contrato');
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        setShowButton(false);
        toast.success('Contrato finalizado con exito');
      });
  };

  return (
    <Card>
      <CardHeader>
        <Heading size='md'>Fecha: {props.fecha_i.split('T')[0]}</Heading>
      </CardHeader>
      <CardBody>
        <Text>Cliente asociado: {props.nombre_cliente}</Text>
        <Text>Labor: {props.nombre_labor}</Text>
        <Text>Descripcion: {props.descripcion}</Text>
        <Text>
          Calificación:{' '}
          {props.calificacion === null
            ? 'No ha sido calificado'
            : props.calificacion}
        </Text>
        <Text>Pagado: {props.isPagado ? 'Si' : 'No'}</Text>
        {!showButton ? (
          <Text>Terminado: Ya ha terminado</Text>
        ) : (
          <ButtonSeguir
            text='Terminar'
            onClick={() => handleClickTerminar(props.contrato_id)}
          />
        )}
      </CardBody>
    </Card>
  );
}

export default CustomCardMisServiciosT;
