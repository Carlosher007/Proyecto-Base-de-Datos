/** @format */

const express = require('express');
const validateFormRegisterT = require('../controllers/validateForm');
const validateFormLoginT = require('../controllers/validateForm');
const router = express.Router();

router.post('/loginT', (req, res) => {
  validateFormLoginT(req, res);
});

router.post('/registroT', (req, res) => {
  validateFormRegisterT(req, res);
});
module.exports = router;
