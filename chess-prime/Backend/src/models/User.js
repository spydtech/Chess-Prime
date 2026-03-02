// import mongoose from 'mongoose';




// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//     minlength: 2
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true,
//     trim: true
//   },
//   password: {
//     type: String,
//     required: true,
//     select: false
//   },
//   chessExperience: {
//     type: Number,
//     enum: [1, 2, 3, 4],
//     default: null
//   },
//   rating: {
//     type: Number,
//     default: 1200
//   },
//   gamesPlayed: { type: Number, default: 0 },
//   gamesWon: { type: Number, default: 0 },
//   gamesLost: { type: Number, default: 0 },
//   gamesDrawn: { type: Number, default: 0 },
//   isOnline: { type: Boolean, default: false },
//   lastSeen: { type: Date, default: Date.now },
//   friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//   blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
// }, { timestamps: true });

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
  
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// userSchema.methods.comparePassword = async function (candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// };

// export default mongoose.model('User', userSchema);



import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  chessExperience: {
    type: Number,
    enum: [1, 2, 3, 4],
    default: null
  },
  rating: {
    type: Number,
    default: 1200
  },
  gamesPlayed: { type: Number, default: 0 },
  gamesWon: { type: Number, default: 0 },
  gamesLost: { type: Number, default: 0 },
  gamesDrawn: { type: Number, default: 0 },
  isOnline: { type: Boolean, default: false },
  lastSeen: { type: Date, default: Date.now },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

// FIXED: Async middleware WITHOUT next parameter
userSchema.pre('save', async function() {
  // Only hash the password if it's modified
  if (!this.isModified('password')) return;
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw new Error('Password hashing failed');
  }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);