// // context/GameContext.js
// import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
// import api from '../services/api';
// import { useAuth } from './AuthContext';
// import { useSocket } from './SocketContext';

// const GameContext = createContext(null);

// export const useGame = () => {
//   const context = useContext(GameContext);
//   if (!context) {
//     throw new Error('useGame must be used within a GameProvider');
//   }
//   return context;
// };

// export const GameProvider = ({ children }) => {
//   const { user, token } = useAuth();
//   const { socket, emit, on, off } = useSocket();
  
//   const [currentGame, setCurrentGame] = useState(null);
//   const [gameHistory, setGameHistory] = useState([]);
//   const [lobby, setLobby] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [computerDifficulties, setComputerDifficulties] = useState([]);
//   const [activeGames, setActiveGames] = useState([]);
//   const [pendingInvitations, setPendingInvitations] = useState([]);
//   const [queueStatus, setQueueStatus] = useState({
//     inQueue: false,
//     position: 0,
//     queueLength: 0,
//     timeControl: null
//   });

//   // Load computer difficulties on mount
//   useEffect(() => {
//     loadComputerDifficulties();
//   }, []);

//   // Load game history when user changes
//   useEffect(() => {
//     if (user) {
//       loadGameHistory();
//       loadActiveGames();
//     } else {
//       setGameHistory([]);
//       setActiveGames([]);
//       setCurrentGame(null);
//       setLobby(null);
//     }
//   }, [user]);

//   // Socket event listeners
//   useEffect(() => {
//     if (!socket) return;

//     // Game events
//     on('game-started', handleGameStarted);
//     on('move-made', handleOpponentMove);
//     on('game-completed', handleGameCompleted);
    
//     // Lobby events
//     on('player-joined', handlePlayerJoined);
//     on('player-left', handlePlayerLeft);
//     on('player-ready', handlePlayerReady);
//     on('lobby-invitation', handleLobbyInvitation);
    
//     // Quick match events
//     on('match-found', handleMatchFound);
//     on('queue-update', handleQueueUpdate);
    
//     // Error events
//     on('game-error', handleGameError);

//     return () => {
//       off('game-started');
//       off('move-made');
//       off('game-completed');
//       off('player-joined');
//       off('player-left');
//       off('player-ready');
//       off('lobby-invitation');
//       off('match-found');
//       off('queue-update');
//       off('game-error');
//     };
//   }, [socket, on, off]);

//   // Socket event handlers
//   // In GameContext.jsx, update the handleGameStarted function:
// const handleGameStarted = (data) => {
//   console.log('🎮 Game started event received:', data);
  
//   // Update current game state
//   setCurrentGame(data.game);
//   setLobby(null);
  
//   // You might want to store this in localStorage or context to handle redirects
//   // The component listening to this event should handle navigation
// };

//   const handleOpponentMove = (data) => {
//     console.log('Opponent move:', data);
//     if (currentGame && currentGame.gameId === data.gameId) {
//       setCurrentGame(prev => ({
//         ...prev,
//         moves: [...(prev.moves || []), data.move],
//         currentFen: data.fen,
//         lastMoveAt: new Date()
//       }));
//     }
//   };

//   const handleGameCompleted = (data) => {
//     console.log('Game completed:', data);
//     if (currentGame && currentGame.gameId === data.gameId) {
//       setCurrentGame(prev => ({
//         ...prev,
//         status: 'completed',
//         result: data.result,
//         termination: data.termination,
//         endedAt: new Date()
//       }));
//     }
//     loadGameHistory(); // Refresh history
//   };

//   const handlePlayerJoined = (data) => {
//     console.log('Player joined:', data);
//     if (lobby && lobby.lobbyCode === data.lobbyCode) {
//       setLobby(prev => ({
//         ...prev,
//         players: [...prev.players, data.player]
//       }));
//     }
//   };

//   const handlePlayerLeft = (data) => {
//     console.log('Player left:', data);
//     if (lobby && lobby.lobbyCode === data.lobbyCode) {
//       setLobby(prev => ({
//         ...prev,
//         players: prev.players.filter(p => p.userId !== data.playerId)
//       }));
//     }
//   };

//   const handlePlayerReady = (data) => {
//     console.log('Player ready:', data);
//     if (lobby && lobby.lobbyCode === data.lobbyCode) {
//       setLobby(prev => ({
//         ...prev,
//         players: prev.players.map(p => 
//           p.userId === data.playerId ? { ...p, ready: data.ready } : p
//         ),
//         status: data.allReady ? 'ready' : 'waiting'
//       }));
//     }
//   };

//   const handleLobbyInvitation = (data) => {
//     console.log('Lobby invitation:', data);
//     setPendingInvitations(prev => [...prev, data]);
//   };

//   const handleMatchFound = (data) => {
//     console.log('Match found:', data);
//     setQueueStatus({
//       inQueue: false,
//       position: 0,
//       queueLength: 0,
//       timeControl: null
//     });
//     setCurrentGame(data.game);
//   };

//   const handleQueueUpdate = (data) => {
//     console.log('Queue update:', data);
//     setQueueStatus({
//       inQueue: data.inQueue,
//       position: data.position,
//       queueLength: data.queueLength,
//       timeControl: data.timeControl
//     });
//   };

//   const handleGameError = (data) => {
//     console.error('Game error:', data);
//     setError(data.message);
//   };

//   // API Calls
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

//   const loadGameHistory = async () => {
//     try {
//       const response = await api.get('/games/user/history');
//       setGameHistory(response.data.games);
//     } catch (error) {
//       console.error('Load game history error:', error);
//     }
//   };

//   const loadActiveGames = async () => {
//     try {
//       const response = await api.get('/games/user/active');
//       setActiveGames(response.data.games);
//     } catch (error) {
//       console.error('Load active games error:', error);
//     }
//   };

//   // Computer Game APIs
//   const startComputerGame = async (timeControl, difficulty = 'medium') => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await api.post('/computer/start', {
//         timeControl,
//         difficulty
//       });

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

//   // Quick Match APIs
//   const joinQuickMatch = async (timeControl) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await api.post('/quick-match/join', { timeControl });
      
//       if (response.data.matched) {
//         setCurrentGame(response.data.game);
//         setQueueStatus({
//           inQueue: false,
//           position: 0,
//           queueLength: 0,
//           timeControl: null
//         });
//         return { 
//           success: true, 
//           matched: true, 
//           game: response.data.game 
//         };
//       } else {
//         setQueueStatus({
//           inQueue: true,
//           position: response.data.queuePosition,
//           queueLength: response.data.queueLength,
//           timeControl
//         });
//         return { 
//           success: true, 
//           matched: false, 
//           queuePosition: response.data.queuePosition,
//           queueLength: response.data.queueLength
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

//   const getQueueStatus = async (timeControl) => {
//     try {
//       const response = await api.get(`/quick-match/status/${timeControl}`);
//       setQueueStatus({
//         inQueue: response.data.inQueue,
//         position: response.data.position,
//         queueLength: response.data.queueLength,
//         timeControl
//       });
//       return {
//         success: true,
//         ...response.data
//       };
//     } catch (error) {
//       console.error('Get queue status error:', error);
//       return {
//         success: false,
//         message: error.response?.data?.message || 'Failed to get queue status'
//       };
//     }
//   };

//   const leaveQuickMatch = async (timeControl) => {
//     try {
//       setError(null);
      
//       await api.post('/quick-match/leave', { timeControl });
//       setQueueStatus({
//         inQueue: false,
//         position: 0,
//         queueLength: 0,
//         timeControl: null
//       });
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

//   // Lobby APIs
//   const createLobby = async (lobbyData) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await api.post('/lobby', lobbyData);
      
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

//   const getLobby = async (lobbyCode) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await api.get(`/lobby/${lobbyCode}`);
//       return { success: true, lobby: response.data.lobby };
//     } catch (error) {
//       console.error('Get lobby error:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to get lobby';
//       setError(errorMessage);
//       return { 
//         success: false, 
//         message: errorMessage 
//       };
//     } finally {
//       setLoading(false);
//     }
//   };

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

  

//   const toggleReady = async (lobbyCode) => {
//     try {
//       setError(null);
      
//       const response = await api.put(`/lobby/${lobbyCode}/ready`);
//       setLobby(response.data.lobby);
//       return { success: true, lobby: response.data.lobby };
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

//   const inviteToLobby = async (lobbyCode, userId) => {
//     try {
//       setError(null);
      
//       const response = await api.post(`/lobby/${lobbyCode}/invite`, { userId });
//       return { success: true, message: response.data.message };
//     } catch (error) {
//       console.error('Invite to lobby error:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to send invitation';
//       setError(errorMessage);
//       return { 
//         success: false, 
//         message: errorMessage 
//       };
//     }
//   };

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

//   // Game Play APIs
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

//   const makeMove = async (gameId, moveData) => {
//     try {
//       setError(null);
      
//       const response = await api.post(`/games/${gameId}/move`, moveData);
      
//       // Update current game if it's the active game
//       if (currentGame && currentGame.gameId === gameId) {
//         setCurrentGame(prev => ({
//           ...prev,
//           moves: [...(prev.moves || []), moveData],
//           currentFen: moveData.fen,
//           lastMoveAt: new Date()
//         }));
//       }
      
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

//   const resignGame = async (gameId) => {
//     try {
//       setError(null);
      
//       const response = await api.post(`/games/${gameId}/resign`);
      
//       if (currentGame && currentGame.gameId === gameId) {
//         setCurrentGame(prev => ({
//           ...prev,
//           status: 'completed',
//           result: response.data.result,
//           termination: 'resignation',
//           endedAt: new Date()
//         }));
//       }
      
//       loadGameHistory(); // Refresh history
//       return { success: true, result: response.data.result };
//     } catch (error) {
//       console.error('Resign game error:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to resign';
//       setError(errorMessage);
//       return { 
//         success: false, 
//         message: errorMessage 
//       };
//     }
//   };

//   const offerDraw = async (gameId) => {
//     try {
//       setError(null);
      
//       const response = await api.post(`/games/${gameId}/draw-offer`);
//       return { success: true, message: response.data.message };
//     } catch (error) {
//       console.error('Offer draw error:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to offer draw';
//       setError(errorMessage);
//       return { 
//         success: false, 
//         message: errorMessage 
//       };
//     }
//   };

//   const acceptDraw = async (gameId) => {
//     try {
//       setError(null);
      
//       const response = await api.post(`/games/${gameId}/draw-accept`);
      
//       if (currentGame && currentGame.gameId === gameId) {
//         setCurrentGame(prev => ({
//           ...prev,
//           status: 'completed',
//           result: 'draw',
//           termination: 'agreement',
//           endedAt: new Date()
//         }));
//       }
      
//       loadGameHistory();
//       return { success: true, result: response.data.result };
//     } catch (error) {
//       console.error('Accept draw error:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to accept draw';
//       setError(errorMessage);
//       return { 
//         success: false, 
//         message: errorMessage 
//       };
//     }
//   };

//   const declineDraw = async (gameId) => {
//     try {
//       setError(null);
      
//       const response = await api.post(`/games/${gameId}/draw-decline`);
//       return { success: true, message: response.data.message };
//     } catch (error) {
//       console.error('Decline draw error:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to decline draw';
//       setError(errorMessage);
//       return { 
//         success: false, 
//         message: errorMessage 
//       };
//     }
//   };

//   const endGame = async (gameId, result, termination) => {
//     try {
//       setError(null);
      
//       await api.post(`/games/${gameId}/end`, { result, termination });
      
//       if (currentGame && currentGame.gameId === gameId) {
//         setCurrentGame(null);
//       }
      
//       loadGameHistory();
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

//   // Invitation Management
//   // const acceptInvite = (invitationId) => {
//   //   setPendingInvitations(prev => prev.filter(inv => inv.id !== invitationId));
//   //   // The actual joining will happen through the accept handler in Sidebar
//   // };

//   const acceptInvite = async (lobbyCode) => {
//   try {
//     console.log(`Accepting invite for lobby: ${lobbyCode}`);
//     const response = await api.post(`/lobby/${lobbyCode}/accept-invite`);
//     console.log("Accept invite response:", response.data);
    
//     if (response.data && response.data.success) {
//       // Check if the response includes game data (auto-start case)
//       if (response.data.gameStarting) {
//         return {
//           success: true,
//           gameStarting: true,
//           gameId: response.data.gameId,
//           lobby: response.data.lobby
//         };
//       } else {
//         // Normal case - just joined lobby
//         return {
//           success: true,
//           gameStarting: false,
//           lobby: response.data.lobby
//         };
//       }
//     } else {
//       return {
//         success: false,
//         message: response.data?.message || "Failed to join lobby"
//       };
//     }
//   } catch (error) {
//     console.error("Accept invite error details:", {
//       message: error.message,
//       response: error.response?.data,
//       status: error.response?.status
//     });
    
//     return {
//       success: false,
//       message: error.response?.data?.message || "Failed to join lobby"
//     };
//   }
// };

//   const declineInvitation = (invitationId) => {
//     setPendingInvitations(prev => prev.filter(inv => inv.id !== invitationId));
//     if (socket) {
//       emit('decline-invitation', { invitationId });
//     }
//   };

//   const clearInvitations = () => {
//     setPendingInvitations([]);
//   };

//   // Utility Functions
//   const clearError = () => {
//     setError(null);
//   };

//   const resetGameState = () => {
//     setCurrentGame(null);
//     setLobby(null);
//     setError(null);
//     setQueueStatus({
//       inQueue: false,
//       position: 0,
//       queueLength: 0,
//       timeControl: null
//     });
//   };
// const getLobbyInvites = async () => {
//   try {
//     console.log("Fetching lobby invites...");
//     const response = await api.get("/lobby/invites");
//     console.log("Lobby invites response:", response.data);
    
//     // Check if response.data exists and has the invites array
//     if (response.data) {
//       return {
//         success: true,
//         invites: response.data.invites || []
//       };
//     } else {
//       return {
//         success: false,
//         message: "Invalid response format",
//         invites: []
//       };
//     }
//   } catch (error) {
//     console.error("Get lobby invites error details:", {
//       message: error.message,
//       response: error.response?.data,
//       status: error.response?.status
//     });
    
//     // Return empty array on error
//     return {
//       success: false,
//       message: error.response?.data?.message || "Failed to load invites",
//       invites: []
//     };
//   }
// };
 
// // const acceptInvite = async (lobbyCode) => {

// //   try {
// //     console.log(`Accepting invite for lobby: ${lobbyCode}`);
// //     const response = await api.post(`/lobby/${lobbyCode}/accept-invite`);
// //     console.log("Accept invite response:", response.data);
    
// //     // Check if the response includes game data (auto-start case)
// //     if (response.data && response.data.success) {
// //       // If game is starting automatically, the response will have gameStarting flag and gameId
// //       if (response.data.gameStarting) {
// //         return {
// //           success: true,
// //           gameStarting: true,
// //           gameId: response.data.gameId,
// //           lobby: response.data.lobby
// //         };
// //       } else {
// //         // Normal case - just joined lobby
// //         return {
// //           success: true,
// //           gameStarting: false,
// //           lobby: response.data.lobby
// //         };
// //       }
// //     } else {
// //       return {
// //         success: false,
// //         message: response.data?.message || "Failed to join lobby"
// //       };
// //     }
// //   } catch (error) {
// //     console.error("Accept invite error details:", {
// //       message: error.message,
// //       response: error.response?.data,
// //       status: error.response?.status
// //     });
    
// //     return {
// //       success: false,
// //       message: error.response?.data?.message || "Failed to join lobby"
// //     };
// //   }
// // };


//   const value = {
//     // State
//     currentGame,
//     gameHistory,
//     lobby,
//     loading,
//     error,
//     computerDifficulties,
//     activeGames,
//     pendingInvitations,
//     queueStatus,
    
//     // Computer Game
//     startComputerGame,
//     getComputerMove,
    
//     // Quick Match
//     joinQuickMatch,
//     getQueueStatus,
//     leaveQuickMatch,
    
//     // Lobby
//     createLobby,
//     getLobby,
//     joinLobby,
//     toggleReady,
//     inviteToLobby, 
//     acceptInvite,
//     getLobbyInvites,
//     startGameFromLobby,
//     leaveLobby,
    
//     // Game Play
//     getGameById,
//     makeMove,
//     resignGame,
//     offerDraw,
//     acceptDraw,
//     declineDraw,
//     endGame,
    
//     // Invitation Management
//     // acceptInvitation,
//     declineInvitation,
//     clearInvitations,
    
//     // Utility
//     setCurrentGame,
//     setLobby,
//     clearError,
//     resetGameState,
//     loadGameHistory,
//     loadActiveGames
//   };

//   return (
//     <GameContext.Provider value={value}>
//       {children}
//     </GameContext.Provider>
//   );
// };



//testing
// context/GameContext.js
// import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
// import api from '../services/api';
// import { useAuth } from './AuthContext';
// import { useSocket } from './SocketContext';

// const GameContext = createContext(null);

// export const useGame = () => {
//   const context = useContext(GameContext);
//   if (!context) {
//     throw new Error('useGame must be used within a GameProvider');
//   }
//   return context;
// };

// export const GameProvider = ({ children }) => {
//   const { user, token } = useAuth();
//   const { socket, emit, on, off } = useSocket();
  
//   const [currentGame, setCurrentGame] = useState(null);
//   const [gameHistory, setGameHistory] = useState([]);
//   const [lobby, setLobby] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [computerDifficulties, setComputerDifficulties] = useState([]);
//   const [activeGames, setActiveGames] = useState([]);
//   const [invites, setInvites] = useState([]);
//   const [pendingInvitations, setPendingInvitations] = useState([]);
//   const [queueStatus, setQueueStatus] = useState({
//     inQueue: false,
//     position: 0,
//     queueLength: 0,
//     timeControl: null
//   });

//   // Load computer difficulties on mount
//   useEffect(() => {
//     loadComputerDifficulties();
//   }, []);

//   // Load game history when user changes
//   useEffect(() => {
//     if (user) {
//       loadGameHistory();
//       loadActiveGames();
//     } else {
//       setGameHistory([]);
//       setActiveGames([]);
//       setCurrentGame(null);
//       setLobby(null);
//     }
//   }, [user]);

//   // Socket event listeners
//   useEffect(() => {
//     if (!socket) return;

//     // Game events
//     on('game-started', handleGameStarted);
//     on('move-made', handleOpponentMove);
//     on('game-completed', handleGameCompleted);
    
//     // Lobby events
//     on('player-joined', handlePlayerJoined);
//     on('player-left', handlePlayerLeft);
//     on('player-ready', handlePlayerReady);
//     on('lobby-invitation', handleLobbyInvitation);
//     on('lobby-updated', handleLobbyUpdated);
//     on('player-joined-lobby', handlePlayerJoinedLobby);
    
//     // Quick match events
//     on('match-found', handleMatchFound);
//     on('queue-update', handleQueueUpdate);
    
//     // Error events
//     on('game-error', handleGameError);

//     return () => {
//       off('game-started');
//       off('move-made');
//       off('game-completed');
//       off('player-joined');
//       off('player-left');
//       off('player-ready');
//       off('lobby-invitation');
//       off('lobby-updated');
//       off('player-joined-lobby');
//       off('match-found');
//       off('queue-update');
//       off('game-error');
//     };
//   }, [socket, on, off]);

//   // Socket event handlers
//   const handleGameStarted = (data) => {
//     console.log('🎮 Game started event received:', data);
//     setCurrentGame(data.game);
//     setLobby(null);
//   };

//   const handleOpponentMove = (data) => {
//     console.log('Opponent move:', data);
//     if (currentGame && currentGame.gameId === data.gameId) {
//       setCurrentGame(prev => ({
//         ...prev,
//         moves: [...(prev.moves || []), data.move],
//         currentFen: data.fen,
//         lastMoveAt: new Date()
//       }));
//     }
//   };

//   const handleGameCompleted = (data) => {
//     console.log('Game completed:', data);
//     if (currentGame && currentGame.gameId === data.gameId) {
//       setCurrentGame(prev => ({
//         ...prev,
//         status: 'completed',
//         result: data.result,
//         termination: data.termination,
//         endedAt: new Date()
//       }));
//     }
//     loadGameHistory();
//   };

//   const handlePlayerJoined = (data) => {
//     console.log('Player joined:', data);
//     if (lobby && lobby.lobbyCode === data.lobbyCode) {
//       setLobby(prev => ({
//         ...prev,
//         players: [...prev.players, data.player]
//       }));
//     }
//   };

//   const handlePlayerJoinedLobby = (data) => {
//     console.log('Player joined lobby:', data);
//     if (lobby && lobby.lobbyCode === data.lobbyCode) {
//       setLobby(data.lobby);
//     }
//   };

//   const handleLobbyUpdated = (data) => {
//     console.log('Lobby updated:', data);
//     if (lobby && lobby.lobbyCode === data.lobby?.lobbyCode) {
//       setLobby(data.lobby);
//     }
//   };

//   const handlePlayerLeft = (data) => {
//     console.log('Player left:', data);
//     if (lobby && lobby.lobbyCode === data.lobbyCode) {
//       setLobby(prev => ({
//         ...prev,
//         players: prev.players.filter(p => p.userId !== data.playerId)
//       }));
//     }
//   };

//   const handlePlayerReady = (data) => {
//     console.log('Player ready:', data);
//     if (lobby && lobby.lobbyCode === data.lobbyCode) {
//       setLobby(prev => ({
//         ...prev,
//         players: prev.players.map(p => 
//           p.userId === data.playerId ? { ...p, ready: data.ready } : p
//         ),
//         status: data.allReady ? 'ready' : 'waiting'
//       }));
//     }
//   };

//   const handleLobbyInvitation = (data) => {
//     console.log('Lobby invitation:', data);
//     setPendingInvitations(prev => [...prev, data]);
//   };

//   const handleMatchFound = (data) => {
//     console.log('Match found:', data);
//     setQueueStatus({
//       inQueue: false,
//       position: 0,
//       queueLength: 0,
//       timeControl: null
//     });
//     setCurrentGame(data.game);
//   };

//   const handleQueueUpdate = (data) => {
//     console.log('Queue update:', data);
//     setQueueStatus({
//       inQueue: data.inQueue,
//       position: data.position,
//       queueLength: data.queueLength,
//       timeControl: data.timeControl
//     });
//   };

//   const handleGameError = (data) => {
//     console.error('Game error:', data);
//     setError(data.message);
//   };

//   // API Calls
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

//   const loadGameHistory = async () => {
//     try {
//       const response = await api.get('/games/user/history');
//       setGameHistory(response.data.games);
//     } catch (error) {
//       console.error('Load game history error:', error);
//     }
//   };

//   const loadActiveGames = async () => {
//     try {
//       const response = await api.get('/games/user/active');
//       setActiveGames(response.data.games);
//     } catch (error) {
//       console.error('Load active games error:', error);
//     }
//   };

//   // Computer Game APIs
//   const startComputerGame = async (timeControl, difficulty = 'medium') => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await api.post('/computer/start', {
//         timeControl,
//         difficulty
//       });

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

//   // Quick Match APIs
//   const joinQuickMatch = async (timeControl) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await api.post('/quick-match/join', { timeControl });
      
//       if (response.data.matched) {
//         setCurrentGame(response.data.game);
//         setQueueStatus({
//           inQueue: false,
//           position: 0,
//           queueLength: 0,
//           timeControl: null
//         });
//         return { 
//           success: true, 
//           matched: true, 
//           game: response.data.game 
//         };
//       } else {
//         setQueueStatus({
//           inQueue: true,
//           position: response.data.queuePosition,
//           queueLength: response.data.queueLength,
//           timeControl
//         });
//         return { 
//           success: true, 
//           matched: false, 
//           queuePosition: response.data.queuePosition,
//           queueLength: response.data.queueLength
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

//   const getQueueStatus = async (timeControl) => {
//     try {
//       const response = await api.get(`/quick-match/status/${timeControl}`);
//       setQueueStatus({
//         inQueue: response.data.inQueue,
//         position: response.data.position,
//         queueLength: response.data.queueLength,
//         timeControl
//       });
//       return {
//         success: true,
//         ...response.data
//       };
//     } catch (error) {
//       console.error('Get queue status error:', error);
//       return {
//         success: false,
//         message: error.response?.data?.message || 'Failed to get queue status'
//       };
//     }
//   };

//   const leaveQuickMatch = async (timeControl) => {
//     try {
//       setError(null);
      
//       await api.post('/quick-match/leave', { timeControl });
//       setQueueStatus({
//         inQueue: false,
//         position: 0,
//         queueLength: 0,
//         timeControl: null
//       });
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

//   // Lobby APIs
//   const createLobby = async (lobbyData) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await api.post('/lobby', lobbyData);
      
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

//   const getLobby = async (lobbyCode) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await api.get(`/lobby/${lobbyCode}`);
//       return { success: true, lobby: response.data.lobby };
//     } catch (error) {
//       console.error('Get lobby error:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to get lobby';
//       setError(errorMessage);
//       return { 
//         success: false, 
//         message: errorMessage 
//       };
//     } finally {
//       setLoading(false);
//     }
//   };

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

//   const toggleReady = async (lobbyCode) => {
//     try {
//       setError(null);
      
//       const response = await api.put(`/lobby/${lobbyCode}/ready`);
//       setLobby(response.data.lobby);
//       return { success: true, lobby: response.data.lobby };
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

//   const inviteToLobby = async (lobbyCode, userId) => {
//     try {
//       setError(null);
      
//       const response = await api.post(`/lobby/${lobbyCode}/invite`, { userId });
//       return { success: true, message: response.data.message };
//     } catch (error) {
//       console.error('Invite to lobby error:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to send invitation';
//       setError(errorMessage);
//       return { 
//         success: false, 
//         message: errorMessage 
//       };
//     }
//   };

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

//   // Game Play APIs
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

//   const makeMove = async (gameId, moveData) => {
//     try {
//       setError(null);
      
//       const response = await api.post(`/games/${gameId}/move`, moveData);
      
//       if (currentGame && currentGame.gameId === gameId) {
//         setCurrentGame(prev => ({
//           ...prev,
//           moves: [...(prev.moves || []), moveData],
//           currentFen: moveData.fen,
//           lastMoveAt: new Date()
//         }));
//       }
      
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

//   const resignGame = async (gameId) => {
//     try {
//       setError(null);
      
//       const response = await api.post(`/games/${gameId}/resign`);
      
//       if (currentGame && currentGame.gameId === gameId) {
//         setCurrentGame(prev => ({
//           ...prev,
//           status: 'completed',
//           result: response.data.result,
//           termination: 'resignation',
//           endedAt: new Date()
//         }));
//       }
      
//       loadGameHistory();
//       return { success: true, result: response.data.result };
//     } catch (error) {
//       console.error('Resign game error:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to resign';
//       setError(errorMessage);
//       return { 
//         success: false, 
//         message: errorMessage 
//       };
//     }
//   };

//   const offerDraw = async (gameId) => {
//     try {
//       setError(null);
      
//       const response = await api.post(`/games/${gameId}/draw-offer`);
//       return { success: true, message: response.data.message };
//     } catch (error) {
//       console.error('Offer draw error:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to offer draw';
//       setError(errorMessage);
//       return { 
//         success: false, 
//         message: errorMessage 
//       };
//     }
//   };

//   const acceptDraw = async (gameId) => {
//     try {
//       setError(null);
      
//       const response = await api.post(`/games/${gameId}/draw-accept`);
      
//       if (currentGame && currentGame.gameId === gameId) {
//         setCurrentGame(prev => ({
//           ...prev,
//           status: 'completed',
//           result: 'draw',
//           termination: 'agreement',
//           endedAt: new Date()
//         }));
//       }
      
//       loadGameHistory();
//       return { success: true, result: response.data.result };
//     } catch (error) {
//       console.error('Accept draw error:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to accept draw';
//       setError(errorMessage);
//       return { 
//         success: false, 
//         message: errorMessage 
//       };
//     }
//   };

//   const declineDraw = async (gameId) => {
//     try {
//       setError(null);
      
//       const response = await api.post(`/games/${gameId}/draw-decline`);
//       return { success: true, message: response.data.message };
//     } catch (error) {
//       console.error('Decline draw error:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to decline draw';
//       setError(errorMessage);
//       return { 
//         success: false, 
//         message: errorMessage 
//       };
//     }
//   };

//   const endGame = async (gameId, result, termination) => {
//     try {
//       setError(null);
      
//       await api.post(`/games/${gameId}/end`, { result, termination });
      
//       if (currentGame && currentGame.gameId === gameId) {
//         setCurrentGame(null);
//       }
      
//       loadGameHistory();
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

//   // Invitation Management
//   // const acceptInvite = async (lobbyCode) => {
//   //   try {
//   //     setLoading(true);
//   //     setError(null);
      
//   //     console.log(`Accepting invite for lobby: ${lobbyCode}`);
//   //     const response = await api.post(`/lobby/${lobbyCode}/accept-invite`);
//   //     console.log("Accept invite response:", response.data);
      
//   //     if (response.data && response.data.success) {
//   //       if (response.data.gameStarting) {
//   //         return {
//   //           success: true,
//   //           gameStarting: true,
//   //           gameId: response.data.gameId,
//   //           lobby: response.data.lobby
//   //         };
//   //       } else {
//   //         setLobby(response.data.lobby);
//   //         return {
//   //           success: true,
//   //           gameStarting: false,
//   //           lobby: response.data.lobby
//   //         };
//   //       }
//   //     } else {
//   //       return {
//   //         success: false,
//   //         message: response.data?.message || "Failed to join lobby"
//   //       };
//   //     }
//   //   } catch (error) {
//   //     console.error("Accept invite error details:", {
//   //       message: error.message,
//   //       response: error.response?.data,
//   //       status: error.response?.status
//   //     });
      
//   //     return {
//   //       success: false,
//   //       message: error.response?.data?.message || "Failed to join lobby"
//   //     };
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // In GameContext.js - Update the acceptInvite function
// // In GameContext.js - Update the acceptInvite function
// // In GameContext.js - Update the acceptInvite function
// // const acceptInvite = async (lobbyCode) => {
// //   try {
// //     setLoading(true);
// //     setError(null);
    
// //     console.log(`Accepting invite for lobby: ${lobbyCode}`);
// //     const response = await api.post(`/lobby/${lobbyCode}/accept-invite`);
// //     console.log("Accept invite response:", response.data);
    
// //     if (response.data && response.data.success) {
// //       // Always set the lobby data regardless
// //       setLobby(response.data.lobby);
      
// //       // Return with gameStarting: false always for lobby flow
// //       return {
// //         success: true,
// //         gameStarting: false, // Always false - player should go to lobby first
// //         lobby: response.data.lobby
// //       };
// //     } else {
// //       return {
// //         success: false,
// //         message: response.data?.message || "Failed to join lobby"
// //       };
// //     }
// //   } catch (error) {
// //     console.error("Accept invite error details:", {
// //       message: error.message,
// //       response: error.response?.data,
// //       status: error.response?.status
// //     });
    
// //     return {
// //       success: false,
// //       message: error.response?.data?.message || "Failed to join lobby"
// //     };
// //   } finally {
// //     setLoading(false);
// //   }
// // };


// // context/GameContext.jsx - Update the acceptInvite function
// // (Only showing the relevant part, keep everything else the same)

// const acceptInvite = useCallback(async (lobbyCode) => {
//   setLoading(true);
//   try {
//     console.log(`Accepting invite for lobby: ${lobbyCode}`);
//     const response = await api.post(`/lobby/${lobbyCode}/accept-invite`);
//     console.log('Accept invite response:', response.data);
    
//     if (response.data.success) {
//       // Set the lobby in context state
//       setLobby(response.data.lobby);
      
//       // Also update gameState if needed
//       if (setGameState) {
//         setGameState(prev => ({
//           ...prev,
//           status: 'lobby',
//           lobbyData: response.data.lobby,
//           players: response.data.lobby.players,
//           showLobbyModal: true
//         }));
//       }
      
//       // Join the lobby room via socket
//       if (socket && socket.connected) {
//         socket.emit('join-lobby', { lobbyCode });
//       }
//     }
    
//     return response.data;
//   } catch (error) {
//     console.error('Error accepting invite:', error);
//     return { 
//       success: false, 
//       message: error.response?.data?.message || 'Failed to accept invitation' 
//     };
//   } finally {
//     setLoading(false);
//   }
// }, [setGameState, socket]);



//   const declineInvitation = (invitationId) => {
//     setPendingInvitations(prev => prev.filter(inv => inv.id !== invitationId));
//     if (socket) {
//       emit('decline-invitation', { invitationId });
//     }
//   };

//   const clearInvitations = () => {
//     setPendingInvitations([]);
//   };

//   const getLobbyInvites = async () => {
//     try {
//       console.log("Fetching lobby invites...");
//       const response = await api.get("/lobby/invites");
//       console.log("Lobby invites response:", response.data);
      
//       if (response.data) {
//         return {
//           success: true,
//           invites: response.data.invites || []
//         };
//       } else {
//         return {
//           success: false,
//           message: "Invalid response format",
//           invites: []
//         };
//       }
//     } catch (error) {
//       console.error("Get lobby invites error details:", {
//         message: error.message,
//         response: error.response?.data,
//         status: error.response?.status
//       });
      
//       return {
//         success: false,
//         message: error.response?.data?.message || "Failed to load invites",
//         invites: []
//       };
//     }
//   };

//   // Utility Functions
//   const clearError = () => {
//     setError(null);
//   };

//   const resetGameState = () => {
//     setCurrentGame(null);
//     setLobby(null);
//     setError(null);
//     setQueueStatus({
//       inQueue: false,
//       position: 0,
//       queueLength: 0,
//       timeControl: null
//     });
//   };

//   const value = {
//     // State
//     currentGame,
//     gameHistory,
//     lobby,
//     loading,
//     error,
//     computerDifficulties,
//     activeGames,
//     pendingInvitations,
//     queueStatus,
    
//     // Computer Game
//     startComputerGame,
//     getComputerMove,
    
//     // Quick Match
//     joinQuickMatch,
//     getQueueStatus,
//     leaveQuickMatch,
    
//     // Lobby
//     createLobby,
//     getLobby,
//     joinLobby,
//     toggleReady,
//     inviteToLobby, 
//     acceptInvite,
//     getLobbyInvites,
//     startGameFromLobby,
//     leaveLobby,
    
//     // Game Play
//     getGameById,
//     makeMove,
//     resignGame,
//     offerDraw,
//     acceptDraw,
//     declineDraw,
//     endGame,
    
//     // Invitation Management
//     declineInvitation,
//     clearInvitations,
    
//     // Utility
//     setCurrentGame,
//     setLobby,
//     clearError,
//     resetGameState,
//     loadGameHistory,
//     loadActiveGames
//   };

//   return (
//     <GameContext.Provider value={value}>
//       {children}
//     </GameContext.Provider>
//   );
// };






// //testing 2
// // context/GameContext.jsx
// import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
// import api from '../services/api';
// import { useAuth } from './AuthContext';
// import { useSocket } from './SocketContext';

// const GameContext = createContext(null);

// export const useGame = () => {
//   const context = useContext(GameContext);
//   if (!context) {
//     throw new Error('useGame must be used within a GameProvider');
//   }
//   return context;
// };

// export const GameProvider = ({ children }) => {
//   const { user, token } = useAuth();
//   const { socket, emit, on, off } = useSocket();
  
//   const [currentGame, setCurrentGame] = useState(null);
//   const [gameHistory, setGameHistory] = useState([]);
//   const [lobby, setLobby] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [computerDifficulties, setComputerDifficulties] = useState([]);
//   const [activeGames, setActiveGames] = useState([]);
//   const [invites, setInvites] = useState([]);
//   const [pendingInvitations, setPendingInvitations] = useState([]);
//   const [queueStatus, setQueueStatus] = useState({
//     inQueue: false,
//     position: 0,
//     queueLength: 0,
//     timeControl: null
//   });

//   // Load computer difficulties on mount
//   useEffect(() => {
//     loadComputerDifficulties();
//   }, []);

//   // Load game history when user changes
//   useEffect(() => {
//     if (user) {
//       loadGameHistory();
//       loadActiveGames();
//     } else {
//       setGameHistory([]);
//       setActiveGames([]);
//       setCurrentGame(null);
//       setLobby(null);
//     }
//   }, [user]);

//   // Socket event listeners
//   useEffect(() => {
//     if (!socket) return;

//     // Game events
//     on('game-started', handleGameStarted);
//     on('move-made', handleOpponentMove);
//     on('game-completed', handleGameCompleted);
    
//     // Lobby events
//     on('player-joined', handlePlayerJoined);
//     on('player-left', handlePlayerLeft);
//     on('player-ready', handlePlayerReady);
//     on('lobby-invitation', handleLobbyInvitation);
//     on('lobby-updated', handleLobbyUpdated);
//     on('player-joined-lobby', handlePlayerJoinedLobby);
    
//     // Quick match events
//     on('match-found', handleMatchFound);
//     on('queue-update', handleQueueUpdate);
    
//     // Error events
//     on('game-error', handleGameError);

//     return () => {
//       off('game-started');
//       off('move-made');
//       off('game-completed');
//       off('player-joined');
//       off('player-left');
//       off('player-ready');
//       off('lobby-invitation');
//       off('lobby-updated');
//       off('player-joined-lobby');
//       off('match-found');
//       off('queue-update');
//       off('game-error');
//     };
//   }, [socket, on, off]);

//   // Socket event handlers
//   const handleGameStarted = (data) => {
//     console.log('🎮 Game started event received:', data);
//     setCurrentGame(data.game);
//     setLobby(null);
//   };

//   const handleOpponentMove = (data) => {
//     console.log('Opponent move:', data);
//     if (currentGame && currentGame.gameId === data.gameId) {
//       setCurrentGame(prev => ({
//         ...prev,
//         moves: [...(prev.moves || []), data.move],
//         currentFen: data.fen,
//         lastMoveAt: new Date()
//       }));
//     }
//   };

//   const handleGameCompleted = (data) => {
//     console.log('Game completed:', data);
//     if (currentGame && currentGame.gameId === data.gameId) {
//       setCurrentGame(prev => ({
//         ...prev,
//         status: 'completed',
//         result: data.result,
//         termination: data.termination,
//         endedAt: new Date()
//       }));
//     }
//     loadGameHistory();
//   };

//   const handlePlayerJoined = (data) => {
//     console.log('Player joined:', data);
//     if (lobby && lobby.lobbyCode === data.lobbyCode) {
//       setLobby(prev => ({
//         ...prev,
//         players: [...prev.players, data.player]
//       }));
//     }
//   };

//   const handlePlayerJoinedLobby = (data) => {
//     console.log('Player joined lobby:', data);
//     if (lobby && lobby.lobbyCode === data.lobbyCode) {
//       setLobby(data.lobby);
//     }
//   };

//   const handleLobbyUpdated = (data) => {
//     console.log('Lobby updated:', data);
//     if (lobby && lobby.lobbyCode === data.lobby?.lobbyCode) {
//       setLobby(data.lobby);
//     }
//   };

//   const handlePlayerLeft = (data) => {
//     console.log('Player left:', data);
//     if (lobby && lobby.lobbyCode === data.lobbyCode) {
//       setLobby(prev => ({
//         ...prev,
//         players: prev.players.filter(p => p.userId !== data.playerId)
//       }));
//     }
//   };

//   const handlePlayerReady = (data) => {
//     console.log('Player ready:', data);
//     if (lobby && lobby.lobbyCode === data.lobbyCode) {
//       setLobby(prev => ({
//         ...prev,
//         players: prev.players.map(p => 
//           p.userId === data.playerId ? { ...p, ready: data.ready } : p
//         ),
//         status: data.allReady ? 'ready' : 'waiting'
//       }));
//     }
//   };

//   const handleLobbyInvitation = (data) => {
//     console.log('Lobby invitation:', data);
//     setPendingInvitations(prev => [...prev, data]);
//   };

//   const handleMatchFound = (data) => {
//     console.log('Match found:', data);
//     setQueueStatus({
//       inQueue: false,
//       position: 0,
//       queueLength: 0,
//       timeControl: null
//     });
//     setCurrentGame(data.game);
//   };

//   const handleQueueUpdate = (data) => {
//     console.log('Queue update:', data);
//     setQueueStatus({
//       inQueue: data.inQueue,
//       position: data.position,
//       queueLength: data.queueLength,
//       timeControl: data.timeControl
//     });
//   };

//   const handleGameError = (data) => {
//     console.error('Game error:', data);
//     setError(data.message);
//   };

//   // API Calls
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

//   const loadGameHistory = async () => {
//     try {
//       const response = await api.get('/games/user/history');
//       setGameHistory(response.data.games);
//     } catch (error) {
//       console.error('Load game history error:', error);
//     }
//   };

//   const loadActiveGames = async () => {
//     try {
//       const response = await api.get('/games/user/active');
//       setActiveGames(response.data.games);
//     } catch (error) {
//       console.error('Load active games error:', error);
//     }
//   };

//   // Computer Game APIs
//   const startComputerGame = async (timeControl, difficulty = 'medium') => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await api.post('/computer/start', {
//         timeControl,
//         difficulty
//       });

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

//   // Quick Match APIs
//   const joinQuickMatch = async (timeControl) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await api.post('/quick-match/join', { timeControl });
      
//       if (response.data.matched) {
//         setCurrentGame(response.data.game);
//         setQueueStatus({
//           inQueue: false,
//           position: 0,
//           queueLength: 0,
//           timeControl: null
//         });
//         return { 
//           success: true, 
//           matched: true, 
//           game: response.data.game 
//         };
//       } else {
//         setQueueStatus({
//           inQueue: true,
//           position: response.data.queuePosition,
//           queueLength: response.data.queueLength,
//           timeControl
//         });
//         return { 
//           success: true, 
//           matched: false, 
//           queuePosition: response.data.queuePosition,
//           queueLength: response.data.queueLength
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

//   const getQueueStatus = async (timeControl) => {
//     try {
//       const response = await api.get(`/quick-match/status/${timeControl}`);
//       setQueueStatus({
//         inQueue: response.data.inQueue,
//         position: response.data.position,
//         queueLength: response.data.queueLength,
//         timeControl
//       });
//       return {
//         success: true,
//         ...response.data
//       };
//     } catch (error) {
//       console.error('Get queue status error:', error);
//       return {
//         success: false,
//         message: error.response?.data?.message || 'Failed to get queue status'
//       };
//     }
//   };

//   const leaveQuickMatch = async (timeControl) => {
//     try {
//       setError(null);
      
//       await api.post('/quick-match/leave', { timeControl });
//       setQueueStatus({
//         inQueue: false,
//         position: 0,
//         queueLength: 0,
//         timeControl: null
//       });
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

//   // Lobby APIs
//   const createLobby = async (lobbyData) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await api.post('/lobby', lobbyData);
      
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

//   const getLobby = async (lobbyCode) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await api.get(`/lobby/${lobbyCode}`);
//       return { success: true, lobby: response.data.lobby };
//     } catch (error) {
//       console.error('Get lobby error:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to get lobby';
//       setError(errorMessage);
//       return { 
//         success: false, 
//         message: errorMessage 
//       };
//     } finally {
//       setLoading(false);
//     }
//   };

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

//   const toggleReady = async (lobbyCode) => {
//     try {
//       setError(null);
      
//       const response = await api.put(`/lobby/${lobbyCode}/ready`);
//       setLobby(response.data.lobby);
//       return { success: true, lobby: response.data.lobby };
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

//   const inviteToLobby = async (lobbyCode, userId) => {
//     try {
//       setError(null);
      
//       const response = await api.post(`/lobby/${lobbyCode}/invite`, { userId });
//       return { success: true, message: response.data.message };
//     } catch (error) {
//       console.error('Invite to lobby error:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to send invitation';
//       setError(errorMessage);
//       return { 
//         success: false, 
//         message: errorMessage 
//       };
//     }
//   };

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

//   // Game Play APIs
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

//   const makeMove = async (gameId, moveData) => {
//     try {
//       setError(null);
      
//       const response = await api.post(`/games/${gameId}/move`, moveData);
      
//       if (currentGame && currentGame.gameId === gameId) {
//         setCurrentGame(prev => ({
//           ...prev,
//           moves: [...(prev.moves || []), moveData],
//           currentFen: moveData.fen,
//           lastMoveAt: new Date()
//         }));
//       }
      
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

//   const resignGame = async (gameId) => {
//     try {
//       setError(null);
      
//       const response = await api.post(`/games/${gameId}/resign`);
      
//       if (currentGame && currentGame.gameId === gameId) {
//         setCurrentGame(prev => ({
//           ...prev,
//           status: 'completed',
//           result: response.data.result,
//           termination: 'resignation',
//           endedAt: new Date()
//         }));
//       }
      
//       loadGameHistory();
//       return { success: true, result: response.data.result };
//     } catch (error) {
//       console.error('Resign game error:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to resign';
//       setError(errorMessage);
//       return { 
//         success: false, 
//         message: errorMessage 
//       };
//     }
//   };

//   const offerDraw = async (gameId) => {
//     try {
//       setError(null);
      
//       const response = await api.post(`/games/${gameId}/draw-offer`);
//       return { success: true, message: response.data.message };
//     } catch (error) {
//       console.error('Offer draw error:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to offer draw';
//       setError(errorMessage);
//       return { 
//         success: false, 
//         message: errorMessage 
//       };
//     }
//   };

//   const acceptDraw = async (gameId) => {
//     try {
//       setError(null);
      
//       const response = await api.post(`/games/${gameId}/draw-accept`);
      
//       if (currentGame && currentGame.gameId === gameId) {
//         setCurrentGame(prev => ({
//           ...prev,
//           status: 'completed',
//           result: 'draw',
//           termination: 'agreement',
//           endedAt: new Date()
//         }));
//       }
      
//       loadGameHistory();
//       return { success: true, result: response.data.result };
//     } catch (error) {
//       console.error('Accept draw error:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to accept draw';
//       setError(errorMessage);
//       return { 
//         success: false, 
//         message: errorMessage 
//       };
//     }
//   };

//   const declineDraw = async (gameId) => {
//     try {
//       setError(null);
      
//       const response = await api.post(`/games/${gameId}/draw-decline`);
//       return { success: true, message: response.data.message };
//     } catch (error) {
//       console.error('Decline draw error:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to decline draw';
//       setError(errorMessage);
//       return { 
//         success: false, 
//         message: errorMessage 
//       };
//     }
//   };

//   const endGame = async (gameId, result, termination) => {
//     try {
//       setError(null);
      
//       await api.post(`/games/${gameId}/end`, { result, termination });
      
//       if (currentGame && currentGame.gameId === gameId) {
//         setCurrentGame(null);
//       }
      
//       loadGameHistory();
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

//   // Invitation Management - FIXED VERSION (removed setGameState reference)
//   const acceptInvite = useCallback(async (lobbyCode) => {
//     setLoading(true);
//     try {
//       console.log(`Accepting invite for lobby: ${lobbyCode}`);
//       const response = await api.post(`/lobby/${lobbyCode}/accept-invite`);
//       console.log('Accept invite response:', response.data);
      
//       if (response.data.success) {
//         // Set the lobby in context state only
//         setLobby(response.data.lobby);
        
//         // Join the lobby room via socket
//         if (socket && socket.connected) {
//           socket.emit('join-lobby', { lobbyCode });
//         }
        
//         return response.data;
//       } else {
//         return {
//           success: false,
//           message: response.data?.message || 'Failed to accept invitation'
//         };
//       }
//     } catch (error) {
//       console.error('Error accepting invite:', error);
//       return { 
//         success: false, 
//         message: error.response?.data?.message || 'Failed to accept invitation' 
//       };
//     } finally {
//       setLoading(false);
//     }
//   }, [socket]);

//   const declineInvitation = (invitationId) => {
//     setPendingInvitations(prev => prev.filter(inv => inv.id !== invitationId));
//     if (socket) {
//       emit('decline-invitation', { invitationId });
//     }
//   };

//   const clearInvitations = () => {
//     setPendingInvitations([]);
//   };

//   const getLobbyInvites = async () => {
//     try {
//       console.log("Fetching lobby invites...");
//       const response = await api.get("/lobby/invites");
//       console.log("Lobby invites response:", response.data);
      
//       if (response.data) {
//         return {
//           success: true,
//           invites: response.data.invites || []
//         };
//       } else {
//         return {
//           success: false,
//           message: "Invalid response format",
//           invites: []
//         };
//       }
//     } catch (error) {
//       console.error("Get lobby invites error details:", {
//         message: error.message,
//         response: error.response?.data,
//         status: error.response?.status
//       });
      
//       return {
//         success: false,
//         message: error.response?.data?.message || "Failed to load invites",
//         invites: []
//       };
//     }
//   };

//   // Utility Functions
//   const clearError = () => {
//     setError(null);
//   };

//   const resetGameState = () => {
//     setCurrentGame(null);
//     setLobby(null);
//     setError(null);
//     setQueueStatus({
//       inQueue: false,
//       position: 0,
//       queueLength: 0,
//       timeControl: null
//     });
//   };

//   const value = {
//     // State
//     currentGame,
//     gameHistory,
//     lobby,
//     loading,
//     error,
//     computerDifficulties,
//     activeGames,
//     pendingInvitations,
//     queueStatus,
    
//     // Computer Game
//     startComputerGame,
//     getComputerMove,
    
//     // Quick Match
//     joinQuickMatch,
//     getQueueStatus,
//     leaveQuickMatch,
    
//     // Lobby
//     createLobby,
//     getLobby,
//     joinLobby,
//     toggleReady,
//     inviteToLobby, 
//     acceptInvite,
//     getLobbyInvites,
//     startGameFromLobby,
//     leaveLobby,
    
//     // Game Play
//     getGameById,
//     makeMove,
//     resignGame,
//     offerDraw,
//     acceptDraw,
//     declineDraw,
//     endGame,
    
//     // Invitation Management
//     declineInvitation,
//     clearInvitations,
    
//     // Utility
//     setCurrentGame,
//     setLobby,
//     clearError,
//     resetGameState,
//     loadGameHistory,
//     loadActiveGames
//   };

//   return (
//     <GameContext.Provider value={value}>
//       {children}
//     </GameContext.Provider>
//   );
// };



// testing 3

// context/GameContext.jsx - FIXED acceptInvite function
import React, { createContext, useState, useContext, useEffect, useCallback, useRef } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';
import { useSocket } from './SocketContext';

const GameContext = createContext(null);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider = ({ children }) => {
  const { user, token } = useAuth();
  const { socket, connected, emit, on, off, reconnect } = useSocket();
  
  const [currentGame, setCurrentGame] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);
  const [lobby, setLobby] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [computerDifficulties, setComputerDifficulties] = useState([]);
  const [activeGames, setActiveGames] = useState([]);
  const [pendingInvitations, setPendingInvitations] = useState([]);
  const [queueStatus, setQueueStatus] = useState({
    inQueue: false,
    position: 0,
    queueLength: 0,
    timeControl: null
  });

  const retryIntervalRef = useRef(null);

  // Load computer difficulties on mount
  useEffect(() => {
    loadComputerDifficulties();
  }, []);

  // Load game history when user changes
  useEffect(() => {
    if (user) {
      loadGameHistory();
      loadActiveGames();
    } else {
      setGameHistory([]);
      setActiveGames([]);
      setCurrentGame(null);
      setLobby(null);
    }
  }, [user]);

  // Socket event listeners
  useEffect(() => {
    if (!socket) {
      console.log('GameContext - Socket not available yet');
      return;
    }

    console.log('GameContext - Setting up socket listeners');

    // Game events
    on('game-started', handleGameStarted);
    on('move-made', handleOpponentMove);
    on('game-completed', handleGameCompleted);
    
    // Lobby events
    on('player-joined', handlePlayerJoined);
    on('player-left', handlePlayerLeft);
    on('player-ready', handlePlayerReady);
    on('lobby-invitation', handleLobbyInvitation);
    on('lobby-updated', handleLobbyUpdated);
    on('player-joined-lobby', handlePlayerJoinedLobby);
    
    // Quick match events
    on('match-found', handleMatchFound);
    on('queue-update', handleQueueUpdate);
    
    // Error events
    on('game-error', handleGameError);

    return () => {
      console.log('GameContext - Cleaning up socket listeners');
      off('game-started');
      off('move-made');
      off('game-completed');
      off('player-joined');
      off('player-left');
      off('player-ready');
      off('lobby-invitation');
      off('lobby-updated');
      off('player-joined-lobby');
      off('match-found');
      off('queue-update');
      off('game-error');
    };
  }, [socket, on, off]);

  // Socket event handlers
  const handleGameStarted = (data) => {
    console.log('🎮 Game started event received:', data);
    setCurrentGame(data.game);
    setLobby(null);
  };

  const handleOpponentMove = (data) => {
    console.log('Opponent move:', data);
    if (currentGame && currentGame.gameId === data.gameId) {
      setCurrentGame(prev => ({
        ...prev,
        moves: [...(prev.moves || []), data.move],
        currentFen: data.fen,
        lastMoveAt: new Date()
      }));
    }
  };

  const handleGameCompleted = (data) => {
    console.log('Game completed:', data);
    if (currentGame && currentGame.gameId === data.gameId) {
      setCurrentGame(prev => ({
        ...prev,
        status: 'completed',
        result: data.result,
        termination: data.termination,
        endedAt: new Date()
      }));
    }
    loadGameHistory();
  };

  const handlePlayerJoined = (data) => {
    console.log('Player joined:', data);
    if (lobby && lobby.lobbyCode === data.lobbyCode) {
      setLobby(prev => ({
        ...prev,
        players: [...prev.players, data.player]
      }));
    }
  };

  const handlePlayerJoinedLobby = (data) => {
    console.log('Player joined lobby:', data);
    if (lobby && lobby.lobbyCode === data.lobbyCode) {
      setLobby(data.lobby);
    }
  };

  const handleLobbyUpdated = (data) => {
    console.log('Lobby updated:', data);
    if (lobby && lobby.lobbyCode === data.lobby?.lobbyCode) {
      setLobby(data.lobby);
    }
  };

  const handlePlayerLeft = (data) => {
    console.log('Player left:', data);
    if (lobby && lobby.lobbyCode === data.lobbyCode) {
      setLobby(prev => ({
        ...prev,
        players: prev.players.filter(p => p.userId !== data.playerId)
      }));
    }
  };

  const handlePlayerReady = (data) => {
    console.log('Player ready:', data);
    if (lobby && lobby.lobbyCode === data.lobbyCode) {
      setLobby(prev => ({
        ...prev,
        players: prev.players.map(p => 
          p.userId === data.playerId ? { ...p, ready: data.ready } : p
        ),
        status: data.allReady ? 'ready' : 'waiting'
      }));
    }
  };

  const handleLobbyInvitation = (data) => {
    console.log('Lobby invitation:', data);
    setPendingInvitations(prev => [...prev, data]);
  };

  const handleMatchFound = (data) => {
    console.log('Match found:', data);
    setQueueStatus({
      inQueue: false,
      position: 0,
      queueLength: 0,
      timeControl: null
    });
    setCurrentGame(data.game);
  };

  const handleQueueUpdate = (data) => {
    console.log('Queue update:', data);
    setQueueStatus({
      inQueue: data.inQueue,
      position: data.position,
      queueLength: data.queueLength,
      timeControl: data.timeControl
    });
  };

  const handleGameError = (data) => {
    console.error('Game error:', data);
    setError(data.message);
  };

  // API Calls
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

  // const loadGameHistory = async () => {
  //   try {
  //     const response = await api.get('/games/user/history');
  //     setGameHistory(response.data.games);
  //   } catch (error) {
  //     console.error('Load game history error:', error);
  //   }
  // };

  

  // const loadActiveGames = async () => {
  //   try {
  //     const response = await api.get('/games/user/active');
  //     setActiveGames(response.data.games);
  //   } catch (error) {
  //     console.error('Load active games error:', error);
  //   }
  // };


  const loadGameHistory = async () => {
  try {
    const response = await api.get('/games/user/history');
    setGameHistory(response.data.games || []);
  } catch (error) {
    console.error('Load game history error:', error);
    // Don't throw, just set empty array
    setGameHistory([]);
  }
};

const loadActiveGames = async () => {
  try {
    const response = await api.get('/games/user/active');
    setActiveGames(response.data.games || []);
  } catch (error) {
    console.error('Load active games error:', error);
    // Don't throw, just set empty array
    setActiveGames([]);
  }
};

  // Computer Game APIs
  const startComputerGame = async (timeControl, difficulty = 'medium') => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.post('/computer/start', {
        timeControl,
        difficulty
      });

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

  // Quick Match APIs
  const joinQuickMatch = async (timeControl) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.post('/quick-match/join', { timeControl });
      
      if (response.data.matched) {
        setCurrentGame(response.data.game);
        setQueueStatus({
          inQueue: false,
          position: 0,
          queueLength: 0,
          timeControl: null
        });
        return { 
          success: true, 
          matched: true, 
          game: response.data.game 
        };
      } else {
        setQueueStatus({
          inQueue: true,
          position: response.data.queuePosition,
          queueLength: response.data.queueLength,
          timeControl
        });
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

  const getQueueStatus = async (timeControl) => {
    try {
      const response = await api.get(`/quick-match/status/${timeControl}`);
      setQueueStatus({
        inQueue: response.data.inQueue,
        position: response.data.position,
        queueLength: response.data.queueLength,
        timeControl
      });
      return {
        success: true,
        ...response.data
      };
    } catch (error) {
      console.error('Get queue status error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to get queue status'
      };
    }
  };

  const leaveQuickMatch = async (timeControl) => {
    try {
      setError(null);
      
      await api.post('/quick-match/leave', { timeControl });
      setQueueStatus({
        inQueue: false,
        position: 0,
        queueLength: 0,
        timeControl: null
      });
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

  // Lobby APIs
  const createLobby = async (lobbyData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.post('/lobby', lobbyData);
      
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

  const getLobby = async (lobbyCode) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get(`/lobby/${lobbyCode}`);
      return { success: true, lobby: response.data.lobby };
    } catch (error) {
      console.error('Get lobby error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to get lobby';
      setError(errorMessage);
      return { 
        success: false, 
        message: errorMessage 
      };
    } finally {
      setLoading(false);
    }
  };

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

  const toggleReady = async (lobbyCode) => {
    try {
      setError(null);
      
      const response = await api.put(`/lobby/${lobbyCode}/ready`);
      setLobby(response.data.lobby);
      return { success: true, lobby: response.data.lobby };
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

  const inviteToLobby = async (lobbyCode, userId) => {
    try {
      setError(null);
      
      const response = await api.post(`/lobby/${lobbyCode}/invite`, { userId });
      return { success: true, message: response.data.message };
    } catch (error) {
      console.error('Invite to lobby error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to send invitation';
      setError(errorMessage);
      return { 
        success: false, 
        message: errorMessage 
      };
    }
  };

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

  // Game Play APIs
  const getGameById = async (gameId) => {
  try {
    const response = await api.get(`/games/${gameId}`);
    console.log('Game data received:', response.data);
    
    // Check the response structure and return appropriately
    if (response.data.game) {
      // If response has game property, return that
      return response.data.game;
    } else if (response.data) {
      // If response is the game itself
      return response.data;
    }
    return null;
  } catch (error) {
    console.error('Get game error:', error);
    return null;
  }
};

  const makeMove = async (gameId, moveData) => {
    try {
      setError(null);
      
      const response = await api.post(`/games/${gameId}/move`, moveData);
      
      if (currentGame && currentGame.gameId === gameId) {
        setCurrentGame(prev => ({
          ...prev,
          moves: [...(prev.moves || []), moveData],
          currentFen: moveData.fen,
          lastMoveAt: new Date()
        }));
      }
      
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

  

  const resignGame = async (gameId) => {
    try {
      setError(null);
      
      const response = await api.post(`/games/${gameId}/resign`);
      
      if (currentGame && currentGame.gameId === gameId) {
        setCurrentGame(prev => ({
          ...prev,
          status: 'completed',
          result: response.data.result,
          termination: 'resignation',
          endedAt: new Date()
        }));
      }
      
      loadGameHistory();
      return { success: true, result: response.data.result };
    } catch (error) {
      console.error('Resign game error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to resign';
      setError(errorMessage);
      return { 
        success: false, 
        message: errorMessage 
      };
    }
  };

  const offerDraw = async (gameId) => {
    try {
      setError(null);
      
      const response = await api.post(`/games/${gameId}/draw-offer`);
      return { success: true, message: response.data.message };
    } catch (error) {
      console.error('Offer draw error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to offer draw';
      setError(errorMessage);
      return { 
        success: false, 
        message: errorMessage 
      };
    }
  };

  const acceptDraw = async (gameId) => {
    try {
      setError(null);
      
      const response = await api.post(`/games/${gameId}/draw-accept`);
      
      if (currentGame && currentGame.gameId === gameId) {
        setCurrentGame(prev => ({
          ...prev,
          status: 'completed',
          result: 'draw',
          termination: 'agreement',
          endedAt: new Date()
        }));
      }
      
      loadGameHistory();
      return { success: true, result: response.data.result };
    } catch (error) {
      console.error('Accept draw error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to accept draw';
      setError(errorMessage);
      return { 
        success: false, 
        message: errorMessage 
      };
    }
  };

  const declineDraw = async (gameId) => {
    try {
      setError(null);
      
      const response = await api.post(`/games/${gameId}/draw-decline`);
      return { success: true, message: response.data.message };
    } catch (error) {
      console.error('Decline draw error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to decline draw';
      setError(errorMessage);
      return { 
        success: false, 
        message: errorMessage 
      };
    }
  };

  const endGame = async (gameId, result, termination) => {
    try {
      setError(null);
      
      await api.post(`/games/${gameId}/end`, { result, termination });
      
      if (currentGame && currentGame.gameId === gameId) {
        setCurrentGame(null);
      }
      
      loadGameHistory();
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

  
  // In GameContext.jsx - FIXED acceptInvite function
const acceptInvite = useCallback(async (lobbyCode) => {
  setLoading(true);
  
  // Clear any existing retry interval
  if (retryIntervalRef.current) {
    clearInterval(retryIntervalRef.current);
    retryIntervalRef.current = null;
  }
  
  try {
    console.log(`Accepting invite for lobby: ${lobbyCode}`);
    const response = await api.post(`/lobby/${lobbyCode}/accept-invite`);
    console.log('Accept invite response:', response.data);
    
    if (response.data && response.data.success) {
      // Set the lobby in context state
      setLobby(response.data.lobby);
      
      // Function to join lobby via socket
      const joinLobbyViaSocket = () => {
        if (socket && connected) {
          console.log('✅ Socket connected, joining lobby room:', lobbyCode);
          socket.emit('join-lobby', { lobbyCode });
          
          if (retryIntervalRef.current) {
            clearInterval(retryIntervalRef.current);
            retryIntervalRef.current = null;
          }
          return true;
        }
        return false;
      };
      
      // Try to join immediately
      if (!joinLobbyViaSocket()) {
        console.log('❌ Socket not connected, starting retry interval...');
        
        // Try to reconnect socket
        if (reconnect) {
          reconnect();
        }
        
        // Set up retry interval
        retryIntervalRef.current = setInterval(() => {
          console.log('🔄 Retrying socket connection for lobby:', lobbyCode);
          if (joinLobbyViaSocket()) {
            clearInterval(retryIntervalRef.current);
            retryIntervalRef.current = null;
          }
        }, 2000);
        
        // Clear after 20 seconds
        setTimeout(() => {
          if (retryIntervalRef.current) {
            console.log('❌ Socket connection timeout for lobby:', lobbyCode);
            clearInterval(retryIntervalRef.current);
            retryIntervalRef.current = null;
          }
        }, 20000);
      }
      
      return { 
        success: true, 
        lobby: response.data.lobby,
        message: response.data.message || 'Successfully joined lobby'
      };
    } else {
      return {
        success: false,
        message: response.data?.message || 'Failed to accept invitation'
      };
    }
  } catch (error) {
    console.error('Error accepting invite:', error);
    return { 
      success: false, 
      message: error.response?.data?.message || 'Failed to accept invitation' 
    };
  } finally {
    setLoading(false);
  }
}, [socket, connected, reconnect]);
  const declineInvitation = (invitationId) => {
    setPendingInvitations(prev => prev.filter(inv => inv.id !== invitationId));
    if (socket && connected) {
      emit('decline-invitation', { invitationId });
    }
  };

  const clearInvitations = () => {
    setPendingInvitations([]);
  };

  const getLobbyInvites = async () => {
    try {
      console.log("Fetching lobby invites...");
      const response = await api.get("/lobby/invites");
      console.log("Lobby invites response:", response.data);
      
      if (response.data) {
        return {
          success: true,
          invites: response.data.invites || []
        };
      } else {
        return {
          success: false,
          message: "Invalid response format",
          invites: []
        };
      }
    } catch (error) {
      console.error("Get lobby invites error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      return {
        success: false,
        message: error.response?.data?.message || "Failed to load invites",
        invites: []
      };
    }
  };

  const searchUsers = async (query) => {
  try {
    setLoading(true);
    setError(null);
    
    console.log('🔍 Searching users with query:', query);
    
    const response = await api.get('/users/search', {
      params: { query }
    });
    
    console.log('📥 Search response:', response.data);
    
    if (response.data.success) {
      return {
        success: true,
        users: response.data.users || [],
        count: response.data.count || 0
      };
    } else {
      return {
        success: false,
        message: response.data.message || 'Failed to search users',
        users: []
      };
    }
  } catch (error) {
    console.error('❌ Search users error:', error);
    const errorMessage = error.response?.data?.message || 'Failed to search users';
    setError(errorMessage);
    return {
      success: false,
      message: errorMessage,
      users: []
    };
  } finally {
    setLoading(false);
  }
};


  // Utility Functions
  const clearError = () => {
    setError(null);
  };

  const resetGameState = () => {
    setCurrentGame(null);
    setLobby(null);
    setError(null);
    setQueueStatus({
      inQueue: false,
      position: 0,
      queueLength: 0,
      timeControl: null
    });
    
    // Clear any retry intervals
    if (retryIntervalRef.current) {
      clearInterval(retryIntervalRef.current);
      retryIntervalRef.current = null;
    }
  };
  // In your GameContext.jsx, add these puzzle-related functions:

  // ==================== PUZZLE FUNCTIONS ====================

  const fetchPuzzles = async () => {
    try {
      setLoading(true);
      const response = await api.get('/puzzles/game');
      return {
        success: true,
        puzzles: response.data
      };
    } catch (error) {
      console.error('Fetch puzzles error:', error);
      const errorMessage = error.response?.data?.message || 'Error fetching puzzles';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
        puzzles: {}
      };
    } finally {
      setLoading(false);
    }
  };

  const fetchAllPuzzles = async () => {
    try {
      setLoading(true);
      const response = await api.get('/puzzles');
      return {
        success: true,
        puzzles: response.data
      };
    } catch (error) {
      console.error('Fetch all puzzles error:', error);
      const errorMessage = error.response?.data?.message || 'Error fetching all puzzles';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
        puzzles: []
      };
    } finally {
      setLoading(false);
    }
  };

  const initializePuzzles = async () => {
    try {
      setLoading(true);
      const response = await api.post('/puzzles/init');
      return {
        success: true,
        message: response.data.message
      };
    } catch (error) {
      console.error('Initialize puzzles error:', error);
      const errorMessage = error.response?.data?.message || 'Error initializing puzzles';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  const createPuzzle = async (puzzleData) => {
    try {
      setLoading(true);
      const response = await api.post('/puzzles', puzzleData);
      return {
        success: true,
        puzzle: response.data,
        message: 'Puzzle created successfully!'
      };
    } catch (error) {
      console.error('Create puzzle error:', error);
      const errorMessage = error.response?.data?.message || 'Error creating puzzle';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  const updatePuzzle = async (puzzleId, puzzleData) => {
    try {
      setLoading(true);
      const response = await api.put(`/puzzles/${puzzleId}`, puzzleData);
      return {
        success: true,
        puzzle: response.data,
        message: 'Puzzle updated successfully!'
      };
    } catch (error) {
      console.error('Update puzzle error:', error);
      const errorMessage = error.response?.data?.message || 'Error updating puzzle';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  const deletePuzzle = async (puzzleId) => {
    try {
      setLoading(true);
      await api.delete(`/puzzles/${puzzleId}`);
      return {
        success: true,
        message: 'Puzzle deleted successfully!'
      };
    } catch (error) {
      console.error('Delete puzzle error:', error);
      const errorMessage = error.response?.data?.message || 'Error deleting puzzle';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  const deleteAllPuzzles = async () => {
    try {
      setLoading(true);
      // Get all puzzles first
      const allPuzzles = await api.get('/puzzles');
      
      // Delete each puzzle
      for (const puzzle of allPuzzles.data) {
        await api.delete(`/puzzles/${puzzle._id}`);
      }
      
      return {
        success: true,
        message: 'All puzzles deleted successfully!'
      };
    } catch (error) {
      console.error('Delete all puzzles error:', error);
      const errorMessage = error.response?.data?.message || 'Error deleting all puzzles';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  

  const value = {
    // State
    currentGame,
    gameHistory,
    lobby,
    loading,
    error,
    computerDifficulties,
    activeGames,
    pendingInvitations,
    queueStatus,
    
    // Computer Game
    startComputerGame,
    getComputerMove,
    
    // Quick Match
    joinQuickMatch,
    getQueueStatus,
    leaveQuickMatch,
    
    // Lobby
    createLobby,
    getLobby,
    joinLobby,
    toggleReady,
    inviteToLobby, 
    acceptInvite,
    getLobbyInvites,
    startGameFromLobby,
    leaveLobby,
    searchUsers,

    // Puzzle functions
    fetchPuzzles,
    fetchAllPuzzles,
    initializePuzzles,
    createPuzzle,
    updatePuzzle,
    deletePuzzle,
    deleteAllPuzzles,
  
    
    // Game Play
    getGameById,
    makeMove,
    resignGame,
    offerDraw,
    acceptDraw,
    declineDraw,
    endGame,
    
    // Invitation Management
    declineInvitation,
    clearInvitations,
    
    // Utility
    setCurrentGame,
    setLobby,
    clearError,
    resetGameState,
    loadGameHistory,
    loadActiveGames
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

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

//   // Join quick match
//   const joinQuickMatch = async (timeControl) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await api.post('/quick-match/join', { timeControl });
      
//       if (response.data.matched) {
//         // Store the game in currentGame
//         setCurrentGame(response.data.game);
//         return { 
//           success: true, 
//           matched: true, 
//           game: response.data.game 
//         };
//       } else {
//         return { 
//           success: true, 
//           matched: false, 
//           queuePosition: response.data.queuePosition,
//           queueLength: response.data.queueLength
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

//   // Get queue status
//   const getQueueStatus = async (timeControl) => {
//     try {
//       const response = await api.get(`/quick-match/status/${timeControl}`);
//       return {
//         success: true,
//         inQueue: response.data.inQueue,
//         position: response.data.position,
//         queueLength: response.data.queueLength
//       };
//     } catch (error) {
//       console.error('Get queue status error:', error);
//       return {
//         success: false,
//         message: error.response?.data?.message || 'Failed to get queue status'
//       };
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
//     joinQuickMatch,
//     getQueueStatus,
//     leaveQuickMatch,
//     createLobby,
//     joinLobby,
//     toggleReady,
//     startGameFromLobby,
//     leaveLobby,
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