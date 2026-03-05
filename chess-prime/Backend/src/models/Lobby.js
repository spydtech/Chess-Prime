import mongoose from 'mongoose';

const lobbySchema = new mongoose.Schema({
  lobbyCode: {
    type: String,
    required: true,
    unique: true,  // This creates an index automatically
    uppercase: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  gameType: {
    type: String,
    enum: ['standard', 'blitz', 'bullet', 'rapid'],
    default: 'standard'
  },
  timeControl: {
    type: String,
    required: true
  },
  isPrivate: {
    type: Boolean,
    default: false
  },
  maxPlayers: {
    type: Number,
    default: 2
  },
  status: {
    type: String,
    enum: ['waiting', 'ready', 'playing', 'cancelled'],
    default: 'waiting'
  },
  players: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: String,
    rating: Number,
    ready: { type: Boolean, default: false },
    joinedAt: { type: Date, default: Date.now }
  }],
  invitedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { timestamps: true });

// Remove duplicate lobbyCode index - it's already created by unique: true
// Keep only this index
lobbySchema.index({ status: 1 });

const Lobby = mongoose.model('Lobby', lobbySchema);
export default Lobby;