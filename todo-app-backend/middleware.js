// middleware/middleware.js
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(403).json({ message: 'Access Denied, No Token Provided' });
  }

  try {
    // Verifying the JWT token
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.userId = decoded.userId;
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(403).json({ message: 'Invalid Token' });
  }
};

module.exports = { verifyToken };
