import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  gameId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  players: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    rating: Number,
    color: { type: String, enum: ['white', 'black'] }
  }],
  status: {
    type: String,
    enum: ['waiting', 'active', 'completed', 'abandoned'],
    default: 'waiting'
  },
  gameMode: {
    type: String,
    enum: ['online', 'vs-computer', 'tournament', 'lobby'],
    required: true
  },
  timeControl: {
    initial: Number, // minutes
    increment: Number // seconds
  },
  moves: [{
    from: String,
    to: String,
    promotion: String,
    san: String,
    fen: String,
    timestamp: { type: Date, default: Date.now }
  }],
  result: {
    winner: { type: String, enum: ['white', 'black', 'draw', null], default: null },
    method: { type: String, enum: ['checkmate', 'resign', 'timeout', 'draw', 'stalemate', null], default: null }
  },
  startTime: Date,
  endTime: Date,
  pgn: { type: String, default: '' },
  fenHistory: [String]
}, { timestamps: true });

export default mongoose.model('Game', gameSchema);