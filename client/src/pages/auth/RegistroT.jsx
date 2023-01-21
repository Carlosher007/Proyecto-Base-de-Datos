/** @format */

import { ArrowBackIcon } from '@chakra-ui/icons';
import { Button, ButtonGroup, Heading, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import TextField from '../../components/TextField';
import FileUpload from '../../components/FileUpload';
import axios from 'axios';


const RegistroT = () => {
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
        altitud: '',
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
          .required('Password required!')
          .min(6, 'Password too short!')
          .max(28, 'Password too long!'),
        foto_perfil: Yup.string().required('Foto de perfil requerida!'),
        doc_foto: Yup.string().required('Foto de documento requerida!'),
        num_cuenta: Yup.string()
          .required('Numero de cuenta requerido!')
          .min(10, 'Numero de cuenta demasiado corto!')
          .max(28, 'Numero de cuenta demasiado largo!'),
      })}
      onSubmit={(values, actions) => {
        alert(JSON.stringify(values, null, 2));
        actions.resetForm();
      }}
    >
      <VStack
        as={Form}
        w={{ base: '90%', md: '500px' }}
        m='auto'
        justify='center'
        h='100vh'
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
          placeholder='Enter direccion'
          autoComplete='off'
          label='Direccion'
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
    </Formik>
  );
};

export default RegistroT;
