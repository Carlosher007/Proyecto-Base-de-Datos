/** @format */

const express = require('express');
const validateFormRegisterT = require('../controllers/validateForm');
const validateFormLoginT = require('../controllers/validateForm');
const validateFormRegisterC = require('../controllers/validateForm');
const router = express.Router();
const multer = require('multer');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage });
const {
  handleLogin,
  handleLoginT,
  handleLoginC,
  attemptLoginT,
  attemptLoginC,
  attempRegisterT,
  attempRegisterC,
} = require('../controllers/authController');

router
  .route('/login')
  .get(handleLogin)


router
  .route('/loginT')
  .get(handleLoginT)
  .post(validateFormLoginT, attemptLoginT);

router
  .route('/loginC')
  .get(handleLoginC)
  .post(validateFormLoginT, attemptLoginC);


router.post('/registroT', validateFormRegisterT, attempRegisterT)

router.post('/registroC', validateFormRegisterC, attempRegisterC);


module.exports = router;
