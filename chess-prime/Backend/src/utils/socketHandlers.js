const matchQueue = new Map();

export const setupSocketHandlers = (io) => {
  io.on('connection', (socket) => {
    console.log('🔌 New client connected:', socket.id);

    // Join lobby
    socket.on('join-lobby', ({ lobbyCode, userId }) => {
      socket.join(`lobby-${lobbyCode}`);
      socket.to(`lobby-${lobbyCode}`).emit('player-joined', { userId });
      console.log(`👤 User ${userId} joined lobby ${lobbyCode}`);
    });

    // Leave lobby
    socket.on('leave-lobby', ({ lobbyCode, userId }) => {
      socket.leave(`lobby-${lobbyCode}`);
      socket.to(`lobby-${lobbyCode}`).emit('player-left', { userId });
    });

    // Join game
    socket.on('join-game', ({ gameId, userId }) => {
      socket.join(`game-${gameId}`);
      socket.to(`game-${gameId}`).emit('player-connected', { userId });
      console.log(`🎮 User ${userId} joined game ${gameId}`);
    });

    // Leave game
    socket.on('leave-game', ({ gameId, userId }) => {
      socket.leave(`game-${gameId}`);
      socket.to(`game-${gameId}`).emit('player-disconnected', { userId });
    });

    // Quick match queue
    socket.on('join-quick-match', ({ userId, timeControl, rating, name }) => {
      if (!matchQueue.has(timeControl)) {
        matchQueue.set(timeControl, []);
      }
      
      const queue = matchQueue.get(timeControl);
      
      if (!queue.some(p => p.userId === userId)) {
        queue.push({
          userId,
          rating,
          name,
          socketId: socket.id,
          joinedAt: Date.now()
        });
        
        console.log(`🎯 User ${userId} joined quick match queue (${timeControl})`);
        
        const match = findMatch(queue, rating);
        
        if (match) {
          const gameId = 'GAME_' + Math.random().toString(36).substring(2, 8).toUpperCase();
          
          io.to(match.player1.socketId).emit('match-found', {
            gameId,
            opponent: match.player2,
            timeControl
          });
          
          io.to(match.player2.socketId).emit('match-found', {
            gameId,
            opponent: match.player1,
            timeControl
          });
          
          const index1 = queue.findIndex(p => p.userId === match.player1.userId);
          const index2 = queue.findIndex(p => p.userId === match.player2.userId);
          if (index1 > -1) queue.splice(index1, 1);
          if (index2 > -1) queue.splice(index2, 1);
        }
      }
      
      io.to('quick-match-queue').emit('queue-update', {
        timeControl,
        queueSize: queue.length
      });
    });

    // Leave quick match queue
    socket.on('leave-quick-match', ({ userId, timeControl }) => {
      if (matchQueue.has(timeControl)) {
        const queue = matchQueue.get(timeControl);
        const index = queue.findIndex(p => p.userId === userId);
        if (index > -1) {
          queue.splice(index, 1);
          console.log(`👋 User ${userId} left quick match queue`);
          
          io.to('quick-match-queue').emit('queue-update', {
            timeControl,
            queueSize: queue.length
          });
        }
      }
    });

    // Game moves
    socket.on('make-move', ({ gameId, move, fen, gameState }) => {
      socket.to(`game-${gameId}`).emit('move-made', { move, fen, gameState });
    });

    // Chat in game
    socket.on('send-message', ({ gameId, message, sender }) => {
      socket.to(`game-${gameId}`).emit('receive-message', { 
        message, 
        sender, 
        timestamp: Date.now() 
      });
    });

    // Disconnect
    socket.on('disconnect', () => {
      console.log('❌ Client disconnected:', socket.id);
      
      matchQueue.forEach((queue, timeControl) => {
        const index = queue.findIndex(p => p.socketId === socket.id);
        if (index > -1) {
          const [removed] = queue.splice(index, 1);
          console.log(`👋 User ${removed.userId} removed from ${timeControl} queue`);
          
          io.to('quick-match-queue').emit('queue-update', {
            timeControl,
            queueSize: queue.length
          });
        }
      });
    });
  });
};

function findMatch(queue, rating) {
  if (queue.length < 2) return null;
  
  const sortedQueue = [...queue].sort((a, b) => a.rating - b.rating);
  
  let bestMatch = null;
  let smallestDiff = Infinity;
  
  for (let i = 0; i < sortedQueue.length - 1; i++) {
    for (let j = i + 1; j < sortedQueue.length; j++) {
      const diff = Math.abs(sortedQueue[i].rating - sortedQueue[j].rating);
      if (diff < smallestDiff) {
        smallestDiff = diff;
        bestMatch = {
          player1: sortedQueue[i],
          player2: sortedQueue[j]
        };
      }
    }
  }
  
  return bestMatch;
}