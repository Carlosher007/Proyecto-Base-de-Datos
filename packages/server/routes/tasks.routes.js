/** @format */


const { Router } = require('express');
const {
  nuevoEjerce,
  getLabores
} = require('../controllers/tasks.controller');

const router = Router();

router.post('/nuevoEjerce', nuevoEjerce);

router.get('/getLabores',getLabores);

module.exports = router;
