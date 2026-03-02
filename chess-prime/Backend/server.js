// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import http from 'http';
// import { Server } from 'socket.io';
// import dotenv from 'dotenv';

// import authRoutes from './src/routes/authRoutes.js';
// // import gameRoutes from './src/routes/game.routes.js';

// dotenv.config();

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: [
//       process.env.CLIENT_URL || "http://localhost:3000",
//       "http://localhost:5173"
//     ],
//     credentials: true
//   }
// });

// // Middleware - FIXED CORS CONFIGURATION
// app.use(cors({
//   origin: [
//     process.env.CLIENT_URL || "http://localhost:3000",
//     "http://localhost:5173"
//   ],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Database connection
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Routes
// app.use('/api/auth', authRoutes);
// // app.use('/api/games', gameRoutes);

// // Basic route for testing
// app.get('/', (req, res) => {
//   res.json({ message: 'ChessVerse API is running' });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.status || 500).json({
//     message: err.message || 'Something went wrong!',
//     error: process.env.NODE_ENV === 'development' ? err : {}
//   });
// });

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './src/routes/authRoutes.js';
import gameRoutes from './src/routes/gameRoutes.js';
import lobbyRoutes from './src/routes/lobbyRoutes.js';
import quickMatchRoutes from './src/routes/quickMatchRoutes.js';
import computerRoutes from './src/routes/computerRoutes.js';

// Import socket handlers
import { setupSocketHandlers } from './src/utils/socketHandlers.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

// CORS configuration
const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:5173"
];

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  },
  transports: ['websocket', 'polling']
});

// Express middleware
app.use(cors({
  origin: function(origin, callback) {
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Database connection with retry logic
const connectDB = async () => {
  try {
    // Remove deprecated options
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('✅ MongoDB connected successfully');
    console.log(`📊 Database: ${mongoose.connection.name}`);
    console.log(`🌐 Host: ${mongoose.connection.host}`);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    // Retry connection after 5 seconds
    setTimeout(connectDB, 5000);
  }
};

connectDB();

// Handle MongoDB connection events
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

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ 
    message: 'ChessVerse API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatus = dbState === 1 ? 'connected' : 
                   dbState === 2 ? 'connecting' : 
                   dbState === 3 ? 'disconnecting' : 'disconnected';
  
  res.json({ 
    status: 'healthy',
    mongodb: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// Setup socket handlers
setupSocketHandlers(io);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    message: `Route ${req.method} ${req.path} not found`,
    error: 'Not Found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  
  const status = err.status || 500;
  const message = err.message || 'Something went wrong!';
  
  res.status(status).json({
    message,
    error: process.env.NODE_ENV === 'development' ? {
      stack: err.stack,
      details: err
    } : {}
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Client URL: ${process.env.CLIENT_URL || 'http://localhost:3000'}`);
});