import Game from '../models/Game.js';
import User from '../models/User.js';

// Queue is managed in server.js with socket.io
// This controller handles API endpoints for quick match

export const joinQuickMatch = async (req, res) => {
  try {
    const { timeControl } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);

    res.json({
      success: true,
      message: 'Added to queue',
      user: {
        id: user._id,
        name: user.name,
        rating: user.rating
      },
      timeControl
    });
  } catch (error) {
    console.error('Join quick match error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const leaveQuickMatch = async (req, res) => {
  try {
    const { timeControl } = req.body;
    
    res.json({
      success: true,
      message: 'Left queue'
    });
  } catch (error) {
    console.error('Leave quick match error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getQueueStatus = async (req, res) => {
  try {
    const { timeControl } = req.params;
    
    // This would be connected to the socket.io queue
    res.json({
      success: true,
      timeControl,
      queueSize: 0,
      estimatedWaitTime: '30-60 seconds'
    });
  } catch (error) {
    console.error('Get queue status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createQuickMatchGame = async (req, res) => {
  try {
    const { timeControl, opponent } = req.body;
    const userId = req.user._id;

    const gameId = 'QUICK_' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const user = await User.findById(userId);
    
    const [initial, increment] = timeControl.split('+').map(Number);

    const game = await Game.create({
      gameId,
      players: [
        {
          userId: userId,
          name: user.name,
          rating: user.rating,
          color: 'white'
        },
        {
          name: opponent.name,
          rating: opponent.rating,
          color: 'black'
        }
      ],
      gameMode: 'online',
      timeControl: {
        initial: initial || 10,
        increment: increment || 0
      },
      status: 'active',
      startTime: new Date()
    });

    res.json({
      success: true,
      gameId,
      game
    });
  } catch (error) {
    console.error('Create quick match game error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};