/** @format */

const pool = require('../db');

const nuevoEjerce = async (req,res) => {
  const {tid,labor_,tipo_trabajo,precio,descripcion} = req.body;

  try{
    const result = await pool.query('CALL trabajador_ejerce($1,$2,$3,$4,$5)',[tid,labor_,tipo_trabajo,precio,descripcion]);
    res.json(result)
  } catch (error){
    res.json({error: error})
  }
};

module.exports = {
  nuevoEjerce
};

