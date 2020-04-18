const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }
  try {
    const token = req.header('Authorization').split(' ')[1]
    if(!token) {
     return res.status(401).json({message: 'No auth'})
    }
    const decoded = jwt.verify(token, config.get('jwtSecret'))
    
    req.user = decoded
    
    next()

  } catch (e) {
    res.status(401).json({message: 'No auth'})
  }
}