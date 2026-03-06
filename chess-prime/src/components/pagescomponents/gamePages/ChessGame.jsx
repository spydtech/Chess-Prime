// import React, { useState, useEffect, useCallback, useRef } from "react";
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
//   const [isComputerThinking, setIsComputerThinking] = useState(false);
//   const [selectedSquare, setSelectedSquare] = useState(null);
//   const [validMoves, setValidMoves] = useState([]);
  
//   // Board color customization
//   const [boardColors, setBoardColors] = useState({
//     dark: "#b58863",
//     light: "#f0d9b5",
//     highlight: "#f7f769",
//     lastMove: "#b9d68c"
//   });

//   // Refs
//   const gameRef = useRef(game);
//   const activePlayerRef = useRef(activePlayer);
//   const gameStatusRef = useRef(gameStatus);
//   const computerMoveTimeoutRef = useRef(null);
//   const timerIntervalRef = useRef(null);

//   // Update refs
//   useEffect(() => {
//     gameRef.current = game;
//     activePlayerRef.current = activePlayer;
//     gameStatusRef.current = gameStatus;
//   }, [game, activePlayer, gameStatus]);

//   // Computer move logic
//   useEffect(() => {
//     if (computerMoveTimeoutRef.current) {
//       clearTimeout(computerMoveTimeoutRef.current);
//     }

//     const shouldComputerMove = () => {
//       if (gameState?.gameMode !== 'vs-computer') return false;
//       if (gameStatusRef.current !== 'playing') return false;
//       if (isComputerThinking) return false;
//       return activePlayerRef.current === 'black';
//     };

//     if (shouldComputerMove()) {
//       setIsComputerThinking(true);
//       computerMoveTimeoutRef.current = setTimeout(() => {
//         makeComputerMove();
//       }, 500);
//     }

//     return () => {
//       if (computerMoveTimeoutRef.current) {
//         clearTimeout(computerMoveTimeoutRef.current);
//       }
//     };
//   }, [activePlayer, gameState?.gameMode, gameStatus]);

//   // Timer effect
//   useEffect(() => {
//     if (timerIntervalRef.current) {
//       clearInterval(timerIntervalRef.current);
//     }

//     if (gameStatus === 'playing' && !winner) {
//       timerIntervalRef.current = setInterval(() => {
//         setPlayerTimes(prev => {
//           if (gameStatusRef.current !== 'playing') return prev;
          
//           const newTimes = { ...prev };
//           const currentPlayer = activePlayerRef.current;
          
//           newTimes[currentPlayer] = Math.max(0, newTimes[currentPlayer] - 1);
          
//           if (newTimes[currentPlayer] === 0) {
//             setGameStatus('finished');
//             setWinner(currentPlayer === 'white' ? 'black' : 'white');
//           }
          
//           return newTimes;
//         });
//       }, 1000);
//     }

//     return () => {
//       if (timerIntervalRef.current) {
//         clearInterval(timerIntervalRef.current);
//       }
//     };
//   }, [gameStatus, winner]);

//   const makeComputerMove = useCallback(() => {
//     try {
//       const currentGame = new Chess(gameRef.current.fen());
      
//       if (currentGame.isGameOver()) {
//         checkGameStatus(currentGame);
//         setIsComputerThinking(false);
//         return;
//       }

//       const possibleMoves = currentGame.moves({ verbose: true });
      
//       if (possibleMoves.length === 0) {
//         checkGameStatus(currentGame);
//         setIsComputerThinking(false);
//         return;
//       }

//       const randomIndex = Math.floor(Math.random() * possibleMoves.length);
//       const move = possibleMoves[randomIndex];
      
//       const gameCopy = new Chess(gameRef.current.fen());
//       const result = gameCopy.move({
//         from: move.from,
//         to: move.to,
//         promotion: 'q'
//       });
      
//       if (result) {
//         setGame(gameCopy);
//         setMoveHistory(prev => [...prev, result.san]);
//         setActivePlayer('white');
//         checkGameStatus(gameCopy);
//       }
//     } catch (error) {
//       console.error("Computer move error:", error);
//     } finally {
//       setIsComputerThinking(false);
//     }
//   }, []);

//   const checkGameStatus = useCallback((gameCopy) => {
//     if (gameCopy.isCheckmate()) {
//       setGameStatus('finished');
//       setWinner(gameCopy.turn() === 'w' ? 'black' : 'white');
//     } else if (gameCopy.isStalemate() || gameCopy.isDraw() || gameCopy.isThreefoldRepetition() || gameCopy.isInsufficientMaterial()) {
//       setGameStatus('finished');
//       setWinner('draw');
//     }
//   }, []);

//   const handleSquareClick = (square) => {
//     if (gameStatus !== 'playing') return;
//     if (gameState?.gameMode === 'vs-computer' && activePlayer !== 'white') return;

//     // If no square selected, select this square if it has a piece of the current player
//     if (!selectedSquare) {
//       const piece = game.get(square);
//       if (piece && piece.color === (activePlayer === 'white' ? 'w' : 'b')) {
//         setSelectedSquare(square);
        
//         // Get valid moves for this piece
//         const moves = game.moves({ 
//           square: square,
//           verbose: true 
//         });
//         setValidMoves(moves.map(m => m.to));
//       }
//     } 
//     // If a square is already selected, try to move
//     else {
//       // Check if the clicked square is a valid destination
//       if (validMoves.includes(square)) {
//         // Make the move
//         const gameCopy = new Chess(game.fen());
//         const move = gameCopy.move({
//           from: selectedSquare,
//           to: square,
//           promotion: 'q'
//         });

//         if (move) {
//           setGame(gameCopy);
//           setMoveHistory(prev => [...prev, move.san]);
//           setActivePlayer(gameState?.gameMode === 'vs-computer' ? 'black' : (activePlayer === 'white' ? 'black' : 'white'));
//           checkGameStatus(gameCopy);
//         }
//       }
      
//       // Clear selection
//       setSelectedSquare(null);
//       setValidMoves([]);
//     }
//   };

//   const getSquareColor = (row, col) => {
//     const isDark = (row + col) % 2 === 1;
//     const square = String.fromCharCode(97 + col) + (8 - row);
    
//     // Highlight selected square
//     if (selectedSquare === square) {
//       return boardColors.highlight;
//     }
    
//     // Highlight valid moves
//     if (validMoves.includes(square)) {
//       return boardColors.highlight;
//     }
    
//     return isDark ? boardColors.dark : boardColors.light;
//   };

//   const renderBoard = () => {
//     const squares = [];
//     const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    
//     for (let row = 0; row < 8; row++) {
//       for (let col = 0; col < 8; col++) {
//         const square = files[col] + (8 - row);
//         const piece = game.get(square);
//         const isDark = (row + col) % 2 === 1;
//         const bgColor = getSquareColor(row, col);
        
//         // Get piece symbol
//         let pieceSymbol = '';
//         if (piece) {
//           const symbols = {
//             'p': '♟', 'n': '♞', 'b': '♝', 'r': '♜', 'q': '♛', 'k': '♚',
//             'P': '♙', 'N': '♘', 'B': '♗', 'R': '♖', 'Q': '♕', 'K': '♔'
//           };
//           pieceSymbol = symbols[piece.type === 'k' && piece.color === 'w' ? 'K' : 
//                          piece.type === 'q' && piece.color === 'w' ? 'Q' :
//                          piece.type === 'r' && piece.color === 'w' ? 'R' :
//                          piece.type === 'b' && piece.color === 'w' ? 'B' :
//                          piece.type === 'n' && piece.color === 'w' ? 'N' :
//                          piece.type === 'p' && piece.color === 'w' ? 'P' :
//                          piece.type === 'k' && piece.color === 'b' ? 'k' :
//                          piece.type === 'q' && piece.color === 'b' ? 'q' :
//                          piece.type === 'r' && piece.color === 'b' ? 'r' :
//                          piece.type === 'b' && piece.color === 'b' ? 'b' :
//                          piece.type === 'n' && piece.color === 'b' ? 'n' : 'p'];
//         }

//         squares.push(
//           <div
//             key={square}
//             onClick={() => handleSquareClick(square)}
//             className="relative flex items-center justify-center text-4xl cursor-pointer transition-colors duration-200"
//             style={{
//               backgroundColor: bgColor,
//               width: '100px',
//               height: '100px',
//               color: piece?.color === 'w' ? '#ffffff' : '#000000',
//               textShadow: piece?.color === 'w' ? '1px 1px 2px rgba(0,0,0,0.3)' : '1px 1px 2px rgba(255,255,255,0.3)'
//             }}
//           >
//             {pieceSymbol}
//             {/* Coordinate labels */}
//             {row === 7 && (
//               <span className="absolute bottom-0 right-1 text-xs opacity-50">
//                 {files[col]}
//               </span>
//             )}
//             {col === 0 && (
//               <span className="absolute top-0 left-1 text-xs opacity-50">
//                 {8 - row}
//               </span>
//             )}
//           </div>
//         );
//       }
//     }

//     // If board is flipped, reverse the squares
//     if (orientation === 'black') {
//       squares.reverse();
//     }

//     return (
//       <div className="grid grid-cols-8 gap-0 border-4 border-[#3a3a3a] rounded-lg overflow-hidden">
//         {squares}
//       </div>
//     );
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
//     if (isComputerThinking) return 'Computer thinking...';
//     return '';
//   };

//   const resetGame = () => {
//     if (computerMoveTimeoutRef.current) {
//       clearTimeout(computerMoveTimeoutRef.current);
//     }
//     if (timerIntervalRef.current) {
//       clearInterval(timerIntervalRef.current);
//     }
    
//     const newGame = new Chess();
//     setGame(newGame);
//     setGameStatus('playing');
//     setMoveHistory([]);
//     setWinner(null);
//     setActivePlayer('white');
//     setIsComputerThinking(false);
//     setSelectedSquare(null);
//     setValidMoves([]);
//     setPlayerTimes({
//       white: parseInt(gameState?.timeControl?.split('+')[0]) * 60 || 600,
//       black: parseInt(gameState?.timeControl?.split('+')[0]) * 60 || 600
//     });
//   };

//   const resign = () => {
//     setGameStatus('finished');
//     setWinner(activePlayer === 'white' ? 'black' : 'white');
//     setSelectedSquare(null);
//     setValidMoves([]);
//   };

//   const offerDraw = () => {
//     alert('Draw offer sent to opponent');
//   };

//   const changeBoardColor = (colorType, colorValue) => {
//     setBoardColors(prev => ({
//       ...prev,
//       [colorType]: colorValue
//     }));
//   };

//   const cycleTheme = () => {
//     const themes = [
//       { dark: "#b58863", light: "#f0d9b5", highlight: "#f7f769", lastMove: "#b9d68c" },
//       { dark: "#769656", light: "#eeeed2", highlight: "#f7f769", lastMove: "#b9d68c" },
//       { dark: "#4a6c8f", light: "#dee3e6", highlight: "#f7f769", lastMove: "#b9d68c" },
//       { dark: "#7d5e4c", light: "#eadbbd", highlight: "#f7f769", lastMove: "#b9d68c" },
//       { dark: "#2c2c2c", light: "#a0a0a0", highlight: "#f7f769", lastMove: "#b9d68c" },
//       { dark: "#8b4513", light: "#d2b48c", highlight: "#f7f769", lastMove: "#b9d68c" },
//     ];
    
//     const currentThemeIndex = themes.findIndex(
//       theme => theme.dark === boardColors.dark && theme.light === boardColors.light
//     );
    
//     const nextThemeIndex = (currentThemeIndex + 1) % themes.length;
//     setBoardColors(themes[nextThemeIndex]);
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
//           {/* Top Player (Black - Computer) */}
//           <div className="bg-[#2a2a2a] rounded-t-lg p-3 flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center">
//                 <span className="text-white font-bold text-lg">C</span>
//               </div>
//               <div>
//                 <div className="flex items-center gap-2">
//                   <span className="text-white font-medium">
//                     {gameState?.gameMode === 'vs-computer' ? 'Computer' : 'Opponent'}
//                   </span>
//                   <span className="bg-[#3a3a3a] text-gray-400 text-xs px-2 py-0.5 rounded">
//                     {gameState?.gameMode === 'vs-computer' ? '1500' : '1500'}
//                   </span>
//                 </div>
//                 {isComputerThinking && gameState?.gameMode === 'vs-computer' && (
//                   <span className="text-xs text-yellow-500 ml-2">Thinking...</span>
//                 )}
//               </div>
//             </div>
//             <div className={`font-mono text-2xl font-bold ${activePlayer === 'black' && gameStatus === 'playing' ? 'text-yellow-500' : 'text-white'}`}>
//               {formatTime(playerTimes.black)}
//             </div>
//           </div>

//           {/* Chess Board */}
//           <div className="bg-[#2a2a2a] p-4">
//             <div className="flex justify-center">
//               {renderBoard()}
//             </div>
            
//             {/* Color Controls */}
//             <div className="flex flex-col gap-2 mt-4">
//               <div className="flex justify-center gap-2">
//                 <button
//                   onClick={cycleTheme}
//                   className="bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white px-4 py-2 rounded-lg text-sm transition"
//                 >
//                   Cycle Board Theme
//                 </button>
//               </div>
              
//               {/* Individual color pickers */}
//               <div className="grid grid-cols-2 gap-2 mt-2">
//                 <div className="flex items-center gap-2">
//                   <label className="text-gray-400 text-xs">Dark:</label>
//                   <input
//                     type="color"
//                     value={boardColors.dark}
//                     onChange={(e) => changeBoardColor('dark', e.target.value)}
//                     className="w-8 h-8 rounded cursor-pointer"
//                   />
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <label className="text-gray-400 text-xs">Light:</label>
//                   <input
//                     type="color"
//                     value={boardColors.light}
//                     onChange={(e) => changeBoardColor('light', e.target.value)}
//                     className="w-8 h-8 rounded cursor-pointer"
//                   />
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <label className="text-gray-400 text-xs">Highlight:</label>
//                   <input
//                     type="color"
//                     value={boardColors.highlight}
//                     onChange={(e) => changeBoardColor('highlight', e.target.value)}
//                     className="w-8 h-8 rounded cursor-pointer"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Bottom Player (White - You) */}
//           <div className="bg-[#2a2a2a] rounded-b-lg p-3 flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-full flex items-center justify-center">
//                 <span className="text-white font-bold text-lg">Y</span>
//               </div>
//               <div>
//                 <div className="flex items-center gap-2">
//                   <span className="text-white font-medium">You</span>
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
//           {/* Header with Game Info */}
//           <div className="p-4 border-b border-[#3a3a3a]">
//             <div className="text-center">
//               <span className="text-white text-xl font-semibold">
//                 {gameState?.timeControl || '10+0'}
//               </span>
//               <p className="text-gray-400 text-sm mt-1">
//                 {gameState?.gameMode === 'vs-computer' ? 'vs Computer' : 'Online Game'}
//               </p>
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
//             <button 
//               onClick={resign}
//               disabled={gameStatus !== 'playing'}
//               className={`w-full py-2.5 rounded-lg text-sm transition flex items-center justify-center gap-2 ${
//                 gameStatus === 'playing' 
//                   ? 'bg-red-500 hover:bg-red-600 text-white' 
//                   : 'bg-[#3a3a3a] text-gray-500 cursor-not-allowed'
//               }`}
//             >
//               <Flag size={16} />
//               Resign
//             </button>
//             <button 
//               onClick={offerDraw}
//               disabled={gameStatus !== 'playing'}
//               className={`w-full py-2.5 rounded-lg text-sm transition flex items-center justify-center gap-2 ${
//                 gameStatus === 'playing'
//                   ? 'bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white'
//                   : 'bg-[#3a3a3a] text-gray-500 cursor-not-allowed'
//               }`}
//             >
//               <Share2 size={16} />
//               Offer Draw
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// // import React, { useState, useEffect, useCallback, useRef } from "react";
// // import { Chessboard } from "react-chessboard";
// // import { Chess } from "chess.js";
// // import {
// //   ArrowLeft,
// //   RotateCcw,
// //   Flag,
// //   Share2,
// //   Menu,
// //   Volume2,
// //   Settings,
// // } from "lucide-react";

// // export default function ChessGame({ gameState, onExit }) {
// //   const [game, setGame] = useState(new Chess());
// //   const [orientation, setOrientation] = useState('white');
// //   const [moveHistory, setMoveHistory] = useState([]);
// //   const [gameStatus, setGameStatus] = useState('playing');
// //   const [playerTimes, setPlayerTimes] = useState({
// //     white: parseInt(gameState?.timeControl?.split('+')[0]) * 60 || 600,
// //     black: parseInt(gameState?.timeControl?.split('+')[0]) * 60 || 600
// //   });
// //   const [activePlayer, setActivePlayer] = useState('white');
// //   const [winner, setWinner] = useState(null);
// //   const [showMenu, setShowMenu] = useState(false);
// //   const [isComputerThinking, setIsComputerThinking] = useState(false);
  
// //   // Refs to prevent stale closures
// //   const gameRef = useRef(game);
// //   const activePlayerRef = useRef(activePlayer);
// //   const gameStatusRef = useRef(gameStatus);
// //   const computerMoveTimeoutRef = useRef(null);
// //   const timerIntervalRef = useRef(null);

// //   // Update refs when state changes
// //   useEffect(() => {
// //     gameRef.current = game;
// //     activePlayerRef.current = activePlayer;
// //     gameStatusRef.current = gameStatus;
// //   }, [game, activePlayer, gameStatus]);

// //   // Computer move logic
// //   useEffect(() => {
// //     // Clear any existing computer move timeout
// //     if (computerMoveTimeoutRef.current) {
// //       clearTimeout(computerMoveTimeoutRef.current);
// //     }

// //     // Check if computer should move
// //     const shouldComputerMove = () => {
// //       if (gameState?.gameMode !== 'vs-computer') return false;
// //       if (gameStatusRef.current !== 'playing') return false;
// //       if (isComputerThinking) return false;
      
// //       // In vs-computer mode, computer plays as black
// //       // So computer moves when activePlayer is 'black'
// //       return activePlayerRef.current === 'black';
// //     };

// //     if (shouldComputerMove()) {
// //       setIsComputerThinking(true);
// //       computerMoveTimeoutRef.current = setTimeout(() => {
// //         makeComputerMove();
// //       }, 500);
// //     }

// //     return () => {
// //       if (computerMoveTimeoutRef.current) {
// //         clearTimeout(computerMoveTimeoutRef.current);
// //       }
// //     };
// //   }, [activePlayer, gameState?.gameMode, gameStatus, isComputerThinking]);

// //   // Timer effect
// //   useEffect(() => {
// //     if (timerIntervalRef.current) {
// //       clearInterval(timerIntervalRef.current);
// //     }

// //     if (gameStatus === 'playing' && !winner) {
// //       timerIntervalRef.current = setInterval(() => {
// //         setPlayerTimes(prev => {
// //           if (gameStatusRef.current !== 'playing') return prev;
          
// //           const newTimes = { ...prev };
// //           const currentPlayer = activePlayerRef.current;
          
// //           newTimes[currentPlayer] = Math.max(0, newTimes[currentPlayer] - 1);
          
// //           if (newTimes[currentPlayer] === 0) {
// //             setGameStatus('finished');
// //             setWinner(currentPlayer === 'white' ? 'black' : 'white');
// //           }
          
// //           return newTimes;
// //         });
// //       }, 1000);
// //     }

// //     return () => {
// //       if (timerIntervalRef.current) {
// //         clearInterval(timerIntervalRef.current);
// //       }
// //     };
// //   }, [gameStatus, winner]);

// //   const makeComputerMove = useCallback(() => {
// //     try {
// //       const currentGame = new Chess(gameRef.current.fen());
      
// //       // Check if game is over
// //       if (currentGame.isGameOver()) {
// //         checkGameStatus(currentGame);
// //         setIsComputerThinking(false);
// //         return;
// //       }

// //       // Get all possible moves
// //       const possibleMoves = currentGame.moves({ verbose: true });
      
// //       if (possibleMoves.length === 0) {
// //         checkGameStatus(currentGame);
// //         setIsComputerThinking(false);
// //         return;
// //       }

// //       // Select a random move (simple computer AI)
// //       const randomIndex = Math.floor(Math.random() * possibleMoves.length);
// //       const move = possibleMoves[randomIndex];
      
// //       // Make the move
// //       const gameCopy = new Chess(gameRef.current.fen());
// //       const result = gameCopy.move({
// //         from: move.from,
// //         to: move.to,
// //         promotion: 'q' // Always promote to queen for simplicity
// //       });
      
// //       if (result) {
// //         setGame(gameCopy);
// //         setMoveHistory(prev => [...prev, result.san]);
// //         setActivePlayer('white'); // Switch back to player's turn
// //         checkGameStatus(gameCopy);
// //       }
// //     } catch (error) {
// //       console.error("Computer move error:", error);
// //     } finally {
// //       setIsComputerThinking(false);
// //     }
// //   }, []);

// //   const makeMove = useCallback((from, to, promotion = 'q') => {
// //     try {
// //       const gameCopy = new Chess(gameRef.current.fen());
      
// //       // Try to make the move
// //       const result = gameCopy.move({
// //         from,
// //         to,
// //         promotion
// //       });
      
// //       if (result) {
// //         setGame(gameCopy);
// //         setMoveHistory(prev => [...prev, result.san]);
// //         setActivePlayer('black'); // Switch to computer's turn
// //         checkGameStatus(gameCopy);
// //         return true;
// //       }
// //       return false;
// //     } catch (error) {
// //       console.error("Move error:", error);
// //       return false;
// //     }
// //   }, []);

// //   const checkGameStatus = useCallback((gameCopy) => {
// //     if (gameCopy.isCheckmate()) {
// //       setGameStatus('finished');
// //       setWinner(gameCopy.turn() === 'w' ? 'black' : 'white');
// //     } else if (gameCopy.isStalemate() || gameCopy.isDraw() || gameCopy.isThreefoldRepetition() || gameCopy.isInsufficientMaterial()) {
// //       setGameStatus('finished');
// //       setWinner('draw');
// //     }
// //   }, []);

// //   const onDrop = useCallback((sourceSquare, targetSquare, piece) => {
// //     // Prevent moves if game is finished
// //     if (gameStatusRef.current !== 'playing') return false;
    
// //     // In vs-computer mode, only allow moves on player's turn (white)
// //     if (gameState?.gameMode === 'vs-computer' && activePlayerRef.current !== 'white') {
// //       return false;
// //     }

// //     // Determine promotion piece (for pawn promotion)
// //     const promotion = piece[1] === 'p' && (targetSquare[1] === '8' || targetSquare[1] === '1') ? 'q' : undefined;
    
// //     // Make the move
// //     const moveSuccessful = makeMove(sourceSquare, targetSquare, promotion);
    
// //     return moveSuccessful;
// //   }, [makeMove, gameState?.gameMode]);

// //   const formatTime = (seconds) => {
// //     const mins = Math.floor(seconds / 60);
// //     const secs = seconds % 60;
// //     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
// //   };

// //   const getGameStatusMessage = () => {
// //     if (winner === 'white') return 'White wins!';
// //     if (winner === 'black') return 'Black wins!';
// //     if (winner === 'draw') return 'Game drawn!';
// //     if (game.isCheck()) return 'Check!';
// //     if (isComputerThinking) return 'Computer thinking...';
// //     return '';
// //   };

// //   const resetGame = () => {
// //     // Clear all timeouts and intervals
// //     if (computerMoveTimeoutRef.current) {
// //       clearTimeout(computerMoveTimeoutRef.current);
// //     }
// //     if (timerIntervalRef.current) {
// //       clearInterval(timerIntervalRef.current);
// //     }
    
// //     const newGame = new Chess();
// //     setGame(newGame);
// //     setGameStatus('playing');
// //     setMoveHistory([]);
// //     setWinner(null);
// //     setActivePlayer('white');
// //     setIsComputerThinking(false);
// //     setPlayerTimes({
// //       white: parseInt(gameState?.timeControl?.split('+')[0]) * 60 || 600,
// //       black: parseInt(gameState?.timeControl?.split('+')[0]) * 60 || 600
// //     });
// //   };

// //   const resign = () => {
// //     setGameStatus('finished');
// //     setWinner(activePlayer === 'white' ? 'black' : 'white');
// //   };

// //   const offerDraw = () => {
// //     alert('Draw offer sent to opponent');
// //   };

// //   return (
// //     <div className="min-h-screen bg-[#1e1e1e] flex flex-col">
// //       {/* Top Navigation Bar */}
// //       <div className="bg-[#2a2a2a] px-4 py-2 flex items-center justify-between border-b border-[#3a3a3a]">
// //         <div className="flex items-center gap-4">
// //           <button 
// //             onClick={onExit}
// //             className="text-gray-400 hover:text-white transition"
// //           >
// //             <ArrowLeft size={20} />
// //           </button>
// //           <button 
// //             onClick={() => setShowMenu(!showMenu)}
// //             className="text-gray-400 hover:text-white transition"
// //           >
// //             <Menu size={20} />
// //           </button>
// //           <div className="flex items-center gap-2">
// //             <span className="text-white font-medium">Play</span>
// //             <span className="text-gray-400">•</span>
// //             <span className="text-gray-400">
// //               {gameState?.gameMode === 'vs-computer' ? 'vs Computer' : 'Online'}
// //             </span>
// //           </div>
// //         </div>
        
// //         <div className="flex items-center gap-2">
// //           <button className="p-2 hover:bg-[#3a3a3a] rounded-lg transition">
// //             <Volume2 size={18} className="text-gray-400" />
// //           </button>
// //           <button className="p-2 hover:bg-[#3a3a3a] rounded-lg transition">
// //             <Settings size={18} className="text-gray-400" />
// //           </button>
// //         </div>
// //       </div>

// //       {/* Main Game Area */}
// //       <div className="flex-1 flex p-4 gap-4">
// //         {/* Left Side - Board and Players */}
// //         <div className="flex-1 flex flex-col">
// //           {/* Top Player (Black - Computer) */}
// //           <div className="bg-[#2a2a2a] rounded-t-lg p-3 flex items-center justify-between">
// //             <div className="flex items-center gap-3">
// //               <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center">
// //                 <span className="text-white font-bold text-lg">C</span>
// //               </div>
// //               <div>
// //                 <div className="flex items-center gap-2">
// //                   <span className="text-white font-medium">
// //                     {gameState?.gameMode === 'vs-computer' ? 'Computer' : 'Opponent'}
// //                   </span>
// //                   <span className="bg-[#3a3a3a] text-gray-400 text-xs px-2 py-0.5 rounded">
// //                     {gameState?.gameMode === 'vs-computer' ? '1500' : '1500'}
// //                   </span>
// //                 </div>
// //                 {isComputerThinking && gameState?.gameMode === 'vs-computer' && (
// //                   <span className="text-xs text-yellow-500 ml-2">Thinking...</span>
// //                 )}
// //               </div>
// //             </div>
// //             <div className={`font-mono text-2xl font-bold ${activePlayer === 'black' && gameStatus === 'playing' ? 'text-yellow-500' : 'text-white'}`}>
// //               {formatTime(playerTimes.black)}
// //             </div>
// //           </div>

// //           {/* Chess Board */}
// //           <div className="bg-[#2a2a2a] p-4">
// //             <div className="w-full max-w-2xl mx-auto aspect-square">
// //               <Chessboard
// //                 position={game.fen()}
// //                 onPieceDrop={onDrop}
// //                 boardOrientation={orientation}
// //                 boardWidth={600}
// //                 customDarkSquareStyle={{
// //                   backgroundColor: "#000000"
// //                 }}
// //                 customLightSquareStyle={{
// //                   backgroundColor: "#ffffff"
// //                 }}
// //                 customBoardStyle={{
// //                   borderRadius: "4px",
// //                   boxShadow: "0 8px 16px rgba(0,0,0,0.4)"
// //                 }}
// //                 arePiecesDraggable={gameStatus === 'playing' && !(gameState?.gameMode === 'vs-computer' && activePlayer === 'black')}
// //               />
// //             </div>
// //           </div>

// //           {/* Bottom Player (White - You) */}
// //           <div className="bg-[#2a2a2a] rounded-b-lg p-3 flex items-center justify-between">
// //             <div className="flex items-center gap-3">
// //               <div className="w-10 h-10 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-full flex items-center justify-center">
// //                 <span className="text-white font-bold text-lg">Y</span>
// //               </div>
// //               <div>
// //                 <div className="flex items-center gap-2">
// //                   <span className="text-white font-medium">You</span>
// //                   <span className="bg-[#3a3a3a] text-gray-400 text-xs px-2 py-0.5 rounded">1450</span>
// //                 </div>
// //               </div>
// //             </div>
// //             <div className={`font-mono text-2xl font-bold ${activePlayer === 'white' && gameStatus === 'playing' ? 'text-yellow-500' : 'text-white'}`}>
// //               {formatTime(playerTimes.white)}
// //             </div>
// //           </div>

// //           {/* Game Status */}
// //           {gameStatus !== 'playing' && (
// //             <div className="mt-4 bg-[#2a2a2a] border border-yellow-500/30 rounded-lg p-4 text-center">
// //               <p className="text-xl font-bold text-yellow-500">{getGameStatusMessage()}</p>
// //               <div className="flex gap-2 mt-3 justify-center">
// //                 <button 
// //                   onClick={resetGame}
// //                   className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg text-sm font-semibold"
// //                 >
// //                   Play Again
// //                 </button>
// //                 <button 
// //                   onClick={onExit}
// //                   className="bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white px-4 py-2 rounded-lg text-sm font-semibold"
// //                 >
// //                   Exit
// //                 </button>
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* Right Sidebar */}
// //         <div className="w-80 bg-[#2a2a2a] rounded-lg flex flex-col">
// //           {/* Header with Game Info */}
// //           <div className="p-4 border-b border-[#3a3a3a]">
// //             <div className="text-center">
// //               <span className="text-white text-xl font-semibold">
// //                 {gameState?.timeControl || '10+0'}
// //               </span>
// //               <p className="text-gray-400 text-sm mt-1">
// //                 {gameState?.gameMode === 'vs-computer' ? 'vs Computer' : 'Online Game'}
// //               </p>
// //             </div>
// //           </div>

// //           {/* Tabs */}
// //           <div className="flex border-b border-[#3a3a3a]">
// //             <button className="flex-1 px-4 py-3 text-sm font-medium text-yellow-500 border-b-2 border-yellow-500">
// //               Moves
// //             </button>
// //             <button className="flex-1 px-4 py-3 text-sm font-medium text-gray-400 hover:text-white">
// //               Chat
// //             </button>
// //           </div>

// //           {/* Move History */}
// //           <div className="flex-1 overflow-y-auto p-4">
// //             <div className="space-y-2">
// //               {moveHistory.length === 0 ? (
// //                 <p className="text-gray-500 text-center py-8">No moves yet</p>
// //               ) : (
// //                 <div className="space-y-2">
// //                   {Array.from({ length: Math.ceil(moveHistory.length / 2) }).map((_, roundIndex) => (
// //                     <div key={roundIndex} className="flex items-center gap-4 text-sm">
// //                       <span className="text-gray-500 w-8">{roundIndex + 1}.</span>
// //                       <span className="text-white flex-1">{moveHistory[roundIndex * 2] || ''}</span>
// //                       {moveHistory[roundIndex * 2 + 1] && (
// //                         <span className="text-white flex-1">{moveHistory[roundIndex * 2 + 1]}</span>
// //                       )}
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* Game Controls */}
// //           <div className="border-t border-[#3a3a3a] p-4 space-y-2">
// //             <button 
// //               onClick={() => setOrientation(orientation === 'white' ? 'black' : 'white')}
// //               className="w-full bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white py-2.5 rounded-lg text-sm transition flex items-center justify-center gap-2"
// //             >
// //               <RotateCcw size={16} />
// //               Flip Board
// //             </button>
// //             <button 
// //               onClick={resign}
// //               disabled={gameStatus !== 'playing'}
// //               className={`w-full py-2.5 rounded-lg text-sm transition flex items-center justify-center gap-2 ${
// //                 gameStatus === 'playing' 
// //                   ? 'bg-red-500 hover:bg-red-600 text-white' 
// //                   : 'bg-[#3a3a3a] text-gray-500 cursor-not-allowed'
// //               }`}
// //             >
// //               <Flag size={16} />
// //               Resign
// //             </button>
// //             <button 
// //               onClick={offerDraw}
// //               disabled={gameStatus !== 'playing'}
// //               className={`w-full py-2.5 rounded-lg text-sm transition flex items-center justify-center gap-2 ${
// //                 gameStatus === 'playing'
// //                   ? 'bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white'
// //                   : 'bg-[#3a3a3a] text-gray-500 cursor-not-allowed'
// //               }`}
// //             >
// //               <Share2 size={16} />
// //               Offer Draw
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }



// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { Chess } from "chess.js";
// import {
//   ArrowLeft,
//   RotateCcw,
//   Flag,
//   Share2,
//   Menu,
//   Volume2,
//   Settings,
//   Loader
// } from "lucide-react";
// import { useGame } from "../../../context/GameContext";
// import { useAuth } from "../../../context/AuthContext";

// export default function ChessGame({ gameState, onExit }) {
//   const [game, setGame] = useState(null);
//   const [isGameInitialized, setIsGameInitialized] = useState(false);
//   const [orientation, setOrientation] = useState('white');
//   const [moveHistory, setMoveHistory] = useState([]);
//   const [gameStatus, setGameStatus] = useState('playing');
//   const [playerTimes, setPlayerTimes] = useState({
//     white: 600,
//     black: 600
//   });
//   const [activePlayer, setActivePlayer] = useState('white');
//   const [winner, setWinner] = useState(null);
//   const [showMenu, setShowMenu] = useState(false);
//   const [isComputerThinking, setIsComputerThinking] = useState(false);
//   const [selectedSquare, setSelectedSquare] = useState(null);
//   const [validMoves, setValidMoves] = useState([]);
//   const [difficulty, setDifficulty] = useState('medium');
//   const [gameId, setGameId] = useState(gameState?.gameId || null);
//   const [gameOverMessage, setGameOverMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentUserId, setCurrentUserId] = useState(null);
//   const [playerColor, setPlayerColor] = useState(null); // 'white' or 'black'
  
//   const { getComputerMove, endGame, makeMove } = useGame();
//   const { socket, user } = useAuth();

//   // Board color customization
//   const [boardColors, setBoardColors] = useState({
//     dark: "#b58863",
//     light: "#f0d9b5",
//     highlight: "#f7f769",
//     lastMove: "#b9d68c"
//   });

//   // Refs
//   const gameRef = useRef(null);
//   const activePlayerRef = useRef(activePlayer);
//   const gameStatusRef = useRef(gameStatus);
//   const computerMoveTimeoutRef = useRef(null);
//   const timerIntervalRef = useRef(null);

//   // Initialize game and determine player color
//   useEffect(() => {
//     const initializeGame = () => {
//       try {
//         setIsLoading(true);
        
//         // Set current user ID
//         if (user?.id) {
//           setCurrentUserId(user.id);
//         }
        
//         // Create new chess game
//         let newGame;
//         if (gameState?.currentFen) {
//           newGame = new Chess(gameState.currentFen);
//         } else {
//           newGame = new Chess();
//         }
        
//         setGame(newGame);
//         gameRef.current = newGame;
        
//         // Set difficulty
//         if (gameState?.difficulty) {
//           setDifficulty(gameState.difficulty);
//         }
        
//         // Set gameId
//         if (gameState?.gameId) {
//           setGameId(gameState.gameId);
//         }
        
//         // Determine player's color
//         if (gameState?.gameMode === 'online' && gameState?.players && user?.id) {
//           const currentPlayer = gameState.players.find(p => p.userId === user.id);
//           if (currentPlayer) {
//             setPlayerColor(currentPlayer.color);
//             console.log(`Player color: ${currentPlayer.color}`);
//           } else {
//             // Default to white if not found (shouldn't happen)
//             setPlayerColor('white');
//           }
//         } else if (gameState?.gameMode === 'vs-computer') {
//           // Player always plays as white against computer
//           setPlayerColor('white');
//         }
        
//         // Set player times
//         if (gameState?.timeControl) {
//           const [minutes] = gameState.timeControl.split('+').map(Number);
//           setPlayerTimes({
//             white: minutes * 60,
//             black: minutes * 60
//           });
//         }
        
//         // Load move history if available
//         if (gameState?.moves && gameState.moves.length > 0) {
//           setMoveHistory(gameState.moves.map(m => m.san));
//         }
        
//         setIsGameInitialized(true);
//         setIsLoading(false);
        
//         console.log('Game initialized successfully');
//       } catch (error) {
//         console.error('Error initializing game:', error);
//         setIsLoading(false);
//       }
//     };

//     initializeGame();
//   }, [gameState, user]);

//   // Update refs when game initializes
//   useEffect(() => {
//     if (game) {
//       gameRef.current = game;
//     }
//   }, [game]);

//   // Update refs for activePlayer and gameStatus
//   useEffect(() => {
//     activePlayerRef.current = activePlayer;
//     gameStatusRef.current = gameStatus;
//   }, [activePlayer, gameStatus]);

//   // Socket listeners for online games
//   useEffect(() => {
//     if (!isGameInitialized) return;
//     if (gameState?.gameMode !== 'online' || !socket || !gameId) return;

//     socket.emit('join-game', { gameId });

//     socket.on('move-made', handleOpponentMove);
//     socket.on('game-completed', handleGameCompleted);
//     socket.on('receive-message', handleReceiveMessage);

//     return () => {
//       socket.off('move-made');
//       socket.off('game-completed');
//       socket.off('receive-message');
//     };
//   }, [socket, gameId, gameState?.gameMode, isGameInitialized]);

//   // Computer move logic using API
//   useEffect(() => {
//     if (!isGameInitialized) return;
//     if (!game) return;
    
//     if (computerMoveTimeoutRef.current) {
//       clearTimeout(computerMoveTimeoutRef.current);
//     }

//     const shouldComputerMove = () => {
//       if (gameState?.gameMode !== 'vs-computer') return false;
//       if (gameStatusRef.current !== 'playing') return false;
//       if (isComputerThinking) return false;
//       if (!gameId) return false;
//       return activePlayerRef.current === 'black';
//     };

//     if (shouldComputerMove()) {
//       setIsComputerThinking(true);
//       computerMoveTimeoutRef.current = setTimeout(async () => {
//         await makeComputerMove();
//       }, 500);
//     }

//     return () => {
//       if (computerMoveTimeoutRef.current) {
//         clearTimeout(computerMoveTimeoutRef.current);
//       }
//     };
//   }, [activePlayer, gameState?.gameMode, gameStatus, gameId, isGameInitialized, game]);

//   // Timer effect
//   useEffect(() => {
//     if (!isGameInitialized) return;
//     if (gameStatus !== 'playing' || winner) return;

//     if (timerIntervalRef.current) {
//       clearInterval(timerIntervalRef.current);
//     }

//     timerIntervalRef.current = setInterval(() => {
//       setPlayerTimes(prev => {
//         if (gameStatusRef.current !== 'playing') return prev;
        
//         const newTimes = { ...prev };
//         const currentPlayer = activePlayerRef.current;
        
//         newTimes[currentPlayer] = Math.max(0, newTimes[currentPlayer] - 1);
        
//         // Check for timeout
//         if (newTimes[currentPlayer] === 0) {
//           handleTimeout();
//         }
        
//         return newTimes;
//       });
//     }, 1000);

//     return () => {
//       if (timerIntervalRef.current) {
//         clearInterval(timerIntervalRef.current);
//       }
//     };
//   }, [gameStatus, winner, isGameInitialized]);

//   const handleOpponentMove = (data) => {
//     if (!game) return;
    
//     try {
//       const gameCopy = new Chess(game.fen());
//       const moveResult = gameCopy.move({
//         from: data.move.from,
//         to: data.move.to,
//         promotion: data.move.promotion || 'q'
//       });
      
//       if (moveResult) {
//         setGame(gameCopy);
//         gameRef.current = gameCopy;
//         setMoveHistory(prev => [...prev, moveResult.san]);
        
//         // Update active player - after opponent moves, it becomes your turn
//         setActivePlayer(prev => prev === 'white' ? 'black' : 'white');
        
//         if (data.timeLeft) {
//           setPlayerTimes(prev => ({
//             ...prev,
//             [activePlayer]: data.timeLeft
//           }));
//         }
        
//         checkGameStatus(gameCopy);
//       }
//     } catch (error) {
//       console.error('Error handling opponent move:', error);
//     }
//   };

//   const handleGameCompleted = (data) => {
//     setGameStatus('finished');
//     setWinner(data.result);
//     setGameOverMessage(
//       data.result === 'white' ? 'White wins!' :
//       data.result === 'black' ? 'Black wins!' :
//       'Game drawn!'
//     );
//   };

//   const handleReceiveMessage = (data) => {
//     console.log('Message received:', data);
//   };

//   const makeComputerMove = useCallback(async () => {
//     if (!game || !gameId) return;
    
//     try {
//       const result = await getComputerMove(gameId, game.fen(), difficulty);
      
//       if (result.success) {
//         if (result.gameOver) {
//           handleGameOver(result);
//           return;
//         }

//         if (result.move) {
//           const move = result.move;
          
//           // Make the move on the board
//           const gameCopy = new Chess(gameRef.current.fen());
//           const moveResult = gameCopy.move({
//             from: move.from,
//             to: move.to,
//             promotion: move.promotion || 'q'
//           });
          
//           if (moveResult) {
//             setGame(gameCopy);
//             gameRef.current = gameCopy;
//             setMoveHistory(prev => [...prev, moveResult.san]);
//             setActivePlayer('white');
            
//             // Update computer's time
//             if (result.timeRemaining) {
//               setPlayerTimes(prev => ({
//                 ...prev,
//                 black: result.timeRemaining
//               }));
//             }

//             // Check game status after computer move
//             checkGameStatus(gameCopy);
//           }
//         }
//       } else {
//         console.error('Computer move failed:', result.message);
//       }
//     } catch (error) {
//       console.error("Computer move error:", error);
//     } finally {
//       setIsComputerThinking(false);
//     }
//   }, [gameId, difficulty, getComputerMove, game]);

//   const handleTimeout = () => {
//     if (!game) return;
    
//     const winner = activePlayer === 'white' ? 'black' : 'white';
//     const winnerName = winner === 'white' ? 'White' : 'Black';
//     setGameStatus('finished');
//     setWinner(winner);
//     setGameOverMessage(`${winnerName} wins on time!`);
    
//     if (gameId) {
//       endGame(gameId, winner, 'timeout');
//     }

//     if (gameState?.gameMode === 'online' && socket) {
//       socket.emit('game-ended', {
//         gameId,
//         result: winner,
//         termination: 'timeout'
//       });
//     }
//   };

//   const handleGameOver = (result) => {
//     if (!game) return;
    
//     setGameStatus('finished');
    
//     if (result.checkmate) {
//       const checkmatedColor = game.turn() === 'w' ? 'white' : 'black';
//       const winner = checkmatedColor === 'white' ? 'black' : 'white';
//       const winnerName = winner === 'white' ? 'White' : 'Black';
      
//       setWinner(winner);
//       setGameOverMessage(`Checkmate! ${winnerName} wins!`);
      
//       if (gameId) {
//         endGame(gameId, winner, 'checkmate');
//       }

//       if (gameState?.gameMode === 'online' && socket) {
//         socket.emit('game-ended', {
//           gameId,
//           result: winner,
//           termination: 'checkmate'
//         });
//       }
//     } else if (result.draw) {
//       setWinner('draw');
//       setGameOverMessage('Game drawn!');
      
//       if (gameId) {
//         endGame(gameId, 'draw', 'draw');
//       }

//       if (gameState?.gameMode === 'online' && socket) {
//         socket.emit('game-ended', {
//           gameId,
//           result: 'draw',
//           termination: 'draw'
//         });
//       }
//     } else if (result.stalemate) {
//       setWinner('draw');
//       setGameOverMessage('Stalemate! Game drawn!');
      
//       if (gameId) {
//         endGame(gameId, 'draw', 'stalemate');
//       }

//       if (gameState?.gameMode === 'online' && socket) {
//         socket.emit('game-ended', {
//           gameId,
//           result: 'draw',
//           termination: 'stalemate'
//         });
//       }
//     }
//   };

//   const checkGameStatus = useCallback((gameCopy) => {
//     if (!gameCopy) return false;
    
//     if (gameCopy.isCheckmate()) {
//       const checkmatedColor = gameCopy.turn() === 'w' ? 'white' : 'black';
//       const winner = checkmatedColor === 'white' ? 'black' : 'white';
//       const winnerName = winner === 'white' ? 'White' : 'Black';
      
//       setGameStatus('finished');
//       setWinner(winner);
//       setGameOverMessage(`Checkmate! ${winnerName} wins!`);
      
//       if (gameId) {
//         endGame(gameId, winner, 'checkmate');
//       }

//       if (gameState?.gameMode === 'online' && socket) {
//         socket.emit('game-ended', {
//           gameId,
//           result: winner,
//           termination: 'checkmate'
//         });
//       }
//       return true;
//     }
    
//     if (gameCopy.isStalemate()) {
//       setGameStatus('finished');
//       setWinner('draw');
//       setGameOverMessage('Stalemate! Game drawn!');
      
//       if (gameId) {
//         endGame(gameId, 'draw', 'stalemate');
//       }

//       if (gameState?.gameMode === 'online' && socket) {
//         socket.emit('game-ended', {
//           gameId,
//           result: 'draw',
//           termination: 'stalemate'
//         });
//       }
//       return true;
//     }
    
//     if (gameCopy.isDraw() || gameCopy.isThreefoldRepetition() || gameCopy.isInsufficientMaterial()) {
//       setGameStatus('finished');
//       setWinner('draw');
//       setGameOverMessage('Game drawn!');
      
//       if (gameId) {
//         endGame(gameId, 'draw', 'draw');
//       }

//       if (gameState?.gameMode === 'online' && socket) {
//         socket.emit('game-ended', {
//           gameId,
//           result: 'draw',
//           termination: 'draw'
//         });
//       }
//       return true;
//     }
    
//     return false;
//   }, [gameId, endGame, gameState?.gameMode, socket]);

//   // Check if it's the current player's turn
//   const isMyTurn = () => {
//     if (gameState?.gameMode === 'vs-computer') {
//       // Against computer, player is always white
//       return activePlayer === 'white';
//     } else if (gameState?.gameMode === 'online') {
//       // Online game, check if active player matches player's color
//       return activePlayer === playerColor;
//     }
//     return false;
//   };

//   const handleSquareClick = async (square) => {
//     if (!isGameInitialized || !game) return;
//     if (gameStatus !== 'playing') return;
    
//     // Check if it's this player's turn
//     if (!isMyTurn()) {
//       console.log('Not your turn!');
//       return;
//     }
    
//     if (isComputerThinking) return;

//     if (!selectedSquare) {
//       const piece = game.get(square);
//       // Only allow selecting pieces of the current player's color
//       if (piece && piece.color === (activePlayer === 'white' ? 'w' : 'b')) {
//         setSelectedSquare(square);
        
//         const moves = game.moves({ 
//           square: square,
//           verbose: true 
//         });
//         setValidMoves(moves.map(m => m.to));
//       }
//     } else {
//       if (validMoves.includes(square)) {
//         const gameCopy = new Chess(game.fen());
//         const move = gameCopy.move({
//           from: selectedSquare,
//           to: square,
//           promotion: 'q'
//         });

//         if (move) {
//           setGame(gameCopy);
//           gameRef.current = gameCopy;
//           setMoveHistory(prev => [...prev, move.san]);
          
//           const timeTaken = 1;
          
//           setPlayerTimes(prev => ({
//             ...prev,
//             [activePlayer]: prev[activePlayer] - timeTaken
//           }));

//           // Save move to database for online games
//           if (gameId && gameState?.gameMode === 'online') {
//             await makeMove(gameId, {
//               from: selectedSquare,
//               to: square,
//               promotion: 'q',
//               fen: gameCopy.fen(),
//               san: move.san,
//               moveNumber: moveHistory.length + 1,
//               timeTaken
//             });
//           }
          
//           // Determine next player
//           let nextPlayer;
//           if (gameState?.gameMode === 'vs-computer') {
//             nextPlayer = 'black';
//           } else {
//             nextPlayer = activePlayer === 'white' ? 'black' : 'white';
//           }
//           setActivePlayer(nextPlayer);
          
//           // Emit move for online games
//           if (gameState?.gameMode === 'online' && socket) {
//             socket.emit('make-move', {
//               gameId,
//               move: {
//                 from: selectedSquare,
//                 to: square,
//                 promotion: 'q',
//                 san: move.san
//               },
//               fen: gameCopy.fen(),
//               timeLeft: playerTimes[nextPlayer],
//               playerColor: activePlayer
//             });
//           }
          
//           const gameOver = checkGameStatus(gameCopy);
          
//           if (gameOver) {
//             setSelectedSquare(null);
//             setValidMoves([]);
//             return;
//           }
//         }
//       }
      
//       setSelectedSquare(null);
//       setValidMoves([]);
//     }
//   };

//   const getSquareColor = (row, col) => {
//     const isDark = (row + col) % 2 === 1;
//     const square = String.fromCharCode(97 + col) + (8 - row);
    
//     if (selectedSquare === square) {
//       return "#f7f769";
//     }
    
//     if (validMoves.includes(square)) {
//       return "#b9d68c";
//     }
    
//     return isDark ? boardColors.dark : boardColors.light;
//   };

//   const renderBoard = () => {
//     if (!game || !isGameInitialized) {
//       return (
//         <div className="flex items-center justify-center" style={{ width: '640px', height: '640px' }}>
//           <Loader className="animate-spin text-amber-400" size={48} />
//         </div>
//       );
//     }

//     const squares = [];
//     const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    
//     const rows = orientation === 'white' ? [0, 1, 2, 3, 4, 5, 6, 7] : [7, 6, 5, 4, 3, 2, 1, 0];
//     const cols = orientation === 'white' ? [0, 1, 2, 3, 4, 5, 6, 7] : [7, 6, 5, 4, 3, 2, 1, 0];
    
//     for (let row of rows) {
//       const rowSquares = [];
//       for (let col of cols) {
//         const square = files[col] + (8 - row);
//         const piece = game.get(square);
//         const bgColor = getSquareColor(row, col);
        
//         let pieceSymbol = '';
//         if (piece) {
//           const symbols = {
//             'p': '♟', 'n': '♞', 'b': '♝', 'r': '♜', 'q': '♛', 'k': '♚',
//             'P': '♙', 'N': '♘', 'B': '♗', 'R': '♖', 'Q': '♕', 'K': '♔'
//           };
//           pieceSymbol = symbols[piece.type === 'k' && piece.color === 'w' ? 'K' : 
//                          piece.type === 'q' && piece.color === 'w' ? 'Q' :
//                          piece.type === 'r' && piece.color === 'w' ? 'R' :
//                          piece.type === 'b' && piece.color === 'w' ? 'B' :
//                          piece.type === 'n' && piece.color === 'w' ? 'N' :
//                          piece.type === 'p' && piece.color === 'w' ? 'P' :
//                          piece.type === 'k' && piece.color === 'b' ? 'k' :
//                          piece.type === 'q' && piece.color === 'b' ? 'q' :
//                          piece.type === 'r' && piece.color === 'b' ? 'r' :
//                          piece.type === 'b' && piece.color === 'b' ? 'b' :
//                          piece.type === 'n' && piece.color === 'b' ? 'n' : 'p'];
//         }

//         rowSquares.push(
//           <div
//             key={square}
//             onClick={() => handleSquareClick(square)}
//             className="relative flex items-center justify-center text-4xl cursor-pointer transition-colors duration-200 hover:opacity-90"
//             style={{
//               backgroundColor: bgColor,
//               width: '80px',
//               height: '80px',
//               color: piece?.color === 'w' ? '#ffffff' : '#000000',
//               textShadow: piece?.color === 'w' ? '1px 1px 2px rgba(0,0,0,0.3)' : '1px 1px 2px rgba(255,255,255,0.3)'
//             }}
//           >
//             {pieceSymbol}
//             {row === (orientation === 'white' ? 7 : 0) && (
//               <span className="absolute bottom-0 right-1 text-xs opacity-50 text-black">
//                 {files[col]}
//               </span>
//             )}
//             {col === (orientation === 'white' ? 0 : 7) && (
//               <span className="absolute top-0 left-1 text-xs opacity-50 text-black">
//                 {8 - row}
//               </span>
//             )}
//           </div>
//         );
//       }
//       squares.push(
//         <div key={row} className="flex">
//           {rowSquares}
//         </div>
//       );
//     }

//     return (
//       <div className="board-container">
//         {squares}
//       </div>
//     );
//   };

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   const getGameStatusMessage = () => {
//     if (!isGameInitialized) return 'Initializing game...';
//     if (gameOverMessage) return gameOverMessage;
//     if (game && game.isCheck() && gameStatus === 'playing') {
//       const playerInCheck = game.turn() === 'w' ? 'Black' : 'White';
//       return `${playerInCheck} is in check!`;
//     }
//     if (isComputerThinking) return 'Computer thinking...';
//     if (gameState?.gameMode === 'online') {
//       if (activePlayer === playerColor) {
//         return "Your turn";
//       } else {
//         return "Opponent's turn";
//       }
//     }
//     if (activePlayer === 'white') return "Your turn";
//     return "Computer's turn";
//   };

//   const resetGame = () => {
//     if (computerMoveTimeoutRef.current) {
//       clearTimeout(computerMoveTimeoutRef.current);
//     }
//     if (timerIntervalRef.current) {
//       clearInterval(timerIntervalRef.current);
//     }
    
//     const newGame = new Chess();
//     setGame(newGame);
//     gameRef.current = newGame;
//     setGameStatus('playing');
//     setMoveHistory([]);
//     setWinner(null);
//     setActivePlayer('white');
//     setIsComputerThinking(false);
//     setSelectedSquare(null);
//     setValidMoves([]);
//     setGameOverMessage('');
    
//     if (gameState?.timeControl) {
//       const [minutes] = gameState.timeControl.split('+').map(Number);
//       setPlayerTimes({
//         white: minutes * 60,
//         black: minutes * 60
//       });
//     }
//   };

//   const resign = () => {
//     if (!game) return;
    
//     const winner = activePlayer === 'white' ? 'black' : 'white';
//     const winnerName = winner === 'white' ? 'White' : 'Black';
//     setGameStatus('finished');
//     setWinner(winner);
//     setGameOverMessage(`${winnerName} wins by resignation!`);
//     setSelectedSquare(null);
//     setValidMoves([]);
    
//     if (gameId) {
//       endGame(gameId, winner, 'resignation');
//     }

//     if (gameState?.gameMode === 'online' && socket) {
//       socket.emit('game-ended', {
//         gameId,
//         result: winner,
//         termination: 'resignation'
//       });
//     }
//   };

//   const offerDraw = () => {
//     if (!game) return;
    
//     if (gameState?.gameMode === 'vs-computer') {
//       const shouldAccept = Math.random() > 0.7;
//       if (shouldAccept) {
//         setGameStatus('finished');
//         setWinner('draw');
//         setGameOverMessage('Draw accepted!');
//         if (gameId) {
//           endGame(gameId, 'draw', 'agreement');
//         }
//       } else {
//         alert('Computer declined your draw offer. Continue playing.');
//       }
//     } else if (gameState?.gameMode === 'online' && socket) {
//       socket.emit('offer-draw', { gameId, userId: user?.id });
//       alert('Draw offer sent to opponent');
//     } else {
//       alert('Draw offer sent to opponent');
//     }
//   };

//   const cycleTheme = () => {
//     const themes = [
//       { dark: "#b58863", light: "#f0d9b5" },
//       { dark: "#769656", light: "#eeeed2" },
//       { dark: "#4a6c8f", light: "#dee3e6" },
//       { dark: "#7d5e4c", light: "#eadbbd" },
//       { dark: "#2c2c2c", light: "#a0a0a0" },
//       { dark: "#8b4513", light: "#d2b48c" },
//     ];
    
//     const currentThemeIndex = themes.findIndex(
//       theme => theme.dark === boardColors.dark && theme.light === boardColors.light
//     );
    
//     const nextThemeIndex = (currentThemeIndex + 1) % themes.length;
//     setBoardColors({
//       dark: themes[nextThemeIndex].dark,
//       light: themes[nextThemeIndex].light,
//       highlight: "#f7f769",
//       lastMove: "#b9d68c"
//     });
//   };

//   if (isLoading || !isGameInitialized) {
//     return (
//       <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center">
//         <div className="text-white flex items-center gap-3">
//           <Loader className="animate-spin text-amber-400" size={24} />
//           <span>Loading game...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#1e1e1e] flex flex-col">
//       {/* Top Navigation Bar */}
//       <div className="bg-[#2a2a2a] px-4 py-2 flex items-center justify-between border-b border-[#3a3a3a]">
//         <div className="flex items-center gap-4">
//           <button 
//             onClick={onExit}
//             className="text-gray-400 hover:text-white transition"
//             disabled={isComputerThinking}
//           >
//             <ArrowLeft size={20} />
//           </button>
//           <button 
//             onClick={() => setShowMenu(!showMenu)}
//             className="text-gray-400 hover:text-white transition"
//             disabled={isComputerThinking}
//           >
//             <Menu size={20} />
//           </button>
//           <div className="flex items-center gap-2">
//             <span className="text-white font-medium">Play</span>
//             <span className="text-gray-400">•</span>
//             <span className="text-gray-400">
//               {gameState?.gameMode === 'vs-computer' ? `vs Computer (${difficulty})` : 'Online'}
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
//           {/* Top Player (Black) */}
//           <div className="bg-[#2a2a2a] rounded-t-lg p-3 flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center">
//                 <span className="text-white font-bold text-lg">
//                   {gameState?.players?.find(p => p.color === 'black')?.username?.charAt(0) || 'C'}
//                 </span>
//               </div>
//               <div>
//                 <div className="flex items-center gap-2">
//                   <span className="text-white font-medium">
//                     {gameState?.players?.find(p => p.color === 'black')?.username || 
//                      (gameState?.gameMode === 'vs-computer' ? `Computer (${difficulty})` : 'Opponent')}
//                   </span>
//                   <span className="bg-[#3a3a3a] text-gray-400 text-xs px-2 py-0.5 rounded">
//                     {gameState?.players?.find(p => p.color === 'black')?.rating || '1500'}
//                   </span>
//                 </div>
//                 {gameState?.gameMode === 'online' && activePlayer === 'black' && (
//                   <span className="text-xs text-yellow-500 ml-2">Opponent's turn</span>
//                 )}
//                 {isComputerThinking && gameState?.gameMode === 'vs-computer' && (
//                   <span className="text-xs text-yellow-500 ml-2 flex items-center gap-1">
//                     <Loader size={12} className="animate-spin" />
//                     Thinking...
//                   </span>
//                 )}
//               </div>
//             </div>
//             <div className={`font-mono text-2xl font-bold ${activePlayer === 'black' && gameStatus === 'playing' ? 'text-yellow-500' : 'text-white'}`}>
//               {formatTime(playerTimes.black)}
//             </div>
//           </div>

//           {/* Chess Board */}
//           <div className="bg-[#2a2a2a] p-4 flex justify-center">
//             <div className="border-4 border-[#3a3a3a] rounded-lg overflow-hidden">
//               {renderBoard()}
//             </div>
//           </div>

//           {/* Bottom Player (White - You) */}
//           <div className="bg-[#2a2a2a] rounded-b-lg p-3 flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-full flex items-center justify-center">
//                 <span className="text-white font-bold text-lg">
//                   {gameState?.players?.find(p => p.color === 'white')?.username?.charAt(0) || 'Y'}
//                 </span>
//               </div>
//               <div>
//                 <div className="flex items-center gap-2">
//                   <span className="text-white font-medium">
//                     {gameState?.players?.find(p => p.color === 'white')?.username || 'You'}
//                   </span>
//                   <span className="bg-[#3a3a3a] text-gray-400 text-xs px-2 py-0.5 rounded">
//                     {gameState?.players?.find(p => p.color === 'white')?.rating || '1450'}
//                   </span>
//                 </div>
//                 {gameState?.gameMode === 'online' && activePlayer === 'white' && (
//                   <span className="text-xs text-green-500 ml-2">Your turn</span>
//                 )}
//                 {gameState?.gameMode === 'vs-computer' && activePlayer === 'white' && !isComputerThinking && (
//                   <span className="text-xs text-green-500 ml-2">Your turn</span>
//                 )}
//               </div>
//             </div>
//             <div className={`font-mono text-2xl font-bold ${activePlayer === 'white' && gameStatus === 'playing' ? 'text-yellow-500' : 'text-white'}`}>
//               {formatTime(playerTimes.white)}
//             </div>
//           </div>

//           {/* Game Status */}
//           <div className="mt-4 bg-[#2a2a2a] rounded-lg p-4 text-center">
//             <p className={`text-lg font-semibold ${
//               gameStatus !== 'playing' ? 'text-yellow-500' : 
//               (game && game.isCheck()) ? 'text-red-500' : 'text-gray-300'
//             }`}>
//               {getGameStatusMessage()}
//             </p>
            
//             {gameStatus !== 'playing' && (
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
//             )}
//           </div>

//           {/* Board Theme Control */}
//           <div className="mt-4 flex justify-center">
//             <button
//               onClick={cycleTheme}
//               className="bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white px-4 py-2 rounded-lg text-sm transition flex items-center gap-2"
//               disabled={isComputerThinking}
//             >
//               <RotateCcw size={16} />
//               Cycle Board Theme
//             </button>
//           </div>
//         </div>

//         {/* Right Sidebar */}
//         <div className="w-80 bg-[#2a2a2a] rounded-lg flex flex-col">
//           {/* Header with Game Info */}
//           <div className="p-4 border-b border-[#3a3a3a]">
//             <div className="text-center">
//               <span className="text-white text-xl font-semibold">
//                 {gameState?.timeControl || '10+0'}
//               </span>
//               <p className="text-gray-400 text-sm mt-1">
//                 {gameState?.gameMode === 'vs-computer' ? `vs Computer (${difficulty})` : 'Online Game'}
//               </p>
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
//           <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
//             <div className="space-y-2">
//               {moveHistory.length === 0 ? (
//                 <p className="text-gray-500 text-center py-8">No moves yet</p>
//               ) : (
//                 <div className="space-y-1">
//                   {Array.from({ length: Math.ceil(moveHistory.length / 2) }).map((_, roundIndex) => {
//                     const whiteMove = moveHistory[roundIndex * 2];
//                     const blackMove = moveHistory[roundIndex * 2 + 1];
                    
//                     return (
//                       <div key={roundIndex} className="flex items-center gap-2 text-sm py-1 border-b border-[#3a3a3a] last:border-0">
//                         <span className="text-gray-500 w-8">{roundIndex + 1}.</span>
//                         <span className="text-white flex-1 font-mono">{whiteMove || ''}</span>
//                         {blackMove && (
//                           <span className="text-white flex-1 font-mono">{blackMove}</span>
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Game Controls */}
//           <div className="border-t border-[#3a3a3a] p-4 space-y-2">
//             <button 
//               onClick={() => setOrientation(orientation === 'white' ? 'black' : 'white')}
//               className="w-full bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white py-2.5 rounded-lg text-sm transition flex items-center justify-center gap-2"
//               disabled={isComputerThinking}
//             >
//               <RotateCcw size={16} />
//               Flip Board
//             </button>
//             <button 
//               onClick={resign}
//               disabled={gameStatus !== 'playing' || isComputerThinking}
//               className={`w-full py-2.5 rounded-lg text-sm transition flex items-center justify-center gap-2 ${
//                 gameStatus === 'playing' && !isComputerThinking
//                   ? 'bg-red-500 hover:bg-red-600 text-white' 
//                   : 'bg-[#3a3a3a] text-gray-500 cursor-not-allowed'
//               }`}
//             >
//               <Flag size={16} />
//               Resign
//             </button>
//             <button 
//               onClick={offerDraw}
//               disabled={gameStatus !== 'playing' || isComputerThinking}
//               className={`w-full py-2.5 rounded-lg text-sm transition flex items-center justify-center gap-2 ${
//                 gameStatus === 'playing' && !isComputerThinking
//                   ? 'bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white'
//                   : 'bg-[#3a3a3a] text-gray-500 cursor-not-allowed'
//               }`}
//             >
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
import { Chess } from "chess.js";
import {
  ArrowLeft,
  RotateCcw,
  Flag,
  Share2,
  Menu,
  Volume2,
  Settings,
  Loader
} from "lucide-react";
import { useGame } from "../../../context/GameContext";
import { useAuth } from "../../../context/AuthContext";

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
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [validMoves, setValidMoves] = useState([]);
  const [difficulty, setDifficulty] = useState('medium');
  const [gameId, setGameId] = useState(gameState?.gameId || null);
  const [gameOverMessage, setGameOverMessage] = useState('');

  const { getComputerMove, endGame, makeMove, getGameById } = useGame();
  const { socket, user } = useAuth();

  // Board color customization
  const [boardColors, setBoardColors] = useState({
    dark: "#b58863",
    light: "#f0d9b5",
    highlight: "#f7f769",
    lastMove: "#b9d68c"
  });

  // Refs
  const gameRef = useRef(game);
  const activePlayerRef = useRef(activePlayer);
  const gameStatusRef = useRef(gameStatus);
  const computerMoveTimeoutRef = useRef(null);
  const timerIntervalRef = useRef(null);

  // Set difficulty from gameState if available
  useEffect(() => {
    if (gameState?.difficulty) {
      setDifficulty(gameState.difficulty);
    }
    if (gameState?.gameId) {
      setGameId(gameState.gameId);
    }
    // Initialize game with proper FEN if provided
    if (gameState?.currentFen) {
      const newGame = new Chess(gameState.currentFen);
      setGame(newGame);
      // Load move history if available
      if (gameState.moves) {
        setMoveHistory(gameState.moves.map(m => m.san));
      }
    }
  }, [gameState]);
  console.log("Logged in user:", user.id);
  console.log("Game players:", gameState.players);
  useEffect(() => {
    if (!gameState || !user) return;

    const currentPlayer = gameState.players?.find(
      p => p.userId?.toString() === user?.id?.toString()
    );
    console.log("Current player:", currentPlayer);
    console.log("Current player color:", currentPlayer?.color);
    if (currentPlayer) {
      setOrientation(currentPlayer.color);  // 🔥 THIS FIXES BOARD SIDE
    }
  }, [gameState, user]);
  // Socket listeners for online games
  useEffect(() => {
    if (gameState?.gameMode !== 'online' || !socket || !gameId) return;

    socket.emit('join-game', { gameId });

    socket.on('move-made', handleOpponentMove);
    socket.on('game-completed', handleGameCompleted);
    socket.on('receive-message', handleReceiveMessage);

    return () => {
      socket.off('move-made');
      socket.off('game-completed');
      socket.off('receive-message');
    };
  }, [socket, gameId, gameState?.gameMode]);

  // Update refs
  useEffect(() => {
    gameRef.current = game;
    activePlayerRef.current = activePlayer;
    gameStatusRef.current = gameStatus;
  }, [game, activePlayer, gameStatus]);

  // Computer move logic using API
  useEffect(() => {
    if (computerMoveTimeoutRef.current) {
      clearTimeout(computerMoveTimeoutRef.current);
    }

    const shouldComputerMove = () => {
      if (gameState?.gameMode !== 'vs-computer') return false;
      if (gameStatusRef.current !== 'playing') return false;
      if (isComputerThinking) return false;
      if (!gameId) return false;
      return activePlayerRef.current === 'black';
    };

    if (shouldComputerMove()) {
      setIsComputerThinking(true);
      computerMoveTimeoutRef.current = setTimeout(async () => {
        await makeComputerMove();
      }, 500);
    }

    return () => {
      if (computerMoveTimeoutRef.current) {
        clearTimeout(computerMoveTimeoutRef.current);
      }
    };
  }, [activePlayer, gameState?.gameMode, gameStatus, gameId]);

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

          // Check for timeout
          if (newTimes[currentPlayer] === 0) {
            handleTimeout();
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

  const handleOpponentMove = (data) => {
    const gameCopy = new Chess(data.fen); // 🔥 USE SERVER FEN

    setGame(gameCopy);
    setMoveHistory(prev => [...prev, data.move.san]);
    setActivePlayer(prev => prev === 'white' ? 'black' : 'white');
    console.log("Opponent move received:", data.move);

    if (data.timeLeft) {
      setPlayerTimes(prev => ({
        ...prev,
        [data.playerColor]: data.timeLeft
      }));
    }

    checkGameStatus(gameCopy);
  };

  const handleGameCompleted = (data) => {
    setGameStatus('finished');
    setWinner(data.result);
    setGameOverMessage(
      data.result === 'white' ? 'White wins!' :
        data.result === 'black' ? 'Black wins!' :
          'Game drawn!'
    );
  };

  const handleReceiveMessage = (data) => {
    // Handle chat messages
    console.log('Message received:', data);
  };

  const makeComputerMove = useCallback(async () => {
    try {
      const result = await getComputerMove(gameId, game.fen(), difficulty);

      if (result.success) {
        if (result.gameOver) {
          const gameCopy = new Chess(gameRef.current.fen());
           handleGameOver(result, gameCopy);
          return;
        }

        if (result.move) {
          const move = result.move;

          // Make the move on the board
          const gameCopy = new Chess(gameRef.current.fen());
          const moveResult = gameCopy.move({
            from: move.from,
            to: move.to,
            promotion: move.promotion || 'q'
          });

          if (moveResult) {
            setGame(gameCopy);
            setMoveHistory(prev => [...prev, moveResult.san]);
            setActivePlayer('white');

            // Update computer's time
            if (result.timeRemaining) {
              setPlayerTimes(prev => ({
                ...prev,
                black: result.timeRemaining
              }));
            }

            // Check game status after computer move
            checkGameStatus(gameCopy);
          }
        }
      } else {
        console.error('Computer move failed:', result.message);
      }
    } catch (error) {
      console.error("Computer move error:", error);
    } finally {
      setIsComputerThinking(false);
    }
  }, [gameId, difficulty, getComputerMove, game]);

  const handleTimeout = () => {
    // Player who runs out of time loses
    const winner = activePlayer === 'white' ? 'black' : 'white';
    const winnerName = winner === 'white' ? 'White' : 'Black';
    setGameStatus('finished');
    setWinner(winner);
    setGameOverMessage(`${winnerName} wins on time!`);

    if (gameId) {
      endGame(gameId, winner, 'timeout');
    }

    // Emit for online games
    if (gameState?.gameMode === 'online' && socket) {
      socket.emit('game-ended', {
        gameId,
        result: winner,
        termination: 'timeout'
      });
    }
  };

   const handleGameOver = (result, board) => {
    setGameStatus('finished');
 
    if (result.checkmate) {
      const winner = board.turn() === 'b' ? 'white' : 'black';
      const winnerName = winner === 'white' ? 'White' : 'Black';
 
      setWinner(winner);
      setGameOverMessage(`Checkmate! ${winnerName} wins!`);
 
      if (gameId) {
        endGame(gameId, winner, 'checkmate');
      }
 
      if (gameState?.gameMode === 'online' && socket) {
        socket.emit('game-ended', {
          gameId,
          result: winner,
          termination: 'checkmate'
        });
      }
    }
    else if (result.stalemate) {
      setWinner('draw');
      setGameOverMessage('Stalemate! Game drawn!');
 
      if (gameId) {
        endGame(gameId, 'draw', 'stalemate');
      }
    }
    else if (result.draw) {
      setWinner('draw');
      setGameOverMessage('Game drawn!');
 
      if (gameId) {
        endGame(gameId, 'draw', 'draw');
      }
    }
  };
 
  const checkGameStatus = useCallback((gameCopy) => {
    // Check for checkmate
    if (gameCopy.isCheckmate()) {
      const checkmatedColor = gameCopy.turn() === 'w' ? 'white' : 'black';
      const winner = checkmatedColor === 'white' ? 'black' : 'white';
      const winnerName = winner === 'white' ? 'White' : 'Black';

      setGameStatus('finished');
      setWinner(winner);
      setGameOverMessage(`Checkmate! ${winnerName} wins!`);

      if (gameId) {
        endGame(gameId, winner, 'checkmate');
      }

      // Emit for online games
      if (gameState?.gameMode === 'online' && socket) {
        socket.emit('game-ended', {
          gameId,
          result: winner,
          termination: 'checkmate'
        });
      }
      return true;
    }

    // Check for stalemate
    if (gameCopy.isStalemate()) {
      setGameStatus('finished');
      setWinner('draw');
      setGameOverMessage('Stalemate! Game drawn!');

      if (gameId) {
        endGame(gameId, 'draw', 'stalemate');
      }

      // Emit for online games
      if (gameState?.gameMode === 'online' && socket) {
        socket.emit('game-ended', {
          gameId,
          result: 'draw',
          termination: 'stalemate'
        });
      }
      return true;
    }

    // Check for other draw conditions
    if (gameCopy.isDraw() || gameCopy.isThreefoldRepetition() || gameCopy.isInsufficientMaterial()) {
      setGameStatus('finished');
      setWinner('draw');
      setGameOverMessage('Game drawn!');

      if (gameId) {
        endGame(gameId, 'draw', 'draw');
      }

      // Emit for online games
      if (gameState?.gameMode === 'online' && socket) {
        socket.emit('game-ended', {
          gameId,
          result: 'draw',
          termination: 'draw'
        });
      }
      return true;
    }

    return false;
  }, [gameId, endGame, gameState?.gameMode, socket]);

  const handleSquareClick = async (square) => {
    // 🔥 Prevent moving opponent pieces in online mode
    if (gameState?.gameMode === 'online') {
      const currentPlayer = gameState.players?.find(
        p => p.userId?.toString() === user?.id?.toString()
      );

      if (!currentPlayer) return;

      if (currentPlayer.color !== activePlayer) {
        return; // Not your turn
      }
    }
    if (gameStatus !== 'playing') return;
    if (gameState?.gameMode === 'vs-computer' && activePlayer !== 'white') return;
    if (isComputerThinking) return;

    // If no square selected, select this square if it has a piece of the current player
    if (!selectedSquare) {
      const piece = game.get(square);
      if (piece && piece.color === (activePlayer === 'white' ? 'w' : 'b')) {
        setSelectedSquare(square);

        // Get valid moves for this piece
        const moves = game.moves({
          square: square,
          verbose: true
        });
        setValidMoves(moves.map(m => m.to));
      }
    }
    // If a square is already selected, try to move
    else {
      // Check if the clicked square is a valid destination
      if (validMoves.includes(square)) {
        // Make the move
        const gameCopy = new Chess(game.fen());
        const move = gameCopy.move({
          from: selectedSquare,
          to: square,
          promotion: 'q'
        });

        if (move) {
          setGame(gameCopy);
          setMoveHistory(prev => [...prev, move.san]);

          // Calculate time taken (simplified)
          const timeTaken = 1;

          // Update player's time
          setPlayerTimes(prev => ({
            ...prev,
            [activePlayer]: prev[activePlayer] - timeTaken
          }));

          // Save move to database
          if (gameId && gameState?.gameMode !== 'vs-computer') {
            await makeMove(gameId, {
              from: selectedSquare,
              to: square,
              promotion: 'q',
              fen: gameCopy.fen(),
              san: move.san,
              moveNumber: moveHistory.length + 1,
              timeTaken
            });
          }

          // Determine next player
          let nextPlayer;
          if (gameState?.gameMode === 'vs-computer') {
            nextPlayer = 'black';
          } else {
            nextPlayer = activePlayer === 'white' ? 'black' : 'white';
          }
          setActivePlayer(nextPlayer);

          // Emit move for online games
          if (gameState?.gameMode === 'online' && socket) {
            socket.emit('make-move', {
              gameId,
              move: {
                from: selectedSquare,
                to: square,
                promotion: 'q',
                san: move.san
              },
              fen: gameCopy.fen(),
              timeLeft: playerTimes[activePlayer],
              playerColor: activePlayer
            });
          }

          // Check game status after player's move
          const gameOver = checkGameStatus(gameCopy);

          // If game is over, don't trigger computer move
          if (gameOver) {
            setSelectedSquare(null);
            setValidMoves([]);
            return;
          }
        }
      }

      // Clear selection
      setSelectedSquare(null);
      setValidMoves([]);
    }
  };

  const getSquareColor = (row, col) => {
    const isDark = (row + col) % 2 === 1;
    const square = String.fromCharCode(97 + col) + (8 - row);

    // Highlight selected square
    if (selectedSquare === square) {
      return "#f7f769";
    }

    // Highlight valid moves
    if (validMoves.includes(square)) {
      return "#b9d68c";
    }

    return isDark ? boardColors.dark : boardColors.light;
  };

  const renderBoard = () => {
    const squares = [];
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    // Determine board orientation
    const rows = orientation === 'white' ? [0, 1, 2, 3, 4, 5, 6, 7] : [7, 6, 5, 4, 3, 2, 1, 0];
    const cols = orientation === 'white' ? [0, 1, 2, 3, 4, 5, 6, 7] : [7, 6, 5, 4, 3, 2, 1, 0];

    for (let row of rows) {
      const rowSquares = [];
      for (let col of cols) {
        const square = files[col] + (8 - row);
        const piece = game.get(square);
        const bgColor = getSquareColor(row, col);

        // Get piece symbol
        let pieceSymbol = '';
        if (piece) {
          const symbols = {
            'p': '♟', 'n': '♞', 'b': '♝', 'r': '♜', 'q': '♛', 'k': '♚',
            'P': '♙', 'N': '♘', 'B': '♗', 'R': '♖', 'Q': '♕', 'K': '♔'
          };
          pieceSymbol = symbols[piece.type === 'k' && piece.color === 'w' ? 'K' :
            piece.type === 'q' && piece.color === 'w' ? 'Q' :
              piece.type === 'r' && piece.color === 'w' ? 'R' :
                piece.type === 'b' && piece.color === 'w' ? 'B' :
                  piece.type === 'n' && piece.color === 'w' ? 'N' :
                    piece.type === 'p' && piece.color === 'w' ? 'P' :
                      piece.type === 'k' && piece.color === 'b' ? 'k' :
                        piece.type === 'q' && piece.color === 'b' ? 'q' :
                          piece.type === 'r' && piece.color === 'b' ? 'r' :
                            piece.type === 'b' && piece.color === 'b' ? 'b' :
                              piece.type === 'n' && piece.color === 'b' ? 'n' : 'p'];
        }

        rowSquares.push(
          <div
            key={square}
            onClick={() => handleSquareClick(square)}
            className="relative flex items-center justify-center text-4xl cursor-pointer transition-colors duration-200 hover:opacity-90"
            style={{
              backgroundColor: bgColor,
              width: '80px',
              height: '80px',
              color: piece?.color === 'w' ? '#ffffff' : '#000000',
              textShadow: piece?.color === 'w' ? '1px 1px 2px rgba(0,0,0,0.3)' : '1px 1px 2px rgba(255,255,255,0.3)'
            }}
          >
            {pieceSymbol}
            {/* Coordinate labels */}
            {row === (orientation === 'white' ? 7 : 0) && (
              <span className="absolute bottom-0 right-1 text-xs opacity-50 text-black">
                {files[col]}
              </span>
            )}
            {col === (orientation === 'white' ? 0 : 7) && (
              <span className="absolute top-0 left-1 text-xs opacity-50 text-black">
                {8 - row}
              </span>
            )}
          </div>
        );
      }
      squares.push(
        <div key={row} className="flex">
          {rowSquares}
        </div>
      );
    }

    return (
      <div className="board-container">
        {squares}
      </div>
    );
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getGameStatusMessage = () => {
    if (gameOverMessage) return gameOverMessage;
    if (game.isCheck() && gameStatus === 'playing') {
      const playerInCheck = game.turn() === 'w' ? 'Black' : 'White';
      return `${playerInCheck} is in check!`;
    }
    if (isComputerThinking) return 'Computer thinking...';
    if (activePlayer === 'white') return "Your turn";
    return "Computer's turn";
  };

  const resetGame = () => {
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
    setSelectedSquare(null);
    setValidMoves([]);
    setGameOverMessage('');
    setPlayerTimes({
      white: parseInt(gameState?.timeControl?.split('+')[0]) * 60 || 600,
      black: parseInt(gameState?.timeControl?.split('+')[0]) * 60 || 600
    });
  };

  const resign = () => {
    const winner = activePlayer === 'white' ? 'black' : 'white';
    const winnerName = winner === 'white' ? 'White' : 'Black';
    setGameStatus('finished');
    setWinner(winner);
    setGameOverMessage(`${winnerName} wins by resignation!`);
    setSelectedSquare(null);
    setValidMoves([]);

    if (gameId) {
      endGame(gameId, winner, 'resignation');
    }

    // Emit for online games
    if (gameState?.gameMode === 'online' && socket) {
      socket.emit('game-ended', {
        gameId,
        result: winner,
        termination: 'resignation'
      });
    }
  };

  const offerDraw = () => {
    if (gameState?.gameMode === 'vs-computer') {
      const shouldAccept = Math.random() > 0.7;
      if (shouldAccept) {
        setGameStatus('finished');
        setWinner('draw');
        setGameOverMessage('Draw accepted!');
        if (gameId) {
          endGame(gameId, 'draw', 'agreement');
        }
      } else {
        alert('Computer declined your draw offer. Continue playing.');
      }
    } else if (gameState?.gameMode === 'online' && socket) {
      socket.emit('offer-draw', { gameId, userId: user?.id });
      alert('Draw offer sent to opponent');
    } else {
      alert('Draw offer sent to opponent');
    }
  };

  const cycleTheme = () => {
    const themes = [
      { dark: "#b58863", light: "#f0d9b5" },
      { dark: "#769656", light: "#eeeed2" },
      { dark: "#4a6c8f", light: "#dee3e6" },
      { dark: "#7d5e4c", light: "#eadbbd" },
      { dark: "#2c2c2c", light: "#a0a0a0" },
      { dark: "#8b4513", light: "#d2b48c" },
    ];

    const currentThemeIndex = themes.findIndex(
      theme => theme.dark === boardColors.dark && theme.light === boardColors.light
    );

    const nextThemeIndex = (currentThemeIndex + 1) % themes.length;
    setBoardColors({
      dark: themes[nextThemeIndex].dark,
      light: themes[nextThemeIndex].light,
      highlight: "#f7f769",
      lastMove: "#b9d68c"
    });
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] flex flex-col">
      {/* Top Navigation Bar */}
      <div className="bg-[#2a2a2a] px-4 py-2 flex items-center justify-between border-b border-[#3a3a3a]">
        <div className="flex items-center gap-4">
          <button
            onClick={onExit}
            className="text-gray-400 hover:text-white transition"
            disabled={isComputerThinking}
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-gray-400 hover:text-white transition"
            disabled={isComputerThinking}
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-white font-medium">Play</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">
              {gameState?.gameMode === 'vs-computer' ? `vs Computer (${difficulty})` : 'Online'}
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
                <span className="text-white font-bold text-lg">
                  {gameState?.players?.find(p => p.color === 'black')?.username?.charAt(0) || 'C'}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">
                    {gameState?.players?.find(p => p.color === 'black')?.username ||
                      (gameState?.gameMode === 'vs-computer' ? `Computer (${difficulty})` : 'Opponent')}
                  </span>
                  <span className="bg-[#3a3a3a] text-gray-400 text-xs px-2 py-0.5 rounded">
                    {gameState?.players?.find(p => p.color === 'black')?.rating || '1500'}
                  </span>
                </div>
                {isComputerThinking && gameState?.gameMode === 'vs-computer' && (
                  <span className="text-xs text-yellow-500 ml-2 flex items-center gap-1">
                    <Loader size={12} className="animate-spin" />
                    Thinking...
                  </span>
                )}
              </div>
            </div>
            <div className={`font-mono text-2xl font-bold ${activePlayer === 'black' && gameStatus === 'playing' ? 'text-yellow-500' : 'text-white'}`}>
              {formatTime(playerTimes.black)}
            </div>
          </div>

          {/* Chess Board */}
          <div className="bg-[#2a2a2a] p-4 flex justify-center">
            <div className="border-4 border-[#3a3a3a] rounded-lg overflow-hidden">
              {renderBoard()}
            </div>
          </div>

          {/* Bottom Player (White - You) */}
          <div className="bg-[#2a2a2a] rounded-b-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {gameState?.players?.find(p => p.color === 'white')?.username?.charAt(0) || 'Y'}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">
                    {gameState?.players?.find(p => p.color === 'white')?.username || 'You'}
                  </span>
                  <span className="bg-[#3a3a3a] text-gray-400 text-xs px-2 py-0.5 rounded">
                    {gameState?.players?.find(p => p.color === 'white')?.rating || '1450'}
                  </span>
                </div>
                {activePlayer === 'white' && gameStatus === 'playing' && !isComputerThinking && (
                  <span className="text-xs text-green-500 ml-2">Your turn</span>
                )}
              </div>
            </div>
            <div className={`font-mono text-2xl font-bold ${activePlayer === 'white' && gameStatus === 'playing' ? 'text-yellow-500' : 'text-white'}`}>
              {formatTime(playerTimes.white)}
            </div>
          </div>

          {/* Game Status */}
          <div className="mt-4 bg-[#2a2a2a] rounded-lg p-4 text-center">
            <p className={`text-lg font-semibold ${gameStatus !== 'playing' ? 'text-yellow-500' :
              game.isCheck() ? 'text-red-500' : 'text-gray-300'
              }`}>
              {getGameStatusMessage()}
            </p>

            {gameStatus !== 'playing' && (
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
            )}
          </div>

          {/* Board Theme Control */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={cycleTheme}
              className="bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white px-4 py-2 rounded-lg text-sm transition flex items-center gap-2"
              disabled={isComputerThinking}
            >
              <RotateCcw size={16} />
              Cycle Board Theme
            </button>
          </div>
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
                {gameState?.gameMode === 'vs-computer' ? `vs Computer (${difficulty})` : 'Online Game'}
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
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            <div className="space-y-2">
              {moveHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No moves yet</p>
              ) : (
                <div className="space-y-1">
                  {Array.from({ length: Math.ceil(moveHistory.length / 2) }).map((_, roundIndex) => {
                    const whiteMove = moveHistory[roundIndex * 2];
                    const blackMove = moveHistory[roundIndex * 2 + 1];

                    return (
                      <div key={roundIndex} className="flex items-center gap-2 text-sm py-1 border-b border-[#3a3a3a] last:border-0">
                        <span className="text-gray-500 w-8">{roundIndex + 1}.</span>
                        <span className="text-white flex-1 font-mono">{whiteMove || ''}</span>
                        {blackMove && (
                          <span className="text-white flex-1 font-mono">{blackMove}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Game Controls */}
          <div className="border-t border-[#3a3a3a] p-4 space-y-2">
            <button
              onClick={() => setOrientation(orientation === 'white' ? 'black' : 'white')}
              className="w-full bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white py-2.5 rounded-lg text-sm transition flex items-center justify-center gap-2"
              disabled={isComputerThinking}
            >
              <RotateCcw size={16} />
              Flip Board
            </button>
            <button
              onClick={resign}
              // disabled={gameStatus !== 'playing' || isComputerThinking}
              disabled={orientation !== activePlayer}
              className={`w-full py-2.5 rounded-lg text-sm transition flex items-center justify-center gap-2 ${gameStatus === 'playing' && !isComputerThinking
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-[#3a3a3a] text-gray-500 cursor-not-allowed'
                }`}
            >
              <Flag size={16} />
              Resign
            </button>
            <button
              onClick={offerDraw}
              disabled={gameStatus !== 'playing' || isComputerThinking}
              className={`w-full py-2.5 rounded-lg text-sm transition flex items-center justify-center gap-2 ${gameStatus === 'playing' && !isComputerThinking
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