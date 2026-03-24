// // server.js
// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import http from 'http';
// import { Server } from 'socket.io';
// import dotenv from 'dotenv';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // Import routes
// import authRoutes from './src/routes/authRoutes.js';
// import gameRoutes from './src/routes/gameRoutes.js';
// import lobbyRoutes from './src/routes/lobbyRoutes.js';
// import quickMatchRoutes from './src/routes/quickMatchRoutes.js';
// import computerRoutes from './src/routes/computerRoutes.js';
// import userRoutes from './src/routes/userRoutes.js';
// import profileRoutes  from './src/routes/profileRoutes.js';
// import puzzleRoutes from './src/routes/puzzleRoutes.js';

// // Import socket handlers
// import { setupSocketHandlers } from './src/utils/socketHandlers.js';

// dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// const server = http.createServer(app);

// // CORS configuration
// const allowedOrigins = [
//   process.env.CLIENT_URL || "http://localhost:5173",
//   "http://localhost:3000",
//   "http://localhost:5174",
//   "http://127.0.0.1:5173",
//   "http://localhost:3001",
//   "http://13.206.51.201",
//   "http://13.206.51.201:5173",
//   "http://13.206.51.201:5174",
//   "http://chessverss.com",
//   "http://www.chessverss.com",
//   "https://api.chessverss.com",
//   "https://www.chessverss.com",   

//   "http://chessverss.com:5173",
  
// ];

// // Socket.io setup with proper CORS
// const io = new Server(server, {
//   cors: {
//     origin: allowedOrigins,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//     allowedHeaders: ["Content-Type", "Authorization"]
//   },
//   transports: ['websocket', 'polling'],
//   allowEIO3: true,
//   pingTimeout: 60000,
//   pingInterval: 25000
// });

// // Make io accessible to routes/controllers
// app.set('io', io);

// // Express middleware
// app.use(cors({
//   origin: function(origin, callback) {
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       return callback(null, true);
//     } else {
//       console.log('❌ CORS blocked origin:', origin);
//       return callback(null, true); // Allow all origins in development
//     }
//   },
//   credentials: true
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Request logging
// app.use((req, res, next) => {
//   console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
//   next();
// });

// // Database connection with retry logic
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       serverSelectionTimeoutMS: 5000,
//       socketTimeoutMS: 45000,
//     });

//     console.log("✅ MongoDB connected successfully");
//   } catch (err) {
//     console.error("❌ MongoDB connection error:", err.message);
//     setTimeout(connectDB, 5000);
//   }
// };
// connectDB();

// // MongoDB event handlers
// mongoose.connection.on('connected', () => {
//   console.log('✅ MongoDB connected');
// });

// mongoose.connection.on('disconnected', () => {
//   console.log('❌ MongoDB disconnected');
// });

// mongoose.connection.on('reconnected', () => {
//   console.log('✅ MongoDB reconnected');
// });

// mongoose.connection.on('error', (err) => {
//   console.error('❌ MongoDB error:', err);
// });

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/games', gameRoutes);
// app.use('/api/lobby', lobbyRoutes);
// app.use('/api/quick-match', quickMatchRoutes);
// app.use('/api/computer', computerRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/profile', profileRoutes);
// app.use('/api/puzzles', puzzleRoutes);

// // Health check
// app.get('/health', (req, res) => {
//   res.json({ 
//     status: 'healthy',
//     timestamp: new Date().toISOString(),
//     mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
//   });
// });

// // Setup socket handlers - Pass io instance
// setupSocketHandlers(io);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error('❌ Error:', err.stack);
//   res.status(err.status || 500).json({
//     message: err.message || 'Internal server error'
//   });
// });

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({ message: `Route ${req.method} ${req.path} not found` });
// });

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
// });



import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import authRoutes from './src/routes/authRoutes.js';
import gameRoutes from './src/routes/gameRoutes.js';
import lobbyRoutes from './src/routes/lobbyRoutes.js';
import quickMatchRoutes from './src/routes/quickMatchRoutes.js';
import computerRoutes from './src/routes/computerRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import profileRoutes  from './src/routes/profileRoutes.js';
import puzzleRoutes from './src/routes/puzzleRoutes.js';

// Import socket handlers
import { setupSocketHandlers } from './src/utils/socketHandlers.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

// CORS configuration
const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://localhost:3001",
  "http://13.206.51.201",
  "http://13.206.51.201:5173",
  "http://13.206.51.201:5174",
  "http://chessverss.com",
  "http://www.chessverss.com",
  "https://chessverss.com",
  "https://www.chessverss.com",
  "https://api.chessverss.com",
  "http://chessverss.com:5173",
];

// CORS options
const corsOptions = {
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('❌ CORS blocked origin:', origin);
      // In production, you might want to reject, but for now allow with warning
      callback(null, true);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  exposedHeaders: ['Content-Length', 'X-Requested-With'],
  optionsSuccessStatus: 200
};

// Apply CORS middleware first
app.use(cors(corsOptions));

// Socket.io setup with proper CORS
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
  },
  transports: ['websocket', 'polling'],
  allowEIO3: true,
  pingTimeout: 60000,
  pingInterval: 25000
});

// Make io accessible to routes/controllers
app.set('io', io);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Database connection with retry logic
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    setTimeout(connectDB, 5000);
  }
};
connectDB();

// MongoDB event handlers
mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connected');
});

mongoose.connection.on('disconnected', () => {
  console.log('❌ MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
  console.log('✅ MongoDB reconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB error:', err);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/lobby', lobbyRoutes);
app.use('/api/quick-match', quickMatchRoutes);
app.use('/api/computer', computerRoutes);
app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/puzzles', puzzleRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Setup socket handlers - Pass io instance
setupSocketHandlers(io);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// 404 handler - Catch all unmatched routes
app.use((req, res) => {
  res.status(404).json({ 
    message: `Route ${req.method} ${req.path} not found`,
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.NODE_ENV === 'production' ? 5000 : (process.env.PORT || 5000);
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✅ CORS enabled for origins:`, allowedOrigins);
});