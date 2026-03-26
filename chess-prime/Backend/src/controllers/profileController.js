// controllers/profileController.js
import User from '../models/User.js';
import { validationResult } from 'express-validator';

// Get current user's profile
export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.getPrivateProfile());
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user profile by name
export const getUserProfile = async (req, res) => {
  try {
    const { name } = req.params;
    
    const user = await User.findOne({ name });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.getPublicProfile());
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update profile information
export const updateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      displayName,
      bio,
      location,
      website,
      birthday,
      gender,
      occupation,
      interests,
      chessLevel,
      preferredLanguage,
      kidMode
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields if provided
    if (displayName !== undefined) user.displayName = displayName;
    if (bio !== undefined) user.bio = bio;
    if (location !== undefined) user.location = location;
    if (website !== undefined) user.website = website;
    if (birthday !== undefined) user.birthday = birthday;
    if (gender !== undefined) user.gender = gender;
    if (occupation !== undefined) user.occupation = occupation;
    if (interests !== undefined) user.interests = interests;
    if (chessLevel !== undefined) user.chessLevel = chessLevel;
    if (preferredLanguage !== undefined) user.preferredLanguage = preferredLanguage;
    if (kidMode !== undefined) user.kidMode = kidMode;

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: user.getPrivateProfile()
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Change name
export const changeName = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { newName } = req.body;

    // Check if name is already taken
    const existingUser = await User.findOne({ name: newName });
    if (existingUser) {
      return res.status(400).json({ message: 'Name already taken' });
    }

    const user = await User.findById(req.user._id);
    user.name = newName;
    await user.save();

    res.json({
      message: 'Name updated successfully',
      name: user.name
    });
  } catch (error) {
    console.error('Change name error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Change password
export const changePassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select('+password');

    // Verify current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Change email
export const changeEmail = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { newEmail } = req.body;

    // Check if email is already taken
    const existingUser = await User.findOne({ email: newEmail.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const user = await User.findById(req.user._id);
    user.email = newEmail.toLowerCase();
    await user.save();

    res.json({
      message: 'Email updated successfully',
      email: user.email
    });
  } catch (error) {
    console.error('Change email error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update settings
export const updateSettings = async (req, res) => {
  try {
    const { boardTheme, pieceSet, soundEnabled, moveAnimation } = req.body;

    const user = await User.findById(req.user._id);

    if (boardTheme !== undefined) user.settings.boardTheme = boardTheme;
    if (pieceSet !== undefined) user.settings.pieceSet = pieceSet;
    if (soundEnabled !== undefined) user.settings.soundEnabled = soundEnabled;
    if (moveAnimation !== undefined) user.settings.moveAnimation = moveAnimation;

    await user.save();

    res.json({
      message: 'Settings updated successfully',
      settings: user.settings
    });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Toggle kid mode
export const toggleKidMode = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.kidMode = !user.kidMode;
    await user.save();

    res.json({
      message: `Kid mode ${user.kidMode ? 'enabled' : 'disabled'}`,
      kidMode: user.kidMode
    });
  } catch (error) {
    console.error('Toggle kid mode error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get profile completion percentage
export const getProfileCompletion = async (req, res) => {
  try {
    // const user = await User.findById(req.user._id);
    // req.user is set by auth middleware
    const userId = req.user._id;
    console.log('Getting profile completion for user:', userId);
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const fields = [
      'displayName',
      'bio',
      'location',
      'website',
      'birthday',
      'gender',
      'occupation',
      'interests',
      'chessLevel',
      'preferredLanguage'
    ];

    const completedFields = fields.filter(field => user[field] && user[field] !== '');
    const completionPercentage = Math.round((completedFields.length / fields.length) * 100);

    res.json({ completion: completionPercentage });
  } catch (error) {
    console.error('Get profile completion error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Close account
export const closeAccount = async (req, res) => {
  try {
    const { password } = req.body;
    
    const user = await User.findById(req.user._id).select('+password');

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Password is incorrect' });
    }

    // Instead of deleting, you might want to deactivate or anonymize
    // For now, we'll delete
    await user.deleteOne();

    res.json({ message: 'Account closed successfully' });
  } catch (error) {
    console.error('Close account error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add friend
export const addFriend = async (req, res) => {
  try {
    const { userId } = req.body;
    
    const user = await User.findById(req.user._id);
    const friend = await User.findById(userId);

    if (!friend) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.friends.includes(userId)) {
      return res.status(400).json({ message: 'Already friends' });
    }

    user.friends.push(userId);
    await user.save();

    res.json({ message: 'Friend added successfully' });
  } catch (error) {
    console.error('Add friend error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get friends list
export const getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('friends', 'name displayName isOnline lastSeen rating');
    
    res.json(user.friends);
  } catch (error) {
    console.error('Get friends error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};