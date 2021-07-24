/* Dependencies */
const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');

/* Creating new user */
const newUser = async (req, res) => {

  /* Valid and read errors */
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const { email, password } = req.body

  try {
    /* Simple Validation */
    let user = await User.findOne({ email })
    if(user) {
      return res.status(400).json({ msg: 'User already exists' })
    }
    /* End Validation */
    /* Creating user */
    user = new User(req.body);
    /* Hash password with bcryptjs */
    const salt = await bcryptjs.genSalt(10)
    user.password = await bcryptjs.hash(password, salt)
    /* End hash */
    /* Saving User */
    await user.save();
    /*** ¡¡¡JWT!!! ***/
    /* Get user id */
    const payload = {
      user: {
        id: user.id
      }
    };
    /* Signing token */
    jwt.sign(payload, process.env.SECRETA, {
      expiresIn: 3600000
    }, (error, token) => {
      if(error) throw error;
      /* Send token */
      res.json({ token })
    })
    /*** ¡¡¡JWT!!! ***/
  }
  catch (error){
    /* Read error D: */
    console.log(error);
    res.status(400).send('ERROR!')
  }
}

/* Exporting controllers */
module.exports = {
  newUser
}