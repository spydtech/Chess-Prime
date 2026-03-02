import mongoose from 'mongoose';

const lobbySchema = new mongoose.Schema({
  lobbyCode: { 
    type: String, 
    required: true, 
    unique: true 
  },
  hostId: { 
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
  status: {
    type: String,
    enum: ['waiting', 'ready', 'in-game', 'cancelled'],
    default: 'waiting'
  },
  players: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    rating: Number,
    ready: { type: Boolean, default: false },
    joinedAt: { type: Date, default: Date.now }
  }],
  maxPlayers: { 
    type: Number, 
    default: 2 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model('Lobby', lobbySchema);