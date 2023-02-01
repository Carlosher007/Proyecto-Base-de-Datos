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
  notificacionesC,
  calificarServicio,
  realizarPago,
  finalizarContrato
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

router.put('/calificarServicio',calificarServicio);

router.put('/realizarPago',realizarPago);

router.put('/finalizarContrato',finalizarContrato);

module.exports = router;
