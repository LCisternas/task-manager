/* Routes proyects */
/* Dependencies */
const express = require('express');
const router = express.Router();
const { newProyect, getProyects, updateProyect, deleteProyect } = require('../controllers/proyectControllers');
/* Middleware!!! */
const auth = require('../middleware/auth');
/* Middleware!!! */
const { check } = require('express-validator');

router.post('/', auth, [check('name', 'Mandatory Name').not().isEmpty()], newProyect)
router.get('/', auth, getProyects)
router.put('/:id', auth,[check('name', 'Mandatory Name').not().isEmpty()], updateProyect)
router.delete('/:id', auth, deleteProyect)


module.exports = router;