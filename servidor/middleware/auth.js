/* ¡¡¡MIDDLEWARE THAT I USE IN THE ROUTES, FOR AUTHENTICATION!!! */
const jwt = require('jsonwebtoken');
module.exports = function(req, res, next) {
  /* HEADER WHERE THE TOKEN IS SENT */
  const token = req.header('x-auth-token')
  if(!token) {
    return res.status(401).json({ msg: 'NO TOKEN, PERMISSION DENIED' })
  }
  try {
    /* TOKEN SIGNATURE VERIFICATION */
    const encryption = jwt.verify(token, process.env.SECRETA)
    req.user = encryption.user
    next();
  }
  catch {
    res.status(401).json({ msg: 'PERMISSION DENIED' })
  }
}