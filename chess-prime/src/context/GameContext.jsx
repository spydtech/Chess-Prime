// import React, { createContext, useState, useContext, useEffect } from 'react';
// import api from '../services/api';
// import { useAuth } from './AuthContext';

// const GameContext = createContext(null);

// export const useGame = () => {
//    const context = useContext(GameContext);
//   if (!context) {
//     throw new Error('useGame must be used within a GameProvider');
//   }
//   return context;
// };

// export const GameProvider = ({ children }) => {
    
//   const { user, token } = useAuth();
//   const [currentGame, setCurrentGame] = useState(null);
//   const [gameHistory, setGameHistory] = useState([]);
//   const [lobby, setLobby] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [computerDifficulties, setComputerDifficulties] = useState([]);

//   // Load computer difficulties on mount
//   useEffect(() => {
//     loadComputerDifficulties();
//   }, []);

//   // Load game history when user changes
//   useEffect(() => {
//     if (user) {
//       loadGameHistory();
//     }
//   }, [user]);

//   const loadComputerDifficulties = async () => {
//     try {
//       const response = await api.get('/computer/difficulties');
//       if (response.data.success) {
//         setComputerDifficulties(response.data.difficulties);
//       }
//     } catch (error) {
//       console.error('Load computer difficulties error:', error);
//     }
//   };

//   // Start computer game
//   const startComputerGame = async (timeControl, difficulty = 'medium') => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       console.log('Starting computer game with:', { timeControl, difficulty });
      
//       const response = await api.post('/computer/start', {
//         timeControl,
//         difficulty
//       });

//       console.log('Computer game response:', response.data);

//       if (response.data.success) {
//         setCurrentGame(response.data.game);
//         return { 
//           success: true, 
//           game: response.data.game 
//         };
//       } else {
//         throw new Error(response.data.message || 'Failed to start computer game');
//       }
//     } catch (error) {
//       console.error('Start computer game error:', error);
//       const errorMessage = error.response?.data?.message || error.message || 'Failed to start computer game';
//       setError(errorMessage);
//       return { 
//         success: false, 
//         message: errorMessage 
//       };
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Get computer move
//   const getComputerMove = async (gameId, fen, difficulty = 'medium') => {
//     try {
//       setError(null);
      
//       const response = await api.post(`/computer/${gameId}/move`, {
//         fen,
//         difficulty
//       });

//       return {
//         success: true,
//         ...response.data
//       };
//     } catch (error) {
//       console.error('Get computer move error:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to get computer move';
//       setError(errorMessage);
//       return { 
//         success: false, 
//         message: errorMessage 
//       };
//     }
//   };

//   // Create a new game
//   const createGame = async (gameType, timeControl, opponentId = null, isComputer = false) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await api.post('/games', {
//         gameType,
//         timeControl,
//         opponentId,
//         isComputer
//       });
      
//       setCurrentGame(response.data.game);
//       return { success: true, game: response.data.game };
//     } catch (error) {
//       console.error('Create game error:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to create game';
//       setError(errorMessage);
//       return { 
//         success: false, 
//         message: errorMessage 
//       };
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Create lobby
//   const createLobby = async (gameType, timeControl, isPrivate = false) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await api.post('/lobby', {
//         gameType,
//         timeControl,
//         isPrivate
//       });
      
//       setLobby(response.data.lobby);
//       return { success: true, lobby: response.data.lobby };
//     } catch (error) {
//       console.error('Create lobby error:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to create lobby';
//       setError(errorMessage);
//       return { 
//         success: false, 
//         message: errorMessage 
//       };
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Join lobby
//   const joinLobby = async (lobbyCode) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await api.post(`/lobby/${lobbyCode}/join`);
//       setLobby(response.data.lobby);
//       return { success: true, lobby: response.data.lobby };
//     } catch (error) {
//       console.error('Join lobby error:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to join lobby';
//       setError(errorMessage);
//       return { 
//         success: false, 
//         message: errorMessage 
//       };
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Toggle ready status
//   const toggleReady = async (lobbyCode) => {
//     try {
//       setError(null);
      
//       const response = await api.put(`/lobby/${lobbyCode}/ready`);
//       setLobby(response.data.lobby);
//       return { success: true };
//     } catch (error) {
//       console.error('Toggle ready error:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to toggle ready';
//       setError(errorMessage);
//       return { 
//         success: false, 
//         message: errorMessage 
//       };
//     }
//   };

//   // Start game from lobby
//   const startGameFromLobby = async (lobbyCode) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await api.post(`/lobby/${lobbyCode}/start`);
//       setCurrentGame(response.data.game);
//       setLobby(null);
//       return { success: true, game: response.data.game };
//     } catch (error) {
//       console.error('Start game error:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to start game';
//       setError(errorMessage);
//       return { 
//         success: false, 
//         message: errorMessage 
//       };
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Leave lobby
//   const leaveLobby = async (lobbyCode) => {
//     try {
//       setError(null);
      
//       await api.delete(`/lobby/${lobbyCode}/leave`);
//       setLobby(null);
//       return { success: true };
//     } catch (error) {
//       console.error('Leave lobby error:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to leave lobby';
//       setError(errorMessage);
//       return { 
//         success: false, 
//         message: errorMessage 
//       };
//     }
//   };

//   // Join quick match
//   const joinQuickMatch = async (timeControl) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await api.post('/quick-match/join', { timeControl });
      
//       if (response.data.matched) {
//         setCurrentGame(response.data.game);
//         return { success: true, matched: true, game: response.data.game };
//       } else {
//         return { 
//           success: true, 
//           matched: false, 
//           queuePosition: response.data.queuePosition 
//         };
//       }
//     } catch (error) {
//       console.error('Join quick match error:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to join queue';
//       setError(errorMessage);
//       return { 
//         success: false, 
//         message: errorMessage 
//       };
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Leave quick match
//   const leaveQuickMatch = async (timeControl) => {
//     try {
//       setError(null);
      
//       await api.post('/quick-match/leave', { timeControl });
//       return { success: true };
//     } catch (error) {
//       console.error('Leave quick match error:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to leave queue';
//       setError(errorMessage);
//       return { 
//         success: false, 
//         message: errorMessage 
//       };
//     }
//   };

//   // Get game history
//   const loadGameHistory = async () => {
//     try {
//       const response = await api.get('/games/user/history');
//       setGameHistory(response.data.games);
//       return { success: true };
//     } catch (error) {
//       console.error('Load game history error:', error);
//       return { 
//         success: false, 
//         message: error.response?.data?.message || 'Failed to load history' 
//       };
//     }
//   };

//   // Make a move
//   const makeMove = async (gameId, moveData) => {
//     try {
//       setError(null);
      
//       const response = await api.post(`/games/${gameId}/move`, moveData);
//       return { success: true, game: response.data.game };
//     } catch (error) {
//       console.error('Make move error:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to make move';
//       setError(errorMessage);
//       return { 
//         success: false, 
//         message: errorMessage 
//       };
//     }
//   };

//   // End game
//   const endGame = async (gameId, result, termination) => {
//     try {
//       setError(null);
      
//       await api.post(`/games/${gameId}/end`, { result, termination });
//       setCurrentGame(null);
//       return { success: true };
//     } catch (error) {
//       console.error('End game error:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to end game';
//       setError(errorMessage);
//       return { 
//         success: false, 
//         message: errorMessage 
//       };
//     }
//   };

//   const value = {
//     currentGame,
//     gameHistory,
//     lobby,
//     loading,
//     error,
//     computerDifficulties,
//     startComputerGame,
//     getComputerMove,
//     createGame,
//     createLobby,
//     joinLobby,
//     toggleReady,
//     startGameFromLobby,
//     leaveLobby,
//     joinQuickMatch,
//     leaveQuickMatch,
//     loadGameHistory,
//     makeMove,
//     endGame,
//     setCurrentGame,
//     setLobby
//   };

//   return (
//     <GameContext.Provider value={value}>
//       {children}
//     </GameContext.Provider>
//   );
// };





// import React, { createContext, useState, useContext, useEffect } from 'react';
// import api from '../services/api';
// import { useAuth } from './AuthContext';

// const GameContext = createContext(null);

// export const useGame = () => {
//   const context = useContext(GameContext);
//   if (!context) {
//     throw new Error('useGame must be used within a GameProvider');
//   }
//   return context;
// };

// export const GameProvider = ({ children }) => {
//   const { user } = useAuth();
//   const [currentGame, setCurrentGame] = useState(null);
//   const [gameHistory, setGameHistory] = useState([]);
//   const [lobby, setLobby] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [computerDifficulties, setComputerDifficulties] = useState([]);

//   // Load computer difficulties on mount
//   useEffect(() => {
//     loadComputerDifficulties();
//   }, []);

//   // Load game history when user changes
//   useEffect(() => {
//     if (user) {
//       loadGameHistory();
//     }
//   }, [user]);

//   const loadComputerDifficulties = async () => {
//     try {
//       const response = await api.get('/computer/difficulties');
//       if (response.data.success) {
//         setComputerDifficulties(response.data.difficulties);
//       }
//     } catch (error) {
//       console.error('Load computer difficulties error:', error);
//     }
//   };

//   // Start computer game
//   const startComputerGame = async (timeControl, difficulty = 'medium') => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       console.log('Starting computer game with:', { timeControl, difficulty });
      
//       const response = await api.post('/computer/start', {
//         timeControl,
//         difficulty
//       });

//       console.log('Computer game response:', response.data);

//       if (response.data.success) {
//         setCurrentGame(response.data.game);
//         return { 
//           success: true, 
//           game: response.data.game 
//         };
//       } else {
//         throw new Error(response.data.message || 'Failed to start computer game');
//       }
//     } catch (error) {
//       console.error('Start computer game error:', error);
//       const errorMessage = error.response?.data?.message || error.message || 'Failed to start computer game';
//       setError(errorMessage);
//       return { 
//         success: false, 
//         message: errorMessage 
//       };
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Get computer move
//   const getComputerMove = async (gameId, fen, difficulty = 'medium') => {
//     try {
//       setError(null);
      
//       const response = await api.post(`/computer/${gameId}/move`, {
//         fen,
//         difficulty
//       });

//       return {
//         success: true,
//         ...response.data
//       };
//     } catch (error) {
//       console.error('Get computer move error:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to get computer move';
//       setError(errorMessage);
//       return { 
//         success: false, 
//         message: errorMessage 
//       };
//     }
//   };

//   // Create a new game
//   const createGame = async (gameType, timeControl, opponentId = null, isComputer = false) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await api.post('/games', {
//         gameType,
//         timeControl,
//         opponentId,
//         isComputer
//       });
      
//       setCurrentGame(response.data.game);
//       return { success: true, game: response.data.game };
//     } catch (error) {
//       console.error('Create game error:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to create game';
//       setError(errorMessage);
//       return { 
//         success: false, 
//         message: errorMessage 
//       };
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Create lobby
//   const createLobby = async (gameType, timeControl, isPrivate = false) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await api.post('/lobby', {
//         gameType,
//         timeControl,
//         isPrivate
//       });
      
//       setLobby(response.data.lobby);
//       return { success: true, lobby: response.data.lobby };
//     } catch (error) {
//       console.error('Create lobby error:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to create lobby';
//       setError(errorMessage);
//       return { 
//         success: false, 
//         message: errorMessage 
//       };
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Join lobby
//   const joinLobby = async (lobbyCode) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await api.post(`/lobby/${lobbyCode}/join`);
//       setLobby(response.data.lobby);
//       return { success: true, lobby: response.data.lobby };
//     } catch (error) {
//       console.error('Join lobby error:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to join lobby';
//       setError(errorMessage);
//       return { 
//         success: false, 
//         message: errorMessage 
//       };
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Toggle ready status
//   const toggleReady = async (lobbyCode) => {
//     try {
//       setError(null);
      
//       const response = await api.put(`/lobby/${lobbyCode}/ready`);
//       setLobby(response.data.lobby);
//       return { success: true };
//     } catch (error) {
//       console.error('Toggle ready error:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to toggle ready';
//       setError(errorMessage);
//       return { 
//         success: false, 
//         message: errorMessage 
//       };
//     }
//   };

//   // Start game from lobby
//   const startGameFromLobby = async (lobbyCode) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await api.post(`/lobby/${lobbyCode}/start`);
//       setCurrentGame(response.data.game);
//       setLobby(null);
//       return { success: true, game: response.data.game };
//     } catch (error) {
//       console.error('Start game error:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to start game';
//       setError(errorMessage);
//       return { 
//         success: false, 
//         message: errorMessage 
//       };
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Leave lobby
//   const leaveLobby = async (lobbyCode) => {
//     try {
//       setError(null);
      
//       await api.delete(`/lobby/${lobbyCode}/leave`);
//       setLobby(null);
//       return { success: true };
//     } catch (error) {
//       console.error('Leave lobby error:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to leave lobby';
//       setError(errorMessage);
//       return { 
//         success: false, 
//         message: errorMessage 
//       };
//     }
//   };

//   // Join quick match
//  const joinQuickMatch = async (timeControl) => {
//   try {
//     setLoading(true);
//     setError(null);
    
//     const response = await api.post('/quick-match/join', { timeControl });
    
//     if (response.data.matched) {
//       // Store the game in currentGame
//       setCurrentGame(response.data.game);
//       return { 
//         success: true, 
//         matched: true, 
//         game: response.data.game 
//       };
//     } else {
//       return { 
//         success: true, 
//         matched: false, 
//         queuePosition: response.data.queuePosition,
//         queueLength: response.data.queueLength
//       };
//     }
//   } catch (error) {
//     console.error('Join quick match error:', error);
//     const errorMessage = error.response?.data?.message || 'Failed to join queue';
//     setError(errorMessage);
//     return { 
//       success: false, 
//       message: errorMessage 
//     };
//   } finally {
//     setLoading(false);
//   }
// };

//   // Get queue status
// const getQueueStatus = async (timeControl) => {
//   try {
//     const response = await api.get(`/quick-match/status/${timeControl}`);
//     return {
//       success: true,
//       inQueue: response.data.inQueue,
//       position: response.data.position,
//       queueLength: response.data.queueLength
//     };
//   } catch (error) {
//     console.error('Get queue status error:', error);
//     return {
//       success: false,
//       message: error.response?.data?.message || 'Failed to get queue status'
//     };
//   }
// };

//   // Leave quick match
//   const leaveQuickMatch = async (timeControl) => {
//   try {
//     setError(null);
    
//     await api.post('/quick-match/leave', { timeControl });
//     return { success: true };
//   } catch (error) {
//     console.error('Leave quick match error:', error);
//     const errorMessage = error.response?.data?.message || 'Failed to leave queue';
//     setError(errorMessage);
//     return { 
//       success: false, 
//       message: errorMessage 
//     };
//   }
// };

//   // Get game history
//   const loadGameHistory = async () => {
//     try {
//       const response = await api.get('/games/user/history');
//       setGameHistory(response.data.games);
//       return { success: true };
//     } catch (error) {
//       console.error('Load game history error:', error);
//       return { 
//         success: false, 
//         message: error.response?.data?.message || 'Failed to load history' 
//       };
//     }
//   };

//   // Get game by ID
//   const getGameById = async (gameId) => {
//     try {
//       const response = await api.get(`/games/${gameId}`);
//       return { success: true, game: response.data.game };
//     } catch (error) {
//       console.error('Get game error:', error);
//       return { 
//         success: false, 
//         message: error.response?.data?.message || 'Failed to get game' 
//       };
//     }
//   };

//   // Make a move
//   const makeMove = async (gameId, moveData) => {
//     try {
//       setError(null);
      
//       const response = await api.post(`/games/${gameId}/move`, moveData);
//       return { success: true, game: response.data.game };
//     } catch (error) {
//       console.error('Make move error:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to make move';
//       setError(errorMessage);
//       return { 
//         success: false, 
//         message: errorMessage 
//       };
//     }
//   };

//   // End game
//   const endGame = async (gameId, result, termination) => {
//     try {
//       setError(null);
      
//       await api.post(`/games/${gameId}/end`, { result, termination });
//       setCurrentGame(null);
//       return { success: true };
//     } catch (error) {
//       console.error('End game error:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to end game';
//       setError(errorMessage);
//       return { 
//         success: false, 
//         message: errorMessage 
//       };
//     }
//   };

//   const value = {
//     currentGame,
//     gameHistory,
//     lobby,
//     loading,
//     error,
//     computerDifficulties,
//     startComputerGame,
//     getComputerMove,
//     createGame,
//     createLobby,
//     joinLobby,
//     toggleReady,
//     startGameFromLobby,
//     leaveLobby,
//     joinQuickMatch,
//     getQueueStatus,
//     leaveQuickMatch,
//     loadGameHistory,
//     getGameById,
//     makeMove,
//     endGame,
//     setCurrentGame,
//     setLobby
//   };

//   return (
//     <GameContext.Provider value={value}>
//       {children}
//     </GameContext.Provider>
//   );
// };



import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const GameContext = createContext(null);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider = ({ children }) => {
  const { user } = useAuth();
  const [currentGame, setCurrentGame] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);
  const [lobby, setLobby] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [computerDifficulties, setComputerDifficulties] = useState([]);

  // Load computer difficulties on mount
  useEffect(() => {
    loadComputerDifficulties();
  }, []);

  // Load game history when user changes
  useEffect(() => {
    if (user) {
      loadGameHistory();
    }
  }, [user]);

  const loadComputerDifficulties = async () => {
    try {
      const response = await api.get('/computer/difficulties');
      if (response.data.success) {
        setComputerDifficulties(response.data.difficulties);
      }
    } catch (error) {
      console.error('Load computer difficulties error:', error);
    }
  };

  // Start computer game
  const startComputerGame = async (timeControl, difficulty = 'medium') => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Starting computer game with:', { timeControl, difficulty });
      
      const response = await api.post('/computer/start', {
        timeControl,
        difficulty
      });

      console.log('Computer game response:', response.data);

      if (response.data.success) {
        setCurrentGame(response.data.game);
        return { 
          success: true, 
          game: response.data.game 
        };
      } else {
        throw new Error(response.data.message || 'Failed to start computer game');
      }
    } catch (error) {
      console.error('Start computer game error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to start computer game';
      setError(errorMessage);
      return { 
        success: false, 
        message: errorMessage 
      };
    } finally {
      setLoading(false);
    }
  };

  // Get computer move
  const getComputerMove = async (gameId, fen, difficulty = 'medium') => {
    try {
      setError(null);
      
      const response = await api.post(`/computer/${gameId}/move`, {
        fen,
        difficulty
      });

      return {
        success: true,
        ...response.data
      };
    } catch (error) {
      console.error('Get computer move error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to get computer move';
      setError(errorMessage);
      return { 
        success: false, 
        message: errorMessage 
      };
    }
  };

  // Join quick match
  const joinQuickMatch = async (timeControl) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.post('/quick-match/join', { timeControl });
      
      if (response.data.matched) {
        // Store the game in currentGame
        setCurrentGame(response.data.game);
        return { 
          success: true, 
          matched: true, 
          game: response.data.game 
        };
      } else {
        return { 
          success: true, 
          matched: false, 
          queuePosition: response.data.queuePosition,
          queueLength: response.data.queueLength
        };
      }
    } catch (error) {
      console.error('Join quick match error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to join queue';
      setError(errorMessage);
      return { 
        success: false, 
        message: errorMessage 
      };
    } finally {
      setLoading(false);
    }
  };

  // Get queue status
  const getQueueStatus = async (timeControl) => {
    try {
      const response = await api.get(`/quick-match/status/${timeControl}`);
      return {
        success: true,
        inQueue: response.data.inQueue,
        position: response.data.position,
        queueLength: response.data.queueLength
      };
    } catch (error) {
      console.error('Get queue status error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to get queue status'
      };
    }
  };

  // Leave quick match
  const leaveQuickMatch = async (timeControl) => {
    try {
      setError(null);
      
      await api.post('/quick-match/leave', { timeControl });
      return { success: true };
    } catch (error) {
      console.error('Leave quick match error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to leave queue';
      setError(errorMessage);
      return { 
        success: false, 
        message: errorMessage 
      };
    }
  };

  // Create lobby
  const createLobby = async (gameType, timeControl, isPrivate = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.post('/lobby', {
        gameType,
        timeControl,
        isPrivate
      });
      
      setLobby(response.data.lobby);
      return { success: true, lobby: response.data.lobby };
    } catch (error) {
      console.error('Create lobby error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to create lobby';
      setError(errorMessage);
      return { 
        success: false, 
        message: errorMessage 
      };
    } finally {
      setLoading(false);
    }
  };

  // Join lobby
  const joinLobby = async (lobbyCode) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.post(`/lobby/${lobbyCode}/join`);
      setLobby(response.data.lobby);
      return { success: true, lobby: response.data.lobby };
    } catch (error) {
      console.error('Join lobby error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to join lobby';
      setError(errorMessage);
      return { 
        success: false, 
        message: errorMessage 
      };
    } finally {
      setLoading(false);
    }
  };

  // Toggle ready status
  const toggleReady = async (lobbyCode) => {
    try {
      setError(null);
      
      const response = await api.put(`/lobby/${lobbyCode}/ready`);
      setLobby(response.data.lobby);
      return { success: true };
    } catch (error) {
      console.error('Toggle ready error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to toggle ready';
      setError(errorMessage);
      return { 
        success: false, 
        message: errorMessage 
      };
    }
  };

  // Start game from lobby
  const startGameFromLobby = async (lobbyCode) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.post(`/lobby/${lobbyCode}/start`);
      setCurrentGame(response.data.game);
      setLobby(null);
      return { success: true, game: response.data.game };
    } catch (error) {
      console.error('Start game error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to start game';
      setError(errorMessage);
      return { 
        success: false, 
        message: errorMessage 
      };
    } finally {
      setLoading(false);
    }
  };

  // Leave lobby
  const leaveLobby = async (lobbyCode) => {
    try {
      setError(null);
      
      await api.delete(`/lobby/${lobbyCode}/leave`);
      setLobby(null);
      return { success: true };
    } catch (error) {
      console.error('Leave lobby error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to leave lobby';
      setError(errorMessage);
      return { 
        success: false, 
        message: errorMessage 
      };
    }
  };

  // Get game history
  const loadGameHistory = async () => {
    try {
      const response = await api.get('/games/user/history');
      setGameHistory(response.data.games);
      return { success: true };
    } catch (error) {
      console.error('Load game history error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to load history' 
      };
    }
  };

  // Get game by ID
  const getGameById = async (gameId) => {
    try {
      const response = await api.get(`/games/${gameId}`);
      return { success: true, game: response.data.game };
    } catch (error) {
      console.error('Get game error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to get game' 
      };
    }
  };

  // Make a move
  const makeMove = async (gameId, moveData) => {
    try {
      setError(null);
      
      const response = await api.post(`/games/${gameId}/move`, moveData);
      return { success: true, game: response.data.game };
    } catch (error) {
      console.error('Make move error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to make move';
      setError(errorMessage);
      return { 
        success: false, 
        message: errorMessage 
      };
    }
  };

  // End game
  const endGame = async (gameId, result, termination) => {
    try {
      setError(null);
      
      await api.post(`/games/${gameId}/end`, { result, termination });
      setCurrentGame(null);
      return { success: true };
    } catch (error) {
      console.error('End game error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to end game';
      setError(errorMessage);
      return { 
        success: false, 
        message: errorMessage 
      };
    }
  };

  const value = {
    currentGame,
    gameHistory,
    lobby,
    loading,
    error,
    computerDifficulties,
    startComputerGame,
    getComputerMove,
    joinQuickMatch,
    getQueueStatus,
    leaveQuickMatch,
    createLobby,
    joinLobby,
    toggleReady,
    startGameFromLobby,
    leaveLobby,
    loadGameHistory,
    getGameById,
    makeMove,
    endGame,
    setCurrentGame,
    setLobby
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};