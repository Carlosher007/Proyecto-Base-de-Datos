/** @format */


const { Router } = require('express');
const {
  nuevoEjerce,
  getLabores,
  nuevoContrato,
  buscarTrabajadores,
  infoContratoT,
  infoTransaccionT,
  notificacionesT,
  infoContratoC,
  infoTransaccionC,
  notificacionesC
} = require('../controllers/tasks.controller');

const router = Router();

router.post('/nuevoEjerce', nuevoEjerce);

router.get('/getLabores/:id',getLabores);

router.post('/nuevoContrato',nuevoContrato);

router.get('/buscarTrabajadores', buscarTrabajadores);

router.get('/infoContratoT',infoContratoT)

router.get('/infoTransaccionT',infoTransaccionT);

router.get('/notificacionesT',notificacionesT);

router.get('/infoContratoC',infoContratoC)

router.get('/infoTransaccionC',infoTransaccionC);

router.get('/notificacionesC',notificacionesC);

module.exports = router;
