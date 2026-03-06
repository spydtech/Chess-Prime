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




import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ChessGame from "./ChessGame";
import { useGame } from "../../../context/GameContext";
import { Loader } from "lucide-react";

export default function GamePage() {
  const { mode, timeControl } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentGame, setCurrentGame, getGameById } = useGame();
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGame = async () => {
      setLoading(true);
      
      // Check if we have game data from navigation state
      if (location.state?.gameData) {
        setGameData({
          ...location.state.gameData,
          gameMode: mode || 'vs-computer',
          timeControl: timeControl || location.state.gameData.timeControl?.initial / 60 + '+' + (location.state.gameData.timeControl?.increment || 0) || '10+0',
          difficulty: location.state.difficulty || 'medium'
        });
        setLoading(false);
      } else if (currentGame) {
        setGameData({
          ...currentGame,
          gameMode: mode || currentGame.gameType || 'vs-computer',
          timeControl: timeControl || '10+0'
        });
        setLoading(false);
      } else if (location.state?.gameId) {
        // Try to load game by ID
        const result = await getGameById(location.state.gameId);
        if (result.success) {
          setGameData({
            ...result.game,
            gameMode: mode || result.game.gameType || 'vs-computer',
            timeControl: timeControl || '10+0'
          });
        } else {
          navigate('/time-control');
        }
        setLoading(false);
      } else {
        // If no game data, redirect to time control page
        navigate('/time-control');
        setLoading(false);
      }
    };

    loadGame();
  }, [location.state, currentGame, mode, timeControl, navigate, getGameById]);

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