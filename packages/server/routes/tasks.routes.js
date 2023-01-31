/** @format */


const { Router } = require('express');
const {
  nuevoEjerce,
  getLabores,
  nuevoContrato,
  buscarTrabajadores
} = require('../controllers/tasks.controller');

const router = Router();

router.post('/nuevoEjerce', nuevoEjerce);

router.get('/getLabores/:id',getLabores);

router.post('/nuevoContrato',nuevoContrato);

router.get('/buscarTrabajadores', buscarTrabajadores);

module.exports = router;
