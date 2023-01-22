/** @format */

import { ArrowBackIcon } from '@chakra-ui/icons';
import { Button, ButtonGroup, Heading, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router';
import TextField from '../../components/TextField';
import FileUpload from '../../components/FileUpload';
import axios from 'axios';
import React, { useState} from 'react';
import Alert from '@material-ui/lab/Alert';
import { formSchemaRegistroT } from "@project-mande/common";

const RegistroT = () => {
  const [direccion, setDireccion] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setDireccion(e.target.value);
  };
  // console.log(direccion);

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
          if (response.error) {
            setOpenAlert(true);
            setTimeout(() => {
              setOpenAlert(false);
            }, 3000);
            setErrorMessage(response.error);
            return;
          }
          return;
        }
        values.latitud = response.lat;
        values.longitud = response.lng;
        //aqui podrias hacer una peticion POST para guardar los datos del usuario en tu servidor
        // y/o hacer alguna otra accion
        // alert(JSON.stringify(values, null, 2));
        const vals = { ...values };
        setDireccion('');
        // actions.resetForm();
        fetch('http://localhost:4000/auth/registroT', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(vals),
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
            console.log(data);
          });
      } catch (err) {
        actions.setFieldError(
          'direccion',
          'Error al geolocalizar la dirección'
        );
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
      validationSchema={formSchemaRegistroT}
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
        {openAlert && (
          <Alert severity='error' onClose={() => setOpenAlert(false)}>
            {errorMessage}
          </Alert>
        )}
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
