import mongoose from 'mongoose';

const moveSchema = new mongoose.Schema({
  from: String,
  to: String,
  promotion: String,
  san: String,
  fen: String,
  time: Number,
  moveNumber: Number
}, { _id: false });

const gameSchema = new mongoose.Schema({
  gameId: {
    type: String,
    required: true,
    unique: true  // This creates an index automatically
  },
  gameType: {
    type: String,
    enum: ['online', 'vs-computer', 'lobby', 'tournament'],
    required: true
  },
  status: {
    type: String,
    enum: ['waiting', 'active', 'completed', 'abandoned'],
    default: 'waiting'
  },
  players: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: String,
    color: { type: String, enum: ['white', 'black'] },
    rating: Number,
    ratingChange: { type: Number, default: 0 },
    timeRemaining: Number,
    isComputer: { type: Boolean, default: false }
  }],
  timeControl: {
    initial: Number,
    increment: Number
  },
  moves: [moveSchema],
  currentFen: {
    type: String,
    default: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
  },
  result: {
    type: String,
    enum: ['white', 'black', 'draw', null],
    default: null
  },
  termination: {
    type: String,
    enum: ['checkmate', 'resignation', 'timeout', 'draw', 'stalemate', 'agreement', null],
    default: null
  },
  startedAt: Date,
  endedAt: Date,
  lastMoveAt: Date
}, { timestamps: true });

// Remove duplicate gameId index - it's already created by unique: true
// Keep only these indexes
gameSchema.index({ 'players.userId': 1 });
gameSchema.index({ status: 1 });
gameSchema.index({ createdAt: -1 });

const Game = mongoose.model('Game', gameSchema);
export default Game;