import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    console.log('Auth middleware - Token received:', token ? 'Yes' : 'No');
    
    if (!token) {
      console.log('Auth middleware - No token provided');
      return res.status(401).json({ 
        message: 'No authentication token, access denied' 
      });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Auth middleware - Token verified for userId:', decoded.userId);
    } catch (jwtError) {
      console.log('Auth middleware - Token verification failed:', jwtError.message);
      return res.status(401).json({ 
        message: 'Invalid or expired token' 
      });
    }

    // Find user
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      console.log('Auth middleware - User not found for ID:', decoded.userId);
      return res.status(401).json({ 
        message: 'User not found' 
      });
    }

    console.log('Auth middleware - User authenticated:', user.email);
    
    // Attach user to request
    req.user = user;
    req.token = token;
    next();
    
  } catch (error) {
    console.error('Auth middleware - Unexpected error:', error);
    res.status(500).json({ 
      message: 'Authentication error' 
    });
  }
};

export default auth;