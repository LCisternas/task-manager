/* Dependencies */
const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');
/* Verify user authenticated */
const authenticateUser = async (req, res) => {
  /* Error Handling */
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  /* Values given by the user */
  const { email, password } = req.body;

  try {
    /* Validating that user exist  */
    let user = await User.findOne({ email });
    if(!user) {
      return res.status(400).json({ msg: 'Does not exist' })
    }
    /* End Validation */
    /* Verifyng that I know the correct password */
    const rightPass = await bcryptjs.compare(password, user.password)
    if(!rightPass) {
      return res.status(400).json({ msg: 'Incorrect password' })
    }
    /***  ¡¡¡JWT!!! ***/
    /* Indicating user id */
    const payload = {
      user: {
        id: user.id
      }
    };
    /* Signing the token!!! */
    jwt.sign(payload, process.env.SECRETA, {
      expiresIn: 3600000
    }, (error, token) => {
      if(error) throw error;
      /* Send token */
      res.json({ token })
    })
    /*** ¡¡¡JWT!!! ***/

  }
  catch (error) {
    console.log(error)
  }

}
/* Verifying that it is the correct user */
const rightUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    /* Send user data */
    res.json({ user })
  } 
  catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'ERROR!' })
  }
}

module.exports = {
  authenticateUser,
  rightUser
}