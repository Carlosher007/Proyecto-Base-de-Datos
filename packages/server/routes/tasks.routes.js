/** @format */

const { Router } = require('express');
const pool = require('../db');
const { prueba, prueba2, newCoor } = require('../controllers/tasks.controller');

const router = Router();

router.get('/usuario', prueba);

router.get('/coordenada', prueba2);

router.post('/coordenada', newCoor);

module.exports = router;
