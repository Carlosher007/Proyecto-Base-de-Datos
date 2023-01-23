/** @format */

const pool = require('../db');

const prueba = async (req, res) => {
  const usuarios = await pool.query('SELECT * FROM Usuario');

  console.log(usuarios);
  res.send('Peticion a usuario');
};

const prueba2 = async (req, res) => {
  const coor = await pool.query('SELECT * FROM Coordenada');

  console.log(coor.rows);
  res.send('Peticion a coordenada');
};

const newCoor = async (req, res) => {
  const { latitud, longitud } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO Coordenada(latitud,longitud) VALUES ($1,$2) RETURNING *',
      [latitud, longitud]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  prueba,
  prueba2,
  newCoor,
};
