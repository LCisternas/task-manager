/* Routes users */
/* Dependencies */
const express = require('express');
const router = express.Router();
const { newUser } = require('../controllers/userControllers');
const { check } = require('express-validator');

router.post('/', 
  [
    check('name', 'Mandatory name').not().isEmpty(),
    check('email', 'Add a valid email').isEmail(),
    check('password', 'minimum password 6 characters').isLength({min: 6})
  ],
  newUser);

module.exports = router;