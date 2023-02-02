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
import ButtonLoading from './ButtonLoading';
import Input from './Input';
import { toast } from 'react-toastify';
import useFormData from './useFormData';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AccountContext } from './AccountContex';
import { useContext } from 'react';

function CustomCardContrato(props) {
  const { user, setUser } = useContext(AccountContext);
  const [showButton, setShowButton] = useState(true);
  const navigate = useNavigate();
  const { form, formData, updateFormData } = useFormData();

  const handleClickContratar = async (e) => {
    e.preventDefault();
    console.log("se contrato")
     if (isNaN(formData.cantidad_trabajo) || formData.cantidad_trabajo <= 0) {
       toast.error('La cantidad de trabajo debe ser un número positivo');
       return;
     } 
     const cantidad_trabajo = parseFloat(formData.cantidad_trabajo);
     const descripcion = formData.descripcion;

    fetch('http://localhost:8000/nuevoContrato', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ejerce_id: props.ejerce_id,
        cliente_id: user.id,
        cantidad_trabajo: cantidad_trabajo,
        descripcion: descripcion,
      }),
    })
      .catch((err) => {
        return;
      })
      .then((res) => {
        if (!res || !res.ok || res.status >= 400) {
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        // setShowButton(false);
        navigate('/buscarServicioC');
      });
  };

  return (
    <Card>
      <CardHeader>
        <Heading size='md'>Labor: {props.labor}</Heading>
      </CardHeader>
      <CardBody>
        <Text>
          Trabajador : {props.nombre} {props.apellido}
        </Text>
        <Text>
          Descripcion:{' '}
          {props.descripcion ? props.descripcion : 'Sin descripcion'}
        </Text>
        <Text>
          Modalidad de cobro:{' '}
          {props.tipo_trabajo === 'precio_por_hora'
            ? 'Por hora'
            : 'Por unidad de trabajo'}
        </Text>
        <Text>Precio: {props.precio}</Text>
        {/* espaciado */}
        <br />
        <br />
        <form ref={form} onChange={updateFormData} onSubmit={handleClickContratar}>
          <Input label='Cantidad de trabajo por modalidad de cobro' name='cantidad_trabajo' required={true} />
          <Input label='Descripcion que desea para el trabajador' name='descripcion' required={false} />
          <ButtonLoading
            text='Confirmar'
            disabled={Object.keys(formData).length === 0}
            // loading={loadingMutationd}
          />
        </form>
      </CardBody>
    </Card>
  );
}

export default CustomCardContrato;
