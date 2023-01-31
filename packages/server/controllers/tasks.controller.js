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

const nuevoContrato = async (req,res) => {
  try{
    const {ejerce_id,cliente_id,descripcion} = req.body;
    const result = await pool.query('SELECT disponible FROM Ejerce e JOIN Trabajador t ON e.trabajador_id = t.trabajador_id WHERE e.ejerce_id = $1 LIMIT 1',
    [ejerce_id]);
    
    if(result.rows[0].disponible){
      console.log('Trabajador disponible');
      
      const nuevaTransaccion = await pool.query('INSERT INTO Transaccion(fecha,monto) VALUES(NULL,NULL)');
      
      const transaccion_id = await pool.query('SELECT transaccion_id FROM Transaccion ORDER BY transaccion_id DESC LIMIT 1');

      console.log(transaccion_id.rows[0].transaccion_id);

      const crearContrato = await pool.query('INSERT INTO Contrato(ejerce_id,cliente_id,calificacion,descripcion,fecha_i,fecha_f,transaccion_id) VALUES ($1,$2,NULL,$3,NOW(),NULL,$4)',
      [ejerce_id,cliente_id,descripcion,transaccion_id.rows[0].transaccion_id]);
      res.json({message: 'Nuevo contrato creado'});
    }else {
      res.status(503).json({message: "Trabajador no disponible"});
    }
  } catch(error){
    console.log(error);
    res.json({ error: error });
  }
}

module.exports = {
  nuevoEjerce,
  getLabores,
  nuevoContrato
};