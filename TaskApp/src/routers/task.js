const express = require('express');
const {
    getTasks,
    getTask,
    addTask,
    deleteTask,
    updateTask
} = require('../../controllers/task-controller');

const router = express.Router();

router.get('/tasks', getTasks);
router.get('/tasks/:id', getTask);
router.post('/tasks', addTask);
router.delete('/tasks', deleteTask);
router.patch('/tasks', updateTask);

module.exports = router;
