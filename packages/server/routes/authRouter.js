/** @format */

const express = require('express');
const validateFormRegisterT = require('../controllers/validateForm');
const validateFormLoginT = require('../controllers/validateForm');
const router = express.Router();
const pool = require('../db');
const bycrypt = require('bcrypt');

router.post('/loginT', async (req, res) => {
  validateFormLoginT(req, res);

  const potentialLogin = await pool.query(
    'SELECT user_id, contrasena, celular FROM Usuario u WHERE u.celular = $1',
    [req.body.celular]
  );

  if (potentialLogin.rowCount > 0) {
    const isSamePass = await bcrypt.compare(
      req.body.password,
      potentialLogin.rows[0].contrasena
    );

    if (isSamePass) {
      //verificamos que ese login pertenezca a un trabajador
      const consultatrabajadorId = await pool.query(
        'SELECT verificar_login_trabajador($1)',
        [potentialLogin.rows[0].user_id]
      );

      if (consultatrabajadorId.rowCount > 0) {
        //good login
        const trabajadorId =
          consultatrabajadorId.rows[0].verificar_login_trabajador;

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
        //not good login
        res.json({
          loggedIn: false,
          status: 'Error en la contraseña o el celular',
        });
        console.log('not good');
      }
    } else {
      //not good loggin
      res.json({
        loggedIn: false,
        status: 'Error en la contraseña o el celular',
      });
      console.log('not good');
    }
  } else {
    res.json({
      loggedIn: false,
      status: 'Error en la contraseña o el celular',
    });
    console.log('not good');
  }
});

router.post('/registroT', async (req, res) => {
  validateFormRegisterT(req, res);

  console.log("se valido con node")
  
  //Verificamos los valores unicos
  const celularExiste = await pool.query('SELECT verificar_celular($1)', [
    req.body.celular,
  ]);

  console.log("paso primer test de verificar_celular")

  if (celularExiste.rows[0].verificar_celular) {
    res.json({ loggedIn: false, status: 'Celular ya está en uso' });
  } else {
    const emailExiste = await pool.query('SELECT verificar_email($1)', [
      req.body.email,
    ]);

    if (emailExiste.rows[0].verificar_email) {
      res.json({ loggedIn: false, status: 'Email ya está en uso' });
    } else {
      const docFotoExiste = await pool.query('SELECT verificar_doc_foto($1)', [
        req.body.doc_foto,
      ]);

      if (docFotoExiste.rows[0].verificar_doc_foto) {
        res.json({
          loggedIn: false,
          status: 'Foto del documento ya está en uso',
        });
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
            req.body.foto_perfil,
            req.body.doc_foto,
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
