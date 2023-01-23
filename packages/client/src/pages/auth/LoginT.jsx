/** @format */

import { Button, ButtonGroup, Heading, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router';
import TextField from '../../components/TextField';
import { formSchemaLoginT } from '@project-mande/common';

const LoginT = () => {
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={formSchemaLoginT}
      onSubmit={(values, actions) => {
        // alert(JSON.stringify(values, null, 2));
        // actions.resetForm();
        const vals = { ...values };
        actions.resetForm();
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
            console.log(data);
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
