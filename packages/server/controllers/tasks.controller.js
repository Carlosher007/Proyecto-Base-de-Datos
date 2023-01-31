/** @format */

const pool = require('../db'); //pool es la conexion a la base de datos

const nuevoEjerce = async (req, res) => {
  const { tid, labor_, tipo_trabajo, precio, descripcion } = req.body;

  try {
    const result = await pool.query('CALL trabajador_ejerce($1,$2,$3,$4,$5)', [
      tid,
      labor_,
      tipo_trabajo,
      precio,
      descripcion,
    ]);
    res.json(result);
  } catch (error) {
    res.json({ error: error });
  }
};

const getLabores = async (req, res) => {
  try {
    const result = await pool.query('SELECT labor FROM Labor');
    res.json(result.rows);
  } catch (error) {
    res.json({ error: error });
  }
};

module.exports = {
  nuevoEjerce,
  getLabores
}