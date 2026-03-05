// import Game from '../models/Game.js';
// import User from '../models/User.js';

// export const createGame = async (req, res) => {
//   try {
//     const { gameMode, timeControl, opponentId } = req.body;
//     const userId = req.user._id;

//     const gameId = 'GAME_' + Math.random().toString(36).substring(2, 8).toUpperCase();

//     const user = await User.findById(userId);
    
//     const players = [{
//       userId: userId,
//       name: user.name,
//       rating: user.rating,
//       color: 'white'
//     }];

//     if (opponentId) {
//       const opponent = await User.findById(opponentId);
//       players.push({
//         userId: opponentId,
//         name: opponent.name,
//         rating: opponent.rating,
//         color: 'black'
//       });
//     }

//     const [initial, increment] = timeControl.split('+').map(Number);

//     const game = await Game.create({
//       gameId,
//       players,
//       gameMode,
//       timeControl: {
//         initial: initial || 10,
//         increment: increment || 0
//       },
//       status: opponentId ? 'active' : 'waiting',
//       startTime: opponentId ? new Date() : null
//     });

//     res.status(201).json({
//       success: true,
//       game
//     });
//   } catch (error) {
//     console.error('Create game error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const getGame = async (req, res) => {
//   try {
//     const { gameId } = req.params;
    
//     const game = await Game.findOne({ gameId })
//       .populate('players.userId', 'name rating');
    
//     if (!game) {
//       return res.status(404).json({ message: 'Game not found' });
//     }

//     res.json({
//       success: true,
//       game
//     });
//   } catch (error) {
//     console.error('Get game error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const makeMove = async (req, res) => {
//   try {
//     const { gameId } = req.params;
//     const { from, to, promotion, san, fen } = req.body;
//     const userId = req.user._id;

//     const game = await Game.findOne({ gameId });
    
//     if (!game) {
//       return res.status(404).json({ message: 'Game not found' });
//     }

//     // Check if it's player's turn
//     const moveNumber = game.moves.length;
//     const expectedColor = moveNumber % 2 === 0 ? 'white' : 'black';
//     const player = game.players.find(p => p.userId.toString() === userId.toString());
    
//     if (player.color !== expectedColor) {
//       return res.status(400).json({ message: 'Not your turn' });
//     }

//     // Add move
//     game.moves.push({
//       from,
//       to,
//       promotion: promotion || 'q',
//       san,
//       fen,
//       timestamp: new Date()
//     });

//     game.fenHistory.push(fen);

//     await game.save();

//     res.json({
//       success: true,
//       move: game.moves[game.moves.length - 1],
//       gameState: game
//     });
//   } catch (error) {
//     console.error('Make move error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const resignGame = async (req, res) => {
//   try {
//     const { gameId } = req.params;
//     const userId = req.user._id;

//     const game = await Game.findOne({ gameId });
    
//     if (!game) {
//       return res.status(404).json({ message: 'Game not found' });
//     }

//     const resigningPlayer = game.players.find(p => p.userId.toString() === userId.toString());
//     if (!resigningPlayer) {
//       return res.status(403).json({ message: 'Not a player in this game' });
//     }

//     game.status = 'completed';
//     game.result = {
//       winner: resigningPlayer.color === 'white' ? 'black' : 'white',
//       method: 'resign'
//     };
//     game.endTime = new Date();

//     // Update player stats
//     await Promise.all(game.players.map(async (player) => {
//       const isWinner = player.color === game.result.winner;
//       const isDraw = game.result.winner === 'draw';
      
//       await User.findByIdAndUpdate(player.userId, {
//         $inc: {
//           gamesPlayed: 1,
//           ...(isWinner ? { gamesWon: 1 } : isDraw ? { gamesDrawn: 1 } : { gamesLost: 1 })
//         },
//         ...(isWinner ? { $inc: { rating: 10 } } : { $inc: { rating: -5 } })
//       });
//     }));

//     await game.save();

//     res.json({
//       success: true,
//       message: 'Game resigned',
//       result: game.result
//     });
//   } catch (error) {
//     console.error('Resign game error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const offerDraw = async (req, res) => {
//   try {
//     const { gameId } = req.params;
    
//     res.json({
//       success: true,
//       message: 'Draw offer sent'
//     });
//   } catch (error) {
//     console.error('Offer draw error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const acceptDraw = async (req, res) => {
//   try {
//     const { gameId } = req.params;

//     const game = await Game.findOne({ gameId });
    
//     if (!game) {
//       return res.status(404).json({ message: 'Game not found' });
//     }

//     game.status = 'completed';
//     game.result = {
//       winner: 'draw',
//       method: 'draw'
//     };
//     game.endTime = new Date();

//     // Update player stats
//     await Promise.all(game.players.map(async (player) => {
//       await User.findByIdAndUpdate(player.userId, {
//         $inc: {
//           gamesPlayed: 1,
//           gamesDrawn: 1,
//           rating: 2 // Small increase for draw
//         }
//       });
//     }));

//     await game.save();

//     res.json({
//       success: true,
//       message: 'Draw accepted',
//       result: game.result
//     });
//   } catch (error) {
//     console.error('Accept draw error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const getGameHistory = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const { page = 1, limit = 20 } = req.query;
    
//     const games = await Game.find({
//       'players.userId': userId,
//       status: 'completed'
//     })
//       .sort({ createdAt: -1 })
//       .skip((page - 1) * limit)
//       .limit(parseInt(limit))
//       .populate('players.userId', 'name rating');

//     const total = await Game.countDocuments({
//       'players.userId': userId,
//       status: 'completed'
//     });

//     res.json({
//       success: true,
//       games,
//       pagination: {
//         page: parseInt(page),
//         limit: parseInt(limit),
//         total,
//         pages: Math.ceil(total / limit)
//       }
//     });
//   } catch (error) {
//     console.error('Get game history error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };





import Game from '../models/Game.js';
import User from '../models/User.js';
import { getUpdatedRatings } from '../utils/ratingCalculator.js';

export const createGame = async (req, res) => {
  try {
    const { gameType, timeControl, opponentId, isComputer } = req.body;
    
    const gameId = 'G' + Date.now() + Math.random().toString(36).substring(2, 7).toUpperCase();
    
    const players = [
      {
        userId: req.user._id,
        username: req.user.name,
        color: 'white',
        rating: req.user.rating,
        timeRemaining: parseInt(timeControl.split('+')[0]) * 60,
        isComputer: false
      }
    ];
    
    if (isComputer) {
      players.push({
        userId: null,
        username: 'Computer',
        color: 'black',
        rating: 1500,
        timeRemaining: parseInt(timeControl.split('+')[0]) * 60,
        isComputer: true
      });
    } else if (opponentId) {
      const opponent = await User.findById(opponentId);
      if (opponent) {
        players.push({
          userId: opponent._id,
          username: opponent.name,
          color: 'black',
          rating: opponent.rating,
          timeRemaining: parseInt(timeControl.split('+')[0]) * 60,
          isComputer: false
        });
      }
    }
    
    const game = new Game({
      gameId,
      gameType,
      timeControl: {
        initial: parseInt(timeControl.split('+')[0]) * 60,
        increment: parseInt(timeControl.split('+')[1]) || 0
      },
      players,
      status: isComputer ? 'active' : 'waiting',
      startedAt: isComputer ? new Date() : null
    });
    
    await game.save();
    
    res.status(201).json({
      message: 'Game created successfully',
      game
    });
  } catch (error) {
    console.error('Create game error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getGame = async (req, res) => {
  try {
    const { gameId } = req.params;
    
    const game = await Game.findOne({ gameId })
      .populate('players.userId', 'name rating');
    
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    
    res.json({ game });
  } catch (error) {
    console.error('Get game error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const makeMove = async (req, res) => {
  try {
    const { gameId } = req.params;
    const { from, to, promotion, fen, san, moveNumber, timeTaken } = req.body;
    
    const game = await Game.findOne({ gameId });
    
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    
    game.moves.push({
      from,
      to,
      promotion,
      san,
      fen,
      time: timeTaken,
      moveNumber
    });
    
    game.currentFen = fen;
    game.lastMoveAt = new Date();
    
    // Update time for current player
    const currentPlayer = game.moves.length % 2 === 1 ? 'white' : 'black';
    const playerIndex = game.players.findIndex(p => p.color === currentPlayer);
    
    if (playerIndex !== -1 && !game.players[playerIndex].isComputer) {
      game.players[playerIndex].timeRemaining -= timeTaken;
      game.players[playerIndex].timeRemaining += game.timeControl.increment;
    }
    
    await game.save();
    
    res.json({
      message: 'Move recorded',
      game
    });
  } catch (error) {
    console.error('Make move error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const endGame = async (req, res) => {
  try {
    const { gameId } = req.params;
    const { result, termination } = req.body;
    
    const game = await Game.findOne({ gameId });
    
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    
    game.status = 'completed';
    game.result = result;
    game.termination = termination;
    game.endedAt = new Date();
    
    // Calculate and apply rating changes for online games
    if (game.gameType !== 'vs-computer') {
      const { whiteChange, blackChange } = getUpdatedRatings(result, game.players);
      
      for (let player of game.players) {
        if (!player.isComputer && player.userId) {
          const ratingChange = player.color === 'white' ? whiteChange : blackChange;
          player.ratingChange = ratingChange;
          
          const user = await User.findById(player.userId);
          if (user) {
            user.rating += ratingChange;
            user.gamesPlayed += 1;
            
            if (result === player.color) {
              user.gamesWon += 1;
            } else if (result === 'draw') {
              user.gamesDrawn += 1;
            } else if (result && result !== player.color && result !== 'draw') {
              user.gamesLost += 1;
            }
            
            await user.save();
          }
        }
      }
    }
    
    await game.save();
    
    res.json({
      message: 'Game ended',
      game
    });
  } catch (error) {
    console.error('End game error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserGames = async (req, res) => {
  try {
    const games = await Game.find({
      'players.userId': req.user._id,
      status: 'completed'
    })
    .sort({ endedAt: -1 })
    .limit(50);
    
    res.json({ games });
  } catch (error) {
    console.error('Get user games error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};