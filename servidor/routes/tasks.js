/* Routes tasks */
/* Dependencies */
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
/* Middleware!!! */
const auth = require('../middleware/auth');
/* Middleware!!! */
const { newTask, getTaskByProyect, updateTask, deleteTask } = require('../controllers/taskControllers');

router.post('/', auth, [check('name', 'Invalid Name').not().isEmpty()], newTask)
router.get('/', auth, getTaskByProyect);
router.put('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);

module.exports = router;