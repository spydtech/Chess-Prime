// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// const auth = async (req, res, next) => {
//   try {
//     // Get token from header
//     const token = req.header('Authorization')?.replace('Bearer ', '');
    
//     console.log('Auth middleware - Token received:', token ? 'Yes' : 'No');
    
//     if (!token) {
//       console.log('Auth middleware - No token provided');
//       return res.status(401).json({ 
//         message: 'No authentication token, access denied' 
//       });
//     }

//     // Verify token
//     let decoded;
//     try {
//       decoded = jwt.verify(token, process.env.JWT_SECRET);
//       console.log('Auth middleware - Token verified for userId:', decoded.userId);
//     } catch (jwtError) {
//       console.log('Auth middleware - Token verification failed:', jwtError.message);
//       return res.status(401).json({ 
//         message: 'Invalid or expired token' 
//       });
//     }

//     // Find user
//     const user = await User.findById(decoded.userId).select('-password');
    
//     if (!user) {
//       console.log('Auth middleware - User not found for ID:', decoded.userId);
//       return res.status(401).json({ 
//         message: 'User not found' 
//       });
//     }

//     console.log('Auth middleware - User authenticated:', user.email);
    
//     // Attach user to request
//     req.user = user;
//     req.token = token;
//     next();
    
//   } catch (error) {
//     console.error('Auth middleware - Unexpected error:', error);
//     res.status(500).json({ 
//       message: 'Authentication error' 
//     });
//   }
// };

// export default auth;




import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const auth = async (req, res, next) => {
  try {
    // Log all headers for debugging
    console.log('🔐 Auth middleware - Headers:', {
      authorization: req.header('Authorization') ? 'Present' : 'Missing',
      'x-auth-token': req.header('x-auth-token') ? 'Present' : 'Missing',
      'content-type': req.header('content-type')
    });
    
    // Get token from multiple possible locations
    let token = null;
    
    // Check Authorization header (Bearer token)
    const authHeader = req.header('Authorization');
    if (authHeader) {
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7); // Remove 'Bearer ' prefix
      } else {
        token = authHeader;
      }
    }
    
    // Check x-auth-token header (alternative)
    if (!token) {
      token = req.header('x-auth-token');
    }
    
    // Check query params
    if (!token && req.query.token) {
      token = req.query.token;
    }
    
    // Check body
    if (!token && req.body && req.body.token) {
      token = req.body.token;
    }
    
    console.log('🔐 Auth middleware - Token received:', token ? 'Yes' : 'No');
    if (token) {
      console.log('🔐 Auth middleware - Token preview:', token.substring(0, 60) + '...');
      console.log('🔐 Auth middleware - Token length:', token.length);
    }
    
    if (!token) {
      console.log('🔐 Auth middleware - No token provided');
      return res.status(401).json({ 
        message: 'No authentication token, access denied' 
      });
    }

    // Verify token
    let decoded;
    try {
      if (!process.env.JWT_SECRET) {
        console.error('🔐 Auth middleware - JWT_SECRET not set in environment!');
        return res.status(500).json({ message: 'Server configuration error' });
      }
      
      console.log('🔐 Auth middleware - JWT_SECRET exists:', !!process.env.JWT_SECRET);
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('🔐 Auth middleware - Token verified successfully');
      console.log('🔐 Auth middleware - Decoded payload:', {
        userId: decoded.userId,
        id: decoded.id,
        user_id: decoded.user_id,
        iat: decoded.iat,
        exp: decoded.exp
      });
    } catch (jwtError) {
      console.error('🔐 Auth middleware - JWT verification failed:', jwtError.name, jwtError.message);
      
      if (jwtError.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired', expired: true });
      }
      if (jwtError.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token', invalid: true });
      }
      return res.status(401).json({ message: 'Authentication failed', error: jwtError.message });
    }

    // Get userId from token (try different possible field names)
    const userId = decoded.userId || decoded.id || decoded.user_id;
    
    if (!userId) {
      console.log('🔐 Auth middleware - No user ID found in token');
      return res.status(401).json({ message: 'Invalid token payload' });
    }
    
    console.log('🔐 Auth middleware - Looking for user with ID:', userId);
    
    // Find user
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      console.log('🔐 Auth middleware - User not found for ID:', userId);
      return res.status(401).json({ message: 'User not found' });
    }

    console.log('🔐 Auth middleware - User authenticated:', user.email, user.name);
    
    // Attach user to request
    req.user = user;
    req.userId = user._id;
    req.token = token;
    next();
    
  } catch (error) {
    console.error('🔐 Auth middleware - Unexpected error:', error);
    res.status(500).json({ message: 'Authentication error', error: error.message });
  }
};

export default auth;

// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// const auth = async (req, res, next) => {
//   try {
//     // Get token from header
//     const authHeader = req.header('Authorization');
//     console.log('🔐 Auth middleware - Authorization header:', authHeader ? 'Present' : 'Missing');
    
//     if (!authHeader) {
//       console.log('🔐 Auth middleware - No Authorization header');
//       return res.status(401).json({ 
//         message: 'No authentication token, access denied' 
//       });
//     }

//     const token = authHeader.replace('Bearer ', '');
//     console.log('🔐 Auth middleware - Token length:', token.length);
//     console.log('🔐 Auth middleware - Token preview:', token.substring(0, 30) + '...');
    
//     if (!token) {
//       console.log('🔐 Auth middleware - No token after Bearer removal');
//       return res.status(401).json({ 
//         message: 'No authentication token, access denied' 
//       });
//     }

//     // Verify token with more detailed error handling
//     let decoded;
//     try {
//       console.log('🔐 Auth middleware - JWT_SECRET exists:', !!process.env.JWT_SECRET);
//       decoded = jwt.verify(token, process.env.JWT_SECRET);
//       console.log('🔐 Auth middleware - Token verified successfully');
//       console.log('🔐 Auth middleware - Decoded userId:', decoded.userId);
//       console.log('🔐 Auth middleware - Decoded iat:', new Date(decoded.iat * 1000).toISOString());
//       console.log('🔐 Auth middleware - Decoded exp:', new Date(decoded.exp * 1000).toISOString());
//     } catch (jwtError) {
//       console.error('🔐 Auth middleware - JWT verification failed:', jwtError.name);
//       console.error('🔐 Auth middleware - Error message:', jwtError.message);
      
//       if (jwtError.name === 'TokenExpiredError') {
//         return res.status(401).json({ 
//           message: 'Token expired', 
//           expired: true 
//         });
//       }
//       if (jwtError.name === 'JsonWebTokenError') {
//         return res.status(401).json({ 
//           message: 'Invalid token', 
//           invalid: true 
//         });
//       }
      
//       return res.status(401).json({ 
//         message: 'Authentication failed' 
//       });
//     }

//     // Find user
//     const user = await User.findById(decoded.userId).select('-password');
    
//     if (!user) {
//       console.log('🔐 Auth middleware - User not found for ID:', decoded.userId);
//       return res.status(401).json({ 
//         message: 'User not found' 
//       });
//     }

//     console.log('🔐 Auth middleware - User authenticated:', user.email, user.name);
    
//     // Attach user to request
//     req.user = user;
//     req.token = token;
//     next();
    
//   } catch (error) {
//     console.error('🔐 Auth middleware - Unexpected error:', error);
//     res.status(500).json({ 
//       message: 'Authentication error',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };

// export default auth;