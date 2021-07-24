/* Routes auth */
/* Dependencies */
const express = require('express');
const router = express.Router();
/* Middleware!!! */
const auth = require('../middleware/auth')
/* Middleware!!! */
const { authenticateUser, rightUser } = require('../controllers/authControllers')

router.post('/', authenticateUser);
router.get('/', auth, rightUser)  

module.exports = router;