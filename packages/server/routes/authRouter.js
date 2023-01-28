/** @format */

const express = require('express');
const validateFormRegisterT = require('../controllers/validateForm');
const validateFormLoginT = require('../controllers/validateForm');
const router = express.Router();
const pool = require('../db');
const bycrypt = require('bcrypt');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router
  .route('/loginT')
  .get(async (req, res) => {
    console.log(req.session);

    if (req.session.user && req.session.nombre) {
      const consultatrabajadorId = await pool.query(
        'SELECT verificar_login_trabajador($1)',
        [req.session.user]
      );

      const trabajadorId = consultatrabajadorId.rows[0][0];

      res.json({
        loggedIn: true,
        id: trabajadorId,
        nombre,
        apellido,
        foto_perfil,
      });
    } else {
      res.json({ loggedIn: false });
    }
  })
  .post(async (req, res) => {
    validateFormLoginT(req, res);

    console.log('SIUUUU');

    const potentialLogin = await pool.query(
      'SELECT user_id, contrasena, celular FROM Usuario u WHERE u.celular = $1',
      [req.body.celular]
    );

    console.log(potentialLogin.rowCount > 0);

    if (potentialLogin.rowCount > 0) {
      const isSamePass = await bcrypt.compare(
        req.body.contrasena,
        potentialLogin.rows[0].contrasena
      );

      if (isSamePass) {
        //verificamos que ese login pertenezca a un trabajador
        const consultatrabajadorId = await pool.query(
          'SELECT verificar_login_trabajador($1)',
          [potentialLogin.rows[0].user_id]
        );

        const trabajadorId = consultatrabajadorId.rows[0][0];

        if (trabajadorId != -1) {
          //good login
          const trabajadorData = await pool.query(
            'SELECT u.nombre, u.apellido, t.foto_perfil FROM Usuario u JOIN Trabajador t ON u.user_id = t.user_id WHERE t.trabajador_id = $1',
            [trabajadorId]
          );
          const { nombre, apellido, foto_perfil } = trabajadorData.rows[0];
          req.session.user = {
            id: trabajadorId,
            nombre,
            apellido,
            foto_perfil,
          };
          res.json({
            loggedIn: true,
            trabajadorId: newTrabajador[0].crear_trabajador,
          });
          console.log('good');
        } else {
          console.log('not good');
          res.json({
            loggedIn: false,
            status: 'Error en la contraseña o el celular',
          });
        }
      } else {
        console.log('not good');
        res.json({
          loggedIn: false,
          status: 'Error en la contraseña o el celular',
        });
      }
    } else {
      console.log('not good');
      res.json({
        loggedIn: false,
        status: 'Error en la contraseña o el celular',
      });
    }
  });

router.post('/registroT', upload.fields([{name:'foto_perfil',maxCount:1},{name:'doc_foto',maxCount:1}]), async (req, res) => {
  validateFormRegisterT(req, res);

  //Verificamos los valores unicos
  const celularExiste = await pool.query('SELECT verificar_celular($1)', [
    req.body.celular,
  ]);

  if (celularExiste.rows[0].verificar_celular) {
    res.json({ loggedIn: false, status: 'Celular ya está en uso' });
  } else {
    const emailExiste = await pool.query('SELECT verificar_email($1)', [
      req.body.email,
    ]);
    if (emailExiste.rows[0].verificar_email) {
      res.json({ loggedIn: false, status: 'Email ya está en uso' });
    } else {
      const cuentaExiste = await pool.query(
        'SELECT verificar_cuenta_trabajador($1)',
        [req.body.numero_cuenta]
      );
      if (cuentaExiste.rows[0].verificar_cuenta_trabajador) {
        res.json({ loggedIn: false, status: 'La cuenta ya está en uso' });
      } else {
        //Registramos
        const hashedPass = await bycrypt.hash(req.body.contrasena, 10);
        const newTrabajador = await pool.query(
          'SELECT crear_trabajador($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
          [
            req.body.nombre,
            req.body.apellido,
            req.body.email,
            hashedPass,
            req.body.latitud,
            req.body.longitud,
            req.body.direccion,
            req.files['foto_perfil'][0].path,
            req.files['foto_perfil'][0].path,
            req.body.cuenta,
            req.body.celular,
          ]
        );
        console.log(newTrabajador.rows[0].crear_trabajador);
        req.session.user = {
          id: newTrabajador.rows[0].crear_trabajador,
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          foto_perfil: req.body.foto_perfil,
        };
        res.json({
          loggedIn: true,
          trabajadorId: newTrabajador[0].crear_trabajador,
        });
      }
    }
  }
});

module.exports = router;
