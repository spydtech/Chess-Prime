import User from '../models/User.js';

export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ user: user.getPublicProfile() });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// In userController.js - Add this function

export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query || query.trim().length < 2) {
      return res.status(400).json({ 
        message: 'Search query must be at least 2 characters' 
      });
    }
    
    // Search for users by name or email, excluding the current user
    const users = await User.find({
      $and: [
        {
          $or: [
            { name: { $regex: query, $options: 'i' } },
            { email: { $regex: query, $options: 'i' } },
            { displayName: { $regex: query, $options: 'i' } }
          ]
        },
        { _id: { $ne: req.user._id } } 
      ]
    })
    .select('name displayName email rating isOnline lastSeen chessLevel')
    .limit(10);
    
    // Format 
    const formattedUsers = users.map(user => ({
      _id: user._id,
      name: user.name,
      displayName: user.displayName || user.name,
      email: user.email,
      rating: user.rating,
      isOnline: user.isOnline,
      lastSeen: user.lastSeen,
      chessLevel: user.chessLevel
    }));
    
    res.json({ 
      success: true,
      users: formattedUsers,
      count: formattedUsers.length
    });
  } catch (error) {
    console.error('Search users error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const { settings } = req.body;
    
    req.user.settings = { ...req.user.settings, ...settings };
    await req.user.save();
    
    res.json({
      message: 'Settings updated',
      settings: req.user.settings
    });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find({})
      .select('name rating gamesPlayed gamesWon')
      .sort({ rating: -1 })
      .limit(100);
    
    res.json({ users });
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const addFriend = async (req, res) => {
  try {
    const { friendId } = req.body;
    
    const friend = await User.findById(friendId);
    
    if (!friend) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (req.user.friends.includes(friendId)) {
      return res.status(400).json({ message: 'Already friends' });
    }
    
    req.user.friends.push(friendId);
    await req.user.save();
    
    res.json({ message: 'Friend added successfully' });
  } catch (error) {
    console.error('Add friend error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getFriends = async (req, res) => {
  try {
    await req.user.populate('friends', 'name rating isOnline lastSeen');
    
    res.json({ friends: req.user.friends });
  } catch (error) {
    console.error('Get friends error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};