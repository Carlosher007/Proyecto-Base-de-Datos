/** @format */

const pool = require('../db'); //pool es la conexion a la base de datos

const nuevoEjerce = async (req, res) => {
  try {
    const { tid, labor_, tipo_trabajo, precio, descripcion } = req.body;
    const result = await pool.query(
      'SELECT labor_id FROM Ejerce WHERE trabajador_id = $1 AND labor_id = (SELECT labor_id FROM Labor WHERE labor = $2)',
      [tid, labor_]
    );
    if (result.rows.length > 0)
      return res
        .status(400)
        .json({ message: 'Trabajador ya ejerce esa labor' });

    const result2 = await pool.query(
      'SELECT labor_id FROM Labor WHERE labor = $1',
      [labor_]
    );
    const lid = result2.rows[0].labor_id;

    await pool.query(
      'INSERT INTO Ejerce(trabajador_id,labor_id,tipo_trabajo,precio,descripcion) VALUES ($1,$2,$3,$4,$5)',
      [tid, lid, tipo_trabajo, precio, descripcion]
    );
    res.status(201).json({ message: 'Labor asociado al trabajador con éxito' });
  } catch (error) {
    res.json({ error: error , message:"Error al asociar al trabajador con la labor"});
  }
};

const getLabores = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const result = await pool.query(
      'SELECT labor FROM Labor WHERE labor_id NOT IN (SELECT labor_id FROM Ejerce WHERE trabajador_id = $1)',
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: ' Labores no encontradas' });

    res.json(result.rows);
  } catch (error) {
    res.json({ error: error });
  }
};

module.exports = {
  nuevoEjerce,
  getLabores,
};
