/** @format */

const pool = require('../db'); //pool es la conexion a la base de datos

//next sirve para que el error se envie al middleware de error

const createTask = async (req, res, next) => {
  //req.body es lo que el usuario envia
  try {
    const { title, description } = req.body;

    const newTask = await pool.query(
      'INSERT INTO task (title, description) VALUES($1, $2) RETURNING *',
      [title, description]
    );

    res.json(newTask.rows[0]); //Para que el usuario vea lo que se acaba de crear k
  } catch (error) {
    // res.json("erro r")
    next(error); 
  }
};

const getAllTasks = async (req, res, next) => {
  try {
    const allTasks = await pool.query('SELECT * FROM task');
    res.json(allTasks.rows);
  } catch (error) {
    next(error);
  }
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM task WHERE id = $1', [id]);

    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Task not found' });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const result = await pool.query(
      'UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *',
      [title, description, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Task not found' });

    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM task WHERE id = $1', [id]);

    if (result.rowCount === 0)
      return res.status(404).json({ message: 'Task not found' });

    return res.sendStatus(204); //Significa que todo salio bien pero se devuelve ningun contenido
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
};
