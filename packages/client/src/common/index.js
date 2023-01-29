/** @format */

const Yup = require('yup');

const formSchemaRegistroT = Yup.object({
  nombre: Yup.string()
    .required('Nombre requerido!')
    .min(6, 'Nombre demasiado corto!')
    .max(28, 'Nombre demasiado largo!'),
  apellido: Yup.string()
    .required('Apellido requerido!')
    .min(6, 'Apellido demasiado corto!')
    .max(28, 'Apellido demasiado largo!'),
  email: Yup.string().email('Email inválido').required('Email requerido!'),
  contrasena: Yup.string()
    .required('Contraseña requerida!')
    .min(6, 'Contraseña demasiado corta!')
    .max(28, 'Contraseña demasiado larga!'),
  foto_perfil: Yup.string().required('Foto de perfil requerida!'),
  doc_foto: Yup.string().required('Foto de documento requerida!'),
  cuenta: Yup.string()
    .required('Numero de cuenta requerido!')
    .min(8, 'Numero de cuenta demasiado corto!')
    .max(28, 'Numero de cuenta demasiado largo!'),
  direccion: Yup.string().required('Direccion requerida!'),
  celular: Yup.string().required('Celular requerido!'),
});

const formSchemaLoginT = Yup.object({
  celular: Yup.string().required('Celular requerido!'),
  contrasena: Yup.string().required('Contraseña requerida!'),
});

const formSchemaElegirLabor = Yup.object({
  labor: Yup.string().required('Seleccione una labor'),
  medioDePago: Yup.string().required('Seleccione un medio de pago'),
  precio: Yup.number()
    .required('Precio requerido')
    .typeError('Precio debe ser un número')
});


module.exports = { formSchemaRegistroT, formSchemaLoginT, formSchemaElegirLabor };