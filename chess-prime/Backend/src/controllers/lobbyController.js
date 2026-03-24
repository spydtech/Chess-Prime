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




// import Lobby from '../models/Lobby.js';
// import Game from '../models/Game.js';
// import User from '../models/User.js';

// export const createLobby = async (req, res) => {
//   try {
//     const { gameType, timeControl, isPrivate } = req.body;
    
//     // Generate unique lobby code
//     let lobbyCode;
//     let existingLobby;
//     do {
//       lobbyCode = Math.random().toString(36).substring(2, 8).toUpperCase();
//       existingLobby = await Lobby.findOne({ lobbyCode });
//     } while (existingLobby);
    
//     const lobby = new Lobby({
//       lobbyCode,
//       createdBy: req.user._id,
//       gameType,
//       timeControl,
//       isPrivate,
//       players: [{
//         userId: req.user._id,
//         username: req.user.name,
//         rating: req.user.rating,
//         ready: true
//       }]
//     });
    
//     await lobby.save();
    
//     const populatedLobby = await Lobby.findById(lobby._id)
//       .populate('players.userId', 'name rating');
    
//     res.status(201).json({
//       message: 'Lobby created successfully',
//       lobby: populatedLobby
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
//       .populate('players.userId', 'name rating')
//       .populate('invitedUsers', 'name rating');
    
//     if (!lobby) {
//       return res.status(404).json({ message: 'Lobby not found' });
//     }
    
//     res.json({ lobby });
//   } catch (error) {
//     console.error('Get lobby error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const joinLobby = async (req, res) => {
//   try {
//     const { lobbyCode } = req.params;
    
//     const lobby = await Lobby.findOne({ lobbyCode });
    
//     if (!lobby) {
//       return res.status(404).json({ message: 'Lobby not found' });
//     }
    
//     if (lobby.status !== 'waiting') {
//       return res.status(400).json({ message: 'Lobby is not available' });
//     }
    
//     if (lobby.players.length >= 2) {
//       return res.status(400).json({ message: 'Lobby is full' });
//     }
    
//     // Check if user is already in lobby
//     const alreadyInLobby = lobby.players.some(
//       p => p.userId.toString() === req.user._id.toString()
//     );
    
//     if (alreadyInLobby) {
//       return res.status(400).json({ message: 'Already in lobby' });
//     }
    
//     lobby.players.push({
//       userId: req.user._id,
//       username: req.user.name,
//       rating: req.user.rating,
//       ready: false
//     });
    
//     await lobby.save();
    
//     const populatedLobby = await Lobby.findById(lobby._id)
//       .populate('players.userId', 'name rating');
    
//     res.json({
//       message: 'Joined lobby successfully',
//       lobby: populatedLobby
//     });
//   } catch (error) {
//     console.error('Join lobby error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const toggleReady = async (req, res) => {
//   try {
//     const { lobbyCode } = req.params;
    
//     const lobby = await Lobby.findOne({ lobbyCode });
    
//     if (!lobby) {
//       return res.status(404).json({ message: 'Lobby not found' });
//     }
    
//     const playerIndex = lobby.players.findIndex(
//       p => p.userId.toString() === req.user._id.toString()
//     );
    
//     if (playerIndex === -1) {
//       return res.status(400).json({ message: 'Not in lobby' });
//     }
    
//     lobby.players[playerIndex].ready = !lobby.players[playerIndex].ready;
    
//     // Check if all players are ready
//     const allReady = lobby.players.length === 2 && 
//                      lobby.players.every(p => p.ready);
    
//     if (allReady) {
//       lobby.status = 'ready';
//     }
    
//     await lobby.save();
    
//     const populatedLobby = await Lobby.findById(lobby._id)
//       .populate('players.userId', 'name rating');
    
//     res.json({
//       message: 'Ready status updated',
//       lobby: populatedLobby
//     });
//   } catch (error) {
//     console.error('Toggle ready error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const inviteUser = async (req, res) => {
//   try {
//     const { lobbyCode } = req.params;
//     const { userId } = req.body;
    
//     const lobby = await Lobby.findOne({ lobbyCode });
    
//     if (!lobby) {
//       return res.status(404).json({ message: 'Lobby not found' });
//     }
    
//     if (lobby.createdBy.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ message: 'Only lobby creator can invite' });
//     }
    
//     if (!lobby.invitedUsers.includes(userId)) {
//       lobby.invitedUsers.push(userId);
//       await lobby.save();
//     }
    
//     res.json({
//       message: 'User invited successfully',
//       lobby
//     });
//   } catch (error) {
//     console.error('Invite user error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const leaveLobby = async (req, res) => {
//   try {
//     const { lobbyCode } = req.params;
    
//     const lobby = await Lobby.findOne({ lobbyCode });
    
//     if (!lobby) {
//       return res.status(404).json({ message: 'Lobby not found' });
//     }
    
//     lobby.players = lobby.players.filter(
//       p => p.userId.toString() !== req.user._id.toString()
//     );
    
//     // If lobby is empty or creator left, delete it
//     if (lobby.players.length === 0 || 
//         lobby.createdBy.toString() === req.user._id.toString()) {
//       await Lobby.deleteOne({ lobbyCode });
//       return res.json({ message: 'Lobby deleted' });
//     }
    
//     lobby.status = 'waiting';
//     await lobby.save();
    
//     res.json({
//       message: 'Left lobby successfully',
//       lobby
//     });
//   } catch (error) {
//     console.error('Leave lobby error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const startGame = async (req, res) => {
//   try {
//     const { lobbyCode } = req.params;
    
//     const lobby = await Lobby.findOne({ lobbyCode });
    
//     if (!lobby) {
//       return res.status(404).json({ message: 'Lobby not found' });
//     }
    
//     if (lobby.createdBy.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ message: 'Only lobby creator can start' });
//     }
    
//     if (lobby.players.length !== 2) {
//       return res.status(400).json({ message: 'Need 2 players to start' });
//     }
    
//     const allReady = lobby.players.every(p => p.ready);
    
//     if (!allReady) {
//       return res.status(400).json({ message: 'Not all players are ready' });
//     }
    
//     // Create game
//     const gameId = 'G' + Date.now() + Math.random().toString(36).substring(2, 7).toUpperCase();
    
//     const game = new Game({
//       gameId,
//       gameType: 'lobby',
//       timeControl: {
//         initial: parseInt(lobby.timeControl.split('+')[0]) * 60,
//         increment: parseInt(lobby.timeControl.split('+')[1]) || 0
//       },
//       players: [
//         {
//           userId: lobby.players[0].userId,
//           username: lobby.players[0].username,
//           color: 'white',
//           rating: lobby.players[0].rating,
//           timeRemaining: parseInt(lobby.timeControl.split('+')[0]) * 60
//         },
//         {
//           userId: lobby.players[1].userId,
//           username: lobby.players[1].username,
//           color: 'black',
//           rating: lobby.players[1].rating,
//           timeRemaining: parseInt(lobby.timeControl.split('+')[0]) * 60
//         }
//       ],
//       status: 'active',
//       startedAt: new Date()
//     });
    
//     await game.save();
    
//     // Update lobby status
//     lobby.status = 'playing';
//     await lobby.save();
    
//     res.json({
//       message: 'Game started',
//       game,
//       lobby
//     });
//   } catch (error) {
//     console.error('Start game error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };



// import Lobby from '../models/Lobby.js';
// import Game from '../models/Game.js';
// import User from '../models/User.js';

// export const createLobby = async (req, res) => {
//   try {
//     const { gameType, timeControl, isPrivate } = req.body;
    
//     // Generate unique lobby code
//     let lobbyCode;
//     let existingLobby;
//     do {
//       lobbyCode = Math.random().toString(36).substring(2, 8).toUpperCase();
//       existingLobby = await Lobby.findOne({ lobbyCode });
//     } while (existingLobby);
    
//     const lobby = new Lobby({
//       lobbyCode,
//       createdBy: req.user._id,
//       gameType,
//       timeControl,
//       isPrivate,
//       players: [{
//         userId: req.user._id,
//         username: req.user.name,
//         rating: req.user.rating || 1200,
//         ready: true
//       }]
//     });
    
//     await lobby.save();
    
//     const populatedLobby = await Lobby.findById(lobby._id)
//       .populate('players.userId', 'name rating isOnline');
    
//     res.status(201).json({
//       message: 'Lobby created successfully',
//       lobby: populatedLobby
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
//       .populate('players.userId', 'name rating isOnline')
//       .populate('invitedUsers', 'name rating');
    
//     if (!lobby) {
//       return res.status(404).json({ message: 'Lobby not found' });
//     }
    
//     res.json({ lobby });
//   } catch (error) {
//     console.error('Get lobby error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const joinLobby = async (req, res) => {
//   try {
//     const { lobbyCode } = req.params;
    
//     const lobby = await Lobby.findOne({ lobbyCode });
    
//     if (!lobby) {
//       return res.status(404).json({ message: 'Lobby not found' });
//     }
    
//     if (lobby.status !== 'waiting') {
//       return res.status(400).json({ message: 'Lobby is not available' });
//     }
    
//     if (lobby.players.length >= 2) {
//       return res.status(400).json({ message: 'Lobby is full' });
//     }
    
//     // Check if user is already in lobby
//     const alreadyInLobby = lobby.players.some(
//       p => p.userId.toString() === req.user._id.toString()
//     );
    
//     if (alreadyInLobby) {
//       return res.status(400).json({ message: 'Already in lobby' });
//     }
    
//     lobby.players.push({
//       userId: req.user._id,
//       username: req.user.name,
//       rating: req.user.rating || 1200,
//       ready: false
//     });
    
//     await lobby.save();
    
//     const populatedLobby = await Lobby.findById(lobby._id)
//       .populate('players.userId', 'name rating isOnline');
    
//     // Notify lobby creator via socket
//     const io = req.app.get('io');
//     io.to(`user-${lobby.createdBy}`).emit('player-joined', {
//       lobbyCode: lobby.lobbyCode,
//       player: {
//         userId: req.user._id,
//         username: req.user.name,
//         rating: req.user.rating
//       }
//     });
    
//     res.json({
//       message: 'Joined lobby successfully',
//       lobby: populatedLobby
//     });
//   } catch (error) {
//     console.error('Join lobby error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const toggleReady = async (req, res) => {
//   try {
//     const { lobbyCode } = req.params;
    
//     const lobby = await Lobby.findOne({ lobbyCode });
    
//     if (!lobby) {
//       return res.status(404).json({ message: 'Lobby not found' });
//     }
    
//     const playerIndex = lobby.players.findIndex(
//       p => p.userId.toString() === req.user._id.toString()
//     );
    
//     if (playerIndex === -1) {
//       return res.status(400).json({ message: 'Not in lobby' });
//     }
    
//     lobby.players[playerIndex].ready = !lobby.players[playerIndex].ready;
    
//     // Check if all players are ready
//     const allReady = lobby.players.length === 2 && 
//                      lobby.players.every(p => p.ready);
    
//     if (allReady) {
//       lobby.status = 'ready';
//     }
    
//     await lobby.save();
    
//     const populatedLobby = await Lobby.findById(lobby._id)
//       .populate('players.userId', 'name rating isOnline');
    
//     // Notify all players in lobby about ready status change
//     const io = req.app.get('io');
//     lobby.players.forEach(player => {
//       io.to(`user-${player.userId}`).emit('player-ready', {
//         lobbyCode: lobby.lobbyCode,
//         playerId: req.user._id,
//         ready: lobby.players[playerIndex].ready,
//         allReady
//       });
//     });
    
//     // 🔥 Auto-start the game if all players are ready
//     if (allReady) {
//       const startGameResult = await autoStartGame(lobby, io);
      
//       if (startGameResult.success) {
//         // Notify both players that game is starting
//         lobby.players.forEach(player => {
//           io.to(`user-${player.userId}`).emit('game-starting', {
//             lobbyCode: lobby.lobbyCode,
//             gameId: startGameResult.game.gameId
//           });
//         });
        
//         return res.json({
//           message: 'All players ready. Game starting!',
//           lobby: populatedLobby,
//           gameStarting: true,
//           gameId: startGameResult.game.gameId
//         });
//       }
//     }
    
//     res.json({
//       message: 'Ready status updated',
//       lobby: populatedLobby
//     });
//   } catch (error) {
//     console.error('Toggle ready error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const inviteUser = async (req, res) => {
//   try {
//     const { lobbyCode } = req.params;
//     const { userId } = req.body;
    
//     const lobby = await Lobby.findOne({ lobbyCode })
//       .populate('createdBy', 'name')
//       .populate('players.userId', 'name');
    
//     if (!lobby) {
//       return res.status(404).json({ message: 'Lobby not found' });
//     }
    
//     if (lobby.createdBy._id.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ message: 'Only lobby creator can invite' });
//     }
    
//     if (lobby.players.length >= 2) {
//       return res.status(400).json({ message: 'Lobby is full' });
//     }
    
//     // Check if user is already in lobby
//     const alreadyInLobby = lobby.players.some(
//       p => p.userId._id.toString() === userId
//     );
    
//     if (alreadyInLobby) {
//       return res.status(400).json({ message: 'User already in lobby' });
//     }
    
//     // Check if user exists
//     const invitedUser = await User.findById(userId);
//     if (!invitedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }
    
//     // Check if user is already invited
//     const alreadyInvited = lobby.invitedUsers.includes(userId);
    
//     if (!alreadyInvited) {
//       lobby.invitedUsers.push(userId);
//       await lobby.save();
//     }
    
//     // Emit socket event for real-time invitation
//     const io = req.app.get('io');
//     io.to(`user-${userId}`).emit('lobby-invitation', {
//       id: Date.now(),
//       lobbyCode: lobby.lobbyCode,
//       inviterName: req.user.name,
//       gameType: lobby.gameType,
//       timeControl: lobby.timeControl,
//       isPrivate: lobby.isPrivate
//     });
    
//     res.json({
//       message: 'Invitation sent successfully',
//       lobby
//     });
//   } catch (error) {
//     console.error('Invite user error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const searchUsers = async (req, res) => {
//   try {
//     const { query } = req.query;
    
//     if (!query) {
//       return res.status(400).json({ message: 'Search query is required' });
//     }
    
//     const users = await User.find({
//       $and: [
//         {
//           $or: [
//             { name: { $regex: query, $options: 'i' } },
//             { email: { $regex: query, $options: 'i' } }
//           ]
//         },
//         { _id: { $ne: req.user._id } } // Exclude current user
//       ]
//     }).select('name rating isOnline lastSeen').limit(10);
    
//     res.json({ users });
//   } catch (error) {
//     console.error('Search users error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const leaveLobby = async (req, res) => {
//   try {
//     const { lobbyCode } = req.params;
    
//     const lobby = await Lobby.findOne({ lobbyCode });
    
//     if (!lobby) {
//       return res.status(404).json({ message: 'Lobby not found' });
//     }
    
//     lobby.players = lobby.players.filter(
//       p => p.userId.toString() !== req.user._id.toString()
//     );
    
//     // If lobby is empty or creator left, delete it
//     if (lobby.players.length === 0 || 
//         lobby.createdBy.toString() === req.user._id.toString()) {
//       await Lobby.deleteOne({ lobbyCode });
//       return res.json({ message: 'Lobby deleted' });
//     }
    
//     lobby.status = 'waiting';
//     await lobby.save();
    
//     res.json({
//       message: 'Left lobby successfully',
//       lobby
//     });
//   } catch (error) {
//     console.error('Leave lobby error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const startGame = async (req, res) => {
//   try {
//     const { lobbyCode } = req.params;
    
//     const lobby = await Lobby.findOne({ lobbyCode })
//       .populate('players.userId', 'name rating');
    
//     if (!lobby) {
//       return res.status(404).json({ message: 'Lobby not found' });
//     }
    
//     if (lobby.createdBy.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ message: 'Only lobby creator can start' });
//     }
    
//     if (lobby.players.length !== 2) {
//       return res.status(400).json({ message: 'Need 2 players to start' });
//     }
    
//     const allReady = lobby.players.every(p => p.ready);
    
//     if (!allReady) {
//       return res.status(400).json({ message: 'Not all players are ready' });
//     }
    
//     // Create game
//     const gameId = 'G' + Date.now() + Math.random().toString(36).substring(2, 7).toUpperCase();
    
//     const timeParts = lobby.timeControl.split('+');
//     const initialTime = parseInt(timeParts[0]) * 60;
//     const increment = parseInt(timeParts[1]) || 0;
    
//     const game = new Game({
//       gameId,
//       gameType: 'lobby',
//       timeControl: {
//         initial: initialTime,
//         increment: increment
//       },
//       players: [
//         {
//           userId: lobby.players[0].userId._id,
//           username: lobby.players[0].username,
//           color: 'white',
//           rating: lobby.players[0].rating,
//           timeRemaining: initialTime
//         },
//         {
//           userId: lobby.players[1].userId._id,
//           username: lobby.players[1].username,
//           color: 'black',
//           rating: lobby.players[1].rating,
//           timeRemaining: initialTime
//         }
//       ],
//       status: 'active',
//       startedAt: new Date(),
//       currentFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
//     });
    
//     await game.save();
    
//     // Update lobby status
//     lobby.status = 'playing';
//     await lobby.save();
    
//     // Notify all players that game has started
//     const io = req.app.get('io');
//     lobby.players.forEach(player => {
//       io.to(`user-${player.userId._id}`).emit('game-started', {
//         gameId: game.gameId,
//         lobbyCode: lobby.lobbyCode
//       });
//     });
    
//     res.json({
//       message: 'Game started',
//       game,
//       lobby
//     });
//   } catch (error) {
//     console.error('Start game error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const getLobbyInvites = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     console.log('Fetching invites for user:', userId);
 
//     const invites = await Lobby.find({
//       invitedUsers: userId,
//       status: "waiting"
//     })
//     .populate("createdBy", "name rating")
//     .select("lobbyCode gameType timeControl createdBy players status")
//     .lean();
 
//     console.log('Found invites:', invites.length);
 
//     // Format the invites for frontend
//     const formattedInvites = invites.map(invite => ({
//       lobbyCode: invite.lobbyCode,
//       gameType: invite.gameType,
//       timeControl: invite.timeControl,
//       createdBy: invite.createdBy || { name: 'Unknown', rating: 1200 },
//       status: invite.status,
//       _id: invite._id
//     }));
 
//     res.json({
//       success: true,
//       invites: formattedInvites
//     });
 
//   } catch (error) {
//     console.error("Get lobby invites error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to load invites",
//       invites: []
//     });
//   }
// };
// export const acceptLobbyInvite = async (req, res) => {
//   try {
//     const { lobbyCode } = req.params;
//     const userId = req.user._id;
 
//     console.log(`Accepting invite for lobby: ${lobbyCode}, user: ${userId}`);
 
//     const lobby = await Lobby.findOne({ lobbyCode })
//       .populate('players.userId', 'name rating isOnline')
//       .populate('createdBy', 'name rating');
 
//     if (!lobby) {
//       return res.status(404).json({
//         success: false,
//         message: "Lobby not found"
//       });
//     }
 
//     // Check if user is invited
//     if (!lobby.invitedUsers.some(id => id.toString() === userId.toString())) {
//       return res.status(403).json({
//         success: false,
//         message: "No invitation found"
//       });
//     }
 
//     // Check if lobby is full
//     if (lobby.players.length >= lobby.maxPlayers) {
//       return res.status(400).json({
//         success: false,
//         message: "Lobby is full"
//       });
//     }
 
//     // Add user to players
//     lobby.players.push({
//       userId,
//       username: req.user.name,
//       rating: req.user.rating || 1200,
//       ready: false,
//       joinedAt: new Date()
//     });
 
//     // Remove user from invited list
//     lobby.invitedUsers = lobby.invitedUsers.filter(
//       id => id.toString() !== userId.toString()
//     );
 
//     await lobby.save();
 
//     const populatedLobby = await Lobby.findById(lobby._id)
//       .populate("players.userId", "name rating isOnline")
//       .populate("createdBy", "name rating")
//       .lean();
 
//     // Notify lobby creator via socket that player joined
//     const io = req.app.get('io');
//     io.to(`user-${lobby.createdBy}`).emit('player-joined', {
//       lobbyCode: lobby.lobbyCode,
//       player: {
//         userId: req.user._id,
//         username: req.user.name,
//         rating: req.user.rating
//       }
//     });
 
//     // 🔥 Check if both players are ready after new player joins
//     // The creator is already ready (from createLobby), so we need to set the new player as ready too
//     // Update the newly added player to ready status
//     const updatedLobby = await Lobby.findOne({ lobbyCode });
//     const newPlayerIndex = updatedLobby.players.findIndex(
//       p => p.userId.toString() === userId.toString()
//     );
    
//     if (newPlayerIndex !== -1) {
//       updatedLobby.players[newPlayerIndex].ready = true;
//       await updatedLobby.save();
      
//       // Check if both players are now ready
//       const allReady = updatedLobby.players.length === 2 && 
//                        updatedLobby.players.every(p => p.ready);
      
//       if (allReady) {
//         updatedLobby.status = 'ready';
//         await updatedLobby.save();
        
//         // 🔥 Auto-start the game since both players are ready
//         const startGameResult = await autoStartGame(updatedLobby, req.app.get('io'));
        
//         if (startGameResult.success) {
//           // Notify both players that game is starting
//           io.to(`user-${updatedLobby.players[0].userId}`).emit('game-starting', {
//             lobbyCode: updatedLobby.lobbyCode,
//             gameId: startGameResult.game.gameId
//           });
//           io.to(`user-${updatedLobby.players[1].userId}`).emit('game-starting', {
//             lobbyCode: updatedLobby.lobbyCode,
//             gameId: startGameResult.game.gameId
//           });
          
//           return res.json({
//             success: true,
//             message: "Joined lobby successfully. Game starting!",
//             lobby: populatedLobby,
//             gameStarting: true,
//             gameId: startGameResult.game.gameId
//           });
//         }
//       }
//     }
 
//     res.json({
//       success: true,
//       message: "Joined lobby successfully",
//       lobby: populatedLobby
//     });
 
//   } catch (error) {
//     console.error("Accept invite error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to join lobby"
//     });
//   }
// };

// // Helper function to auto-start the game
// const autoStartGame = async (lobby, io) => {
//   try {
//     // Create game
//     const gameId = 'G' + Date.now() + Math.random().toString(36).substring(2, 7).toUpperCase();
    
//     const timeParts = lobby.timeControl.split('+');
//     const initialTime = parseInt(timeParts[0]) * 60;
//     const increment = parseInt(timeParts[1]) || 0;
    
//     // Get populated players
//     const populatedLobby = await Lobby.findById(lobby._id)
//       .populate('players.userId', 'name rating');
    
//     const game = new Game({
//       gameId,
//       gameType: 'lobby',
//       timeControl: {
//         initial: initialTime,
//         increment: increment
//       },
//       players: [
//         {
//           userId: populatedLobby.players[0].userId._id,
//           username: populatedLobby.players[0].username,
//           color: 'white',
//           rating: populatedLobby.players[0].rating,
//           timeRemaining: initialTime
//         },
//         {
//           userId: populatedLobby.players[1].userId._id,
//           username: populatedLobby.players[1].username,
//           color: 'black',
//           rating: populatedLobby.players[1].rating,
//           timeRemaining: initialTime
//         }
//       ],
//       status: 'active',
//       startedAt: new Date(),
//       currentFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
//     });
    
//     await game.save();
    
//     // Update lobby status
//     lobby.status = 'playing';
//     await lobby.save();
    
//     // Notify all players that game has started
//     populatedLobby.players.forEach(player => {
//       io.to(`user-${player.userId._id}`).emit('game-started', {
//         gameId: game.gameId,
//         lobbyCode: lobby.lobbyCode,
//         players: game.players
//       });
//     });
    
//     return { success: true, game };
//   } catch (error) {
//     console.error('Auto-start game error:', error);
//     return { success: false, error: error.message };
//   }
// };






//testing
// controllers/lobbyController.js
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
        rating: req.user.rating || 1200,
        ready: true
      }]
    });
    
    await lobby.save();
    
    const populatedLobby = await Lobby.findById(lobby._id)
      .populate('players.userId', 'name rating isOnline');
    
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
      .populate('players.userId', 'name rating isOnline')
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
      rating: req.user.rating || 1200,
      ready: false
    });
    
    await lobby.save();
    
    const populatedLobby = await Lobby.findById(lobby._id)
      .populate('players.userId', 'name rating isOnline');
    
    // Notify lobby creator via socket
    const io = req.app.get('io');
    io.to(`user-${lobby.createdBy}`).emit('player-joined-lobby', {
      lobbyCode: lobby.lobbyCode,
      lobby: populatedLobby,
      player: {
        userId: req.user._id,
        username: req.user.name,
        rating: req.user.rating
      }
    });
    
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
      .populate('players.userId', 'name rating isOnline');
    
    // Notify all players in lobby about ready status change
    const io = req.app.get('io');
    lobby.players.forEach(player => {
      io.to(`user-${player.userId}`).emit('lobby-updated', {
        lobby: populatedLobby
      });
    });
    
    // 🔥 Auto-start the game if all players are ready
    if (allReady) {
      const startGameResult = await autoStartGame(lobby, io);
      
      if (startGameResult.success) {
        // Notify both players that game is starting
        lobby.players.forEach(player => {
          io.to(`user-${player.userId}`).emit('game-started', {
            gameId: startGameResult.game.gameId,
            game: startGameResult.game,
            lobbyCode: lobby.lobbyCode
          });
        });
        
        return res.json({
          message: 'All players ready. Game starting!',
          lobby: populatedLobby,
          gameStarting: true,
          gameId: startGameResult.game.gameId
        });
      }
    }
    
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
    
    const lobby = await Lobby.findOne({ lobbyCode })
      .populate('createdBy', 'name')
      .populate('players.userId', 'name');
    
    if (!lobby) {
      return res.status(404).json({ message: 'Lobby not found' });
    }
    
    if (lobby.createdBy._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Only lobby creator can invite' });
    }
    
    if (lobby.players.length >= 2) {
      return res.status(400).json({ message: 'Lobby is full' });
    }
    
    // Check if user is already in lobby
    const alreadyInLobby = lobby.players.some(
      p => p.userId._id.toString() === userId
    );
    
    if (alreadyInLobby) {
      return res.status(400).json({ message: 'User already in lobby' });
    }
    
    // Check if user exists
    const invitedUser = await User.findById(userId);
    if (!invitedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if user is already invited
    const alreadyInvited = lobby.invitedUsers.includes(userId);
    
    if (!alreadyInvited) {
      lobby.invitedUsers.push(userId);
      await lobby.save();
    }
    
    // Emit socket event for real-time invitation
    const io = req.app.get('io');
    io.to(`user-${userId}`).emit('lobby-invitation', {
      id: Date.now(),
      lobbyCode: lobby.lobbyCode,
      inviterName: req.user.name,
      gameType: lobby.gameType,
      timeControl: lobby.timeControl,
      isPrivate: lobby.isPrivate
    });
    
    res.json({
      message: 'Invitation sent successfully',
      lobby
    });
  } catch (error) {
    console.error('Invite user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    const users = await User.find({
      $and: [
        {
          $or: [
            { name: { $regex: query, $options: 'i' } },
            { email: { $regex: query, $options: 'i' } }
          ]
        },
        { _id: { $ne: req.user._id } } // Exclude current user
      ]
    }).select('name rating isOnline lastSeen').limit(10);
    
    res.json({ users });
  } catch (error) {
    console.error('Search users error:', error);
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



// controllers/lobbyController.js (partial - only the startGame function)
export const startGame = async (req, res) => {
  try {
    const { lobbyCode } = req.params;
    
    const lobby = await Lobby.findOne({ lobbyCode })
      .populate('players.userId', 'name rating');
    
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
    
    const timeParts = lobby.timeControl.split('+');
    const initialTime = parseInt(timeParts[0]) * 60;
    const increment = parseInt(timeParts[1]) || 0;
    
    const game = new Game({
      gameId,
      gameType: 'lobby',
      timeControl: {
        initial: initialTime,
        increment: increment
      },
      players: [
        {
          userId: lobby.players[0].userId._id,
          username: lobby.players[0].username,
          color: 'white',
          rating: lobby.players[0].rating,
          timeRemaining: initialTime
        },
        {
          userId: lobby.players[1].userId._id,
          username: lobby.players[1].username,
          color: 'black',
          rating: lobby.players[1].rating,
          timeRemaining: initialTime
        }
      ],
      status: 'active',
      startedAt: new Date(),
      currentFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    });
    
    await game.save();
    
    // Update lobby status
    lobby.status = 'playing';
    await lobby.save();
    
    // Notify all players that game has started
    const io = req.app.get('io');
    console.log('Emitting game-started events to players:', lobby.players.map(p => p.userId._id));
    
    lobby.players.forEach(player => {
      const userId = player.userId._id || player.userId;
      console.log(`Emitting game-started to user-${userId}`);
      
      io.to(`user-${userId}`).emit('game-started', {
        gameId: game.gameId,
        game: game,
        lobbyCode: lobby.lobbyCode
      });
    });
    
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



export const getLobbyInvites = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log('Fetching invites for user:', userId);
 
    const invites = await Lobby.find({
      invitedUsers: userId,
      status: "waiting"
    })
    .populate("createdBy", "name rating")
    .select("lobbyCode gameType timeControl createdBy players status")
    .lean();
 
    console.log('Found invites:', invites.length);
 
    // Format the invites for frontend
    const formattedInvites = invites.map(invite => ({
      lobbyCode: invite.lobbyCode,
      gameType: invite.gameType,
      timeControl: invite.timeControl,
      createdBy: invite.createdBy || { name: 'Unknown', rating: 1200 },
      status: invite.status,
      _id: invite._id
    }));
 
    res.json({
      success: true,
      invites: formattedInvites
    });
 
  } catch (error) {
    console.error("Get lobby invites error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load invites",
      invites: []
    });
  }
};


export const acceptLobbyInvite = async (req, res) => {
  try {
    const { lobbyCode } = req.params;
    const userId = req.user._id;

    console.log(`Accepting invite for lobby: ${lobbyCode}, user: ${userId}`);

    // First, find the lobby and check if user is invited
    const lobby = await Lobby.findOne({ 
      lobbyCode,
      status: 'waiting' // Only allow accepting if lobby is still waiting
    })
      .populate('players.userId', 'name rating isOnline')
      .populate('createdBy', 'name rating');

    if (!lobby) {
      return res.status(404).json({
        success: false,
        message: "Lobby not found or already started"
      });
    }

    // Check if user is invited (convert both to string for comparison)
    const isInvited = lobby.invitedUsers.some(
      id => id.toString() === userId.toString()
    );

    if (!isInvited) {
      return res.status(403).json({
        success: false,
        message: "No invitation found"
      });
    }

    // Check if lobby is full
    if (lobby.players.length >= 2) {
      return res.status(400).json({
        success: false,
        message: "Lobby is full"
      });
    }

    // Check if user is already in lobby
    const alreadyInLobby = lobby.players.some(
      p => p.userId._id.toString() === userId.toString()
    );

    if (alreadyInLobby) {
      return res.status(400).json({
        success: false,
        message: "Already in lobby"
      });
    }

    // Add user to players with ready = true (since they accepted the invite)
    lobby.players.push({
      userId,
      username: req.user.name,
      rating: req.user.rating || 1200,
      ready: true, // Auto-ready when accepting invite
      joinedAt: new Date()
    });

    // Remove user from invited list
    lobby.invitedUsers = lobby.invitedUsers.filter(
      id => id.toString() !== userId.toString()
    );

    // Check if both players are now ready
    const allReady = lobby.players.length === 2 && lobby.players.every(p => p.ready);
    
    if (allReady) {
      lobby.status = 'ready'; // Set status to ready but DON'T auto-start
    }

    await lobby.save();

    const populatedLobby = await Lobby.findById(lobby._id)
      .populate("players.userId", "name rating isOnline")
      .populate("createdBy", "name rating")
      .lean();

    // Get socket instance
    const io = req.app.get('io');

    // Notify all players in lobby about the update
    lobby.players.forEach(player => {
      io.to(`user-${player.userId}`).emit('lobby-updated', {
        lobby: populatedLobby
      });
    });

    // Also notify creator specifically
    io.to(`user-${lobby.createdBy}`).emit('player-joined-lobby', {
      lobbyCode: lobby.lobbyCode,
      lobby: populatedLobby,
      player: {
        userId: req.user._id,
        username: req.user.name,
        rating: req.user.rating,
        ready: true
      }
    });

    // REMOVED AUTO-START - Now player2 just joins the lobby and waits
    res.json({
      success: true,
      message: "Joined lobby successfully",
      lobby: populatedLobby,
      gameStarting: false // Explicitly set to false
    });

  } catch (error) {
    console.error("Accept invite error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to join lobby"
    });
  }
};

// Helper function to auto-start the game
const autoStartGame = async (lobby, io) => {
  try {
    // Create game
    const gameId = 'G' + Date.now() + Math.random().toString(36).substring(2, 7).toUpperCase();
    
    const timeParts = lobby.timeControl.split('+');
    const initialTime = parseInt(timeParts[0]) * 60;
    const increment = parseInt(timeParts[1]) || 0;
    
    // Get populated players
    const populatedLobby = await Lobby.findById(lobby._id)
      .populate('players.userId', 'name rating');
    
    const game = new Game({
      gameId,
      gameType: 'lobby',
      timeControl: {
        initial: initialTime,
        increment: increment
      },
      players: [
        {
          userId: populatedLobby.players[0].userId._id,
          username: populatedLobby.players[0].username,
          color: 'white',
          rating: populatedLobby.players[0].rating,
          timeRemaining: initialTime
        },
        {
          userId: populatedLobby.players[1].userId._id,
          username: populatedLobby.players[1].username,
          color: 'black',
          rating: populatedLobby.players[1].rating,
          timeRemaining: initialTime
        }
      ],
      status: 'active',
      startedAt: new Date(),
      currentFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    });
    
    await game.save();
    
    // Update lobby status
    lobby.status = 'playing';
    await lobby.save();
    
    // Notify all players that game has started
    populatedLobby.players.forEach(player => {
      io.to(`user-${player.userId._id}`).emit('game-started', {
        gameId: game.gameId,
        game: game,
        lobbyCode: lobby.lobbyCode
      });
    });
    
    return { success: true, game };
  } catch (error) {
    console.error('Auto-start game error:', error);
    return { success: false, error: error.message };
  }
};