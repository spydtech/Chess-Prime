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
//    chessExperience: {
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
//   settings: {
//     boardTheme: { type: String, default: 'classic' },
//     pieceSet: { type: String, default: 'default' },
//     soundEnabled: { type: Boolean, default: true },
//     moveAnimation: { type: Boolean, default: true }
//   }
// }, { timestamps: true });

// // CORRECT: async/await with next() called explicitly
// userSchema.pre('save', async function(next) {
//   try {
//     // Only hash the password if it's modified
//     if (!this.isModified('password')) {
//       return next();
//     }
    
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// userSchema.methods.comparePassword = async function(candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// };

// userSchema.methods.getPublicProfile = function() {
//   return {
//     id: this._id,
//     name: this.name,
//     rating: this.rating,
//     gamesPlayed: this.gamesPlayed,
//     gamesWon: this.gamesWon,
//     gamesLost: this.gamesLost,
//     gamesDrawn: this.gamesDrawn,
//     isOnline: this.isOnline,
//     settings: this.settings
//   };
// };

// const User = mongoose.model('User', userSchema);
// export default User;


// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, 'Name is required'],
//       trim: true,
//       minlength: 2
//     },

//     email: {
//       type: String,
//       required: [true, 'Email is required'],
//       unique: true,
//       lowercase: true,
//       trim: true
//     },

//     password: {
//       type: String,
//       required: [true, 'Password is required'],
//       select: false
//     },

//     chessExperience: {
//       type: Number,
//       enum: [1, 2, 3, 4], // 1=Beginner, 2=Intermediate, 3=Advanced, 4=Expert
//       default: null
//     },

//     rating: {
//       type: Number,
//       default: 1200
//     },

//     gamesPlayed: { type: Number, default: 0 },
//     gamesWon: { type: Number, default: 0 },
//     gamesLost: { type: Number, default: 0 },
//     gamesDrawn: { type: Number, default: 0 },

//     isOnline: { type: Boolean, default: false },

//     lastSeen: { type: Date, default: Date.now },

//     friends: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//       }
//     ],

//     settings: {
//       boardTheme: { type: String, default: 'classic' },
//       pieceSet: { type: String, default: 'default' },
//       soundEnabled: { type: Boolean, default: true },
//       moveAnimation: { type: Boolean, default: true }
//     }
//   },
//   { timestamps: true }
// );




// /* =========================================
//    PASSWORD HASHING MIDDLEWARE (FIXED)
// ========================================= */

// userSchema.pre('save', async function () {
//   // Only hash password if it was modified
//   if (!this.isModified('password')) return;

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });




// /* =========================================
//    INSTANCE METHODS
// ========================================= */

// // Compare password during login
// userSchema.methods.comparePassword = async function (candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };


// // Public profile (hide sensitive data)
// userSchema.methods.getPublicProfile = function () {
//   return {
//     id: this._id,
//     name: this.name,
//     email: this.email,
//     chessExperience: this.chessExperience,
//     rating: this.rating,
//     gamesPlayed: this.gamesPlayed,
//     gamesWon: this.gamesWon,
//     gamesLost: this.gamesLost,
//     gamesDrawn: this.gamesDrawn,
//     isOnline: this.isOnline,
//     settings: this.settings
//   };
// };



// /* =========================================
//    EXPORT MODEL
// ========================================= */

// const User = mongoose.model('User', userSchema);

// export default User;



// // models/User.js
// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, 'Username is required'],
//       unique: true,
//       trim: true,
//       minlength: 3,
//       maxlength: 20
//     },

//     email: {
//       type: String,
//       required: [true, 'Email is required'],
//       unique: true,
//       lowercase: true,
//       trim: true
//     },

//     password: {
//       type: String,
//       required: [true, 'Password is required'],
//       select: false
//     },

//     // Profile Information
//     displayName: {
//       type: String,
//       trim: true,
//       maxlength: 50
//     },

//     bio: {
//       type: String,
//       maxlength: 500
//     },

//     location: {
//       type: String,
//       maxlength: 100
//     },

//     website: {
//       type: String,
//       maxlength: 200
//     },

//     birthday: {
//       type: Date
//     },

//     gender: {
//       type: String,
//       enum: ['Prefer not to say', 'Male', 'Female', 'Non-binary', 'Other'],
//       default: 'Prefer not to say'
//     },

//     occupation: {
//       type: String,
//       maxlength: 100
//     },

//     interests: {
//       type: String,
//       maxlength: 200
//     },

//     chessLevel: {
//       type: String,
//       enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Professional'],
//       default: 'Beginner'
//     },

//     preferredLanguage: {
//       type: String,
//       default: 'English'
//     },

//     // Chess Statistics
//     rating: {
//       type: Number,
//       default: 1200
//     },

//     gamesPlayed: { type: Number, default: 0 },
//     gamesWon: { type: Number, default: 0 },
//     gamesLost: { type: Number, default: 0 },
//     gamesDrawn: { type: Number, default: 0 },
    
//     tournamentPoints: { type: Number, default: 0 },
//     studies: { type: Number, default: 0 },
//     forumPosts: { type: Number, default: 0 },

//     // Account Settings
//     isOnline: { type: Boolean, default: false },
//     lastSeen: { type: Date, default: Date.now },
    
//     kidMode: { type: Boolean, default: false },

//     friends: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//       }
//     ],

//     settings: {
//       boardTheme: { type: String, default: 'classic' },
//       pieceSet: { type: String, default: 'default' },
//       soundEnabled: { type: Boolean, default: true },
//       moveAnimation: { type: Boolean, default: true }
//     }
//   },
//   { timestamps: true }
// );

// // Password hashing middleware
// userSchema.pre('save', async function () {
//   if (!this.isModified('password')) return;
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// // Compare password method
// userSchema.methods.comparePassword = async function (candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// // Get public profile (for viewing other users)
// userSchema.methods.getPublicProfile = function () {
//   return {
//     id: this._id,
//     name: this.name,
//     displayName: this.displayName || this.name,
//     bio: this.bio,
//     location: this.location,
//     website: this.website,
//     chessLevel: this.chessLevel,
//     rating: this.rating,
//     gamesPlayed: this.gamesPlayed,
//     gamesWon: this.gamesWon,
//     gamesLost: this.gamesLost,
//     gamesDrawn: this.gamesDrawn,
//     tournamentPoints: this.tournamentPoints,
//     studies: this.studies,
//     forumPosts: this.forumPosts,
//     isOnline: this.isOnline,
//     lastSeen: this.lastSeen,
//     memberSince: this.createdAt,
//     preferredLanguage: this.preferredLanguage
//   };
// };

// // Get private profile (for the user themselves)
// userSchema.methods.getPrivateProfile = function () {
//   return {
//     id: this._id,
//     name: this.name,
//     email: this.email,
//     displayName: this.displayName,
//     bio: this.bio,
//     location: this.location,
//     website: this.website,
//     birthday: this.birthday,
//     gender: this.gender,
//     occupation: this.occupation,
//     interests: this.interests,
//     chessLevel: this.chessLevel,
//     preferredLanguage: this.preferredLanguage,
//     rating: this.rating,
//     gamesPlayed: this.gamesPlayed,
//     gamesWon: this.gamesWon,
//     gamesLost: this.gamesLost,
//     gamesDrawn: this.gamesDrawn,
//     tournamentPoints: this.tournamentPoints,
//     studies: this.studies,
//     forumPosts: this.forumPosts,
//     isOnline: this.isOnline,
//     lastSeen: this.lastSeen,
//     memberSince: this.createdAt,
//     kidMode: this.kidMode,
//     settings: this.settings,
//     friends: this.friends
//   };
// };

// const User = mongoose.model('User', userSchema);
// export default User;


// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 20
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false
    },

    // Profile Information
    displayName: {
      type: String,
      trim: true,
      maxlength: 50
    },

    bio: {
      type: String,
      maxlength: 500
    },

    location: {
      type: String,
      maxlength: 100
    },

    website: {
      type: String,
      maxlength: 200
    },

    birthday: {
      type: Date
    },

    gender: {
      type: String,
      enum: ['Prefer not to say', 'Male', 'Female', 'Non-binary', 'Other'],
      default: 'Prefer not to say'
    },

    occupation: {
      type: String,
      maxlength: 100
    },

    interests: {
      type: String,
      maxlength: 200
    },

    chessLevel: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Professional'],
      default: 'Beginner'
    },

    preferredLanguage: {
      type: String,
      default: 'English'
    },

    // Chess Statistics
    rating: {
      type: Number,
      default: 1200
    },

    gamesPlayed: { type: Number, default: 0 },
    gamesWon: { type: Number, default: 0 },
    gamesLost: { type: Number, default: 0 },
    gamesDrawn: { type: Number, default: 0 },
    
    tournamentPoints: { type: Number, default: 0 },
    studies: { type: Number, default: 0 },
    forumPosts: { type: Number, default: 0 },

    // Account Settings
    isOnline: { type: Boolean, default: false },
    lastSeen: { type: Date, default: Date.now },
    
    kidMode: { type: Boolean, default: false },

    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],

    settings: {
      boardTheme: { type: String, default: 'classic' },
      pieceSet: { type: String, default: 'default' },
      soundEnabled: { type: Boolean, default: true },
      moveAnimation: { type: Boolean, default: true }
    }
  },
  { timestamps: true }
);

// Password hashing middleware
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Get public profile (for viewing other users)
userSchema.methods.getPublicProfile = function () {
  return {
    id: this._id,
    name: this.name,
    displayName: this.displayName || this.name,
    bio: this.bio,
    location: this.location,
    website: this.website,
    chessLevel: this.chessLevel,
    rating: this.rating,
    gamesPlayed: this.gamesPlayed,
    gamesWon: this.gamesWon,
    gamesLost: this.gamesLost,
    gamesDrawn: this.gamesDrawn,
    tournamentPoints: this.tournamentPoints,
    studies: this.studies,
    forumPosts: this.forumPosts,
    isOnline: this.isOnline,
    lastSeen: this.lastSeen,
    memberSince: this.createdAt,
    preferredLanguage: this.preferredLanguage
  };
};

// Get private profile (for the user themselves)
userSchema.methods.getPrivateProfile = function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    displayName: this.displayName,
    bio: this.bio,
    location: this.location,
    website: this.website,
    birthday: this.birthday,
    gender: this.gender,
    occupation: this.occupation,
    interests: this.interests,
    chessLevel: this.chessLevel,
    preferredLanguage: this.preferredLanguage,
    rating: this.rating,
    gamesPlayed: this.gamesPlayed,
    gamesWon: this.gamesWon,
    gamesLost: this.gamesLost,
    gamesDrawn: this.gamesDrawn,
    tournamentPoints: this.tournamentPoints,
    studies: this.studies,
    forumPosts: this.forumPosts,
    isOnline: this.isOnline,
    lastSeen: this.lastSeen,
    memberSince: this.createdAt,
    kidMode: this.kidMode,
    settings: this.settings,
    friends: this.friends
  };
};

const User = mongoose.model('User', userSchema);
export default User;