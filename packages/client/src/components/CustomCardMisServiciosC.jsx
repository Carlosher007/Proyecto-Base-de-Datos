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
import ButtonSeguir from './ButtonSeguir';
import { toast } from 'react-toastify';
import { useState } from 'react';
import ButtonLoading from './ButtonLoading';
import Input from './Input';
import useFormData from './useFormData';

function CustomCardMisServiciosC(props) {
  const [showButton, setShowButton] = useState(props.calificacion === null);
  const [showButton2, setShowButton2] = useState(props.is_pagado);
  const { form, formData, updateFormData } = useFormData();

  const handleClickCalificar = async (e) => {
    e.preventDefault();
    if (
      isNaN(formData.calificacion) ||
      formData.calificacion <= 0 ||
      formData.calificacion > 5
    ) {
      toast.error('La calificacion debe ser un número entre 0 y 5');
      return;
    }

    fetch('http://localhost:8000/calificarServicio', {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        p_contrato_id: props.contrato_id,
        p_calificacion: formData.calificacion,
      }),
    })
      .catch((err) => {
        return;
      })
      .then((res) => {
        if (!res || !res.ok || res.status >= 400) {
          toast.warning(
            'Es posible que ya este asociado a ese labor, intente eligiendo otro'
          );
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        toast.success('El trabajador ha sido asociado con exito');
        setShowButton(false);
      });
  };

  const handleClickPagar = (cid) => {
    fetch(`http://localhost:8000/realizarPago/${cid}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .catch((err) => {
        toast.warning('Error al pagar');
        return;
      })
      .then((res) => {
        if (!res || !res.ok || res.status >= 400) {
          toast.warning('Error al pagar');
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        toast.success(
          'Se ha pagado el servicio, revise su historial de pagos si desea'
        );
        setShowButton2(true);
      });
  };

  return (
    <Card style={{ width: '270px' }}>
      <CardHeader>
        <Heading size='md'>Fecha: {props.fecha_i.split('T')[0]}</Heading>
      </CardHeader>
      <CardBody>
        <Text>Trabajador asociado: {props.nombre_trabajador}</Text>
        <Text>Labor: {props.nombre_labor}</Text>
        <Text>Descripcion: {props.descripcion}</Text>
        <Text>Monto: {props.monto}</Text>
        {props.fecha_f === null ? (
          <Text>El contrato no ha finalizado</Text>
        ) : (
          <Text>El contrato ya finalizo</Text>
        )}
        {/* feccha */}
        <br />
        <br />
        {!showButton ? (
          <div>
            {formData.calificacion === null ||
            formData.calificacion === undefined ||
            formData.calificacion === '' ? (
              <Text>Calificacion: {props.calificacion} </Text>
            ) : (
              <Text>Calificacion: {formData.calificacion} </Text>
            )}
          </div>
        ) : (
          <form
            ref={form}
            onChange={updateFormData}
            onSubmit={handleClickCalificar}
          >
            <ButtonLoading
              text='Calificar'
              disabled={Object.keys(formData).length === 0}
              // loading={loadingMutationd}
            />
            <Input label='Calificacion' name='calificacion' required={true} />
          </form>
        )}
        {/* espacio cion br */}
        <br />
        <br />
        {showButton2 ? (
          <Text>Ya se ha pagado</Text>
        ) : (
          <ButtonSeguir
            text='Pagar'
            onClick={() => handleClickPagar(props.contrato_id)}
          />
        )}
      </CardBody>
    </Card>
  );
}

export default CustomCardMisServiciosC;
