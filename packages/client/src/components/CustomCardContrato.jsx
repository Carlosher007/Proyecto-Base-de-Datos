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
import { useNavigate } from 'react-router';
import { AccountContext } from '../../components/AccountContex';
import { useContext } from 'react';

function CustomCardMisServiciosC(props) {
  const { user, setUser } = useContext(AccountContext);
  const [showButton, setShowButton] = useState(true);
  const navigate = useNavigate();

  const handleClickContratar = async () => {
    fetch('http://localhost:8000/nuevoCOntratio', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(),
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
        setShowButton(false);
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
        <Text>Descripcion: {props.descripcion}</Text>
        <Text>
          Modalidad de cobro:{' '}
          {props.tipo_trabajo === 'precio_por_hora'
            ? 'Por hora'
            : 'Por unidad de trabajo'}
        </Text>
        <Text>Precio: {props.monto}</Text>
        {showButton && (
          <ButtonSeguir
            text='Calificar'
            onClick={() => handleClickContratar()}
          />
        )}
        <ButtonSeguir
          text='Volver'
          onClick={() => navigate('/buscarServicioC')}
        />
      </CardBody>
    </Card>
  );
}

export default CustomCardMisServiciosC;
