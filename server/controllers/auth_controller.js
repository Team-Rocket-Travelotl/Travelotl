const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token
  console.log(req.headers.authorization);
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)


      // Get user from the token, not including the hashed password
      req.user = await User.findById(decoded.id).select('-password')
      console.log(req.user);

      next()
    } catch (error) {
      console.log(error)
      res.status(401).json({ error: 'Not authorized'})

    }
  }
  else {
    res.status(401).json({ error: 'Not authorized, no token'})
  }
}

module.exports = { protect }