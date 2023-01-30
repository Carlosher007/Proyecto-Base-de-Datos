/** @format */

const { Router } = require('express');
const pool = require('../db');
const { nuevoEjerce } = require('../controllers/tasks.controller');

const router = Router();

router.post('/nuevoEjerce',nuevoEjerce);

module.exports = router;