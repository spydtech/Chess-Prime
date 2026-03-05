// import Game from '../models/Game.js';
// import User from '../models/User.js';

// // Queue is managed in server.js with socket.io
// // This controller handles API endpoints for quick match

// export const joinQuickMatch = async (req, res) => {
//   try {
//     const { timeControl } = req.body;
//     const userId = req.user._id;

//     const user = await User.findById(userId);

//     res.json({
//       success: true,
//       message: 'Added to queue',
//       user: {
//         id: user._id,
//         name: user.name,
//         rating: user.rating
//       },
//       timeControl
//     });
//   } catch (error) {
//     console.error('Join quick match error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const leaveQuickMatch = async (req, res) => {
//   try {
//     const { timeControl } = req.body;
    
//     res.json({
//       success: true,
//       message: 'Left queue'
//     });
//   } catch (error) {
//     console.error('Leave quick match error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const getQueueStatus = async (req, res) => {
//   try {
//     const { timeControl } = req.params;
    
//     // This would be connected to the socket.io queue
//     res.json({
//       success: true,
//       timeControl,
//       queueSize: 0,
//       estimatedWaitTime: '30-60 seconds'
//     });
//   } catch (error) {
//     console.error('Get queue status error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const createQuickMatchGame = async (req, res) => {
//   try {
//     const { timeControl, opponent } = req.body;
//     const userId = req.user._id;

//     const gameId = 'QUICK_' + Math.random().toString(36).substring(2, 8).toUpperCase();
//     const user = await User.findById(userId);
    
//     const [initial, increment] = timeControl.split('+').map(Number);

//     const game = await Game.create({
//       gameId,
//       players: [
//         {
//           userId: userId,
//           name: user.name,
//           rating: user.rating,
//           color: 'white'
//         },
//         {
//           name: opponent.name,
//           rating: opponent.rating,
//           color: 'black'
//         }
//       ],
//       gameMode: 'online',
//       timeControl: {
//         initial: initial || 10,
//         increment: increment || 0
//       },
//       status: 'active',
//       startTime: new Date()
//     });

//     res.json({
//       success: true,
//       gameId,
//       game
//     });
//   } catch (error) {
//     console.error('Create quick match game error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

import User from '../models/User.js';
import Game from '../models/Game.js';
import { getUserSocketId } from '../utils/socketHandlers.js';

// In-memory queue with better structure
const matchQueue = {};

export const joinQuickMatch = async (req, res) => {
  try {
    const { timeControl } = req.body;
    const userId = req.user._id;
    const userRating = req.user.rating;
    
    // Validate time control format
    if (!timeControl || !timeControl.match(/^\d+\+\d+$/)) {
      return res.status(400).json({ message: 'Invalid time control format' });
    }
    
    // Initialize queue for this time control if it doesn't exist
    if (!matchQueue[timeControl]) {
      matchQueue[timeControl] = [];
    }
    
    // Remove user from any existing queues
    Object.keys(matchQueue).forEach(key => {
      matchQueue[key] = matchQueue[key].filter(
        p => p.userId.toString() !== userId.toString()
      );
    });
    
    // Add user to queue
    const queueEntry = {
      userId,
      rating: userRating,
      joinedAt: Date.now()
    };
    
    matchQueue[timeControl].push(queueEntry);
    
    // Try to find a match
    const opponent = findMatch(timeControl, userId, userRating);
    
    if (opponent) {
      // Remove both players from queue
      matchQueue[timeControl] = matchQueue[timeControl].filter(
        p => p.userId.toString() !== userId.toString() && 
             p.userId.toString() !== opponent.userId.toString()
      );
      
      // Create game
      const game = await createMatchGame(timeControl, userId, opponent.userId);
      
      // Get player details
      const [player1, player2] = await Promise.all([
        User.findById(userId).select('name rating'),
        User.findById(opponent.userId).select('name rating')
      ]);
      
      // Prepare game data for response
      const gameData = {
        gameId: game.gameId,
        gameType: game.gameType,
        timeControl: game.timeControl,
        players: game.players,
        status: game.status,
        currentFen: game.currentFen
      };
      
      // Get io instance from app
      const io = req.app.get('io');
      
      if (io) {
        console.log(`Notifying players: ${userId} and ${opponent.userId}`);
        
        // Notify player 1 via user room
        io.to(`user-${userId}`).emit('match-found', {
          gameId: game.gameId,
          game: gameData,
          opponent: {
            username: player2.name,
            rating: player2.rating
          }
        });
        
        // Notify player 2 via user room
        io.to(`user-${opponent.userId}`).emit('match-found', {
          gameId: game.gameId,
          game: gameData,
          opponent: {
            username: player1.name,
            rating: player1.rating
          }
        });
        
        console.log('Match notifications sent to both players');
      }
      
      // Return response to the current user
      return res.json({
        matched: true,
        game: gameData,
        opponent: {
          username: player2.name,
          rating: player2.rating
        }
      });
    }
    
    // Get queue position
    const position = matchQueue[timeControl].findIndex(
      p => p.userId.toString() === userId.toString()
    );
    
    res.json({
      matched: false,
      message: 'Added to queue',
      queuePosition: position + 1,
      queueLength: matchQueue[timeControl].length
    });
  } catch (error) {
    console.error('Join quick match error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const leaveQuickMatch = async (req, res) => {
  try {
    const { timeControl } = req.body;
    const userId = req.user._id;
    
    if (matchQueue[timeControl]) {
      matchQueue[timeControl] = matchQueue[timeControl].filter(
        p => p.userId.toString() !== userId.toString()
      );
    }
    
    res.json({ message: 'Left queue successfully' });
  } catch (error) {
    console.error('Leave quick match error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getQueueStatus = async (req, res) => {
  try {
    const { timeControl } = req.params;
    const userId = req.user._id;
    
    if (!matchQueue[timeControl]) {
      return res.json({ inQueue: false });
    }
    
    const position = matchQueue[timeControl].findIndex(
      p => p.userId.toString() === userId.toString()
    );
    
    res.json({
      inQueue: position !== -1,
      position: position !== -1 ? position + 1 : null,
      queueLength: matchQueue[timeControl].length
    });
  } catch (error) {
    console.error('Get queue status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Helper function to find match
function findMatch(timeControl, userId, userRating) {
  const queue = matchQueue[timeControl];
  if (!queue || queue.length < 2) return null;
  
  // Sort queue by join time (oldest first)
  const sortedQueue = [...queue].sort((a, b) => a.joinedAt - b.joinedAt);
  
  // Find first eligible opponent (within rating range ±200)
  return sortedQueue.find(p => 
    p.userId.toString() !== userId.toString() &&
    Math.abs(p.rating - userRating) <= 200
  );
}

// Helper function to create game from match
async function createMatchGame(timeControl, player1Id, player2Id) {
  const [player1, player2] = await Promise.all([
    User.findById(player1Id),
    User.findById(player2Id)
  ]);
  
  const [initial, increment] = timeControl.split('+').map(Number);
  
  const gameId = 'G' + Date.now() + Math.random().toString(36).substring(2, 7).toUpperCase();
  
  const game = new Game({
    gameId,
    gameType: 'online',
    timeControl: {
      initial: initial * 60,
      increment: increment || 0
    },
    players: [
      {
        userId: player1._id,
        username: player1.name,
        color: 'white',
        rating: player1.rating,
        timeRemaining: initial * 60
      },
      {
        userId: player2._id,
        username: player2.name,
        color: 'black',
        rating: player2.rating,
        timeRemaining: initial * 60
      }
    ],
    status: 'active',
    startedAt: new Date(),
    currentFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
  });
  
  await game.save();
  return game;
}


// import User from '../models/User.js';
// import Game from '../models/Game.js';
// import { getUserSocketId, notifyUser } from '../utils/socketHandlers.js';

// // In-memory queue with better structure
// const matchQueue = {};

// export const joinQuickMatch = async (req, res) => {
//   try {
//     const { timeControl } = req.body;
//     const userId = req.user._id;
//     const userRating = req.user.rating;
    
//     // Validate time control format
//     if (!timeControl || !timeControl.match(/^\d+\+\d+$/)) {
//       return res.status(400).json({ message: 'Invalid time control format' });
//     }
    
//     // Initialize queue for this time control if it doesn't exist
//     if (!matchQueue[timeControl]) {
//       matchQueue[timeControl] = [];
//     }
    
//     // Remove user from any existing queues
//     Object.keys(matchQueue).forEach(key => {
//       matchQueue[key] = matchQueue[key].filter(
//         p => p.userId.toString() !== userId.toString()
//       );
//     });
    
//     // Add user to queue
//     const queueEntry = {
//       userId,
//       rating: userRating,
//       joinedAt: Date.now()
//     };
    
//     matchQueue[timeControl].push(queueEntry);
    
//     // Try to find a match
//     const opponent = findMatch(timeControl, userId, userRating);
    
//     if (opponent) {
//       // Remove both players from queue
//       matchQueue[timeControl] = matchQueue[timeControl].filter(
//         p => p.userId.toString() !== userId.toString() && 
//              p.userId.toString() !== opponent.userId.toString()
//       );
      
//       // Create game
//       const game = await createMatchGame(timeControl, userId, opponent.userId);
      
//       // Get socket IDs for both players
//       const player1SocketId = getUserSocketId(userId.toString());
//       const player2SocketId = getUserSocketId(opponent.userId.toString());
      
//       // Get player details
//       const [player1, player2] = await Promise.all([
//         User.findById(userId),
//         User.findById(opponent.userId)
//       ]);
      
//       // Prepare game data for response
//       const gameData = {
//         gameId: game.gameId,
//         gameType: game.gameType,
//         timeControl: game.timeControl,
//         players: game.players,
//         status: game.status,
//         currentFen: game.currentFen
//       };
      
//       // Notify both players via socket.io if they are connected
//       const io = req.app.get('io');
      
//       if (io) {
//         // Notify player 1
//         io.to(`user-${userId}`).emit('match-found', {
//           gameId: game.gameId,
//           game: gameData,
//           opponent: {
//             username: player2.name,
//             rating: player2.rating
//           }
//         });
        
//         // Notify player 2
//         io.to(`user-${opponent.userId}`).emit('match-found', {
//           gameId: game.gameId,
//           game: gameData,
//           opponent: {
//             username: player1.name,
//             rating: player1.rating
//           }
//         });
//       }
      
//       // Return response to the current user
//       return res.json({
//         matched: true,
//         game: gameData,
//         opponent: {
//           username: player2.name,
//           rating: player2.rating
//         }
//       });
//     }
    
//     // Get queue position
//     const position = matchQueue[timeControl].findIndex(
//       p => p.userId.toString() === userId.toString()
//     );
    
//     res.json({
//       matched: false,
//       message: 'Added to queue',
//       queuePosition: position + 1,
//       queueLength: matchQueue[timeControl].length
//     });
//   } catch (error) {
//     console.error('Join quick match error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const leaveQuickMatch = async (req, res) => {
//   try {
//     const { timeControl } = req.body;
//     const userId = req.user._id;
    
//     if (matchQueue[timeControl]) {
//       matchQueue[timeControl] = matchQueue[timeControl].filter(
//         p => p.userId.toString() !== userId.toString()
//       );
//     }
    
//     res.json({ message: 'Left queue successfully' });
//   } catch (error) {
//     console.error('Leave quick match error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const getQueueStatus = async (req, res) => {
//   try {
//     const { timeControl } = req.params;
//     const userId = req.user._id;
    
//     if (!matchQueue[timeControl]) {
//       return res.json({ inQueue: false });
//     }
    
//     const position = matchQueue[timeControl].findIndex(
//       p => p.userId.toString() === userId.toString()
//     );
    
//     res.json({
//       inQueue: position !== -1,
//       position: position !== -1 ? position + 1 : null,
//       queueLength: matchQueue[timeControl].length
//     });
//   } catch (error) {
//     console.error('Get queue status error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Helper function to find match
// function findMatch(timeControl, userId, userRating) {
//   const queue = matchQueue[timeControl];
//   if (!queue || queue.length < 2) return null;
  
//   // Sort queue by join time (oldest first)
//   const sortedQueue = [...queue].sort((a, b) => a.joinedAt - b.joinedAt);
  
//   // Find first eligible opponent (within rating range ±200)
//   return sortedQueue.find(p => 
//     p.userId.toString() !== userId.toString() &&
//     Math.abs(p.rating - userRating) <= 200
//   );
// }

// // Helper function to create game from match
// async function createMatchGame(timeControl, player1Id, player2Id) {
//   const [player1, player2] = await Promise.all([
//     User.findById(player1Id),
//     User.findById(player2Id)
//   ]);
  
//   const [initial, increment] = timeControl.split('+').map(Number);
  
//   const gameId = 'G' + Date.now() + Math.random().toString(36).substring(2, 7).toUpperCase();
  
//   const game = new Game({
//     gameId,
//     gameType: 'online',
//     timeControl: {
//       initial: initial * 60,
//       increment: increment || 0
//     },
//     players: [
//       {
//         userId: player1._id,
//         username: player1.name,
//         color: 'white',
//         rating: player1.rating,
//         timeRemaining: initial * 60
//       },
//       {
//         userId: player2._id,
//         username: player2.name,
//         color: 'black',
//         rating: player2.rating,
//         timeRemaining: initial * 60
//       }
//     ],
//     status: 'active',
//     startedAt: new Date(),
//     currentFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
//   });
  
//   await game.save();
//   return game;
// }