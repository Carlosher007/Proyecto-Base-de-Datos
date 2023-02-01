/** @format */

const e = require('express');
const { json } = require('express');
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
    const {ejerce_id,cliente_id,cantidad_trabajo,descripcion} = req.body;
    const result = await pool.query('SELECT disponible FROM Ejerce e JOIN Trabajador t ON e.trabajador_id = t.trabajador_id WHERE e.ejerce_id = $1 LIMIT 1',
    [ejerce_id]);
    
    if(cantidad_trabajo <= 0){
      res.status(503).json({message: "No se aceptan cantidades nulas ni negativas"});
    }else{
      if(result.rows[0].disponible){
      console.log('Trabajador disponible');
      
      const precio = (await pool.query('SELECT precio FROM Ejerce WHERE $1 = ejerce_id',[ejerce_id])).rows[0].precio
      const monto = precio * cantidad_trabajo

      const nuevaTransaccion = await pool.query('INSERT INTO Transaccion(fecha,monto) VALUES(NULL,$1)',[monto]);
      
      const transaccion_id = await pool.query('SELECT transaccion_id FROM Transaccion ORDER BY transaccion_id DESC LIMIT 1');

      console.log(transaccion_id.rows[0].transaccion_id);

      const crearContrato = await pool.query('INSERT INTO Contrato(ejerce_id,cliente_id,cantidad_trabajo,calificacion,descripcion,fecha_i,fecha_f,transaccion_id) VALUES ($1,$2,$3,NULL,$4,NOW(),NULL,$5)',
      [ejerce_id,cliente_id,cantidad_trabajo,descripcion,transaccion_id.rows[0].transaccion_id]);
      res.json({message: 'Nuevo contrato creado'});
      }else {
        res.status(503).json({message: "Trabajador no disponible"});
      }
    }
  } catch(error){
    console.log(error);
    res.json({ error: error });
  }
}

const buscarTrabajadores = async (req,res) => {
  try{
    const {cliente_id, labor ,criterio} = req.body
    
    console.log(req.body);

    const labores = await pool.query('SELECT labor_id FROM Labor WHERE labor = $1::labor_tipo',[labor]);
    const labor_id_in = labores.rows[0].labor_id;

    const usuario = await pool.query('SELECT user_id FROM Cliente WHERE cliente_id = $1', [cliente_id]);
    const user_id = usuario.rows[0].user_id;

    const coor = await pool.query('SELECT coor_id FROM Usuario WHERE user_id = $1', [user_id]);
    const coor_id = coor.rows[0].coor_id;

    const coordenada = await pool.query('SELECT latitud,longitud FROM Coordenada WHERE coor_id = $1',[coor_id]);
    
    const latitud_in = coordenada.rows[0].latitud;
    const longitud_in = coordenada.rows[0].longitud;

    const result = await pool.query('SELECT * FROM buscar_trabajadores($1,$2,$3,$4);', [labor_id_in,latitud_in,longitud_in,criterio]);
    res.json(result.rows);
  } catch(error){
    console.log(error);
    res.json({ error: error });
  }
};

const infoContratoT = async (req,res) => {
  try{
    const {tid} = req.params;

    const result = await pool.query('SELECT * FROM infoContratoT WHERE $1 = trabajador_id;',[tid]);
    res.json(result.rows);

  } catch(error){
    console.log(error);
    res.json({ error: error });
  }
}

const infoTransaccionT = async (req,res) => {
  try{
    const {tid} = req.params;

    const result = await pool.query('SELECT * FROM infoTransaccionT WHERE $1 = trabajador_id;',[tid]);
    res.json(result.rows);

  } catch(error){
    console.log(error);
    res.json({ error: error });
  }
}

const notificacionesT = async (req,res) => {
  try{
    const {tid} = req.params;

    const result = await pool.query('SELECT * FROM notificacionesT WHERE $1 = trabajador_id;',[tid]);
    res.json(result.rows);

  } catch(error){
    console.log(error);
    res.json({ error: error });
  }
}

const infoContratoC = async (req,res) => {
  try{
    const {cid} = req.params;

    const result = await pool.query('SELECT * FROM infoContratoC WHERE $1 = cliente_id;',[cid]);
    res.json(result.rows);

  } catch(error){
    console.log(error);
    res.json({ error: error });
  }
}

const infoTransaccionC = async (req,res) => {
  try{
    const {cid} = req.body;

    const result = await pool.query('SELECT * FROM infoTransaccionC WHERE $1 = cliente_id;',[cid]);
    res.json(result.rows);

  } catch(error){
    console.log(error);
    res.json({ error: error });
  }
}

const notificacionesC = async (req,res) => {
  try{
    const {cid} = req.params;

    const result = await pool.query('SELECT * FROM notificacionesC WHERE $1 = cliente_id;',[cid]);
    res.json(result.rows);

  } catch(error){
    console.log(error);
    res.json({ error: error });
  }
}

const calificarServicio = async (req,res) => {
  try{
    const {p_contrato_id , p_calificacion } = req.body;

    if(p_calificacion <= 5.0 && p_calificacion >= 0){
      const result = await pool.query('CALL calificarServicio($1,$2);',[p_contrato_id,p_calificacion]);

      res.json({message: 'Se ha realizado la calificacion'});
    }else{
      res.status(503).json({message: 'Valor de calificacion invalido'});
    }
  } catch(error){
    console.log(error);
    res.json({ error: error });
  }
}

const realizarPago = async (req,res) => {
  try{
    const {cid} = req.body;

    if(pago >= 0){
      const result = await pool.query('CALL realizarPago($1);',[cid]);

      res.json({message: 'Se ha realizado un pago'});
    }else{
      res.status(503).json({message: 'no se adminten pagos con numero negativos'});
    }
  } catch(error){
    console.log(error);
    res.json({ error: error });
  }
}

const finalizarContrato = async (req,res) => {
  try{
    const {cid} = req.params;
      
    const result = await pool.query('CALL finalizarContrato($1);',[cid]);
      res.json({message: 'El contrato ha finalizado'});

  } catch(error){
    console.log(error);
    res.json({ error: error });
  }
}

module.exports = {
  nuevoEjerce,
  getLabores,
  nuevoContrato,
  buscarTrabajadores,
  infoContratoT,
  infoTransaccionT,
  notificacionesT,
  infoContratoC,
  infoTransaccionC,
  notificacionesC,
  calificarServicio,
  realizarPago,
  finalizarContrato
};