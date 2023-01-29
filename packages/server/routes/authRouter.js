/** @format */

const express = require('express');
const validateFormRegisterT = require('../controllers/validateForm');
const validateFormLoginT = require('../controllers/validateForm');
const router = express.Router();
const multer = require('multer');
const pool = require('../db');
const bcrypt = require('bcrypt');

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

router.post('/registroT', upload.array('fotos', 2), async (req, res) => {
  validateFormRegisterT(req, res);

  //Verificamos los valores unicos
  const celularExiste = await pool.query(
    'SELECT id FROM verificar_celular($1)',
    [req.body.celular]
  );

  if (celularExiste.rows[0].id !== null) {
    res.json({ loggedIn: false, status: 'Celular ya está en uso' });
  } else {
    const emailExiste = await pool.query('SELECT id FROM verificar_email($1)', [
      req.body.email,
    ]);
    if (emailExiste.rows[0].id !== null) {
      res.json({ loggedIn: false, status: 'Email ya está en uso' });
    } else {
      const cuentaExiste = await pool.query(
        'SELECT id FROM verificar_cuenta_trabajador($1)',
        [req.body.numero_cuenta]
      );
      if (cuentaExiste.rows[0].id !== null) {
        res.json({ loggedIn: false, status: 'La cuenta ya está en uso' });
      } else {
        //Registramos
        const hashedPass = await bcrypt.hash(req.body.contrasena, 10);
        req.body.latitud = parseFloat(req.body.latitud);
        req.body.longitud = parseFloat(req.body.longitud);

        await pool.query(
          'CALL crear_trabajador($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
          [
            req.body.nombre,
            req.body.apellido,
            req.body.email,
            hashedPass,
            req.body.latitud,
            req.body.longitud,
            req.body.direccion,
            req.body.foto_perfil,
            req.body.doc_foto,
            req.body.cuenta,
            req.body.celular,
          ]
        );
        const newTrabajador = await pool.query(
          'SELECT * FROM Usuario WHERE celular = $1',
          [req.body.celular]
        );

        console.log(newTrabajador.rows[0].user_id);
        req.session.user = {
          id: newTrabajador.rows[0].user_id,
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          foto_perfil: req.body.foto_perfil,
        };
        res.json({
          loggedIn: true,
          trabajadorId: newTrabajador.rows[0].user_id,
        });
      }
    }
  }
});

module.exports = router;
