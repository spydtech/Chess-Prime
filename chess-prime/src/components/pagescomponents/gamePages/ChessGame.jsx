// import React, { useState, useEffect } from "react";
// import { Chessboard } from "react-chessboard";
// import { Chess } from "chess.js";
// import {
//   ArrowLeft,
//   RotateCcw,
//   Flag,
//   Share2,
//   Menu,
//   Volume2,
//   Settings,
// } from "lucide-react";

// export default function ChessGame({ gameState, onExit }) {
//   const [game, setGame] = useState(new Chess());
//   const [orientation, setOrientation] = useState('white');
//   const [moveHistory, setMoveHistory] = useState([]);
//   const [gameStatus, setGameStatus] = useState('playing');
//   const [playerTimes, setPlayerTimes] = useState({
//     white: parseInt(gameState?.timeControl?.split('+')[0]) * 60 || 600,
//     black: parseInt(gameState?.timeControl?.split('+')[0]) * 60 || 600
//   });
//   const [activePlayer, setActivePlayer] = useState('white');
//   const [winner, setWinner] = useState(null);
//   const [showMenu, setShowMenu] = useState(false);

//   // Computer move logic
//   useEffect(() => {
//     if (gameState?.gameMode === 'vs-computer' && activePlayer === 'black' && gameStatus === 'playing') {
//       const timer = setTimeout(() => {
//         makeComputerMove();
//       }, 500);
//       return () => clearTimeout(timer);
//     }
//   }, [activePlayer, gameState?.gameMode, gameStatus]);

//   // Timer effect
//   useEffect(() => {
//     let interval;
//     if (gameStatus === 'playing') {
//       interval = setInterval(() => {
//         setPlayerTimes(prev => {
//           const newTimes = { ...prev };
//           newTimes[activePlayer] = Math.max(0, newTimes[activePlayer] - 1);
//           return newTimes;
//         });
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [activePlayer, gameStatus]);

//   // Check for time out
//   useEffect(() => {
//     if (playerTimes.white === 0) {
//       setGameStatus('finished');
//       setWinner('black');
//     } else if (playerTimes.black === 0) {
//       setGameStatus('finished');
//       setWinner('white');
//     }
//   }, [playerTimes]);

//   const makeComputerMove = () => {
//     const possibleMoves = game.moves();
//     if (game.isGameOver() || possibleMoves.length === 0) return;
    
//     const randomIndex = Math.floor(Math.random() * possibleMoves.length);
//     const move = possibleMoves[randomIndex];
    
//     try {
//       const gameCopy = new Chess(game.fen());
//       const result = gameCopy.move(move);
      
//       if (result) {
//         setGame(gameCopy);
//         setMoveHistory([...moveHistory, result.san]);
//         setActivePlayer('white');
//         checkGameStatus(gameCopy);
//       }
//     } catch (error) {
//       console.error("Computer move error:", error);
//     }
//   };

//   const makeMove = (move) => {
//     try {
//       const gameCopy = new Chess(game.fen());
//       const result = gameCopy.move(move);
      
//       if (result) {
//         setGame(gameCopy);
//         setMoveHistory([...moveHistory, result.san]);
//         setActivePlayer(activePlayer === 'white' ? 'black' : 'white');
//         checkGameStatus(gameCopy);
//       }
//       return result;
//     } catch (error) {
//       return null;
//     }
//   };

//   const checkGameStatus = (gameCopy) => {
//     if (gameCopy.isCheckmate()) {
//       setGameStatus('finished');
//       setWinner(activePlayer === 'white' ? 'black' : 'white');
//     } else if (gameCopy.isStalemate() || gameCopy.isDraw()) {
//       setGameStatus('finished');
//       setWinner('draw');
//     }
//   };

//   const onDrop = (sourceSquare, targetSquare) => {
//     if (gameStatus !== 'playing') return false;
//     if (gameState?.gameMode === 'vs-computer' && activePlayer === 'black') return false;
    
//     const move = makeMove({
//       from: sourceSquare,
//       to: targetSquare,
//       promotion: 'q'
//     });
    
//     return move !== null;
//   };

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   const getGameStatusMessage = () => {
//     if (winner === 'white') return 'White wins!';
//     if (winner === 'black') return 'Black wins!';
//     if (winner === 'draw') return 'Game drawn!';
//     if (game.isCheck()) return 'Check!';
//     return '';
//   };

//   const resetGame = () => {
//     setGame(new Chess());
//     setGameStatus('playing');
//     setMoveHistory([]);
//     setWinner(null);
//     setActivePlayer('white');
//     setPlayerTimes({
//       white: parseInt(gameState?.timeControl?.split('+')[0]) * 60 || 600,
//       black: parseInt(gameState?.timeControl?.split('+')[0]) * 60 || 600
//     });
//   };

//   return (
//     <div className="min-h-screen bg-[#1e1e1e] flex flex-col">
//       {/* Top Navigation Bar */}
//       <div className="bg-[#2a2a2a] px-4 py-2 flex items-center justify-between border-b border-[#3a3a3a]">
//         <div className="flex items-center gap-4">
//           <button 
//             onClick={onExit}
//             className="text-gray-400 hover:text-white transition"
//           >
//             <ArrowLeft size={20} />
//           </button>
//           <button 
//             onClick={() => setShowMenu(!showMenu)}
//             className="text-gray-400 hover:text-white transition"
//           >
//             <Menu size={20} />
//           </button>
//           <div className="flex items-center gap-2">
//             <span className="text-white font-medium">Play</span>
//             <span className="text-gray-400">•</span>
//             <span className="text-gray-400">
//               {gameState?.gameMode === 'vs-computer' ? 'vs Computer' : 'Online'}
//             </span>
//           </div>
//         </div>
        
//         <div className="flex items-center gap-2">
//           <button className="p-2 hover:bg-[#3a3a3a] rounded-lg transition">
//             <Volume2 size={18} className="text-gray-400" />
//           </button>
//           <button className="p-2 hover:bg-[#3a3a3a] rounded-lg transition">
//             <Settings size={18} className="text-gray-400" />
//           </button>
//         </div>
//       </div>

//       {/* Main Game Area */}
//       <div className="flex-1 flex p-4 gap-4">
//         {/* Left Side - Board and Players */}
//         <div className="flex-1 flex flex-col">
//           {/* Top Player (Black) - Max_256 */}
//           <div className="bg-[#2a2a2a] rounded-t-lg p-3 flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center">
//                 <span className="text-white font-bold text-lg">M</span>
//               </div>
//               <div>
//                 <div className="flex items-center gap-2">
//                   <span className="text-white font-medium">Max_256</span>
//                   <span className="bg-[#3a3a3a] text-gray-400 text-xs px-2 py-0.5 rounded">1500</span>
//                 </div>
//               </div>
//             </div>
//             <div className={`font-mono text-2xl font-bold ${activePlayer === 'black' && gameStatus === 'playing' ? 'text-yellow-500' : 'text-white'}`}>
//               {formatTime(playerTimes.black)}
//             </div>
//           </div>

//           {/* Chess Board - Pure Black and White squares */}
//           <div className="bg-[#2a2a2a] p-4">
//             <div className="w-full max-w-2xl mx-auto aspect-square">
//               <Chessboard
//                 position={game.fen()}
//                 onPieceDrop={onDrop}
//                 boardOrientation={orientation}
//                 boardWidth={600}
//                 customDarkSquareStyle={{
//                   backgroundColor: "#000000"
//                 }}
//                 customLightSquareStyle={{
//                   backgroundColor: "#ffffff"
//                 }}
//                 customBoardStyle={{
//                   borderRadius: "4px",
//                   boxShadow: "0 8px 16px rgba(0,0,0,0.4)"
//                 }}
//               />
//             </div>
//           </div>

//           {/* Bottom Player (White) - Akshay141 */}
//           <div className="bg-[#2a2a2a] rounded-b-lg p-3 flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-full flex items-center justify-center">
//                 <span className="text-white font-bold text-lg">A</span>
//               </div>
//               <div>
//                 <div className="flex items-center gap-2">
//                   <span className="text-white font-medium">Akshay141</span>
//                   <span className="bg-[#3a3a3a] text-gray-400 text-xs px-2 py-0.5 rounded">1450</span>
//                 </div>
//               </div>
//             </div>
//             <div className={`font-mono text-2xl font-bold ${activePlayer === 'white' && gameStatus === 'playing' ? 'text-yellow-500' : 'text-white'}`}>
//               {formatTime(playerTimes.white)}
//             </div>
//           </div>

//           {/* Game Status */}
//           {gameStatus !== 'playing' && (
//             <div className="mt-4 bg-[#2a2a2a] border border-yellow-500/30 rounded-lg p-4 text-center">
//               <p className="text-xl font-bold text-yellow-500">{getGameStatusMessage()}</p>
//               <div className="flex gap-2 mt-3 justify-center">
//                 <button 
//                   onClick={resetGame}
//                   className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg text-sm font-semibold"
//                 >
//                   Play Again
//                 </button>
//                 <button 
//                   onClick={onExit}
//                   className="bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white px-4 py-2 rounded-lg text-sm font-semibold"
//                 >
//                   Exit
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Right Sidebar */}
//         <div className="w-80 bg-[#2a2a2a] rounded-lg flex flex-col">
//           {/* Header with Time */}
//           <div className="p-4 border-b border-[#3a3a3a]">
//             <div className="text-center">
//               <span className="text-white text-xl font-semibold">10:00</span>
//             </div>
//           </div>

//           {/* Tabs */}
//           <div className="flex border-b border-[#3a3a3a]">
//             <button className="flex-1 px-4 py-3 text-sm font-medium text-yellow-500 border-b-2 border-yellow-500">
//               Moves
//             </button>
//             <button className="flex-1 px-4 py-3 text-sm font-medium text-gray-400 hover:text-white">
//               Chat
//             </button>
//           </div>

//           {/* Move History */}
//           <div className="flex-1 overflow-y-auto p-4">
//             <div className="space-y-2">
//               {moveHistory.length === 0 ? (
//                 <p className="text-gray-500 text-center py-8">No moves yet</p>
//               ) : (
//                 <div className="space-y-2">
//                   {Array.from({ length: Math.ceil(moveHistory.length / 2) }).map((_, roundIndex) => (
//                     <div key={roundIndex} className="flex items-center gap-4 text-sm">
//                       <span className="text-gray-500 w-8">{roundIndex + 1}.</span>
//                       <span className="text-white flex-1">{moveHistory[roundIndex * 2] || ''}</span>
//                       {moveHistory[roundIndex * 2 + 1] && (
//                         <span className="text-white flex-1">{moveHistory[roundIndex * 2 + 1]}</span>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Game Controls */}
//           <div className="border-t border-[#3a3a3a] p-4 space-y-2">
//             <button 
//               onClick={() => setOrientation(orientation === 'white' ? 'black' : 'white')}
//               className="w-full bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white py-2.5 rounded-lg text-sm transition flex items-center justify-center gap-2"
//             >
//               <RotateCcw size={16} />
//               Flip Board
//             </button>
//             <button className="w-full bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white py-2.5 rounded-lg text-sm transition flex items-center justify-center gap-2">
//               <Flag size={16} />
//               Resign
//             </button>
//             <button className="w-full bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white py-2.5 rounded-lg text-sm transition flex items-center justify-center gap-2">
//               <Share2 size={16} />
//               Offer Draw
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect, useCallback, useRef } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import {
  ArrowLeft,
  RotateCcw,
  Flag,
  Share2,
  Menu,
  Volume2,
  Settings,
} from "lucide-react";

export default function ChessGame({ gameState, onExit }) {
  const [game, setGame] = useState(new Chess());
  const [orientation, setOrientation] = useState('white');
  const [moveHistory, setMoveHistory] = useState([]);
  const [gameStatus, setGameStatus] = useState('playing');
  const [playerTimes, setPlayerTimes] = useState({
    white: parseInt(gameState?.timeControl?.split('+')[0]) * 60 || 600,
    black: parseInt(gameState?.timeControl?.split('+')[0]) * 60 || 600
  });
  const [activePlayer, setActivePlayer] = useState('white');
  const [winner, setWinner] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [isComputerThinking, setIsComputerThinking] = useState(false);
  
  // Refs to prevent stale closures
  const gameRef = useRef(game);
  const activePlayerRef = useRef(activePlayer);
  const gameStatusRef = useRef(gameStatus);
  const computerMoveTimeoutRef = useRef(null);
  const timerIntervalRef = useRef(null);

  // Update refs when state changes
  useEffect(() => {
    gameRef.current = game;
    activePlayerRef.current = activePlayer;
    gameStatusRef.current = gameStatus;
  }, [game, activePlayer, gameStatus]);

  // Computer move logic
  useEffect(() => {
    // Clear any existing computer move timeout
    if (computerMoveTimeoutRef.current) {
      clearTimeout(computerMoveTimeoutRef.current);
    }

    // Check if computer should move
    const shouldComputerMove = () => {
      if (gameState?.gameMode !== 'vs-computer') return false;
      if (gameStatusRef.current !== 'playing') return false;
      if (isComputerThinking) return false;
      
      // In vs-computer mode, computer plays as black
      // So computer moves when activePlayer is 'black'
      return activePlayerRef.current === 'black';
    };

    if (shouldComputerMove()) {
      setIsComputerThinking(true);
      computerMoveTimeoutRef.current = setTimeout(() => {
        makeComputerMove();
      }, 500);
    }

    return () => {
      if (computerMoveTimeoutRef.current) {
        clearTimeout(computerMoveTimeoutRef.current);
      }
    };
  }, [activePlayer, gameState?.gameMode, gameStatus, isComputerThinking]);

  // Timer effect
  useEffect(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }

    if (gameStatus === 'playing' && !winner) {
      timerIntervalRef.current = setInterval(() => {
        setPlayerTimes(prev => {
          if (gameStatusRef.current !== 'playing') return prev;
          
          const newTimes = { ...prev };
          const currentPlayer = activePlayerRef.current;
          
          newTimes[currentPlayer] = Math.max(0, newTimes[currentPlayer] - 1);
          
          if (newTimes[currentPlayer] === 0) {
            setGameStatus('finished');
            setWinner(currentPlayer === 'white' ? 'black' : 'white');
          }
          
          return newTimes;
        });
      }, 1000);
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [gameStatus, winner]);

  const makeComputerMove = useCallback(() => {
    try {
      const currentGame = new Chess(gameRef.current.fen());
      
      // Check if game is over
      if (currentGame.isGameOver()) {
        checkGameStatus(currentGame);
        setIsComputerThinking(false);
        return;
      }

      // Get all possible moves
      const possibleMoves = currentGame.moves({ verbose: true });
      
      if (possibleMoves.length === 0) {
        checkGameStatus(currentGame);
        setIsComputerThinking(false);
        return;
      }

      // Select a random move (simple computer AI)
      const randomIndex = Math.floor(Math.random() * possibleMoves.length);
      const move = possibleMoves[randomIndex];
      
      // Make the move
      const gameCopy = new Chess(gameRef.current.fen());
      const result = gameCopy.move({
        from: move.from,
        to: move.to,
        promotion: 'q' // Always promote to queen for simplicity
      });
      
      if (result) {
        setGame(gameCopy);
        setMoveHistory(prev => [...prev, result.san]);
        setActivePlayer('white'); // Switch back to player's turn
        checkGameStatus(gameCopy);
      }
    } catch (error) {
      console.error("Computer move error:", error);
    } finally {
      setIsComputerThinking(false);
    }
  }, []);

  const makeMove = useCallback((from, to, promotion = 'q') => {
    try {
      const gameCopy = new Chess(gameRef.current.fen());
      
      // Try to make the move
      const result = gameCopy.move({
        from,
        to,
        promotion
      });
      
      if (result) {
        setGame(gameCopy);
        setMoveHistory(prev => [...prev, result.san]);
        setActivePlayer('black'); // Switch to computer's turn
        checkGameStatus(gameCopy);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Move error:", error);
      return false;
    }
  }, []);

  const checkGameStatus = useCallback((gameCopy) => {
    if (gameCopy.isCheckmate()) {
      setGameStatus('finished');
      setWinner(gameCopy.turn() === 'w' ? 'black' : 'white');
    } else if (gameCopy.isStalemate() || gameCopy.isDraw() || gameCopy.isThreefoldRepetition() || gameCopy.isInsufficientMaterial()) {
      setGameStatus('finished');
      setWinner('draw');
    }
  }, []);

  const onDrop = useCallback((sourceSquare, targetSquare, piece) => {
    // Prevent moves if game is finished
    if (gameStatusRef.current !== 'playing') return false;
    
    // In vs-computer mode, only allow moves on player's turn (white)
    if (gameState?.gameMode === 'vs-computer' && activePlayerRef.current !== 'white') {
      return false;
    }

    // Determine promotion piece (for pawn promotion)
    const promotion = piece[1] === 'p' && (targetSquare[1] === '8' || targetSquare[1] === '1') ? 'q' : undefined;
    
    // Make the move
    const moveSuccessful = makeMove(sourceSquare, targetSquare, promotion);
    
    return moveSuccessful;
  }, [makeMove, gameState?.gameMode]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getGameStatusMessage = () => {
    if (winner === 'white') return 'White wins!';
    if (winner === 'black') return 'Black wins!';
    if (winner === 'draw') return 'Game drawn!';
    if (game.isCheck()) return 'Check!';
    if (isComputerThinking) return 'Computer thinking...';
    return '';
  };

  const resetGame = () => {
    // Clear all timeouts and intervals
    if (computerMoveTimeoutRef.current) {
      clearTimeout(computerMoveTimeoutRef.current);
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    
    const newGame = new Chess();
    setGame(newGame);
    setGameStatus('playing');
    setMoveHistory([]);
    setWinner(null);
    setActivePlayer('white');
    setIsComputerThinking(false);
    setPlayerTimes({
      white: parseInt(gameState?.timeControl?.split('+')[0]) * 60 || 600,
      black: parseInt(gameState?.timeControl?.split('+')[0]) * 60 || 600
    });
  };

  const resign = () => {
    setGameStatus('finished');
    setWinner(activePlayer === 'white' ? 'black' : 'white');
  };

  const offerDraw = () => {
    alert('Draw offer sent to opponent');
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] flex flex-col">
      {/* Top Navigation Bar */}
      <div className="bg-[#2a2a2a] px-4 py-2 flex items-center justify-between border-b border-[#3a3a3a]">
        <div className="flex items-center gap-4">
          <button 
            onClick={onExit}
            className="text-gray-400 hover:text-white transition"
          >
            <ArrowLeft size={20} />
          </button>
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="text-gray-400 hover:text-white transition"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-white font-medium">Play</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">
              {gameState?.gameMode === 'vs-computer' ? 'vs Computer' : 'Online'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-[#3a3a3a] rounded-lg transition">
            <Volume2 size={18} className="text-gray-400" />
          </button>
          <button className="p-2 hover:bg-[#3a3a3a] rounded-lg transition">
            <Settings size={18} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="flex-1 flex p-4 gap-4">
        {/* Left Side - Board and Players */}
        <div className="flex-1 flex flex-col">
          {/* Top Player (Black - Computer) */}
          <div className="bg-[#2a2a2a] rounded-t-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">
                    {gameState?.gameMode === 'vs-computer' ? 'Computer' : 'Opponent'}
                  </span>
                  <span className="bg-[#3a3a3a] text-gray-400 text-xs px-2 py-0.5 rounded">
                    {gameState?.gameMode === 'vs-computer' ? '1500' : '1500'}
                  </span>
                </div>
                {isComputerThinking && gameState?.gameMode === 'vs-computer' && (
                  <span className="text-xs text-yellow-500 ml-2">Thinking...</span>
                )}
              </div>
            </div>
            <div className={`font-mono text-2xl font-bold ${activePlayer === 'black' && gameStatus === 'playing' ? 'text-yellow-500' : 'text-white'}`}>
              {formatTime(playerTimes.black)}
            </div>
          </div>

          {/* Chess Board */}
          <div className="bg-[#2a2a2a] p-4">
            <div className="w-full max-w-2xl mx-auto aspect-square">
              <Chessboard
                position={game.fen()}
                onPieceDrop={onDrop}
                boardOrientation={orientation}
                boardWidth={600}
                customDarkSquareStyle={{
                  backgroundColor: "#000000"
                }}
                customLightSquareStyle={{
                  backgroundColor: "#ffffff"
                }}
                customBoardStyle={{
                  borderRadius: "4px",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.4)"
                }}
                arePiecesDraggable={gameStatus === 'playing' && !(gameState?.gameMode === 'vs-computer' && activePlayer === 'black')}
              />
            </div>
          </div>

          {/* Bottom Player (White - You) */}
          <div className="bg-[#2a2a2a] rounded-b-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">Y</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">You</span>
                  <span className="bg-[#3a3a3a] text-gray-400 text-xs px-2 py-0.5 rounded">1450</span>
                </div>
              </div>
            </div>
            <div className={`font-mono text-2xl font-bold ${activePlayer === 'white' && gameStatus === 'playing' ? 'text-yellow-500' : 'text-white'}`}>
              {formatTime(playerTimes.white)}
            </div>
          </div>

          {/* Game Status */}
          {gameStatus !== 'playing' && (
            <div className="mt-4 bg-[#2a2a2a] border border-yellow-500/30 rounded-lg p-4 text-center">
              <p className="text-xl font-bold text-yellow-500">{getGameStatusMessage()}</p>
              <div className="flex gap-2 mt-3 justify-center">
                <button 
                  onClick={resetGame}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg text-sm font-semibold"
                >
                  Play Again
                </button>
                <button 
                  onClick={onExit}
                  className="bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white px-4 py-2 rounded-lg text-sm font-semibold"
                >
                  Exit
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="w-80 bg-[#2a2a2a] rounded-lg flex flex-col">
          {/* Header with Game Info */}
          <div className="p-4 border-b border-[#3a3a3a]">
            <div className="text-center">
              <span className="text-white text-xl font-semibold">
                {gameState?.timeControl || '10+0'}
              </span>
              <p className="text-gray-400 text-sm mt-1">
                {gameState?.gameMode === 'vs-computer' ? 'vs Computer' : 'Online Game'}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[#3a3a3a]">
            <button className="flex-1 px-4 py-3 text-sm font-medium text-yellow-500 border-b-2 border-yellow-500">
              Moves
            </button>
            <button className="flex-1 px-4 py-3 text-sm font-medium text-gray-400 hover:text-white">
              Chat
            </button>
          </div>

          {/* Move History */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {moveHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No moves yet</p>
              ) : (
                <div className="space-y-2">
                  {Array.from({ length: Math.ceil(moveHistory.length / 2) }).map((_, roundIndex) => (
                    <div key={roundIndex} className="flex items-center gap-4 text-sm">
                      <span className="text-gray-500 w-8">{roundIndex + 1}.</span>
                      <span className="text-white flex-1">{moveHistory[roundIndex * 2] || ''}</span>
                      {moveHistory[roundIndex * 2 + 1] && (
                        <span className="text-white flex-1">{moveHistory[roundIndex * 2 + 1]}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Game Controls */}
          <div className="border-t border-[#3a3a3a] p-4 space-y-2">
            <button 
              onClick={() => setOrientation(orientation === 'white' ? 'black' : 'white')}
              className="w-full bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white py-2.5 rounded-lg text-sm transition flex items-center justify-center gap-2"
            >
              <RotateCcw size={16} />
              Flip Board
            </button>
            <button 
              onClick={resign}
              disabled={gameStatus !== 'playing'}
              className={`w-full py-2.5 rounded-lg text-sm transition flex items-center justify-center gap-2 ${
                gameStatus === 'playing' 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-[#3a3a3a] text-gray-500 cursor-not-allowed'
              }`}
            >
              <Flag size={16} />
              Resign
            </button>
            <button 
              onClick={offerDraw}
              disabled={gameStatus !== 'playing'}
              className={`w-full py-2.5 rounded-lg text-sm transition flex items-center justify-center gap-2 ${
                gameStatus === 'playing'
                  ? 'bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white'
                  : 'bg-[#3a3a3a] text-gray-500 cursor-not-allowed'
              }`}
            >
              <Share2 size={16} />
              Offer Draw
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}