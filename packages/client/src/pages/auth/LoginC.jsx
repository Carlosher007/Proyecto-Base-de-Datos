/** @format */

import {
  Button,
  ButtonGroup,
  Heading,
  VStack,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router';
import TextField from '../../components/TextField';
import { formSchemaLoginT } from '../../common/index';
import { AccountContext } from '../../components/AccountContex';
import { useContext } from 'react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const LoginC = () => {
  const [selectedType, setSelectedType] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(AccountContext);

  return (
    <Formik
      initialValues={{ celular: '', contrasena: '', tipo: '' }}
      validationSchema={formSchemaLoginT}
      onSubmit={(values, actions) => {
        const vals = { ...values };
        if (selectedType === '') {
          toast.error('Debe seleccionar un tipo de cuenta');
          return;
        }
        vals.tipo = selectedType;
        alert(JSON.stringify(vals, null, 2));
        fetch('http://localhost:8000/auth/loginT', {
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
            setUser({ ...data });
            navigate('/dashboardT');
          });
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
          name='celular'
          placeholder='Digite el celular'
          autoComplete='off'
          label='Celular'
        />
        <TextField
          name='contrasena'
          placeholder='Digite la contraseña'
          autoComplete='off'
          label='Contraseña'
        />

        <RadioGroup
          onChange={(value) => setSelectedType(value)}
        >
          <Stack spacing={5} direction='row'>
            <Radio colorScheme='red' value='1'>
              Credito
            </Radio>

            <Radio colorScheme='green' value='2'>
              Debito
            </Radio>
          </Stack>
        </RadioGroup>

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

export default LoginC;
