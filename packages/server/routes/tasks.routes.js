/** @format */


const { Router } = require('express');
const {
  nuevoEjerce,
  getLabores,
  nuevoContrato,
  buscarTrabajadores,
  infoContratoT,
  infoTransaccionT
} = require('../controllers/tasks.controller');

const router = Router();

router.post('/nuevoEjerce', nuevoEjerce);

router.get('/getLabores/:id',getLabores);

router.post('/nuevoContrato',nuevoContrato);

router.get('/buscarTrabajadores', buscarTrabajadores);

router.get('/infoContratoT',infoContratoT)

router.get('/infoTransaccionT',infoTransaccionT);

module.exports = router;
