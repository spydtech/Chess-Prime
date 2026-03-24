// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import ChessGame from "./ChessGame";

// export default function GamePage() {
//   const { mode, timeControl } = useParams();
//   const navigate = useNavigate();

//   const gameState = {
//     status: 'playing',
//     gameMode: mode || 'vs-computer',
//     timeControl: timeControl || '10+0',
//     opponent: mode === 'vs-computer' ? 'Computer' : 'Akshay141',
//     players: mode === 'vs-computer' 
//       ? [{ name: 'Max_256', rating: 1450 }, { name: 'Computer', rating: 1500 }]
//       : [{ name: 'Max_256', rating: 1450 }, { name: 'Akshay141', rating: 1480 }]
//   };

//   const handleExit = () => {
//     navigate('/dashboard');
//   };

//   return (
//     <div className="flex-1 overflow-hidden">
//       <ChessGame 
//         gameState={gameState}
//         onExit={handleExit}
//       />
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import ChessGame from "./ChessGame";
// import { useGame } from "../../../context/GameContext";
// import { useAuth } from "../../../context/AuthContext";
// import { Loader } from "lucide-react";

// export default function GamePage() {
//   const { mode, timeControl } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { currentGame, setCurrentGame, getGameById } = useGame();
//   const { socket, user } = useAuth();
//   const [gameData, setGameData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadGame = async () => {
//       setLoading(true);
      
//       console.log('Loading game with state:', location.state);
      
//       // Check if we have game data from navigation state
//       if (location.state?.gameData) {
//         const game = location.state.gameData;
//         console.log('Game data from state:', game);
        
//         // Find current player's color
//         let playerColor = 'white';
//         if (user && game.players) {
//           const currentPlayer = game.players.find(p => p.userId === user.id);
//           if (currentPlayer) {
//             playerColor = currentPlayer.color;
//           }
//         }
        
//         setGameData({
//           ...game,
//           gameMode: mode || game.gameType || 'online',
//           timeControl: timeControl || 
//                       (game.timeControl ? 
//                        `${game.timeControl.initial / 60}+${game.timeControl.increment}` : 
//                        '10+0'),
//           gameId: game.gameId || location.state.gameId,
//           playerColor: playerColor
//         });
//         setCurrentGame(game);
//         setLoading(false);
//       } 
//       else if (location.state?.gameId) {
//         // Try to load game by ID
//         console.log('Loading game by ID:', location.state.gameId);
//         const result = await getGameById(location.state.gameId);
//         if (result.success) {
//           const game = result.game;
//           console.log('Game loaded by ID:', game);
          
//           // Find current player's color
//           let playerColor = 'white';
//           if (user && game.players) {
//             const currentPlayer = game.players.find(p => p.userId === user.id);
//             if (currentPlayer) {
//               playerColor = currentPlayer.color;
//             }
//           }
          
//           setGameData({
//             ...game,
//             gameMode: mode || game.gameType || 'online',
//             timeControl: timeControl || 
//                         (game.timeControl ? 
//                          `${game.timeControl.initial / 60}+${game.timeControl.increment}` : 
//                          '10+0'),
//             playerColor: playerColor
//           });
//           setCurrentGame(game);
//         } else {
//           console.error('Failed to load game by ID');
//           navigate('/time-control');
//         }
//         setLoading(false);
//       } 
//       else if (currentGame) {
//         console.log('Using current game from context:', currentGame);
        
//         // Find current player's color
//         let playerColor = 'white';
//         if (user && currentGame.players) {
//           const currentPlayer = currentGame.players.find(p => p.userId === user.id);
//           if (currentPlayer) {
//             playerColor = currentPlayer.color;
//           }
//         }
        
//         setGameData({
//           ...currentGame,
//           gameMode: mode || currentGame.gameType || 'online',
//           timeControl: timeControl || 
//                       (currentGame.timeControl ? 
//                        `${currentGame.timeControl.initial / 60}+${currentGame.timeControl.increment}` : 
//                        '10+0'),
//           playerColor: playerColor
//         });
//         setLoading(false);
//       } 
//       else {
//         // If no game data, redirect to time control page
//         console.log('No game data found, redirecting to time control');
//         navigate('/time-control');
//         setLoading(false);
//       }
//     };

//     loadGame();

//     // Join game room via socket if online game
//     if (location.state?.gameId && socket && mode === 'online') {
//       console.log('Joining game room:', location.state.gameId);
//       socket.emit('join-game', { gameId: location.state.gameId });
//     }

//     return () => {
//       // Leave game room on unmount
//       if (location.state?.gameId && socket) {
//         console.log('Leaving game room:', location.state.gameId);
//         socket.emit('leave-game', { gameId: location.state.gameId });
//       }
//     };
//   }, [location.state, currentGame, mode, timeControl, navigate, getGameById, socket, user]);

//   const handleExit = () => {
//     setCurrentGame(null);
//     navigate('/dashboard');
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center">
//         <div className="text-white flex items-center gap-3">
//           <Loader className="animate-spin text-amber-400" size={24} />
//           <span>Loading game...</span>
//         </div>
//       </div>
//     );
//   }

//   if (!gameData) {
//     return (
//       <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center">
//         <div className="text-white">No game data available</div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 overflow-hidden">
//       <ChessGame 
//         gameState={gameData}
//         onExit={handleExit}
//       />
//     </div>
//   );
// }




// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import ChessGame from "./ChessGame";
// import { useGame } from "../../../context/GameContext";
// import { Loader } from "lucide-react";

// export default function GamePage() {
//   const { mode, timeControl } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { currentGame, setCurrentGame, getGameById } = useGame();
//   const [gameData, setGameData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadGame = async () => {
//       setLoading(true);
      
//       // Check if we have game data from navigation state
//       if (location.state?.gameData) {
//         setGameData({
//           ...location.state.gameData,
//           gameMode: mode || 'vs-computer',
//           timeControl: timeControl || location.state.gameData.timeControl?.initial / 60 + '+' + (location.state.gameData.timeControl?.increment || 0) || '10+0',
//           difficulty: location.state.difficulty || 'medium'
//         });
//         setLoading(false);
//       } else if (currentGame) {
//         setGameData({
//           ...currentGame,
//           gameMode: mode || currentGame.gameType || 'vs-computer',
//           timeControl: timeControl || '10+0'
//         });
//         setLoading(false);
//       } else if (location.state?.gameId) {
//         // Try to load game by ID
//         const result = await getGameById(location.state.gameId);
//         if (result.success) {
//           setGameData({
//             ...result.game,
//             gameMode: mode || result.game.gameType || 'vs-computer',
//             timeControl: timeControl || '10+0'
//           });
//         } else {
//           navigate('/time-control');
//         }
//         setLoading(false);
//       } else {
//         // If no game data, redirect to time control page
//         navigate('/time-control');
//         setLoading(false);
//       }
//     };

//     loadGame();
//   }, [location.state, currentGame, mode, timeControl, navigate, getGameById]);

//   const handleExit = () => {
//     setCurrentGame(null);
//     navigate('/dashboard');
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center">
//         <div className="text-white flex items-center gap-3">
//           <Loader className="animate-spin text-amber-400" size={24} />
//           <span>Loading game...</span>
//         </div>
//       </div>
//     );
//   }

//   if (!gameData) {
//     return (
//       <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center">
//         <div className="text-white">No game data available</div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 overflow-hidden">
//       <ChessGame 
//         gameState={gameData}
//         onExit={handleExit}
//       />
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import ChessGame from "./ChessGame";
// import { useGame } from "../../../context/GameContext";
// import { useAuth } from "../../../context/AuthContext";
// import { Loader } from "lucide-react";

// export default function GamePage() {
//   const { mode, timeControl } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { currentGame, setCurrentGame, getGameById } = useGame();
//   const { user } = useAuth();
//   const [gameData, setGameData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadGame = async () => {
//       setLoading(true);
      
//       // Check if we have game data from navigation state
//       if (location.state?.gameData) {
//         console.log("Loading game from state:", location.state.gameData);
//         setGameData({
//           ...location.state.gameData,
//           gameMode: mode || 'online',
//           timeControl: timeControl || '10+0',
//           players: location.state.gameData.players
//         });
//         setLoading(false);
//       } else if (location.state?.gameId) {
//         // Try to load game by ID
//         console.log("Loading game by ID:", location.state.gameId);
//         const result = await getGameById(location.state.gameId);
//         if (result.success) {
//           setGameData({
//             ...result.game,
//             gameMode: mode || 'online',
//             timeControl: timeControl || '10+0'
//           });
//         } else {
//           console.error("Failed to load game:", result.message);
//           navigate('/time-control');
//         }
//         setLoading(false);
//       } else if (currentGame) {
//         console.log("Loading current game:", currentGame);
//         setGameData({
//           ...currentGame,
//           gameMode: mode || 'online',
//           timeControl: timeControl || '10+0'
//         });
//         setLoading(false);
//       } else {
//         console.log("No game data found, redirecting");
//         navigate('/time-control');
//         setLoading(false);
//       }
//     };

//     loadGame();
//   }, [location.state, currentGame, mode, timeControl, navigate, getGameById]);

//   const handleExit = () => {
//     setCurrentGame(null);
//     navigate('/dashboard');
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center">
//         <div className="text-white flex items-center gap-3">
//           <Loader className="animate-spin text-amber-400" size={24} />
//           <span>Loading game...</span>
//         </div>
//       </div>
//     );
//   }

//   if (!gameData) {
//     return (
//       <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center">
//         <div className="text-white">No game data available</div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 overflow-hidden">
//       <ChessGame 
//         gameState={gameData}
//         onExit={handleExit}
//       />
//     </div>
//   );
// }



//testing

// // pages/GamePage.js
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import ChessGame from "./ChessGame";
// import { useGame } from "../../../context/GameContext";
// import { useAuth } from "../../../context/AuthContext";
// import { Loader } from "lucide-react";

// export default function GamePage() {
//   const { mode, timeControl } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { currentGame, setCurrentGame, getGameById } = useGame();
//   const { user } = useAuth();
//   const [gameData, setGameData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadGame = async () => {
//       setLoading(true);
      
//       // Check if we have game data from navigation state
//       if (location.state?.gameData) {
//         console.log("Loading game from state:", location.state.gameData);
//         setGameData({
//           ...location.state.gameData,
//           gameMode: mode || 'online',
//           timeControl: timeControl || location.state.gameData.timeControl || '10+0',
//           players: location.state.gameData.players
//         });
//         setLoading(false);
//       } else if (location.state?.gameId) {
//         // Try to load game by ID
//         console.log("Loading game by ID:", location.state.gameId);
//         const result = await getGameById(location.state.gameId);
//         if (result.success) {
//           setGameData({
//             ...result.game,
//             gameMode: mode || 'online',
//             timeControl: timeControl || result.game.timeControl || '10+0'
//           });
//         } else {
//           console.error("Failed to load game:", result.message);
//           navigate('/time-control');
//         }
//         setLoading(false);
//       } else if (currentGame) {
//         console.log("Loading current game:", currentGame);
//         setGameData({
//           ...currentGame,
//           gameMode: mode || 'online',
//           timeControl: timeControl || currentGame.timeControl || '10+0'
//         });
//         setLoading(false);
//       } else {
//         console.log("No game data found, redirecting");
//         navigate('/time-control');
//         setLoading(false);
//       }
//     };

//     loadGame();
//   }, [location.state, currentGame, mode, timeControl, navigate, getGameById]);

//   const handleExit = () => {
//     setCurrentGame(null);
//     navigate('/dashboard');
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center">
//         <div className="text-white flex items-center gap-3">
//           <Loader className="animate-spin text-amber-400" size={24} />
//           <span>Loading game...</span>
//         </div>
//       </div>
//     );
//   }

//   if (!gameData) {
//     return (
//       <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center">
//         <div className="text-white">No game data available</div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 overflow-hidden">
//       <ChessGame 
//         gameState={gameData}
//         onExit={handleExit}
//       />
//     </div>
//   );
// }


//testing 2
// pages/GamePage.js - FIXED
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ChessGame from "./ChessGame";
import { useGame } from "../../../context/GameContext";
import { useAuth } from "../../../context/AuthContext";
import { Loader } from "lucide-react";

export default function GamePage() {
  const { mode, timeControl } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentGame, setCurrentGame, getGameById } = useGame();
  const { user } = useAuth();
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper function to format time control
  const formatTimeControl = (timeControlObj) => {
    if (!timeControlObj) return '10+0';
    
    // If it's already a string like '10+0', return it
    if (typeof timeControlObj === 'string') return timeControlObj;
    
    // If it's an object with initial and increment
    if (typeof timeControlObj === 'object') {
      const initial = timeControlObj.initial || timeControlObj.initialTime || 600;
      const increment = timeControlObj.increment || timeControlObj.incrementTime || 0;
      
      // Convert seconds to minutes for display
      const minutes = Math.floor(initial / 60);
      const seconds = initial % 60;
      
      if (seconds > 0) {
        return `${minutes}:${seconds.toString().padStart(2, '0')}+${increment}`;
      }
      return `${minutes}+${increment}`;
    }
    
    return '10+0';
  };

  // Helper function to get initial time in seconds
  const getInitialTimeInSeconds = (timeControlObj) => {
    if (!timeControlObj) return 600; // Default 10 minutes
    
    if (typeof timeControlObj === 'string') {
      // Parse string like '10+0'
      const [minutes] = timeControlObj.split('+').map(Number);
      return (minutes || 10) * 60;
    }
    
    if (typeof timeControlObj === 'object') {
      return timeControlObj.initial || timeControlObj.initialTime || 600;
    }
    
    return 600;
  };

  useEffect(() => {
    const loadGame = async () => {
      setLoading(true);
      
      console.log('GamePage - location.state:', location.state);
      console.log('GamePage - currentGame:', currentGame);
      console.log('GamePage - user:', user);
      
      // Check if we have game data from navigation state
      if (location.state?.gameData) {
        console.log("Loading game from state:", location.state.gameData);
        
        // Format time control properly
        const formattedTimeControl = formatTimeControl(location.state.gameData.timeControl);
        const initialTimeSeconds = getInitialTimeInSeconds(location.state.gameData.timeControl);
        
        // Ensure we have all required fields
        const gameState = {
          ...location.state.gameData,
          gameId: location.state.gameData.gameId || location.state.gameData._id,
          gameMode: mode || location.state.gameData.gameMode || 'online',
          timeControl: formattedTimeControl,
          timeControlObject: location.state.gameData.timeControl, // Keep original for reference
          initialTime: initialTimeSeconds,
          players: location.state.gameData.players || [
            { color: 'white', username: 'You', userId: user?.id },
            { color: 'black', username: 'Opponent', userId: 'opponent' }
          ]
        };
        console.log("Setting game data:", gameState);
        setGameData(gameState);
        setCurrentGame(gameState); // Update context
        setLoading(false);
      } else if (location.state?.gameId) {
        // Try to load game by ID
        console.log("Loading game by ID:", location.state.gameId);
        const result = await getGameById(location.state.gameId);
        if (result && result.game) {
          const game = result.game;
          
          // Format time control properly
          const formattedTimeControl = formatTimeControl(game.timeControl);
          const initialTimeSeconds = getInitialTimeInSeconds(game.timeControl);
          
          const gameState = {
            ...game,
            gameId: game.gameId || game._id,
            gameMode: mode || 'online',
            timeControl: formattedTimeControl,
            timeControlObject: game.timeControl,
            initialTime: initialTimeSeconds
          };
          setGameData(gameState);
          setCurrentGame(gameState);
        } else {
          console.error("Failed to load game:", result?.message);
          navigate('/time-control');
        }
        setLoading(false);
      } else if (currentGame) {
        console.log("Loading current game:", currentGame);
        
        // Format time control properly
        const formattedTimeControl = formatTimeControl(currentGame.timeControl);
        const initialTimeSeconds = getInitialTimeInSeconds(currentGame.timeControl);
        
        setGameData({
          ...currentGame,
          gameId: currentGame.gameId || currentGame._id,
          gameMode: mode || currentGame.gameMode || 'online',
          timeControl: formattedTimeControl,
          timeControlObject: currentGame.timeControl,
          initialTime: initialTimeSeconds
        });
        setLoading(false);
      } else {
        console.log("No game data found, redirecting");
        navigate('/time-control');
        setLoading(false);
      }
    };

    loadGame();
  }, [location.state, currentGame, mode, timeControl, navigate, getGameById, setCurrentGame, user]);

  const handleExit = () => {
    setCurrentGame(null);
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center">
        <div className="text-white flex items-center gap-3">
          <Loader className="animate-spin text-amber-400" size={24} />
          <span>Loading game...</span>
        </div>
      </div>
    );
  }

  if (!gameData) {
    return (
      <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center">
        <div className="text-white">No game data available</div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-hidden">
      <ChessGame 
        gameState={gameData}
        onExit={handleExit}
      />
    </div>
  );
}