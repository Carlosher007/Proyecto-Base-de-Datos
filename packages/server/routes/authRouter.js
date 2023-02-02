/** @format */

const express = require('express');
const validateFormRegisterT = require('../controllers/validateForm');
const validateFormLoginT = require('../controllers/validateForm');
const validateFormRegisterC = require('../controllers/validateForm');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const {
  handleLogin,
  handleLoginT,
  handleLoginC,
  attemptLoginT,
  attemptLoginC,
  attempRegisterT,
  attempRegisterC,
  attemptLogout,
  // multerTrabajador
} = require('../controllers/authController');

const controller = require('./upload.js');

router.route('/login').get(handleLogin);

router
  .route('/loginT')
  .get(handleLoginT)
  .post(validateFormLoginT, attemptLoginT);

router
  .route('/loginC')
  .get(handleLoginC)
  .post(validateFormLoginT, attemptLoginC);

router.post('/registroC', controller.multerC, attempRegisterC);

router.get('/logout', attemptLogout);

router.post('/upload', controller.multerT, controller.uploadFile);

router.post('/registroT', controller.multerT, attempRegisterT);

module.exports = router;
