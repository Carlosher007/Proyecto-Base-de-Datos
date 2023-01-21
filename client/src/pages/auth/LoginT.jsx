/** @format */

import { Button, ButtonGroup, Heading, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import TextField from '../../components/TextField';

const LoginT = () => {
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string()
          .required('Email requerido!'),
        password: Yup.string()
          .required('Contraseña requerida!'),
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
        <Heading>Log In</Heading>
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

        <ButtonGroup pt='1rem'>
          <Button colorScheme='teal' type='submit'>
            Log In
          </Button>
          <Button onClick={() => navigate('/registroT')}>Create Account</Button>
        </ButtonGroup>
      </VStack>
    </Formik>
  );
};

export default LoginT;
