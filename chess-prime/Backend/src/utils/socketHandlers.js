// import Lobby from '../models/Lobby.js';
// import Game from '../models/Game.js';
// import User from '../models/User.js';

// const connectedUsers = new Map();

// export const setupSocketHandlers = (io) => {
//   io.on('connection', (socket) => {
//     console.log('New client connected:', socket.id);
    
//     // Authenticate user
//     socket.on('authenticate', async ({ userId, token }) => {
//       try {
//         // Store user connection
//         connectedUsers.set(userId.toString(), socket.id);
//         socket.userId = userId;
        
//         // Update user online status
//         await User.findByIdAndUpdate(userId, { 
//           isOnline: true,
//           lastSeen: new Date()
//         });
        
//         console.log(`User ${userId} authenticated on socket ${socket.id}`);
        
//         // Send confirmation
//         socket.emit('authenticated', { success: true });
//       } catch (error) {
//         console.error('Authentication error:', error);
//         socket.emit('authenticated', { success: false, error: error.message });
//       }
//     });
    
//     // Join lobby
//     socket.on('join-lobby', async ({ lobbyCode }) => {
//       try {
//         socket.join(`lobby-${lobbyCode}`);
        
//         const lobby = await Lobby.findOne({ lobbyCode })
//           .populate('players.userId', 'name rating')
//           .populate('createdBy', 'name rating');
        
//         if (lobby) {
//           // Send lobby data to the joining user
//           socket.emit('lobby-joined', { success: true, lobby });
          
//           // Notify all users in lobby about the update
//           io.to(`lobby-${lobbyCode}`).emit('lobby-updated', lobby);
//         } else {
//           socket.emit('lobby-joined', { success: false, error: 'Lobby not found' });
//         }
//       } catch (error) {
//         console.error('Join lobby error:', error);
//         socket.emit('lobby-joined', { success: false, error: error.message });
//       }
//     });
    
//     // Leave lobby
//     socket.on('leave-lobby', ({ lobbyCode }) => {
//       socket.leave(`lobby-${lobbyCode}`);
//       console.log(`Socket ${socket.id} left lobby ${lobbyCode}`);
//     });
    
//     // Player ready status update
//     socket.on('player-ready', async ({ lobbyCode, userId, ready }) => {
//       try {
//         const lobby = await Lobby.findOne({ lobbyCode });
        
//         if (lobby) {
//           const playerIndex = lobby.players.findIndex(
//             p => p.userId.toString() === userId
//           );
          
//           if (playerIndex !== -1) {
//             lobby.players[playerIndex].ready = ready;
            
//             // Check if all players are ready
//             const allReady = lobby.players.length === 2 && 
//                            lobby.players.every(p => p.ready);
            
//             if (allReady) {
//               lobby.status = 'ready';
//             }
            
//             await lobby.save();
            
//             const updatedLobby = await Lobby.findById(lobby._id)
//               .populate('players.userId', 'name rating')
//               .populate('createdBy', 'name rating');
            
//             io.to(`lobby-${lobbyCode}`).emit('lobby-updated', updatedLobby);
            
//             // If all ready, notify that game can start
//             if (allReady) {
//               io.to(`lobby-${lobbyCode}`).emit('game-ready', { 
//                 lobbyCode,
//                 message: 'All players ready! Game starting...' 
//               });
//             }
//           }
//         }
//       } catch (error) {
//         console.error('Player ready error:', error);
//         socket.emit('error', { message: 'Failed to update ready status' });
//       }
//     });
    
//     // Start game from lobby
//     socket.on('start-game', async ({ lobbyCode }) => {
//       try {
//         const lobby = await Lobby.findOne({ lobbyCode })
//           .populate('players.userId', 'name rating');
        
//         if (!lobby) {
//           socket.emit('game-start-error', { message: 'Lobby not found' });
//           return;
//         }
        
//         if (lobby.players.length !== 2) {
//           socket.emit('game-start-error', { message: 'Need 2 players to start' });
//           return;
//         }
        
//         const allReady = lobby.players.every(p => p.ready);
//         if (!allReady) {
//           socket.emit('game-start-error', { message: 'Not all players are ready' });
//           return;
//         }
        
//         // Create game
//         const [initial, increment] = lobby.timeControl.split('+').map(Number);
//         const gameId = 'G' + Date.now() + Math.random().toString(36).substring(2, 7).toUpperCase();
        
//         const game = new Game({
//           gameId,
//           gameType: 'lobby',
//           timeControl: {
//             initial: initial * 60,
//             increment: increment || 0
//           },
//           players: [
//             {
//               userId: lobby.players[0].userId._id,
//               username: lobby.players[0].username,
//               color: 'white',
//               rating: lobby.players[0].rating,
//               timeRemaining: initial * 60
//             },
//             {
//               userId: lobby.players[1].userId._id,
//               username: lobby.players[1].username,
//               color: 'black',
//               rating: lobby.players[1].rating,
//               timeRemaining: initial * 60
//             }
//           ],
//           status: 'active',
//           startedAt: new Date()
//         });
        
//         await game.save();
        
//         // Update lobby status
//         lobby.status = 'playing';
//         await lobby.save();
        
//         // Notify all players in lobby that game started
//         io.to(`lobby-${lobbyCode}`).emit('game-started', {
//           gameId,
//           game
//         });
        
//       } catch (error) {
//         console.error('Start game error:', error);
//         io.to(`lobby-${lobbyCode}`).emit('game-start-error', { 
//           message: 'Failed to start game' 
//         });
//       }
//     });
    
//     // Join game room
//     socket.on('join-game', ({ gameId }) => {
//       socket.join(`game-${gameId}`);
//       console.log(`Socket ${socket.id} joined game ${gameId}`);
      
//       // Notify others that player joined
//       socket.to(`game-${gameId}`).emit('player-joined', { 
//         userId: socket.userId,
//         socketId: socket.id 
//       });
//     });
    
//     // Leave game room
//     socket.on('leave-game', ({ gameId }) => {
//       socket.leave(`game-${gameId}`);
//       console.log(`Socket ${socket.id} left game ${gameId}`);
      
//       // Notify others that player left
//       socket.to(`game-${gameId}`).emit('player-left', { 
//         userId: socket.userId,
//         socketId: socket.id 
//       });
//     });
    
//     // Make a move
//     socket.on('make-move', async ({ gameId, move, fen, timeLeft, playerColor }) => {
//       try {
//         // Broadcast move to opponent
//         socket.to(`game-${gameId}`).emit('move-made', {
//           move,
//           fen,
//           timeLeft,
//           playerColor
//         });
        
//         // Update game in database
//         const game = await Game.findOne({ gameId });
//         if (game) {
//           game.moves.push({
//             from: move.from,
//             to: move.to,
//             promotion: move.promotion || 'q',
//             san: move.san,
//             fen,
//             time: 1, // You can calculate actual time taken
//             moveNumber: game.moves.length + 1
//           });
//           game.currentFen = fen;
//           game.lastMoveAt = new Date();
          
//           // Update player's time
//           const playerIndex = game.players.findIndex(p => p.color === playerColor);
//           if (playerIndex !== -1 && !game.players[playerIndex].isComputer) {
//             game.players[playerIndex].timeRemaining = timeLeft;
//           }
          
//           await game.save();
          
//           // Check if game is over
//           // You might want to add game over detection here
//         }
//       } catch (error) {
//         console.error('Make move error:', error);
//         socket.emit('move-error', { message: 'Failed to make move' });
//       }
//     });
    
//     // Game ended
//     socket.on('game-ended', async ({ gameId, result, termination }) => {
//       try {
//         const game = await Game.findOne({ gameId });
        
//         if (game) {
//           game.status = 'completed';
//           game.result = result;
//           game.termination = termination;
//           game.endedAt = new Date();
//           await game.save();
          
//           // Notify all players in game
//           io.to(`game-${gameId}`).emit('game-completed', {
//             result,
//             termination,
//             message: result === 'white' ? 'White wins!' : 
//                      result === 'black' ? 'Black wins!' : 
//                      'Game drawn!'
//           });
//         }
//       } catch (error) {
//         console.error('Game ended error:', error);
//       }
//     });
    
//     // Offer draw
//     socket.on('offer-draw', ({ gameId, userId }) => {
//       socket.to(`game-${gameId}`).emit('draw-offered', { 
//         userId,
//         message: 'Opponent offers a draw' 
//       });
//     });
    
//     // Respond to draw offer
//     socket.on('draw-response', ({ gameId, userId, accepted }) => {
//       if (accepted) {
//         io.to(`game-${gameId}`).emit('game-completed', {
//           result: 'draw',
//           termination: 'agreement',
//           message: 'Game drawn by agreement!'
//         });
//       } else {
//         socket.to(`game-${gameId}`).emit('draw-declined', { 
//           userId,
//           message: 'Opponent declined the draw' 
//         });
//       }
//     });
    
//     // Resign
//     socket.on('resign', ({ gameId, userId }) => {
//       io.to(`game-${gameId}`).emit('game-completed', {
//         result: 'resignation',
//         message: 'Opponent resigned'
//       });
//     });
    
//     // Send chat message
//     socket.on('send-message', ({ gameId, userId, username, message }) => {
//       const messageData = {
//         userId,
//         username,
//         message,
//         timestamp: new Date().toISOString()
//       };
      
//       // Send to all in game room including sender
//       io.to(`game-${gameId}`).emit('receive-message', messageData);
//     });
    
//     // Quick match found notification
//     socket.on('quick-match-found', ({ gameId, players }) => {
//       // Notify both players that match is found
//       players.forEach(player => {
//         const playerSocketId = connectedUsers.get(player.userId.toString());
//         if (playerSocketId) {
//           io.to(playerSocketId).emit('match-found', { 
//             gameId, 
//             opponent: player.opponent 
//           });
//         }
//       });
//     });
    
//     // Ping/Pong for connection health check
//     socket.on('ping', () => {
//       socket.emit('pong');
//     });
    
//     // Disconnect
//     socket.on('disconnect', async () => {
//       console.log('Client disconnected:', socket.id);
      
//       if (socket.userId) {
//         // Remove from connected users
//         connectedUsers.delete(socket.userId.toString());
        
//         // Update user offline status
//         await User.findByIdAndUpdate(socket.userId, {
//           isOnline: false,
//           lastSeen: new Date()
//         });
        
//         // Notify relevant rooms that user disconnected
//         // You might want to broadcast to games/lobbies
//       }
//     });
//   });
// };

// // Helper function to get socket ID for a user
// export const getUserSocketId = (userId) => {
//   return connectedUsers.get(userId.toString());
// };

// // Helper function to get online status of a user
// export const isUserOnline = (userId) => {
//   return connectedUsers.has(userId.toString());
// };

// // Helper function to get all online users
// export const getOnlineUsers = () => {
//   return Array.from(connectedUsers.keys());
// };

// // Helper function to send notification to a specific user
// export const notifyUser = (userId, event, data) => {
//   const socketId = connectedUsers.get(userId.toString());
//   if (socketId) {
//     io.to(socketId).emit(event, data);
//     return true;
//   }
//   return false;
// };

// // Helper function to broadcast to all users in a game
// export const broadcastToGame = (io, gameId, event, data) => {
//   io.to(`game-${gameId}`).emit(event, data);
// };

// // Helper function to broadcast to all users in a lobby
// export const broadcastToLobby = (io, lobbyCode, event, data) => {
//   io.to(`lobby-${lobbyCode}`).emit(event, data);
// };


import Lobby from '../models/Lobby.js';
import Game from '../models/Game.js';
import User from '../models/User.js';

const connectedUsers = new Map();

export const setupSocketHandlers = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);
    
    // Authenticate user
    socket.on('authenticate', async ({ userId, token }) => {
      try {
        // Store user connection
        connectedUsers.set(userId.toString(), socket.id);
        socket.userId = userId;
        
        // Join user's personal room for private notifications
        socket.join(`user-${userId}`);
        
        // Update user online status
        await User.findByIdAndUpdate(userId, { 
          isOnline: true,
          lastSeen: new Date()
        });
        
        console.log(`User ${userId} authenticated on socket ${socket.id} and joined room user-${userId}`);
        
        // Send confirmation
        socket.emit('authenticated', { success: true });
      } catch (error) {
        console.error('Authentication error:', error);
        socket.emit('authenticated', { success: false, error: error.message });
      }
    });
    
    // Join lobby
    socket.on('join-lobby', async ({ lobbyCode }) => {
      try {
        socket.join(`lobby-${lobbyCode}`);
        
        const lobby = await Lobby.findOne({ lobbyCode })
          .populate('players.userId', 'name rating')
          .populate('createdBy', 'name rating');
        
        if (lobby) {
          // Send lobby data to the joining user
          socket.emit('lobby-joined', { success: true, lobby });
          
          // Notify all users in lobby about the update
          io.to(`lobby-${lobbyCode}`).emit('lobby-updated', lobby);
        } else {
          socket.emit('lobby-joined', { success: false, error: 'Lobby not found' });
        }
      } catch (error) {
        console.error('Join lobby error:', error);
        socket.emit('lobby-joined', { success: false, error: error.message });
      }
    });
    
    // Leave lobby
    socket.on('leave-lobby', ({ lobbyCode }) => {
      socket.leave(`lobby-${lobbyCode}`);
      console.log(`Socket ${socket.id} left lobby ${lobbyCode}`);
    });
    
    // Player ready status update
    socket.on('player-ready', async ({ lobbyCode, userId, ready }) => {
      try {
        const lobby = await Lobby.findOne({ lobbyCode });
        
        if (lobby) {
          const playerIndex = lobby.players.findIndex(
            p => p.userId.toString() === userId
          );
          
          if (playerIndex !== -1) {
            lobby.players[playerIndex].ready = ready;
            
            // Check if all players are ready
            const allReady = lobby.players.length === 2 && 
                           lobby.players.every(p => p.ready);
            
            if (allReady) {
              lobby.status = 'ready';
            }
            
            await lobby.save();
            
            const updatedLobby = await Lobby.findById(lobby._id)
              .populate('players.userId', 'name rating')
              .populate('createdBy', 'name rating');
            
            io.to(`lobby-${lobbyCode}`).emit('lobby-updated', updatedLobby);
            
            // If all ready, notify that game can start
            if (allReady) {
              io.to(`lobby-${lobbyCode}`).emit('game-ready', { 
                lobbyCode,
                message: 'All players ready! Game starting...' 
              });
            }
          }
        }
      } catch (error) {
        console.error('Player ready error:', error);
        socket.emit('error', { message: 'Failed to update ready status' });
      }
    });
    
    // Start game from lobby
    socket.on('start-game', async ({ lobbyCode }) => {
      try {
        const lobby = await Lobby.findOne({ lobbyCode })
          .populate('players.userId', 'name rating');
        
        if (!lobby) {
          socket.emit('game-start-error', { message: 'Lobby not found' });
          return;
        }
        
        if (lobby.players.length !== 2) {
          socket.emit('game-start-error', { message: 'Need 2 players to start' });
          return;
        }
        
        const allReady = lobby.players.every(p => p.ready);
        if (!allReady) {
          socket.emit('game-start-error', { message: 'Not all players are ready' });
          return;
        }
        
        // Create game
        const [initial, increment] = lobby.timeControl.split('+').map(Number);
        const gameId = 'G' + Date.now() + Math.random().toString(36).substring(2, 7).toUpperCase();
        
        const game = new Game({
          gameId,
          gameType: 'lobby',
          timeControl: {
            initial: initial * 60,
            increment: increment || 0
          },
          players: [
            {
              userId: lobby.players[0].userId._id,
              username: lobby.players[0].username,
              color: 'white',
              rating: lobby.players[0].rating,
              timeRemaining: initial * 60
            },
            {
              userId: lobby.players[1].userId._id,
              username: lobby.players[1].username,
              color: 'black',
              rating: lobby.players[1].rating,
              timeRemaining: initial * 60
            }
          ],
          status: 'active',
          startedAt: new Date()
        });
        
        await game.save();
        
        // Update lobby status
        lobby.status = 'playing';
        await lobby.save();
        
        // Notify all players in lobby that game started
        io.to(`lobby-${lobbyCode}`).emit('game-started', {
          gameId,
          game
        });
        
      } catch (error) {
        console.error('Start game error:', error);
        io.to(`lobby-${lobbyCode}`).emit('game-start-error', { 
          message: 'Failed to start game' 
        });
      }
    });
    
    // Join game room
    socket.on('join-game', ({ gameId }) => {
      socket.join(`game-${gameId}`);
      console.log(`Socket ${socket.id} joined game ${gameId}`);
      
      // Notify others that player joined
      socket.to(`game-${gameId}`).emit('player-joined', { 
        userId: socket.userId,
        socketId: socket.id 
      });
    });
    
    // Leave game room
    socket.on('leave-game', ({ gameId }) => {
      socket.leave(`game-${gameId}`);
      console.log(`Socket ${socket.id} left game ${gameId}`);
      
      // Notify others that player left
      socket.to(`game-${gameId}`).emit('player-left', { 
        userId: socket.userId,
        socketId: socket.id 
      });
    });
    
    // Make a move
    socket.on('make-move', async ({ gameId, move, fen, timeLeft, playerColor }) => {
      try {
        // Broadcast move to opponent
        socket.to(`game-${gameId}`).emit('move-made', {
          move,
          fen,
          timeLeft,
          playerColor
        });
        
        // Update game in database
        const game = await Game.findOne({ gameId });
        if (game) {
          game.moves.push({
            from: move.from,
            to: move.to,
            promotion: move.promotion || 'q',
            san: move.san,
            fen,
            time: 1,
            moveNumber: game.moves.length + 1
          });
          game.currentFen = fen;
          game.lastMoveAt = new Date();
          
          // Update player's time
          const playerIndex = game.players.findIndex(p => p.color === playerColor);
          if (playerIndex !== -1 && !game.players[playerIndex].isComputer) {
            game.players[playerIndex].timeRemaining = timeLeft;
          }
          
          await game.save();
        }
      } catch (error) {
        console.error('Make move error:', error);
        socket.emit('move-error', { message: 'Failed to make move' });
      }
    });
    
    // Game ended
    socket.on('game-ended', async ({ gameId, result, termination }) => {
      try {
        const game = await Game.findOne({ gameId });
        
        if (game) {
          game.status = 'completed';
          game.result = result;
          game.termination = termination;
          game.endedAt = new Date();
          await game.save();
          
          // Notify all players in game
          io.to(`game-${gameId}`).emit('game-completed', {
            result,
            termination,
            message: result === 'white' ? 'White wins!' : 
                     result === 'black' ? 'Black wins!' : 
                     'Game drawn!'
          });
        }
      } catch (error) {
        console.error('Game ended error:', error);
      }
    });
    
    // Offer draw
    socket.on('offer-draw', ({ gameId, userId }) => {
      socket.to(`game-${gameId}`).emit('draw-offered', { 
        userId,
        message: 'Opponent offers a draw' 
      });
    });
    
    // Respond to draw offer
    socket.on('draw-response', ({ gameId, userId, accepted }) => {
      if (accepted) {
        io.to(`game-${gameId}`).emit('game-completed', {
          result: 'draw',
          termination: 'agreement',
          message: 'Game drawn by agreement!'
        });
      } else {
        socket.to(`game-${gameId}`).emit('draw-declined', { 
          userId,
          message: 'Opponent declined the draw' 
        });
      }
    });
    
    // Resign
    socket.on('resign', ({ gameId, userId }) => {
      io.to(`game-${gameId}`).emit('game-completed', {
        result: 'resignation',
        message: 'Opponent resigned'
      });
    });
    
    // Send chat message
    socket.on('send-message', ({ gameId, userId, username, message }) => {
      const messageData = {
        userId,
        username,
        message,
        timestamp: new Date().toISOString()
      };
      
      // Send to all in game room including sender
      io.to(`game-${gameId}`).emit('receive-message', messageData);
    });
    
    // Disconnect
    socket.on('disconnect', async () => {
      console.log('Client disconnected:', socket.id);
      
      if (socket.userId) {
        // Remove from connected users
        connectedUsers.delete(socket.userId.toString());
        
        // Leave user room
        socket.leave(`user-${socket.userId}`);
        
        // Update user offline status
        await User.findByIdAndUpdate(socket.userId, {
          isOnline: false,
          lastSeen: new Date()
        });
      }
    });
  });
};

// Helper function to get socket ID for a user
export const getUserSocketId = (userId) => {
  return connectedUsers.get(userId.toString());
};

// Helper function to get online status of a user
export const isUserOnline = (userId) => {
  return connectedUsers.has(userId.toString());
};

// Helper function to get all online users
export const getOnlineUsers = () => {
  return Array.from(connectedUsers.keys());
};

// Helper function to send notification to a specific user
export const notifyUser = (io, userId, event, data) => {
  io.to(`user-${userId}`).emit(event, data);
};

// Helper function to broadcast to all users in a game
export const broadcastToGame = (io, gameId, event, data) => {
  io.to(`game-${gameId}`).emit(event, data);
};

// Helper function to broadcast to all users in a lobby
export const broadcastToLobby = (io, lobbyCode, event, data) => {
  io.to(`lobby-${lobbyCode}`).emit(event, data);
};

// export const getUserSocketId = (userId) => {
//   return connectedUsers.get(userId.toString());
// };