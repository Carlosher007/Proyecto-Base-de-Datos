//Definimos las urls que el frontend va a poder utilizar para poder hacer operaciones (actualizar, eliminar..)

const { Router } = require('express');/*  */
const {
  createTask,
  getAllTasks,
  getTask,
  updateTask,  
  deleteTask,
} = require('../controllers/task.controller');

const router = Router();

// create a task
router.post('/tasks', createTask);

router.get('/tasks', getAllTasks);

router.get('/tasks/:id', getTask);

router.put('/tasks/:id', updateTask);

router.delete('/tasks/:id', deleteTask);

module.exports = router;