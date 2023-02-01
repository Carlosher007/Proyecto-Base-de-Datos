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
  finalizarContrato,
  laboresDisponibles
} = require('../controllers/tasks.controller');

const router = Router();

router.post('/nuevoEjerce', nuevoEjerce);

router.get('/getLabores/:id',getLabores);

router.post('/nuevoContrato',nuevoContrato);

router.post('/buscarTrabajadores/:cid', buscarTrabajadores);

router.get('/infoContratoT/:tid',infoContratoT)

router.get('/infoTransaccionT/:tid',infoTransaccionT);

router.get('/notificacionesT/:tid',notificacionesT);

router.get('/infoContratoC/:tid',infoContratoC)

router.get('/infoTransaccionC/:cid',infoTransaccionC);

router.get('/notificacionesC/:cid',notificacionesC);

router.put('/calificarServicio',calificarServicio);

router.put('/realizarPago',realizarPago);

router.put('/finalizarContrato/:cid',finalizarContrato);

router.get('/laboresDisponibles',laboresDisponibles);

module.exports = router;
