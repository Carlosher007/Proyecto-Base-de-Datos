/** @format */

const express = require('express');
const validateFormRegisterT = require('../controllers/validateForm');
const validateFormLoginT = require('../controllers/validateForm');
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
  handleLoginT,
  handleLogin,
  attemptLoginT,
  attempRegisterT,
} = require('../controllers/authController');

router
  .route('/login')
  .get(handleLogin)


router
  .route('/loginT')
  .get(handleLoginT)
  .post(validateFormLoginT, attemptLoginT);

router.post('/registroT', validateFormRegisterT, attempRegisterT)

module.exports = router;
