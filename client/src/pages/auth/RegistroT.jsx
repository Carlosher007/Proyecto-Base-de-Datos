/** @format */

import { ArrowBackIcon } from '@chakra-ui/icons';
import { Button, ButtonGroup, Heading, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import TextField from '../../components/TextField';
import FileUpload from '../../components/FileUpload';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const RegistroT = () => {
  const [direccion, setDireccion] = useState('');
  const handleChange = (e) => {
    setDireccion(e.target.value);
  };
  console.log(direccion)

  const geocodeAddress = async (address) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json`,
        {
          params: {
            q: address,
            key: 'f2e69ce8afd94ae0b31889ea9e6dd61b',
            language: 'es',
            pretty: 1,
          },
        }
      );
      if (response.data.results.length === 0) {
        return { error: 'Direccion no valida' };
      }
      const { lat, lng } = response.data.results[0].geometry;
      return { lat, lng };
    } catch (err) {
      // console.error(err);
      return { error: 'Error al geolocalizar la dirección' };
    }
  };


const handleSubmit = async (values, actions) => {
  if (direccion) {
    try {
      const response = await geocodeAddress(direccion);
      if (response.error) {
        actions.setFieldError('direccion  ', response.error);
        return;
      }
      values.latitud = response.lat;
      values.longitud = response.lng;
      //aqui podrias hacer una peticion POST para guardar los datos del usuario en tu servidor
      // y/o hacer alguna otra accion
      alert(JSON.stringify(values, null, 2));
      actions.resetForm();
    } catch (err) {
      actions.setFieldError('direccion', 'Error al geolocalizar la dirección');
    }
  }
};


  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        foto_perfil: '',
        doc_foto: '',
        num_cuenta: '',
        direccion: '',
        longitud: '',
        latitud: '',
      }}
      validationSchema={Yup.object({
        nombre: Yup.string()
          .required('Nombre requerido!')
          .min(6, 'Nombre demasiado corto!')
          .max(28, 'Nombre demasiado largo!'),
        apellido: Yup.string()
          .required('Apellido requerido!')
          .min(6, 'Apellido demasiado corto!')
          .max(28, 'Apellido demasiado largo!'),
        email: Yup.string()
          .email('Email inválido')
          .required('Email requerido!'),
        password: Yup.string()
          .required('Contraseña requerida!')
          .min(6, 'Contraseña demasiado corta!')
          .max(28, 'Contraseña demasiado larga!'),
        foto_perfil: Yup.string().required('Foto de perfil requerida!'),
        doc_foto: Yup.string().required('Foto de documento requerida!'),
        num_cuenta: Yup.string()
          .required('Numero de cuenta requerido!')
          .min(8, 'Numero de cuenta demasiado corto!')
          .max(28, 'Numero de cuenta demasiado largo!'),
        // direccion: Yup.string()
        //   .isValidAddress('La dirección ingresada es inválida')
        //   .required('Direccion requerida!'),
      })}
      onSubmit={handleSubmit}
    >
      <VStack
        as={Form}
        w={{ base: '90%', md: '500px' }}
        m='auto'
        justify='center'
        spacing='1rem'
      >
        <Heading>Sign Up</Heading>
        <TextField
          name='nombre'
          placeholder='Enter nombre'
          autoComplete='off'
          label='Nombre'
        />
        <TextField
          name='apellido'
          placeholder='Enter apellido'
          autoComplete='off'
          label='Apellido'
        />
        <TextField
          name='email'
          placeholder='Enter email'
          autoComplete='off'
          label='Email'
        />
        <TextField
          type='password'
          name='password'
          placeholder='Enter password'
          autoComplete='off'
          label='Password'
        />
        <FileUpload name='foto_perfil' label='Foto de perfil' />
        <FileUpload name='doc_foto' label='Foto de documento' />
        <TextField
          name='num_cuenta'
          placeholder='Enter numero de cuenta'
          autoComplete='off'
          label='Numero de cuenta'
        />
        <TextField
          name='direccion'
          placeholder='Ingresa tu dirección'
          label='Dirección'
          value={direccion}
          onChange={handleChange}
        />
        <ButtonGroup pt='1rem'>
          <Button colorScheme='teal' type='submit'>
            Create Account
          </Button>
          <Button
            onClick={() => navigate('/loginT')}
            leftIcon={<ArrowBackIcon />}
          >
            Back
          </Button>
        </ButtonGroup>
      </VStack>
      {/* </div> */}
    </Formik>
  );
};

export default RegistroT;
