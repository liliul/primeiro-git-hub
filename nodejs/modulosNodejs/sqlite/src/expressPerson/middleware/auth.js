const jwt = require('jsonwebtoken');
require("dotenv-safe").config();

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] 

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403) 
    req.user = decoded 
    next()
  })
}

module.exports = authenticateToken