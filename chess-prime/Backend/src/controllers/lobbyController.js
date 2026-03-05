// import Lobby from '../models/Lobby.js';
// import Game from '../models/Game.js';
// import User from '../models/User.js';

// export const createLobby = async (req, res) => {
//   try {
//     const { gameType, timeControl, isPrivate } = req.body;
//     const userId = req.user._id;

//     const lobbyCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    
//     const user = await User.findById(userId);

//     const lobby = await Lobby.create({
//       lobbyCode,
//       hostId: userId,
//       gameType,
//       timeControl,
//       isPrivate,
//       players: [{
//         userId: userId,
//         name: user.name,
//         rating: user.rating,
//         ready: true
//       }]
//     });

//     res.status(201).json({
//       success: true,
//       lobby
//     });
//   } catch (error) {
//     console.error('Create lobby error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const getLobby = async (req, res) => {
//   try {
//     const { lobbyCode } = req.params;
    
//     const lobby = await Lobby.findOne({ lobbyCode })
//       .populate('players.userId', 'name rating isOnline');
    
//     if (!lobby) {
//       return res.status(404).json({ message: 'Lobby not found' });
//     }

//     res.json({
//       success: true,
//       lobby
//     });
//   } catch (error) {
//     console.error('Get lobby error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const joinLobby = async (req, res) => {
//   try {
//     const { lobbyCode } = req.params;
//     const userId = req.user._id;

//     const lobby = await Lobby.findOne({ lobbyCode });
    
//     if (!lobby) {
//       return res.status(404).json({ message: 'Lobby not found' });
//     }

//     if (lobby.status !== 'waiting') {
//       return res.status(400).json({ message: 'Lobby is already in game' });
//     }

//     if (lobby.players.length >= lobby.maxPlayers) {
//       return res.status(400).json({ message: 'Lobby is full' });
//     }

//     if (lobby.players.some(p => p.userId.toString() === userId.toString())) {
//       return res.status(400).json({ message: 'Already in lobby' });
//     }

//     const user = await User.findById(userId);

//     lobby.players.push({
//       userId: userId,
//       name: user.name,
//       rating: user.rating,
//       ready: false
//     });

//     await lobby.save();

//     const updatedLobby = await Lobby.findOne({ lobbyCode })
//       .populate('players.userId', 'name rating isOnline');

//     res.json({
//       success: true,
//       lobby: updatedLobby
//     });
//   } catch (error) {
//     console.error('Join lobby error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const toggleReady = async (req, res) => {
//   try {
//     const { lobbyCode } = req.params;
//     const userId = req.user._id;

//     const lobby = await Lobby.findOne({ lobbyCode });
    
//     if (!lobby) {
//       return res.status(404).json({ message: 'Lobby not found' });
//     }

//     const playerIndex = lobby.players.findIndex(p => p.userId.toString() === userId.toString());
    
//     if (playerIndex === -1) {
//       return res.status(403).json({ message: 'Not in this lobby' });
//     }

//     lobby.players[playerIndex].ready = !lobby.players[playerIndex].ready;

//     // Check if all players are ready
//     const allReady = lobby.players.length === lobby.maxPlayers && 
//                      lobby.players.every(p => p.ready);
    
//     if (allReady) {
//       lobby.status = 'ready';
//     }

//     await lobby.save();

//     const updatedLobby = await Lobby.findOne({ lobbyCode })
//       .populate('players.userId', 'name rating isOnline');

//     res.json({
//       success: true,
//       lobby: updatedLobby,
//       allReady
//     });
//   } catch (error) {
//     console.error('Toggle ready error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const startGame = async (req, res) => {
//   try {
//     const { lobbyCode } = req.params;
//     const userId = req.user._id;

//     const lobby = await Lobby.findOne({ lobbyCode });
    
//     if (!lobby) {
//       return res.status(404).json({ message: 'Lobby not found' });
//     }

//     if (lobby.hostId.toString() !== userId.toString()) {
//       return res.status(403).json({ message: 'Only host can start game' });
//     }

//     if (lobby.players.length < 2) {
//       return res.status(400).json({ message: 'Need at least 2 players' });
//     }

//     if (!lobby.players.every(p => p.ready)) {
//       return res.status(400).json({ message: 'Not all players are ready' });
//     }

//     const gameId = 'GAME_' + Math.random().toString(36).substring(2, 8).toUpperCase();
//     const [initial, increment] = lobby.timeControl.split('+').map(Number);

//     // Randomly assign colors
//     const colors = ['white', 'black'];
//     const shuffledColors = colors.sort(() => Math.random() - 0.5);

//     const game = await Game.create({
//       gameId,
//       players: lobby.players.map((p, index) => ({
//         userId: p.userId,
//         name: p.name,
//         rating: p.rating,
//         color: shuffledColors[index]
//       })),
//       gameMode: 'lobby',
//       timeControl: {
//         initial: initial || 10,
//         increment: increment || 0
//       },
//       status: 'active',
//       startTime: new Date()
//     });

//     lobby.status = 'in-game';
//     await lobby.save();

//     res.json({
//       success: true,
//       gameId,
//       game
//     });
//   } catch (error) {
//     console.error('Start game error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const leaveLobby = async (req, res) => {
//   try {
//     const { lobbyCode } = req.params;
//     const userId = req.user._id;

//     const lobby = await Lobby.findOne({ lobbyCode });
    
//     if (!lobby) {
//       return res.status(404).json({ message: 'Lobby not found' });
//     }

//     lobby.players = lobby.players.filter(p => p.userId.toString() !== userId.toString());

//     if (lobby.players.length === 0) {
//       await lobby.deleteOne();
//       return res.json({ success: true, message: 'Lobby deleted' });
//     }

//     if (lobby.hostId.toString() === userId.toString()) {
//       lobby.hostId = lobby.players[0].userId;
//       // Reset ready status for new host
//       lobby.players[0].ready = true;
//     }

//     await lobby.save();

//     const updatedLobby = await Lobby.findOne({ lobbyCode })
//       .populate('players.userId', 'name rating isOnline');

//     res.json({
//       success: true,
//       lobby: updatedLobby
//     });
//   } catch (error) {
//     console.error('Leave lobby error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const getPublicLobbies = async (req, res) => {
//   try {
//     const lobbies = await Lobby.find({ 
//       isPrivate: false, 
//       status: 'waiting' 
//     })
//       .populate('hostId', 'name rating')
//       .populate('players.userId', 'name rating')
//       .sort({ createdAt: -1 })
//       .limit(20);

//     res.json({
//       success: true,
//       lobbies
//     });
//   } catch (error) {
//     console.error('Get public lobbies error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };




import Lobby from '../models/Lobby.js';
import Game from '../models/Game.js';
import User from '../models/User.js';

export const createLobby = async (req, res) => {
  try {
    const { gameType, timeControl, isPrivate } = req.body;
    
    // Generate unique lobby code
    let lobbyCode;
    let existingLobby;
    do {
      lobbyCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      existingLobby = await Lobby.findOne({ lobbyCode });
    } while (existingLobby);
    
    const lobby = new Lobby({
      lobbyCode,
      createdBy: req.user._id,
      gameType,
      timeControl,
      isPrivate,
      players: [{
        userId: req.user._id,
        username: req.user.name,
        rating: req.user.rating,
        ready: true
      }]
    });
    
    await lobby.save();
    
    const populatedLobby = await Lobby.findById(lobby._id)
      .populate('players.userId', 'name rating');
    
    res.status(201).json({
      message: 'Lobby created successfully',
      lobby: populatedLobby
    });
  } catch (error) {
    console.error('Create lobby error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getLobby = async (req, res) => {
  try {
    const { lobbyCode } = req.params;
    
    const lobby = await Lobby.findOne({ lobbyCode })
      .populate('players.userId', 'name rating')
      .populate('invitedUsers', 'name rating');
    
    if (!lobby) {
      return res.status(404).json({ message: 'Lobby not found' });
    }
    
    res.json({ lobby });
  } catch (error) {
    console.error('Get lobby error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const joinLobby = async (req, res) => {
  try {
    const { lobbyCode } = req.params;
    
    const lobby = await Lobby.findOne({ lobbyCode });
    
    if (!lobby) {
      return res.status(404).json({ message: 'Lobby not found' });
    }
    
    if (lobby.status !== 'waiting') {
      return res.status(400).json({ message: 'Lobby is not available' });
    }
    
    if (lobby.players.length >= 2) {
      return res.status(400).json({ message: 'Lobby is full' });
    }
    
    // Check if user is already in lobby
    const alreadyInLobby = lobby.players.some(
      p => p.userId.toString() === req.user._id.toString()
    );
    
    if (alreadyInLobby) {
      return res.status(400).json({ message: 'Already in lobby' });
    }
    
    lobby.players.push({
      userId: req.user._id,
      username: req.user.name,
      rating: req.user.rating,
      ready: false
    });
    
    await lobby.save();
    
    const populatedLobby = await Lobby.findById(lobby._id)
      .populate('players.userId', 'name rating');
    
    res.json({
      message: 'Joined lobby successfully',
      lobby: populatedLobby
    });
  } catch (error) {
    console.error('Join lobby error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const toggleReady = async (req, res) => {
  try {
    const { lobbyCode } = req.params;
    
    const lobby = await Lobby.findOne({ lobbyCode });
    
    if (!lobby) {
      return res.status(404).json({ message: 'Lobby not found' });
    }
    
    const playerIndex = lobby.players.findIndex(
      p => p.userId.toString() === req.user._id.toString()
    );
    
    if (playerIndex === -1) {
      return res.status(400).json({ message: 'Not in lobby' });
    }
    
    lobby.players[playerIndex].ready = !lobby.players[playerIndex].ready;
    
    // Check if all players are ready
    const allReady = lobby.players.length === 2 && 
                     lobby.players.every(p => p.ready);
    
    if (allReady) {
      lobby.status = 'ready';
    }
    
    await lobby.save();
    
    const populatedLobby = await Lobby.findById(lobby._id)
      .populate('players.userId', 'name rating');
    
    res.json({
      message: 'Ready status updated',
      lobby: populatedLobby
    });
  } catch (error) {
    console.error('Toggle ready error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const inviteUser = async (req, res) => {
  try {
    const { lobbyCode } = req.params;
    const { userId } = req.body;
    
    const lobby = await Lobby.findOne({ lobbyCode });
    
    if (!lobby) {
      return res.status(404).json({ message: 'Lobby not found' });
    }
    
    if (lobby.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Only lobby creator can invite' });
    }
    
    if (!lobby.invitedUsers.includes(userId)) {
      lobby.invitedUsers.push(userId);
      await lobby.save();
    }
    
    res.json({
      message: 'User invited successfully',
      lobby
    });
  } catch (error) {
    console.error('Invite user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const leaveLobby = async (req, res) => {
  try {
    const { lobbyCode } = req.params;
    
    const lobby = await Lobby.findOne({ lobbyCode });
    
    if (!lobby) {
      return res.status(404).json({ message: 'Lobby not found' });
    }
    
    lobby.players = lobby.players.filter(
      p => p.userId.toString() !== req.user._id.toString()
    );
    
    // If lobby is empty or creator left, delete it
    if (lobby.players.length === 0 || 
        lobby.createdBy.toString() === req.user._id.toString()) {
      await Lobby.deleteOne({ lobbyCode });
      return res.json({ message: 'Lobby deleted' });
    }
    
    lobby.status = 'waiting';
    await lobby.save();
    
    res.json({
      message: 'Left lobby successfully',
      lobby
    });
  } catch (error) {
    console.error('Leave lobby error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const startGame = async (req, res) => {
  try {
    const { lobbyCode } = req.params;
    
    const lobby = await Lobby.findOne({ lobbyCode });
    
    if (!lobby) {
      return res.status(404).json({ message: 'Lobby not found' });
    }
    
    if (lobby.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Only lobby creator can start' });
    }
    
    if (lobby.players.length !== 2) {
      return res.status(400).json({ message: 'Need 2 players to start' });
    }
    
    const allReady = lobby.players.every(p => p.ready);
    
    if (!allReady) {
      return res.status(400).json({ message: 'Not all players are ready' });
    }
    
    // Create game
    const gameId = 'G' + Date.now() + Math.random().toString(36).substring(2, 7).toUpperCase();
    
    const game = new Game({
      gameId,
      gameType: 'lobby',
      timeControl: {
        initial: parseInt(lobby.timeControl.split('+')[0]) * 60,
        increment: parseInt(lobby.timeControl.split('+')[1]) || 0
      },
      players: [
        {
          userId: lobby.players[0].userId,
          username: lobby.players[0].username,
          color: 'white',
          rating: lobby.players[0].rating,
          timeRemaining: parseInt(lobby.timeControl.split('+')[0]) * 60
        },
        {
          userId: lobby.players[1].userId,
          username: lobby.players[1].username,
          color: 'black',
          rating: lobby.players[1].rating,
          timeRemaining: parseInt(lobby.timeControl.split('+')[0]) * 60
        }
      ],
      status: 'active',
      startedAt: new Date()
    });
    
    await game.save();
    
    // Update lobby status
    lobby.status = 'playing';
    await lobby.save();
    
    res.json({
      message: 'Game started',
      game,
      lobby
    });
  } catch (error) {
    console.error('Start game error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};