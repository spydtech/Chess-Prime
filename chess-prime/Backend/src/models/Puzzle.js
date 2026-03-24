import mongoose from 'mongoose';

const puzzleSchema = new mongoose.Schema({
  level: {
    type: Number,
    required: true,
    unique: true,
    min: 1,
    max: 10
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  hint: {
    type: String,
    required: true
  },
  initialBoard: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  solution: {
    from: {
      type: [Number],
      required: true,
      validate: {
        validator: function(v) {
          return Array.isArray(v) && v.length === 2;
        }
      }
    },
    to: {
      type: [Number],
      required: true,
      validate: {
        validator: function(v) {
          return Array.isArray(v) && v.length === 2;
        }
      }
    }
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'easy'
  }
}, {
  timestamps: true // This automatically handles createdAt and updatedAt
});

// Remove any pre-save hooks completely and let timestamps handle it
// The timestamps option above will automatically manage createdAt and updatedAt

// Add a simple validation for the board
puzzleSchema.path('initialBoard').validate(function(board) {
  return Array.isArray(board) && board.length === 8 && 
         board.every(row => Array.isArray(row) && row.length === 8);
}, 'Board must be an 8x8 array');

const Puzzle = mongoose.model('Puzzle', puzzleSchema);

export default Puzzle;