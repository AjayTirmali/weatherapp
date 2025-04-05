const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'weatherapp-secret-key';

const auth = async (req, res, next) => {
  try {
    // Get token from header, query, or cookie
    const token = req.header('x-auth-token') || 
                  req.query.token || 
                  (req.headers.authorization && req.headers.authorization.startsWith('Bearer') ? 
                    req.headers.authorization.split(' ')[1] : null);
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    try {
      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);
      
      // Find user
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(401).json({ message: 'Token is not valid - user not found' });
      }
      
      req.user = user;
      next();
    } catch (tokenError) {
      console.error('Token verification error:', tokenError.message);
      return res.status(401).json({ message: 'Token is not valid - verification failed' });
    }
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ message: 'Server error during authentication' });
  }
};

module.exports = auth; 