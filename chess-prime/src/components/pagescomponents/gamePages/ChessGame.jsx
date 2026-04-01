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
  Loader,
  X
} from "lucide-react";
import { useGame } from "../../../context/GameContext";
import { useAuth } from "../../../context/AuthContext";
import { useSocket } from "../../../context/SocketContext";

export default function ChessGame({ gameState, onExit }) {
  const [game, setGame] = useState(new Chess());
  const [orientation, setOrientation] = useState('white');
  const [moveHistory, setMoveHistory] = useState([]);
  const [gameStatus, setGameStatus] = useState('playing');
  const [playerTimes, setPlayerTimes] = useState({
    white: gameState?.initialTime ||
      (gameState?.timeControlObject?.initial) ||
      parseInt(gameState?.timeControl?.split('+')[0]) * 60 ||
      600,
    black: gameState?.initialTime ||
      (gameState?.timeControlObject?.initial) ||
      parseInt(gameState?.timeControl?.split('+')[0]) * 60 ||
      600
  });
  const [activePlayer, setActivePlayer] = useState('white');
  const [winner, setWinner] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [isComputerThinking, setIsComputerThinking] = useState(false);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [validMoves, setValidMoves] = useState([]);
  const [difficulty, setDifficulty] = useState('medium');
  const [gameId, setGameId] = useState(gameState?.gameId || null);
  const [gameOverMessage, setGameOverMessage] = useState('');
  const [loadingMoves, setLoadingMoves] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [showGameOverPopup, setShowGameOverPopup] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('info');

  // Mobile/Tablet dropdown states
  const [showMobileBoardMenu, setShowMobileBoardMenu] = useState(false);
  const [showMobileActionsMenu, setShowMobileActionsMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [showTabletSidebar, setShowTabletSidebar] = useState(false);

  const { getComputerMove, endGame, makeMove, getGameById } = useGame();
  const { user } = useAuth();
  const socket = useSocket();

  // ✅ Piece set state from first code
  const [pieceSet, setPieceSet] = useState(user?.settings?.pieceSet || "alpha");
  
  // ✅ Board theme state from BoardStyle component
  const [boardTheme, setBoardTheme] = useState(user?.settings?.boardTheme || "classic");
  
  const availablePieceSets = ["alpha", "california", "celtic", "fantasy", "horsey", "anarcandy", "dubrovny", "kosal", "pirouetti"];

  // Board color schemes from BoardStyle component
  const boardColorSchemes = {
    themed: {
      darkSquare: "#140905",
      lightSquare: "#bdbdbd",
      highlight: "#f7f769",
      lastMove: "#b9d68c"
    },
    fresh: {
      darkSquare: "#7b3f2a",
      lightSquare: "#d2b48c",
      highlight: "#f7f769",
      lastMove: "#b9d68c"
    },
    classic: {
      darkSquare: "#000000",
      lightSquare: "#d4d4d4",
      highlight: "#f7f769",
      lastMove: "#b9d68c"
    }
  };

  // Load board colors based on selected theme
  const [boardColors, setBoardColors] = useState(() => {
    // Get colors from the selected theme
    const themeColors = boardColorSchemes[boardTheme] || boardColorSchemes.classic;
    return {
      dark: themeColors.darkSquare,
      light: themeColors.lightSquare,
      highlight: themeColors.highlight,
      lastMove: themeColors.lastMove
    };
  });

  // Load saved preferences from localStorage
  useEffect(() => {
    // Load board style from localStorage
    const savedBoardStyle = localStorage.getItem("boardStyle");
    if (savedBoardStyle) {
      try {
        const parsed = JSON.parse(savedBoardStyle);
        console.log("Loaded board colors from localStorage:", parsed);
        if (parsed.type) {
          setBoardTheme(parsed.type);
        }
      } catch (e) {
        // Handle old format
        console.log("Loaded board style from localStorage:", savedBoardStyle);
        setBoardTheme(savedBoardStyle);
      }
    }

    // Load piece set from localStorage
    const savedPieceSet = localStorage.getItem("pieceSet");
    if (savedPieceSet) {
      setPieceSet(savedPieceSet);
    }
  }, []);

  // Update board colors when theme changes
  useEffect(() => {
    const themeColors = boardColorSchemes[boardTheme] || boardColorSchemes.classic;
    setBoardColors({
      dark: themeColors.darkSquare,
      light: themeColors.lightSquare,
      highlight: "#f7f769",
      lastMove: "#b9d68c"
    });
    console.log(`Board colors updated for theme: ${boardTheme}`, themeColors);
  }, [boardTheme]);

  // Update when user settings change
  useEffect(() => {
    if (user?.settings?.pieceSet) {
      setPieceSet(user.settings.pieceSet);
    }
    if (user?.settings?.boardTheme) {
      setBoardTheme(user.settings.boardTheme);
    }
  }, [user]);

  console.log("bfihrfiuheriughehgiuheighiehhgiheoighhhihggiiohhiehi",user)
  // Board color customization from first code
  // const [boardColors, setBoardColors] = useState({
  //   dark: "#b58863",
  //   light: "#f0d9b5",
  //   highlight: "#f7f769",
  //   lastMove: "#b9d68c"
  // });

  // ✅ NEW — dynamic image generator from first code
  const getPieceImage = (color, type) => {
    return `/src/assets/chesspieces/${pieceSet}/${color}${type.toUpperCase()}.svg`;
  };
  console.log("gamestatekaksdagsdjkagsdkjasdas", gameState)
  // Check if mobile/tablet view
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Refs
  const gameRef = useRef(game);
  const activePlayerRef = useRef(activePlayer);
  const gameStatusRef = useRef(gameStatus);
  const computerMoveTimeoutRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const hasLoadedMovesRef = useRef(false);
  const initialGameStateRef = useRef(gameState);

  // Toast notification helper
  const showNotification = (message, type = 'info') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // ============== DEFINE CALLBACKS IN PROPER ORDER ==============

  // First, define checkGameStatus since it's used by other callbacks
  const checkGameStatus = useCallback((gameCopy) => {
    // Check for checkmate
    if (gameCopy.isCheckmate()) {
      const checkmatedColor = gameCopy.turn() === 'w' ? 'white' : 'black';
      const winner = checkmatedColor === 'white' ? 'black' : 'white';
      const winnerName = winner === 'white' ? 'White' : 'Black';

      setGameStatus('finished');
      setWinner(winner);
      setGameOverMessage(`Checkmate! ${winnerName} wins!`);
      setShowGameOverPopup(true);

      if (gameId) {
        endGame(gameId, winner, 'checkmate');

        // Notify opponent in online mode
        if (gameState?.gameMode === 'online' && socket) {
          socket.emit('game-ended', {
            gameId,
            result: winner,
            termination: 'checkmate'
          });
        }
      }
      return true;
    }

    // Check for stalemate
    if (gameCopy.isStalemate()) {
      setGameStatus('finished');
      setWinner('draw');
      setGameOverMessage('Stalemate! Game drawn!');
      setShowGameOverPopup(true);

      if (gameId) {
        endGame(gameId, 'draw', 'stalemate');

        // Notify opponent in online mode
        if (gameState?.gameMode === 'online' && socket) {
          socket.emit('game-ended', {
            gameId,
            result: 'draw',
            termination: 'stalemate'
          });
        }
      }
      return true;
    }

    // Check for other draw conditions
    if (gameCopy.isDraw() || gameCopy.isThreefoldRepetition() || gameCopy.isInsufficientMaterial()) {
      setGameStatus('finished');
      setWinner('draw');
      setGameOverMessage('Game drawn!');
      setShowGameOverPopup(true);

      if (gameId) {
        endGame(gameId, 'draw', 'draw');

        // Notify opponent in online mode
        if (gameState?.gameMode === 'online' && socket) {
          socket.emit('game-ended', {
            gameId,
            result: 'draw',
            termination: 'draw'
          });
        }
      }
      return true;
    }

    return false;
  }, [gameId, endGame, gameState?.gameMode, socket]);

  // Load game history/moves from database
  const loadGameMoves = useCallback(async () => {
    if (!gameId || gameState?.gameMode !== 'online') return;
    if (hasLoadedMovesRef.current) return;

    try {
      setLoadingMoves(true);
      const gameData = await getGameById(gameId);

      console.log('Loaded game data:', gameData);

      if (gameData && gameData.moves && gameData.moves.length > 0) {
        console.log('Loading existing moves:', gameData.moves);

        // Replay moves to get to current position
        const chessGame = new Chess();

        // Sort moves by moveNumber if needed
        const sortedMoves = [...gameData.moves].sort((a, b) => a.moveNumber - b.moveNumber);

        // Apply each move to rebuild the game state
        sortedMoves.forEach(move => {
          try {
            chessGame.move({
              from: move.from,
              to: move.to,
              promotion: move.promotion || 'q'
            });
          } catch (e) {
            console.error('Error applying move:', move, e);
          }
        });

        setGame(chessGame);

        // Update move history with SAN notation
        const moveSANs = sortedMoves.map(move => move.san).filter(Boolean);
        setMoveHistory(moveSANs);

        // Update active player based on whose turn it is
        setActivePlayer(chessGame.turn() === 'w' ? 'white' : 'black');

        // Update player times if available
        if (gameData.players) {
          const whitePlayer = gameData.players.find(p => p.color === 'white');
          const blackPlayer = gameData.players.find(p => p.color === 'black');

          setPlayerTimes({
            white: whitePlayer?.timeRemaining || playerTimes.white,
            black: blackPlayer?.timeRemaining || playerTimes.black
          });
        }

        // Check if game is already completed
        if (gameData.status === 'completed') {
          setGameStatus('finished');
          setWinner(gameData.result);
          setGameOverMessage(
            gameData.result === 'white' ? 'White wins!' :
              gameData.result === 'black' ? 'Black wins!' :
                'Game drawn!'
          );
          setShowGameOverPopup(true);
        }
      } else if (gameData && gameData.currentFen) {
        // If no moves but has FEN, just set the game from FEN
        try {
          const chessGame = new Chess(gameData.currentFen);
          setGame(chessGame);
          setActivePlayer(chessGame.turn() === 'w' ? 'white' : 'black');
        } catch (e) {
          console.error('Error setting game from FEN:', e);
        }
      }

      hasLoadedMovesRef.current = true;
    } catch (error) {
      console.error('Error loading game moves:', error);
    } finally {
      setLoadingMoves(false);
    }
  }, [gameId, gameState?.gameMode, getGameById, playerTimes]);

  // Handle opponent move
  const handleOpponentMove = useCallback(({ move, fen, timeLeft, playerColor }) => {
    console.log('Opponent move received:', move, fen, playerColor);

    // Update game with opponent's move
    try {
      const gameCopy = new Chess(fen);
      setGame(gameCopy);

      // Add to move history
      if (move.san) {
        setMoveHistory(prev => [...prev, move.san]);
      }

      // Update active player
      setActivePlayer(playerColor === 'white' ? 'black' : 'white');

      // Update opponent's time
      if (timeLeft) {
        setPlayerTimes(prev => ({
          ...prev,
          [playerColor]: timeLeft
        }));
      }

      // Clear selection
      setSelectedSquare(null);
      setValidMoves([]);

      // Check game status
      checkGameStatus(gameCopy);

    } catch (error) {
      console.error('Error applying opponent move:', error);
    }
  }, [checkGameStatus]);

  // Handle game completed
  const handleGameCompleted = useCallback(({ result, termination, message }) => {
    console.log('Game completed:', result, termination, message);
    setGameStatus('finished');
    setGameOverMessage(message);
    setShowGameOverPopup(true);

    if (result === 'white' || result === 'black') {
      setWinner(result);
    } else {
      setWinner('draw');
    }
  }, []);

  // Handle draw offered
  const handleDrawOffered = useCallback(({ userId, message }) => {
    // Create a custom confirm dialog that doesn't block
    const acceptDraw = window.confirm(message + ' Do you accept?');

    if (acceptDraw) {
      // Accept draw
      if (socket) {
        socket.emit('draw-response', {
          gameId,
          userId,
          accepted: true,
          message: 'Draw accepted!'
        });

        setGameStatus('finished');
        setWinner('draw');
        setGameOverMessage('Draw accepted! Game drawn by agreement.');
        setShowGameOverPopup(true);

        if (gameId) {
          endGame(gameId, 'draw', 'agreement');
        }
      }
    } else {
      // Decline draw
      if (socket) {
        socket.emit('draw-response', {
          gameId,
          userId,
          accepted: false,
          message: 'Draw declined. Continue playing.'
        });
      }
    }
  }, [gameId, socket, endGame]);

  // Handle draw response
  const handleDrawResponse = useCallback(({ userId, accepted, message }) => {
    if (accepted) {
      setGameStatus('finished');
      setWinner('draw');
      setGameOverMessage('Draw accepted! Game drawn by agreement.');
      setShowGameOverPopup(true);

      if (gameId) {
        endGame(gameId, 'draw', 'agreement');
      }
    } else {
      // Show that opponent declined
      showNotification('Your opponent declined the draw offer. Continue playing.', 'error');
    }
  }, [gameId, endGame]);

  // Handle draw declined
  const handleDrawDeclined = useCallback(({ userId, message }) => {
    showNotification(message || 'Your opponent declined the draw offer.', 'error');
  }, []);

  // Handle timeout
  const handleTimeout = useCallback(() => {
    // Player who runs out of time loses
    const winner = activePlayer === 'white' ? 'black' : 'white';
    const winnerName = winner === 'white' ? 'White' : 'Black';
    setGameStatus('finished');
    setWinner(winner);
    setGameOverMessage(`${winnerName} wins on time!`);
    setShowGameOverPopup(true);

    if (gameId) {
      endGame(gameId, winner, 'timeout');

      // Notify opponent in online mode
      if (gameState?.gameMode === 'online' && socket) {
        socket.emit('game-ended', {
          gameId,
          result: winner,
          termination: 'timeout'
        });
      }
    }
  }, [activePlayer, gameId, endGame, gameState?.gameMode, socket]);

  // Handle game over (from computer move)
  const handleGameOver = useCallback((result, board) => {
    setGameStatus('finished');
    setShowGameOverPopup(true);

    if (result.checkmate) {
      const winner = board.turn() === 'b' ? 'white' : 'black';
      const winnerName = winner === 'white' ? 'White' : 'Black';

      setWinner(winner);
      setGameOverMessage(`Checkmate! ${winnerName} wins!`);

      if (gameId) {
        endGame(gameId, winner, 'checkmate');

        // Notify opponent in online mode
        if (gameState?.gameMode === 'online' && socket) {
          socket.emit('game-ended', {
            gameId,
            result: winner,
            termination: 'checkmate'
          });
        }
      }
    }
    else if (result.stalemate) {
      setWinner('draw');
      setGameOverMessage('Stalemate! Game drawn!');

      if (gameId) {
        endGame(gameId, 'draw', 'stalemate');

        // Notify opponent in online mode
        if (gameState?.gameMode === 'online' && socket) {
          socket.emit('game-ended', {
            gameId,
            result: 'draw',
            termination: 'stalemate'
          });
        }
      }
    }
    else if (result.draw) {
      setWinner('draw');
      setGameOverMessage('Game drawn!');

      if (gameId) {
        endGame(gameId, 'draw', 'draw');

        // Notify opponent in online mode
        if (gameState?.gameMode === 'online' && socket) {
          socket.emit('game-ended', {
            gameId,
            result: 'draw',
            termination: 'draw'
          });
        }
      }
    }
  }, [gameId, endGame, gameState?.gameMode, socket]);

  // Make computer move
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
  }, [gameId, difficulty, getComputerMove, game, checkGameStatus, handleGameOver]);

  // ============== EFFECTS ==============

  // Set difficulty from gameState if available - only run once on mount
  useEffect(() => {
    // Set difficulty if present
    if (gameState?.difficulty) {
      setDifficulty(gameState.difficulty);
    }

    // Set gameId if present
    if (gameState?.gameId) {
      setGameId(gameState.gameId);
    }

    // Initialize board only when FEN changes and we haven't loaded moves yet
    if (!gameState?.currentFen || hasLoadedMovesRef.current) return;

    try {
      const newGame = new Chess(gameState.currentFen);
      setGame(newGame);

      // Sync move history if available
      if (gameState?.moves?.length > 0) {
        setMoveHistory(gameState.moves.map(move => move.san));
      }

      // Sync active player
      setActivePlayer(newGame.turn() === "w" ? "white" : "black");

    } catch (error) {
      console.error("Error initializing game:", error);
    }

  }, [gameState?.currentFen, gameState?.difficulty, gameState?.gameId, gameState?.moves]);

  // Load game moves for online games when component mounts - only once
  useEffect(() => {
    if (gameState?.gameMode === 'online' && gameId && !hasLoadedMovesRef.current) {
      loadGameMoves();
    }

    return () => {
      // Don't reset hasLoadedMovesRef on unmount to prevent reload on remount
    };
  }, []); // Empty dependency array - run only once on mount

  // Set orientation based on player color - only when gameState or user changes
  useEffect(() => {
    if (!gameState || !user) {
      return;
    }

    // Find current player in game players
    const currentPlayer = gameState.players?.find(
      p => p.userId?.toString() === user?.id?.toString()
    );

    setCurrentPlayer(currentPlayer);

    if (currentPlayer) {
      setOrientation(currentPlayer.color);
    } else {
      // If player not found in players list, check if it's vs computer
      if (gameState.gameMode === 'vs-computer') {
        setOrientation('white'); // Human always plays as white vs computer
      }
    }
  }, [gameState, user]);

  // Update refs
  useEffect(() => {
    gameRef.current = game;
    activePlayerRef.current = activePlayer;
    gameStatusRef.current = gameStatus;
  }, [game, activePlayer, gameStatus]);

  // Join game room on mount
  useEffect(() => {
    if (gameId && gameState?.gameMode === 'online' && socket) {
      console.log(`Joining game room: game-${gameId}`);
      socket.emit('join-game', { gameId });

      // Listen for opponent moves
      socket.on('move-made', handleOpponentMove);

      // Listen for game completion
      socket.on('game-completed', handleGameCompleted);

      // Listen for draw offers
      socket.on('draw-offered', handleDrawOffered);

      // Listen for draw responses
      socket.on('draw-response', handleDrawResponse);

      // Listen for draw declined
      socket.on('draw-declined', handleDrawDeclined);

      return () => {
        console.log(`Leaving game room: game-${gameId}`);
        socket.emit('leave-game', { gameId });
        socket.off('move-made', handleOpponentMove);
        socket.off('game-completed', handleGameCompleted);
        socket.off('draw-offered', handleDrawOffered);
        socket.off('draw-response', handleDrawResponse);
        socket.off('draw-declined', handleDrawDeclined);
      };
    }
  }, [gameId, gameState?.gameMode, socket, handleOpponentMove, handleGameCompleted, handleDrawOffered, handleDrawResponse, handleDrawDeclined]);

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
}, [activePlayer, gameState?.gameMode, gameStatus, gameId]); // ✅ Fixed dependencies
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
  }, [gameStatus, winner, handleTimeout]);

  // ============== UI HANDLERS ==============

  const handleSquareClick = async (square) => {
    // Prevent moves if game is not playing
    if (gameStatus !== 'playing') return;

    // Prevent moves while loading
    if (loadingMoves) return;

    // Handle vs computer mode
    if (gameState?.gameMode === 'vs-computer') {
      if (activePlayer !== 'white') return;
      if (isComputerThinking) return;
    }

    // Handle online mode
    if (gameState?.gameMode === 'online') {
      if (!user) return;

      const currentPlayer = gameState.players?.find(
        p => p.userId?.toString() === user?.id?.toString()
      );

      if (!currentPlayer) return;
      if (currentPlayer.color !== activePlayer) return; // Not your turn
    }

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
          const newTimeLeft = playerTimes[activePlayer] - timeTaken;
          setPlayerTimes(prev => ({
            ...prev,
            [activePlayer]: newTimeLeft
          }));

          // Save move to database
          if (gameId) {
            await makeMove(gameId, {
              from: selectedSquare,
              to: square,
              promotion: 'q',
              fen: gameCopy.fen(),
              san: move.san,
              moveNumber: moveHistory.length + 1,
              timeTaken
            });

            // Emit move to opponent via socket.io for online mode
            if (gameState?.gameMode === 'online' && socket) {
              const playerColor = activePlayer; // Current player's color

              console.log('Emitting move to opponent:', {
                gameId,
                move: {
                  from: selectedSquare,
                  to: square,
                  promotion: 'q',
                  san: move.san
                },
                fen: gameCopy.fen(),
                timeLeft: newTimeLeft,
                playerColor
              });

              socket.emit('make-move', {
                gameId,
                move: {
                  from: selectedSquare,
                  to: square,
                  promotion: 'q',
                  san: move.san
                },
                fen: gameCopy.fen(),
                timeLeft: newTimeLeft,
                playerColor
              });
            }
          }

          // Determine next player
          let nextPlayer;
          if (gameState?.gameMode === 'vs-computer') {
            nextPlayer = 'black';
          } else {
            nextPlayer = activePlayer === 'white' ? 'black' : 'white';
          }
          setActivePlayer(nextPlayer);

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
      return boardColors.highlight;
    }

    // Highlight valid moves
    if (validMoves.includes(square)) {
      return boardColors.lastMove;
    }

    return isDark ? boardColors.dark : boardColors.light;
  };

 const renderBoard = () => {
  const squares = [];
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  // Determine board orientation
  const rows = orientation === 'white' ? [0, 1, 2, 3, 4, 5, 6, 7] : [7, 6, 5, 4, 3, 2, 1, 0];
  const cols = orientation === 'white' ? [0, 1, 2, 3, 4, 5, 6, 7] : [7, 6, 5, 4, 3, 2, 1, 0];

  // INCREASED square sizes to make board larger
  let squareSize;
  if (isMobile) {
    squareSize = '40px'; 
  } else if (isTablet) {
    squareSize = '65px'; // Kept the same
  } else {
    squareSize = '62px'; // Kept the same
  }

  for (let row of rows) {
    for (let col of cols) {
      const square = files[col] + (8 - row);
      const piece = game.get(square);
      const bgColor = getSquareColor(row, col);

      squares.push(
        <div
          key={square}
          onClick={() => handleSquareClick(square)}
          className="relative flex items-center justify-center cursor-pointer transition-colors duration-200"
          style={{
            backgroundColor: bgColor,
            width: squareSize,
            height: squareSize,
          }}
        >
          {piece && (
            <img
              src={getPieceImage(piece.color === 'w' ? 'w' : 'b', piece.type)}
              alt={`${piece.color}${piece.type}`}
              className="w-4/5 h-4/5 object-contain pointer-events-none select-none"
            />
          )}

          {/* Coordinate labels - hide on mobile/tablet */}
          {row === (orientation === 'white' ? 7 : 0) && !isMobile && !isTablet && (
            <span className="absolute bottom-0 right-1 text-[8px] md:text-xs opacity-50 text-black hidden sm:block">
              {files[col]}
            </span>
          )}
          {col === (orientation === 'white' ? 0 : 7) && !isMobile && !isTablet && (
            <span className="absolute top-0 left-1 text-[8px] md:text-xs opacity-50 text-black hidden sm:block">
              {8 - row}
            </span>
          )}
        </div>
      );
    }
  }

  // INCREASED board container size based on larger square sizes
  const boardSize = isMobile ? '320px' : isTablet ? '520px' : '500px'; // 8 * 70px = 560px for mobile

  return (
    <div
      className="grid grid-cols-8 gap-0 border-2 sm:border-4 border-[#3a3a3a] rounded-lg overflow-hidden mx-auto"
      style={{ width: boardSize, height: boardSize }}
    >
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
    if (loadingMoves) return 'Loading game moves...';
    if (game.isCheck() && gameStatus === 'playing') {
      const playerInCheck = game.turn() === 'w' ? 'Black' : 'White';
      return `${playerInCheck} is in check!`;
    }
    if (isComputerThinking) return 'Computer thinking...';
    if (currentPlayer && activePlayer === currentPlayer.color) return "Your turn";
    return "opponent's turn";
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
    setShowGameOverPopup(false);
    setPlayerTimes({
      white: parseInt(gameState?.timeControl?.split('+')[0]) * 60 || 600,
      black: parseInt(gameState?.timeControl?.split('+')[0]) * 60 || 600
    });
    hasLoadedMovesRef.current = false; // Reset for new game
  };

  // ✅ UPDATED: Resign logic from first code
  const resign = () => {
    const winner = activePlayer === 'white' ? 'black' : 'white';
    const winnerName = winner === 'white' ? 'White' : 'Black';
    setGameStatus('finished');
    setWinner(winner);
    setGameOverMessage(`${winnerName} wins by resignation!`);
    setShowGameOverPopup(true);
    setSelectedSquare(null);
    setValidMoves([]);
    setShowMobileActionsMenu(false);
    setShowTabletSidebar(false);

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
      const shouldAccept = Math.random() > 0.5; // 50% chance to accept

      if (shouldAccept) {
        setGameStatus('finished');
        setWinner('draw');
        setGameOverMessage('Draw accepted! Computer agrees to a draw.');
        setShowGameOverPopup(true);
        if (gameId) {
          endGame(gameId, 'draw', 'agreement');
        }
      } else {
        // Use toast notification instead of alert
        showNotification('Computer declined your draw offer. Continue playing.', 'error');
      }
    } else if (gameState?.gameMode === 'online' && socket) {
      // For online mode, emit draw offer to opponent
      socket.emit('offer-draw', {
        gameId,
        userId: user?.id,
        message: `${user?.username || 'Your opponent'} offers a draw.`
      });

      // Show a temporary notification that draw was offered
      showNotification('Draw offer sent to opponent. Waiting for response...', 'info');
    } else {
      showNotification('Draw offer sent to opponent', 'info');
    }
    setShowMobileActionsMenu(false);
    setShowTabletSidebar(false);
  };

  const changeBoardColor = (colorType, colorValue) => {
    setBoardColors(prev => ({
      ...prev,
      [colorType]: colorValue
    }));
  };

  const cycleTheme = () => {
    const themes = [
      boardColorSchemes.themed,
      boardColorSchemes.fresh,
      boardColorSchemes.classic,
    ];

    const currentThemeIndex = themes.findIndex(
      theme => theme.darkSquare === boardColors.dark && theme.lightSquare === boardColors.light
    );

    const nextThemeIndex = (currentThemeIndex + 1) % themes.length;
    const nextTheme = themes[nextThemeIndex];
    setBoardColors({
      dark: nextTheme.darkSquare,
      light: nextTheme.lightSquare,
      highlight: "#f7f769",
      lastMove: "#b9d68c"
    });
    setBoardTheme(Object.keys(boardColorSchemes)[nextThemeIndex]);
    setShowMobileBoardMenu(false);
  };

  // Show loading state if gameState or user is not ready
  if (!gameState) {
    return (
      <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center">
        <div className="text-white flex items-center gap-3">
          <Loader className="animate-spin text-amber-400" size={24} />
          <span>Loading game data...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center">
        <div className="text-white flex items-center gap-3">
          <Loader className="animate-spin text-amber-400" size={24} />
          <span>Loading user data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#1e1e1e] flex flex-col overflow-hidden">
      {/* Top Navigation Bar - Responsive */}
      <div className="bg-[#2a2a2a] px-2 sm:px-4 py-2 flex items-center justify-between border-b border-[#3a3a3a] flex-shrink-0">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={onExit}
            className="text-gray-400 hover:text-white transition p-1"
            disabled={isComputerThinking || loadingMoves}
          >
            <ArrowLeft size={window.innerWidth < 640 ? 18 : 20} />
          </button>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-gray-400 hover:text-white transition p-1"
            disabled={isComputerThinking || loadingMoves}
          >
            <Menu size={window.innerWidth < 640 ? 18 : 20} />
          </button>
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-white font-medium text-sm sm:text-base">Play</span>
            <span className="text-gray-400 text-sm sm:text-base">•</span>
            <span className="text-gray-400 text-xs sm:text-sm truncate max-w-[120px] sm:max-w-none">
              {gameState?.gameMode === 'vs-computer' ? `vs Computer (${difficulty})` : 'Online'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <button className="p-1 sm:p-2 hover:bg-[#3a3a3a] rounded-lg transition">
            <Volume2 size={window.innerWidth < 640 ? 16 : 18} className="text-gray-400" />
          </button>

          {/* Settings Button - Different behavior on mobile/tablet vs desktop */}
          {(isMobile || isTablet) ? (
            <>
              <button
                onClick={() => setShowMobileBoardMenu(!showMobileBoardMenu)}
                className="p-1 sm:p-2 hover:bg-[#3a3a3a] rounded-lg transition relative"
              >
                <Settings size={window.innerWidth < 640 ? 16 : 18} className="text-gray-400" />
              </button>

              {/* Mobile/Tablet Board Settings Dropdown */}
              {showMobileBoardMenu && (
                <div className="absolute right-0 top-12 mt-2 w-64 bg-[#1e1e1e] border border-[#333] rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                  <div className="p-3 border-b border-[#333]">
                    <h3 className="text-white font-semibold text-sm">Board Settings</h3>
                  </div>

                  <div className="p-3">
                    <p className="text-gray-400 text-xs mb-2">Piece Set</p>
                    <div className="grid grid-cols-2 gap-2">
                      {availablePieceSets.slice(0, 6).map(set => (
                        <button
                          key={set}
                          onClick={() => {
                            setPieceSet(set);
                            setShowMobileBoardMenu(false);
                          }}
                          className={`flex items-center justify-between p-2 rounded ${pieceSet === set ? "bg-[#333]" : "hover:bg-[#333]"
                            }`}
                        >
                          <span className="text-xs text-gray-300 truncate">
                            {set.charAt(0).toUpperCase() + set.slice(1, 8)}
                          </span>
                          <img
                            src={`/src/assets/chesspieces/${set}/wN.svg`}
                            alt="preview"
                            className="w-6 h-6 object-contain"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `/src/assets/chesspieces/${set}/wN.png`;
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 border-t border-[#333]">
                    <p className="text-gray-400 text-xs mb-2">Colors</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-xs">Dark:</span>
                        <input
                          type="color"
                          value={boardColors.dark}
                          onChange={(e) => changeBoardColor('dark', e.target.value)}
                          className="w-8 h-8 rounded"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-xs">Light:</span>
                        <input
                          type="color"
                          value={boardColors.light}
                          onChange={(e) => changeBoardColor('light', e.target.value)}
                          className="w-8 h-8 rounded"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={cycleTheme}
                    className="w-full p-3 text-center text-sm text-yellow-500 border-t border-[#333] hover:bg-[#333]"
                  >
                    Cycle Theme
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowSettingsMenu(prev => !prev)}
                className="p-1 sm:p-2 hover:bg-[#3a3a3a] rounded-lg transition"
              >
                <Settings size={window.innerWidth < 640 ? 16 : 18} className="text-gray-400" />
              </button>

              {showSettingsMenu && (
                <div className="absolute right-0 mt-2 w-48 sm:w-56 max-h-80 overflow-y-auto 
                  bg-[#1e1e1e] text-white border border-[#333] rounded-lg shadow-lg z-50
                  scroll-hide">
                  <div className="px-4 py-2 text-xs uppercase">
                    Piece Set
                  </div>

                  {availablePieceSets.map(set => (
                    <button
                      key={set}
                      onClick={() => {
                        setPieceSet(set);
                        setShowSettingsMenu(false);
                      }}
                      className={`flex items-center justify-between w-full px-4 py-2 hover:bg-[#333] transition ${pieceSet === set ? "bg-[#333]" : ""
                        }`}
                    >
                      <span className="text-sm">
                        {set.charAt(0).toUpperCase() + set.slice(1)}
                      </span>

                      {/* Knight Preview */}
                      <img
                        src={`/src/assets/chesspieces/${set}/wN.svg`}
                        alt="knight preview"
                        className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `/src/assets/chesspieces/${set}/wN.png`;
                        }}
                      />
                    </button>
                  ))}

                  <div className="border-t border-[#333] my-2" />

                  {/* Individual color pickers */}
                  <div className="px-4 py-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="text-gray-400 text-xs">Dark:</label>
                      <input
                        type="color"
                        value={boardColors.dark}
                        onChange={(e) => changeBoardColor('dark', e.target.value)}
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-gray-400 text-xs">Light:</label>
                      <input
                        type="color"
                        value={boardColors.light}
                        onChange={(e) => changeBoardColor('light', e.target.value)}
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-gray-400 text-xs">Highlight:</label>
                      <input
                        type="color"
                        value={boardColors.highlight}
                        onChange={(e) => changeBoardColor('highlight', e.target.value)}
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mobile/Tablet Actions Button */}
          {(isMobile || isTablet) && (
            <>
              <button
                onClick={() => setShowMobileActionsMenu(!showMobileActionsMenu)}
                className="p-1 sm:p-2 hover:bg-[#3a3a3a] rounded-lg transition"
              >
                <Flag size={16} className="text-gray-400" />
              </button>

              {/* Mobile/Tablet Actions Dropdown */}
              {showMobileActionsMenu && (
                <div className="absolute right-0 top-12 mt-2 w-48 bg-[#1e1e1e] border border-[#333] rounded-lg shadow-lg z-50">
                  <div className="p-2">
                    <button
                      onClick={resign}
                      disabled={gameStatus !== 'playing' || orientation !== activePlayer}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm ${gameStatus === 'playing' && orientation === activePlayer
                        ? 'text-red-500 hover:bg-[#333]'
                        : 'text-gray-500 cursor-not-allowed'
                        }`}
                    >
                      <Flag size={14} />
                      <span>Resign</span>
                    </button>

                    <button
                      onClick={offerDraw}
                      disabled={gameStatus !== 'playing'}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm ${gameStatus === 'playing'
                        ? 'text-gray-300 hover:bg-[#333]'
                        : 'text-gray-500 cursor-not-allowed'
                        }`}
                    >
                      <Share2 size={14} />
                      <span>Offer Draw</span>
                    </button>

                    <button
                      onClick={() => {
                        setOrientation(orientation === 'white' ? 'black' : 'white');
                        setShowMobileActionsMenu(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded text-sm text-gray-300 hover:bg-[#333]"
                    >
                      <RotateCcw size={14} />
                      <span>Flip Board</span>
                    </button>

                    {/* Tablet-only toggle sidebar button */}
                    {isTablet && (
                      <button
                        onClick={() => {
                          setShowTabletSidebar(!showTabletSidebar);
                          setShowMobileActionsMenu(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded text-sm text-gray-300 hover:bg-[#333] mt-1 border-t border-[#333] pt-2"
                      >
                        <Menu size={14} />
                        <span>{showTabletSidebar ? 'Hide' : 'Show'} Moves</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Main Game Area - Responsive with different layouts for mobile, tablet, desktop */}
      <div className="flex-1 flex flex-col lg:flex-row p-2 sm:p-3 gap-2 sm:gap-3 overflow-hidden">
        {/* Left Side - Board and Players */}
        <div className={`flex-1 flex flex-col ${isTablet && showTabletSidebar ? 'w-2/3' : 'w-full'} overflow-hidden`}>
          {/* Top Player (Black - Computer) - Responsive */}
          <div className="bg-[#2a2a2a] rounded-t-lg p-2 sm:p-2 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2 sm:gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm">
                  {gameState?.players?.find(p => p.color === 'black')?.username?.charAt(0) || 'C'}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-white font-medium text-xs truncate max-w-[60px] sm:max-w-[80px]">
                    {gameState?.players?.find(p => p.color === 'black')?.username ||
                      (gameState?.gameMode === 'vs-computer' ? `Computer` : 'Opponent')}
                  </span>
                  <span className="bg-[#3a3a3a] text-gray-400 text-[10px] px-1 py-0.5 rounded">
                    {gameState?.players?.find(p => p.color === 'black')?.rating || '1500'}
                  </span>
                </div>
                {isComputerThinking && gameState?.gameMode === 'vs-computer' && (
                  <span className="text-[10px] text-yellow-500 flex items-center gap-1">
                    <Loader size={8} className="animate-spin" />
                    <span className="hidden sm:inline">Thinking...</span>
                  </span>
                )}
              </div>
            </div>
            <div className={`font-mono text-sm sm:text-lg font-bold ${activePlayer === 'black' && gameStatus === 'playing' ? 'text-yellow-500' : 'text-white'}`}>
              {formatTime(playerTimes.black)}
            </div>
          </div>

          {/* Chess Board - Centered with fixed size */}
          <div className="bg-[#2a2a2a] p-2 flex justify-center items-center flex-1 overflow-hidden">
            {renderBoard()}
          </div>

          {/* Bottom Player (White - You) - Responsive */}
          <div className="bg-[#2a2a2a] rounded-b-lg p-2 sm:p-2 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2 sm:gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm">
                  {gameState?.players?.find(p => p.color === 'white')?.username?.charAt(0) || 'Y'}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-white font-medium text-xs">
                    {gameState?.players?.find(p => p.color === 'white')?.username || 'You'}
                  </span>
                  <span className="bg-[#3a3a3a] text-gray-400 text-[10px] px-1 py-0.5 rounded">
                    {gameState?.players?.find(p => p.color === 'white')?.rating || '1450'}
                  </span>
                </div>
              </div>
            </div>
            <div className={`font-mono text-sm sm:text-lg font-bold ${activePlayer === 'white' && gameStatus === 'playing' ? 'text-yellow-500' : 'text-white'}`}>
              {formatTime(playerTimes.white)}
            </div>
          </div>


        </div>

        {/* Right Sidebar - Desktop only */}
        <div className="lg:w-64 w-full bg-[#2a2a2a] rounded-lg flex-col mt-2 lg:mt-0 hidden lg:flex overflow-hidden">
          {/* Header with Game Info */}
          <div className="p-2 border-b border-[#3a3a3a] flex-shrink-0">
            <div className="text-center">
              <span className="text-white text-base font-semibold">
                {gameState?.timeControl || '10+0'}
              </span>
              <p className="text-gray-400 text-xs mt-0.5">
                {gameState?.gameMode === 'vs-computer' ? `vs Computer (${difficulty})` : 'Online Game'}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[#3a3a3a] flex-shrink-0">
            <button className="flex-1 px-2 py-1.5 text-xs font-medium text-yellow-500 border-b-2 border-yellow-500">
              Moves
            </button>
            <button className="flex-1 px-2 py-1.5 text-xs font-medium text-gray-400 hover:text-white">
              Chat
            </button>
          </div>

          {/* Move History */}
          <div className="flex-1 overflow-y-auto p-2 custom-scrollbar" style={{ maxHeight: '180px' }}>
            <div className="space-y-1">
              {loadingMoves ? (
                <p className="text-gray-500 text-center py-2 text-xs">Loading moves...</p>
              ) : moveHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-2 text-xs">No moves yet</p>
              ) : (
                <div className="space-y-1">
                  {Array.from({ length: Math.ceil(moveHistory.length / 2) }).map((_, roundIndex) => {
                    const whiteMove = moveHistory[roundIndex * 2];
                    const blackMove = moveHistory[roundIndex * 2 + 1];

                    return (
                      <div key={roundIndex} className="flex items-center gap-2 text-xs py-1 border-b border-[#3a3a3a] last:border-0">
                        <span className="text-gray-500 w-5">{roundIndex + 1}.</span>
                        <span className="text-white flex-1 font-mono truncate">{whiteMove || ''}</span>
                        {blackMove && (
                          <span className="text-white flex-1 font-mono truncate">{blackMove}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Game Controls - Desktop only */}
          <div className="border-t border-[#3a3a3a] p-2 space-y-1.5 flex-shrink-0">
            <button
              onClick={() => setOrientation(orientation === 'white' ? 'black' : 'white')}
              className="w-full bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white py-1.5 rounded-lg text-xs transition flex items-center justify-center gap-1"
              disabled={isComputerThinking || loadingMoves}
            >
              <RotateCcw size={12} />
              <span>Flip Board</span>
            </button>
            <button
              onClick={cycleTheme}
              className="w-full bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white py-1.5 rounded-lg text-xs transition flex items-center justify-center gap-1"
              disabled={isComputerThinking || loadingMoves}
            >
              <RotateCcw size={12} />
              <span>Cycle Board Theme</span>
            </button>
            <button
              onClick={resign}
              disabled={orientation !== activePlayer}
              className={`w-full py-1.5 rounded-lg text-xs transition flex items-center justify-center gap-1 ${gameStatus === 'playing' && !isComputerThinking && !loadingMoves && orientation === activePlayer
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-[#3a3a3a] text-gray-500 cursor-not-allowed'
                }`}
            >
              <Flag size={12} />
              <span>Resign</span>
            </button>
            <button
              onClick={offerDraw}
              disabled={gameStatus !== 'playing' || isComputerThinking || loadingMoves}
              className={`w-full py-1.5 rounded-lg text-xs transition flex items-center justify-center gap-1 ${gameStatus === 'playing' && !isComputerThinking && !loadingMoves
                  ? 'bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white'
                  : 'bg-[#3a3a3a] text-gray-500 cursor-not-allowed'
                }`}
            >
              <Share2 size={12} />
              <span>Offer Draw</span>
            </button>

            {/* Turn indicator moved here */}
            <div className="mt-1 pt-1 border-t border-[#3a3a3a] text-center">
              <p className={`text-xs font-semibold ${activePlayer === currentPlayer?.color ? 'text-green-500' : 'text-yellow-500'
                }`}>
                {getGameStatusMessage()}
              </p>
            </div>
          </div>
        </div>

        {/* Tablet Sidebar - Toggleable */}
        {isTablet && showTabletSidebar && (
          <div className="w-1/3 bg-[#2a2a2a] rounded-lg flex flex-col ml-2 animate-slideIn overflow-hidden">
            <div className="p-2 border-b border-[#3a3a3a] flex justify-between items-center flex-shrink-0">
              <span className="text-white font-semibold text-xs">Game Info</span>
              <button onClick={() => setShowTabletSidebar(false)} className="text-gray-400 hover:text-white">
                <ArrowLeft size={14} />
              </button>
            </div>

            <div className="p-2 border-b border-[#3a3a3a] flex-shrink-0">
              <p className="text-gray-400 text-xs">Time Control</p>
              <p className="text-white text-xs font-semibold">{gameState?.timeControl || '10+0'}</p>
            </div>

            <div className="flex border-b border-[#3a3a3a] flex-shrink-0">
              <button className="flex-1 px-2 py-1 text-xs font-medium text-yellow-500 border-b-2 border-yellow-500">
                Moves
              </button>
              <button className="flex-1 px-2 py-1 text-xs font-medium text-gray-400">
                Chat
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-2 custom-scrollbar" style={{ maxHeight: '200px' }}>
              {loadingMoves ? (
                <p className="text-gray-500 text-center py-2 text-xs">Loading moves...</p>
              ) : moveHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-2 text-xs">No moves yet</p>
              ) : (
                <div className="space-y-1">
                  {Array.from({ length: Math.ceil(moveHistory.length / 2) }).map((_, roundIndex) => {
                    const whiteMove = moveHistory[roundIndex * 2];
                    const blackMove = moveHistory[roundIndex * 2 + 1];

                    return (
                      <div key={roundIndex} className="flex items-center gap-2 text-xs py-1 border-b border-[#3a3a3a] last:border-0">
                        <span className="text-gray-500 w-5">{roundIndex + 1}.</span>
                        <span className="text-white flex-1 font-mono truncate">{whiteMove || ''}</span>
                        {blackMove && (
                          <span className="text-white flex-1 font-mono truncate">{blackMove}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile Move History - Always visible below board */}
        {isMobile && (
          <div className="mt-1 bg-[#2a2a2a] rounded-lg p-2 mx-1 flex-shrink-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-white font-semibold text-xs">Move History</span>
              <span className="text-gray-400 text-[10px]">{moveHistory.length} moves</span>
            </div>
            <div className="max-h-16 overflow-y-auto custom-scrollbar">
              {loadingMoves ? (
                <p className="text-gray-500 text-center py-1 text-xs">Loading moves...</p>
              ) : moveHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-1 text-xs">No moves yet</p>
              ) : (
                <div className="grid grid-cols-4 gap-1">
                  {moveHistory.map((move, index) => (
                    <div key={index} className="text-[10px] text-gray-300">
                      {index + 1}. {move}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className={`fixed top-20 right-4 z-50 p-3 rounded-lg shadow-lg animate-slideIn ${toastType === 'success' ? 'bg-green-600' :
            toastType === 'error' ? 'bg-red-600' : 'bg-blue-600'
          }`}>
          <p className="text-white text-sm">{toastMessage}</p>
        </div>
      )}

      {/* Game Over Popup */}
      {showGameOverPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#2a2a2a] rounded-lg shadow-xl max-w-md w-full border border-[#3a3a3a] animate-fadeIn">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white text-lg sm:text-xl font-bold">Game Over</h3>
                <button
                  onClick={() => setShowGameOverPopup(false)}
                  className="text-gray-400 hover:text-white transition"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="text-center mb-6">
                <p className="text-yellow-500 text-xl sm:text-2xl font-bold mb-2">{gameOverMessage}</p>

                {/* Winner badge */}
                {winner && winner !== 'draw' && (
                  <div className="inline-flex items-center gap-2 bg-[#3a3a3a] px-4 py-2 rounded-full">
                    <div className={`w-6 h-6 rounded-full ${winner === 'white' ? 'bg-yellow-500' : 'bg-gray-600'}`} />
                    <span className="text-white text-sm font-medium">
                      {winner === 'white' ? 'White' : 'Black'} wins
                    </span>
                  </div>
                )}

                {winner === 'draw' && (
                  <div className="inline-flex items-center gap-2 bg-[#3a3a3a] px-4 py-2 rounded-full">
                    <span className="text-white text-sm font-medium">Game Drawn</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={resetGame}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-3 rounded-lg text-sm font-semibold transition"
                >
                  Play Again
                </button>
                <button
                  onClick={() => {
                    setShowGameOverPopup(false);
                    onExit();
                  }}
                  className="flex-1 bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white px-4 py-3 rounded-lg text-sm font-semibold transition"
                >
                  Exit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #2a2a2a;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4a4a4a;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        .scroll-hide::-webkit-scrollbar {
          display: none;
        }
        .scroll-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}



// // testing for the  chess peices
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
//   Loader,
//   X
// } from "lucide-react";
// import { useGame } from "../../../context/GameContext";
// import { useAuth } from "../../../context/AuthContext";
// import { useSocket } from "../../../context/SocketContext";

// export default function ChessGame({ gameState, onExit }) {
//   const [game, setGame] = useState(new Chess());
//   const [orientation, setOrientation] = useState('white');
//   const [moveHistory, setMoveHistory] = useState([]);
//   const [gameStatus, setGameStatus] = useState('playing');
//   const [playerTimes, setPlayerTimes] = useState({
//     white: gameState?.initialTime ||
//       (gameState?.timeControlObject?.initial) ||
//       parseInt(gameState?.timeControl?.split('+')[0]) * 60 ||
//       600,
//     black: gameState?.initialTime ||
//       (gameState?.timeControlObject?.initial) ||
//       parseInt(gameState?.timeControl?.split('+')[0]) * 60 ||
//       600
//   });
//   const [activePlayer, setActivePlayer] = useState('white');
//   const [winner, setWinner] = useState(null);
//   const [showMenu, setShowMenu] = useState(false);
//   const [showSettingsMenu, setShowSettingsMenu] = useState(false);
//   const [isComputerThinking, setIsComputerThinking] = useState(false);
//   const [selectedSquare, setSelectedSquare] = useState(null);
//   const [validMoves, setValidMoves] = useState([]);
//   const [difficulty, setDifficulty] = useState('medium');
//   const [gameId, setGameId] = useState(gameState?.gameId || null);
//   const [gameOverMessage, setGameOverMessage] = useState('');
//   const [loadingMoves, setLoadingMoves] = useState(false);
//   const [currentPlayer, setCurrentPlayer] = useState(null);
//   const [showGameOverPopup, setShowGameOverPopup] = useState(false);
//   const [showToast, setShowToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState('');
//   const [toastType, setToastType] = useState('info');

//   // Mobile/Tablet dropdown states
//   const [showMobileBoardMenu, setShowMobileBoardMenu] = useState(false);
//   const [showMobileActionsMenu, setShowMobileActionsMenu] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isTablet, setIsTablet] = useState(false);
//   const [showTabletSidebar, setShowTabletSidebar] = useState(false);

//   const { getComputerMove, endGame, makeMove, getGameById } = useGame();
//   const { user } = useAuth();
//   const socket = useSocket();

//   // Piece set state
//   const [pieceSet, setPieceSet] = useState(user?.settings?.pieceSet || "alpha");
  
//   // Board theme state
//   const [boardTheme, setBoardTheme] = useState(user?.settings?.boardTheme || "classic");
  
//   const availablePieceSets = ["alpha", "california", "celtic", "fantasy", "horsey", "anarcandy", "dubrovny", "kosal", "pirouetti"];

//   // Board color schemes
//   const boardColorSchemes = {
//     themed: {
//       darkSquare: "#140905",
//       lightSquare: "#bdbdbd",
//       highlight: "#f7f769",
//       lastMove: "#b9d68c"
//     },
//     fresh: {
//       darkSquare: "#7b3f2a",
//       lightSquare: "#d2b48c",
//       highlight: "#f7f769",
//       lastMove: "#b9d68c"
//     },
//     classic: {
//       darkSquare: "#000000",
//       lightSquare: "#d4d4d4",
//       highlight: "#f7f769",
//       lastMove: "#b9d68c"
//     }
//   };

//   // Load board colors based on selected theme
//   const [boardColors, setBoardColors] = useState(() => {
//     const themeColors = boardColorSchemes[boardTheme] || boardColorSchemes.classic;
//     return {
//       dark: themeColors.darkSquare,
//       light: themeColors.lightSquare,
//       highlight: themeColors.highlight,
//       lastMove: themeColors.lastMove
//     };
//   });

//   // FIXED: Updated function to get piece images with proper paths for deployment
//   const getPieceImage = (color, type) => {
//     // Use public folder path - this will work in both development and production
//     const basePath = process.env.PUBLIC_URL || '';
//     const pieceCode = `${color}${type.toUpperCase()}`;
//     // Path should point to public/assets/chesspieces/ folder
//     return `${basePath}/assets/chesspieces/${pieceSet}/${pieceCode}.svg`;
//   };

//   // Load saved preferences from localStorage
//   useEffect(() => {
//     const savedBoardStyle = localStorage.getItem("boardStyle");
//     if (savedBoardStyle) {
//       try {
//         const parsed = JSON.parse(savedBoardStyle);
//         if (parsed.type) {
//           setBoardTheme(parsed.type);
//         }
//       } catch (e) {
//         setBoardTheme(savedBoardStyle);
//       }
//     }

//     const savedPieceSet = localStorage.getItem("pieceSet");
//     if (savedPieceSet) {
//       setPieceSet(savedPieceSet);
//     }
//   }, []);

//   // Update board colors when theme changes
//   useEffect(() => {
//     const themeColors = boardColorSchemes[boardTheme] || boardColorSchemes.classic;
//     setBoardColors({
//       dark: themeColors.darkSquare,
//       light: themeColors.lightSquare,
//       highlight: "#f7f769",
//       lastMove: "#b9d68c"
//     });
//   }, [boardTheme]);

//   // Update when user settings change
//   useEffect(() => {
//     if (user?.settings?.pieceSet) {
//       setPieceSet(user.settings.pieceSet);
//     }
//     if (user?.settings?.boardTheme) {
//       setBoardTheme(user.settings.boardTheme);
//     }
//   }, [user]);

//   // Check if mobile/tablet view
//   useEffect(() => {
//     const checkDevice = () => {
//       const width = window.innerWidth;
//       setIsMobile(width < 768);
//       setIsTablet(width >= 768 && width < 1024);
//     };

//     checkDevice();
//     window.addEventListener('resize', checkDevice);

//     return () => window.removeEventListener('resize', checkDevice);
//   }, []);

//   // Refs
//   const gameRef = useRef(game);
//   const activePlayerRef = useRef(activePlayer);
//   const gameStatusRef = useRef(gameStatus);
//   const computerMoveTimeoutRef = useRef(null);
//   const timerIntervalRef = useRef(null);
//   const hasLoadedMovesRef = useRef(false);
//   const initialGameStateRef = useRef(gameState);

//   // Toast notification helper
//   const showNotification = (message, type = 'info') => {
//     setToastMessage(message);
//     setToastType(type);
//     setShowToast(true);
//     setTimeout(() => setShowToast(false), 3000);
//   };

//   // ============== DEFINE CALLBACKS IN PROPER ORDER ==============

//   const checkGameStatus = useCallback((gameCopy) => {
//     if (gameCopy.isCheckmate()) {
//       const checkmatedColor = gameCopy.turn() === 'w' ? 'white' : 'black';
//       const winner = checkmatedColor === 'white' ? 'black' : 'white';
//       const winnerName = winner === 'white' ? 'White' : 'Black';

//       setGameStatus('finished');
//       setWinner(winner);
//       setGameOverMessage(`Checkmate! ${winnerName} wins!`);
//       setShowGameOverPopup(true);

//       if (gameId) {
//         endGame(gameId, winner, 'checkmate');

//         if (gameState?.gameMode === 'online' && socket) {
//           socket.emit('game-ended', {
//             gameId,
//             result: winner,
//             termination: 'checkmate'
//           });
//         }
//       }
//       return true;
//     }

//     if (gameCopy.isStalemate()) {
//       setGameStatus('finished');
//       setWinner('draw');
//       setGameOverMessage('Stalemate! Game drawn!');
//       setShowGameOverPopup(true);

//       if (gameId) {
//         endGame(gameId, 'draw', 'stalemate');

//         if (gameState?.gameMode === 'online' && socket) {
//           socket.emit('game-ended', {
//             gameId,
//             result: 'draw',
//             termination: 'stalemate'
//           });
//         }
//       }
//       return true;
//     }

//     if (gameCopy.isDraw() || gameCopy.isThreefoldRepetition() || gameCopy.isInsufficientMaterial()) {
//       setGameStatus('finished');
//       setWinner('draw');
//       setGameOverMessage('Game drawn!');
//       setShowGameOverPopup(true);

//       if (gameId) {
//         endGame(gameId, 'draw', 'draw');

//         if (gameState?.gameMode === 'online' && socket) {
//           socket.emit('game-ended', {
//             gameId,
//             result: 'draw',
//             termination: 'draw'
//           });
//         }
//       }
//       return true;
//     }

//     return false;
//   }, [gameId, endGame, gameState?.gameMode, socket]);

//   const loadGameMoves = useCallback(async () => {
//     if (!gameId || gameState?.gameMode !== 'online') return;
//     if (hasLoadedMovesRef.current) return;

//     try {
//       setLoadingMoves(true);
//       const gameData = await getGameById(gameId);

//       if (gameData && gameData.moves && gameData.moves.length > 0) {
//         const chessGame = new Chess();
//         const sortedMoves = [...gameData.moves].sort((a, b) => a.moveNumber - b.moveNumber);

//         sortedMoves.forEach(move => {
//           try {
//             chessGame.move({
//               from: move.from,
//               to: move.to,
//               promotion: move.promotion || 'q'
//             });
//           } catch (e) {
//             console.error('Error applying move:', move, e);
//           }
//         });

//         setGame(chessGame);
//         const moveSANs = sortedMoves.map(move => move.san).filter(Boolean);
//         setMoveHistory(moveSANs);
//         setActivePlayer(chessGame.turn() === 'w' ? 'white' : 'black');

//         if (gameData.players) {
//           const whitePlayer = gameData.players.find(p => p.color === 'white');
//           const blackPlayer = gameData.players.find(p => p.color === 'black');

//           setPlayerTimes({
//             white: whitePlayer?.timeRemaining || playerTimes.white,
//             black: blackPlayer?.timeRemaining || playerTimes.black
//           });
//         }

//         if (gameData.status === 'completed') {
//           setGameStatus('finished');
//           setWinner(gameData.result);
//           setGameOverMessage(
//             gameData.result === 'white' ? 'White wins!' :
//               gameData.result === 'black' ? 'Black wins!' :
//                 'Game drawn!'
//           );
//           setShowGameOverPopup(true);
//         }
//       } else if (gameData && gameData.currentFen) {
//         try {
//           const chessGame = new Chess(gameData.currentFen);
//           setGame(chessGame);
//           setActivePlayer(chessGame.turn() === 'w' ? 'white' : 'black');
//         } catch (e) {
//           console.error('Error setting game from FEN:', e);
//         }
//       }

//       hasLoadedMovesRef.current = true;
//     } catch (error) {
//       console.error('Error loading game moves:', error);
//     } finally {
//       setLoadingMoves(false);
//     }
//   }, [gameId, gameState?.gameMode, getGameById, playerTimes]);

//   const handleOpponentMove = useCallback(({ move, fen, timeLeft, playerColor }) => {
//     try {
//       const gameCopy = new Chess(fen);
//       setGame(gameCopy);

//       if (move.san) {
//         setMoveHistory(prev => [...prev, move.san]);
//       }

//       setActivePlayer(playerColor === 'white' ? 'black' : 'white');

//       if (timeLeft) {
//         setPlayerTimes(prev => ({
//           ...prev,
//           [playerColor]: timeLeft
//         }));
//       }

//       setSelectedSquare(null);
//       setValidMoves([]);
//       checkGameStatus(gameCopy);

//     } catch (error) {
//       console.error('Error applying opponent move:', error);
//     }
//   }, [checkGameStatus]);

//   const handleGameCompleted = useCallback(({ result, termination, message }) => {
//     setGameStatus('finished');
//     setGameOverMessage(message);
//     setShowGameOverPopup(true);

//     if (result === 'white' || result === 'black') {
//       setWinner(result);
//     } else {
//       setWinner('draw');
//     }
//   }, []);

//   const handleDrawOffered = useCallback(({ userId, message }) => {
//     const acceptDraw = window.confirm(message + ' Do you accept?');

//     if (acceptDraw) {
//       if (socket) {
//         socket.emit('draw-response', {
//           gameId,
//           userId,
//           accepted: true,
//           message: 'Draw accepted!'
//         });

//         setGameStatus('finished');
//         setWinner('draw');
//         setGameOverMessage('Draw accepted! Game drawn by agreement.');
//         setShowGameOverPopup(true);

//         if (gameId) {
//           endGame(gameId, 'draw', 'agreement');
//         }
//       }
//     } else {
//       if (socket) {
//         socket.emit('draw-response', {
//           gameId,
//           userId,
//           accepted: false,
//           message: 'Draw declined. Continue playing.'
//         });
//       }
//     }
//   }, [gameId, socket, endGame]);

//   const handleDrawResponse = useCallback(({ userId, accepted, message }) => {
//     if (accepted) {
//       setGameStatus('finished');
//       setWinner('draw');
//       setGameOverMessage('Draw accepted! Game drawn by agreement.');
//       setShowGameOverPopup(true);

//       if (gameId) {
//         endGame(gameId, 'draw', 'agreement');
//       }
//     } else {
//       showNotification('Your opponent declined the draw offer. Continue playing.', 'error');
//     }
//   }, [gameId, endGame]);

//   const handleDrawDeclined = useCallback(({ userId, message }) => {
//     showNotification(message || 'Your opponent declined the draw offer.', 'error');
//   }, []);

//   const handleTimeout = useCallback(() => {
//     const winner = activePlayer === 'white' ? 'black' : 'white';
//     const winnerName = winner === 'white' ? 'White' : 'Black';
//     setGameStatus('finished');
//     setWinner(winner);
//     setGameOverMessage(`${winnerName} wins on time!`);
//     setShowGameOverPopup(true);

//     if (gameId) {
//       endGame(gameId, winner, 'timeout');

//       if (gameState?.gameMode === 'online' && socket) {
//         socket.emit('game-ended', {
//           gameId,
//           result: winner,
//           termination: 'timeout'
//         });
//       }
//     }
//   }, [activePlayer, gameId, endGame, gameState?.gameMode, socket]);

//   const handleGameOver = useCallback((result, board) => {
//     setGameStatus('finished');
//     setShowGameOverPopup(true);

//     if (result.checkmate) {
//       const winner = board.turn() === 'b' ? 'white' : 'black';
//       const winnerName = winner === 'white' ? 'White' : 'Black';

//       setWinner(winner);
//       setGameOverMessage(`Checkmate! ${winnerName} wins!`);

//       if (gameId) {
//         endGame(gameId, winner, 'checkmate');

//         if (gameState?.gameMode === 'online' && socket) {
//           socket.emit('game-ended', {
//             gameId,
//             result: winner,
//             termination: 'checkmate'
//           });
//         }
//       }
//     }
//     else if (result.stalemate) {
//       setWinner('draw');
//       setGameOverMessage('Stalemate! Game drawn!');

//       if (gameId) {
//         endGame(gameId, 'draw', 'stalemate');

//         if (gameState?.gameMode === 'online' && socket) {
//           socket.emit('game-ended', {
//             gameId,
//             result: 'draw',
//             termination: 'stalemate'
//           });
//         }
//       }
//     }
//     else if (result.draw) {
//       setWinner('draw');
//       setGameOverMessage('Game drawn!');

//       if (gameId) {
//         endGame(gameId, 'draw', 'draw');

//         if (gameState?.gameMode === 'online' && socket) {
//           socket.emit('game-ended', {
//             gameId,
//             result: 'draw',
//             termination: 'draw'
//           });
//         }
//       }
//     }
//   }, [gameId, endGame, gameState?.gameMode, socket]);

//   const makeComputerMove = useCallback(async () => {
//     try {
//       const result = await getComputerMove(gameId, game.fen(), difficulty);

//       if (result.success) {
//         if (result.gameOver) {
//           const gameCopy = new Chess(gameRef.current.fen());
//           handleGameOver(result, gameCopy);
//           return;
//         }

//         if (result.move) {
//           const move = result.move;
//           const gameCopy = new Chess(gameRef.current.fen());
//           const moveResult = gameCopy.move({
//             from: move.from,
//             to: move.to,
//             promotion: move.promotion || 'q'
//           });

//           if (moveResult) {
//             setGame(gameCopy);
//             setMoveHistory(prev => [...prev, moveResult.san]);
//             setActivePlayer('white');

//             if (result.timeRemaining) {
//               setPlayerTimes(prev => ({
//                 ...prev,
//                 black: result.timeRemaining
//               }));
//             }

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
//   }, [gameId, difficulty, getComputerMove, game, checkGameStatus, handleGameOver]);

//   // ============== EFFECTS ==============

//   useEffect(() => {
//     if (gameState?.difficulty) {
//       setDifficulty(gameState.difficulty);
//     }

//     if (gameState?.gameId) {
//       setGameId(gameState.gameId);
//     }

//     if (!gameState?.currentFen || hasLoadedMovesRef.current) return;

//     try {
//       const newGame = new Chess(gameState.currentFen);
//       setGame(newGame);

//       if (gameState?.moves?.length > 0) {
//         setMoveHistory(gameState.moves.map(move => move.san));
//       }

//       setActivePlayer(newGame.turn() === "w" ? "white" : "black");

//     } catch (error) {
//       console.error("Error initializing game:", error);
//     }

//   }, [gameState?.currentFen, gameState?.difficulty, gameState?.gameId, gameState?.moves]);

//   useEffect(() => {
//     if (gameState?.gameMode === 'online' && gameId && !hasLoadedMovesRef.current) {
//       loadGameMoves();
//     }
//   }, []);

//   useEffect(() => {
//     if (!gameState || !user) {
//       return;
//     }

//     const currentPlayer = gameState.players?.find(
//       p => p.userId?.toString() === user?.id?.toString()
//     );

//     setCurrentPlayer(currentPlayer);

//     if (currentPlayer) {
//       setOrientation(currentPlayer.color);
//     } else {
//       if (gameState.gameMode === 'vs-computer') {
//         setOrientation('white');
//       }
//     }
//   }, [gameState, user]);

//   useEffect(() => {
//     gameRef.current = game;
//     activePlayerRef.current = activePlayer;
//     gameStatusRef.current = gameStatus;
//   }, [game, activePlayer, gameStatus]);

//   useEffect(() => {
//     if (gameId && gameState?.gameMode === 'online' && socket) {
//       console.log(`Joining game room: game-${gameId}`);
//       socket.emit('join-game', { gameId });

//       socket.on('move-made', handleOpponentMove);
//       socket.on('game-completed', handleGameCompleted);
//       socket.on('draw-offered', handleDrawOffered);
//       socket.on('draw-response', handleDrawResponse);
//       socket.on('draw-declined', handleDrawDeclined);

//       return () => {
//         console.log(`Leaving game room: game-${gameId}`);
//         socket.emit('leave-game', { gameId });
//         socket.off('move-made', handleOpponentMove);
//         socket.off('game-completed', handleGameCompleted);
//         socket.off('draw-offered', handleDrawOffered);
//         socket.off('draw-response', handleDrawResponse);
//         socket.off('draw-declined', handleDrawDeclined);
//       };
//     }
//   }, [gameId, gameState?.gameMode, socket, handleOpponentMove, handleGameCompleted, handleDrawOffered, handleDrawResponse, handleDrawDeclined]);

//   useEffect(() => {
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
//   }, [activePlayer, gameState?.gameMode, gameStatus, gameId, makeComputerMove, isComputerThinking]);

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
//             handleTimeout();
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
//   }, [gameStatus, winner, handleTimeout]);

//   // ============== UI HANDLERS ==============

//   const handleSquareClick = async (square) => {
//     if (gameStatus !== 'playing') return;
//     if (loadingMoves) return;

//     if (gameState?.gameMode === 'vs-computer') {
//       if (activePlayer !== 'white') return;
//       if (isComputerThinking) return;
//     }

//     if (gameState?.gameMode === 'online') {
//       if (!user) return;

//       const currentPlayer = gameState.players?.find(
//         p => p.userId?.toString() === user?.id?.toString()
//       );

//       if (!currentPlayer) return;
//       if (currentPlayer.color !== activePlayer) return;
//     }

//     if (!selectedSquare) {
//       const piece = game.get(square);
//       if (piece && piece.color === (activePlayer === 'white' ? 'w' : 'b')) {
//         setSelectedSquare(square);

//         const moves = game.moves({
//           square: square,
//           verbose: true
//         });
//         setValidMoves(moves.map(m => m.to));
//       }
//     }
//     else {
//       if (validMoves.includes(square)) {
//         const gameCopy = new Chess(game.fen());
//         const move = gameCopy.move({
//           from: selectedSquare,
//           to: square,
//           promotion: 'q'
//         });

//         if (move) {
//           setGame(gameCopy);
//           setMoveHistory(prev => [...prev, move.san]);

//           const timeTaken = 1;
//           const newTimeLeft = playerTimes[activePlayer] - timeTaken;
//           setPlayerTimes(prev => ({
//             ...prev,
//             [activePlayer]: newTimeLeft
//           }));

//           if (gameId) {
//             await makeMove(gameId, {
//               from: selectedSquare,
//               to: square,
//               promotion: 'q',
//               fen: gameCopy.fen(),
//               san: move.san,
//               moveNumber: moveHistory.length + 1,
//               timeTaken
//             });

//             if (gameState?.gameMode === 'online' && socket) {
//               const playerColor = activePlayer;

//               socket.emit('make-move', {
//                 gameId,
//                 move: {
//                   from: selectedSquare,
//                   to: square,
//                   promotion: 'q',
//                   san: move.san
//                 },
//                 fen: gameCopy.fen(),
//                 timeLeft: newTimeLeft,
//                 playerColor
//               });
//             }
//           }

//           let nextPlayer;
//           if (gameState?.gameMode === 'vs-computer') {
//             nextPlayer = 'black';
//           } else {
//             nextPlayer = activePlayer === 'white' ? 'black' : 'white';
//           }
//           setActivePlayer(nextPlayer);

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
//       return boardColors.highlight;
//     }

//     if (validMoves.includes(square)) {
//       return boardColors.lastMove;
//     }

//     return isDark ? boardColors.dark : boardColors.light;
//   };

//   const renderBoard = () => {
//     const squares = [];
//     const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

//     const rows = orientation === 'white' ? [0, 1, 2, 3, 4, 5, 6, 7] : [7, 6, 5, 4, 3, 2, 1, 0];
//     const cols = orientation === 'white' ? [0, 1, 2, 3, 4, 5, 6, 7] : [7, 6, 5, 4, 3, 2, 1, 0];

//     let squareSize;
//     if (isMobile) {
//       squareSize = '40px';
//     } else if (isTablet) {
//       squareSize = '65px';
//     } else {
//       squareSize = '62px';
//     }

//     for (let row of rows) {
//       for (let col of cols) {
//         const square = files[col] + (8 - row);
//         const piece = game.get(square);
//         const bgColor = getSquareColor(row, col);

//         squares.push(
//           <div
//             key={square}
//             onClick={() => handleSquareClick(square)}
//             className="relative flex items-center justify-center cursor-pointer transition-colors duration-200"
//             style={{
//               backgroundColor: bgColor,
//               width: squareSize,
//               height: squareSize,
//             }}
//           >
//             {piece && (
//               <img
//                 src={getPieceImage(piece.color === 'w' ? 'w' : 'b', piece.type)}
//                 alt={`${piece.color}${piece.type}`}
//                 className="w-4/5 h-4/5 object-contain pointer-events-none select-none"
//                 onError={(e) => {
//                   // Try PNG fallback
//                   const basePath = process.env.PUBLIC_URL || '';
//                   const pieceCode = `${piece.color === 'w' ? 'w' : 'b'}${piece.type.toUpperCase()}`;
//                   e.target.src = `${basePath}/assets/chesspieces/${pieceSet}/${pieceCode}.png`;
//                   e.onerror = () => {
//                     // If both fail, show Unicode character
//                     e.target.style.display = 'none';
//                     const pieceMap = {
//                       'wk': '♔', 'wq': '♕', 'wr': '♖', 'wb': '♗', 'wn': '♘', 'wp': '♙',
//                       'bk': '♚', 'bq': '♛', 'br': '♜', 'bb': '♝', 'bn': '♞', 'bp': '♟'
//                     };
//                     const key = `${piece.color === 'w' ? 'w' : 'b'}${piece.type}`;
//                     const textSpan = document.createElement('span');
//                     textSpan.className = 'text-4xl';
//                     textSpan.textContent = pieceMap[key];
//                     e.target.parentElement.appendChild(textSpan);
//                   };
//                 }}
//               />
//             )}

//             {row === (orientation === 'white' ? 7 : 0) && !isMobile && !isTablet && (
//               <span className="absolute bottom-0 right-1 text-[8px] md:text-xs opacity-50 text-black hidden sm:block">
//                 {files[col]}
//               </span>
//             )}
//             {col === (orientation === 'white' ? 0 : 7) && !isMobile && !isTablet && (
//               <span className="absolute top-0 left-1 text-[8px] md:text-xs opacity-50 text-black hidden sm:block">
//                 {8 - row}
//               </span>
//             )}
//           </div>
//         );
//       }
//     }

//     const boardSize = isMobile ? '320px' : isTablet ? '520px' : '500px';

//     return (
//       <div
//         className="grid grid-cols-8 gap-0 border-2 sm:border-4 border-[#3a3a3a] rounded-lg overflow-hidden mx-auto"
//         style={{ width: boardSize, height: boardSize }}
//       >
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
//     if (loadingMoves) return 'Loading game moves...';
//     if (game.isCheck() && gameStatus === 'playing') {
//       const playerInCheck = game.turn() === 'w' ? 'Black' : 'White';
//       return `${playerInCheck} is in check!`;
//     }
//     if (isComputerThinking) return 'Computer thinking...';
//     if (currentPlayer && activePlayer === currentPlayer.color) return "Your turn";
//     return "opponent's turn";
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
//     setGameOverMessage('');
//     setShowGameOverPopup(false);
//     setPlayerTimes({
//       white: parseInt(gameState?.timeControl?.split('+')[0]) * 60 || 600,
//       black: parseInt(gameState?.timeControl?.split('+')[0]) * 60 || 600
//     });
//     hasLoadedMovesRef.current = false;
//   };

//   const resign = () => {
//     const winner = activePlayer === 'white' ? 'black' : 'white';
//     const winnerName = winner === 'white' ? 'White' : 'Black';
//     setGameStatus('finished');
//     setWinner(winner);
//     setGameOverMessage(`${winnerName} wins by resignation!`);
//     setShowGameOverPopup(true);
//     setSelectedSquare(null);
//     setValidMoves([]);
//     setShowMobileActionsMenu(false);
//     setShowTabletSidebar(false);

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
//     if (gameState?.gameMode === 'vs-computer') {
//       const shouldAccept = Math.random() > 0.5;

//       if (shouldAccept) {
//         setGameStatus('finished');
//         setWinner('draw');
//         setGameOverMessage('Draw accepted! Computer agrees to a draw.');
//         setShowGameOverPopup(true);
//         if (gameId) {
//           endGame(gameId, 'draw', 'agreement');
//         }
//       } else {
//         showNotification('Computer declined your draw offer. Continue playing.', 'error');
//       }
//     } else if (gameState?.gameMode === 'online' && socket) {
//       socket.emit('offer-draw', {
//         gameId,
//         userId: user?.id,
//         message: `${user?.username || 'Your opponent'} offers a draw.`
//       });

//       showNotification('Draw offer sent to opponent. Waiting for response...', 'info');
//     } else {
//       showNotification('Draw offer sent to opponent', 'info');
//     }
//     setShowMobileActionsMenu(false);
//     setShowTabletSidebar(false);
//   };

//   const changeBoardColor = (colorType, colorValue) => {
//     setBoardColors(prev => ({
//       ...prev,
//       [colorType]: colorValue
//     }));
//   };

//   const cycleTheme = () => {
//     const themes = [
//       boardColorSchemes.themed,
//       boardColorSchemes.fresh,
//       boardColorSchemes.classic,
//     ];

//     const currentThemeIndex = themes.findIndex(
//       theme => theme.darkSquare === boardColors.dark && theme.lightSquare === boardColors.light
//     );

//     const nextThemeIndex = (currentThemeIndex + 1) % themes.length;
//     const nextTheme = themes[nextThemeIndex];
//     setBoardColors({
//       dark: nextTheme.darkSquare,
//       light: nextTheme.lightSquare,
//       highlight: "#f7f769",
//       lastMove: "#b9d68c"
//     });
//     setBoardTheme(Object.keys(boardColorSchemes)[nextThemeIndex]);
//     setShowMobileBoardMenu(false);
//   };

//   if (!gameState) {
//     return (
//       <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center">
//         <div className="text-white flex items-center gap-3">
//           <Loader className="animate-spin text-amber-400" size={24} />
//           <span>Loading game data...</span>
//         </div>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center">
//         <div className="text-white flex items-center gap-3">
//           <Loader className="animate-spin text-amber-400" size={24} />
//           <span>Loading user data...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="h-screen bg-[#1e1e1e] flex flex-col overflow-hidden">
//       {/* Top Navigation Bar */}
//       <div className="bg-[#2a2a2a] px-2 sm:px-4 py-2 flex items-center justify-between border-b border-[#3a3a3a] flex-shrink-0">
//         <div className="flex items-center gap-2 sm:gap-4">
//           <button
//             onClick={onExit}
//             className="text-gray-400 hover:text-white transition p-1"
//             disabled={isComputerThinking || loadingMoves}
//           >
//             <ArrowLeft size={window.innerWidth < 640 ? 18 : 20} />
//           </button>
//           <button
//             onClick={() => setShowMenu(!showMenu)}
//             className="text-gray-400 hover:text-white transition p-1"
//             disabled={isComputerThinking || loadingMoves}
//           >
//             <Menu size={window.innerWidth < 640 ? 18 : 20} />
//           </button>
//           <div className="flex items-center gap-1 sm:gap-2">
//             <span className="text-white font-medium text-sm sm:text-base">Play</span>
//             <span className="text-gray-400 text-sm sm:text-base">•</span>
//             <span className="text-gray-400 text-xs sm:text-sm truncate max-w-[120px] sm:max-w-none">
//               {gameState?.gameMode === 'vs-computer' ? `vs Computer (${difficulty})` : 'Online'}
//             </span>
//           </div>
//         </div>

//         <div className="flex items-center gap-1 sm:gap-2">
//           <button className="p-1 sm:p-2 hover:bg-[#3a3a3a] rounded-lg transition">
//             <Volume2 size={window.innerWidth < 640 ? 16 : 18} className="text-gray-400" />
//           </button>

//           {(isMobile || isTablet) ? (
//             <>
//               <button
//                 onClick={() => setShowMobileBoardMenu(!showMobileBoardMenu)}
//                 className="p-1 sm:p-2 hover:bg-[#3a3a3a] rounded-lg transition relative"
//               >
//                 <Settings size={window.innerWidth < 640 ? 16 : 18} className="text-gray-400" />
//               </button>

//               {showMobileBoardMenu && (
//                 <div className="absolute right-0 top-12 mt-2 w-64 bg-[#1e1e1e] border border-[#333] rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
//                   <div className="p-3 border-b border-[#333]">
//                     <h3 className="text-white font-semibold text-sm">Board Settings</h3>
//                   </div>

//                   <div className="p-3">
//                     <p className="text-gray-400 text-xs mb-2">Piece Set</p>
//                     <div className="grid grid-cols-2 gap-2">
//                       {availablePieceSets.slice(0, 6).map(set => (
//                         <button
//                           key={set}
//                           onClick={() => {
//                             setPieceSet(set);
//                             setShowMobileBoardMenu(false);
//                           }}
//                           className={`flex items-center justify-between p-2 rounded ${pieceSet === set ? "bg-[#333]" : "hover:bg-[#333]"
//                             }`}
//                         >
//                           <span className="text-xs text-gray-300 truncate">
//                             {set.charAt(0).toUpperCase() + set.slice(1, 8)}
//                           </span>
//                           <img
//                             src={`/assets/chesspieces/${set}/wN.svg`}
//                             alt="preview"
//                             className="w-6 h-6 object-contain"
//                             onError={(e) => {
//                               e.target.onerror = null;
//                               e.target.src = `/assets/chesspieces/${set}/wN.png`;
//                             }}
//                           />
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="p-3 border-t border-[#333]">
//                     <p className="text-gray-400 text-xs mb-2">Colors</p>
//                     <div className="space-y-2">
//                       <div className="flex items-center justify-between">
//                         <span className="text-gray-300 text-xs">Dark:</span>
//                         <input
//                           type="color"
//                           value={boardColors.dark}
//                           onChange={(e) => changeBoardColor('dark', e.target.value)}
//                           className="w-8 h-8 rounded"
//                         />
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <span className="text-gray-300 text-xs">Light:</span>
//                         <input
//                           type="color"
//                           value={boardColors.light}
//                           onChange={(e) => changeBoardColor('light', e.target.value)}
//                           className="w-8 h-8 rounded"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <button
//                     onClick={cycleTheme}
//                     className="w-full p-3 text-center text-sm text-yellow-500 border-t border-[#333] hover:bg-[#333]"
//                   >
//                     Cycle Theme
//                   </button>
//                 </div>
//               )}
//             </>
//           ) : (
//             <div className="relative">
//               <button
//                 onClick={() => setShowSettingsMenu(prev => !prev)}
//                 className="p-1 sm:p-2 hover:bg-[#3a3a3a] rounded-lg transition"
//               >
//                 <Settings size={window.innerWidth < 640 ? 16 : 18} className="text-gray-400" />
//               </button>

//               {showSettingsMenu && (
//                 <div className="absolute right-0 mt-2 w-48 sm:w-56 max-h-80 overflow-y-auto 
//                   bg-[#1e1e1e] text-white border border-[#333] rounded-lg shadow-lg z-50
//                   scroll-hide">
//                   <div className="px-4 py-2 text-xs uppercase">
//                     Piece Set
//                   </div>

//                   {availablePieceSets.map(set => (
//                     <button
//                       key={set}
//                       onClick={() => {
//                         setPieceSet(set);
//                         setShowSettingsMenu(false);
//                       }}
//                       className={`flex items-center justify-between w-full px-4 py-2 hover:bg-[#333] transition ${pieceSet === set ? "bg-[#333]" : ""
//                         }`}
//                     >
//                       <span className="text-sm">
//                         {set.charAt(0).toUpperCase() + set.slice(1)}
//                       </span>

//                       <img
//                         src={`/assets/chesspieces/${set}/wN.svg`}
//                         alt="knight preview"
//                         className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
//                         onError={(e) => {
//                           e.target.onerror = null;
//                           e.target.src = `/assets/chesspieces/${set}/wN.png`;
//                         }}
//                       />
//                     </button>
//                   ))}

//                   <div className="border-t border-[#333] my-2" />

//                   <div className="px-4 py-2 space-y-2">
//                     <div className="flex items-center gap-2">
//                       <label className="text-gray-400 text-xs">Dark:</label>
//                       <input
//                         type="color"
//                         value={boardColors.dark}
//                         onChange={(e) => changeBoardColor('dark', e.target.value)}
//                         className="w-6 h-6 sm:w-8 sm:h-8 rounded cursor-pointer"
//                       />
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <label className="text-gray-400 text-xs">Light:</label>
//                       <input
//                         type="color"
//                         value={boardColors.light}
//                         onChange={(e) => changeBoardColor('light', e.target.value)}
//                         className="w-6 h-6 sm:w-8 sm:h-8 rounded cursor-pointer"
//                       />
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <label className="text-gray-400 text-xs">Highlight:</label>
//                       <input
//                         type="color"
//                         value={boardColors.highlight}
//                         onChange={(e) => changeBoardColor('highlight', e.target.value)}
//                         className="w-6 h-6 sm:w-8 sm:h-8 rounded cursor-pointer"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {(isMobile || isTablet) && (
//             <>
//               <button
//                 onClick={() => setShowMobileActionsMenu(!showMobileActionsMenu)}
//                 className="p-1 sm:p-2 hover:bg-[#3a3a3a] rounded-lg transition"
//               >
//                 <Flag size={16} className="text-gray-400" />
//               </button>

//               {showMobileActionsMenu && (
//                 <div className="absolute right-0 top-12 mt-2 w-48 bg-[#1e1e1e] border border-[#333] rounded-lg shadow-lg z-50">
//                   <div className="p-2">
//                     <button
//                       onClick={resign}
//                       disabled={gameStatus !== 'playing' || orientation !== activePlayer}
//                       className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm ${gameStatus === 'playing' && orientation === activePlayer
//                           ? 'text-red-500 hover:bg-[#333]'
//                           : 'text-gray-500 cursor-not-allowed'
//                         }`}
//                     >
//                       <Flag size={14} />
//                       <span>Resign</span>
//                     </button>

//                     <button
//                       onClick={offerDraw}
//                       disabled={gameStatus !== 'playing'}
//                       className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm ${gameStatus === 'playing'
//                           ? 'text-gray-300 hover:bg-[#333]'
//                           : 'text-gray-500 cursor-not-allowed'
//                         }`}
//                     >
//                       <Share2 size={14} />
//                       <span>Offer Draw</span>
//                     </button>

//                     <button
//                       onClick={() => {
//                         setOrientation(orientation === 'white' ? 'black' : 'white');
//                         setShowMobileActionsMenu(false);
//                       }}
//                       className="w-full flex items-center gap-2 px-3 py-2 rounded text-sm text-gray-300 hover:bg-[#333]"
//                     >
//                       <RotateCcw size={14} />
//                       <span>Flip Board</span>
//                     </button>

//                     {isTablet && (
//                       <button
//                         onClick={() => {
//                           setShowTabletSidebar(!showTabletSidebar);
//                           setShowMobileActionsMenu(false);
//                         }}
//                         className="w-full flex items-center gap-2 px-3 py-2 rounded text-sm text-gray-300 hover:bg-[#333] mt-1 border-t border-[#333] pt-2"
//                       >
//                         <Menu size={14} />
//                         <span>{showTabletSidebar ? 'Hide' : 'Show'} Moves</span>
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>

//       {/* Main Game Area */}
//       <div className="flex-1 flex flex-col lg:flex-row p-2 sm:p-3 gap-2 sm:gap-3 overflow-hidden">
//         {/* Left Side - Board and Players */}
//         <div className={`flex-1 flex flex-col ${isTablet && showTabletSidebar ? 'w-2/3' : 'w-full'} overflow-hidden`}>
//           {/* Top Player (Black) */}
//           <div className="bg-[#2a2a2a] rounded-t-lg p-2 sm:p-2 flex items-center justify-between flex-shrink-0">
//             <div className="flex items-center gap-2 sm:gap-2">
//               <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center">
//                 <span className="text-white font-bold text-xs sm:text-sm">
//                   {gameState?.players?.find(p => p.color === 'black')?.username?.charAt(0) || 'C'}
//                 </span>
//               </div>
//               <div>
//                 <div className="flex items-center gap-1">
//                   <span className="text-white font-medium text-xs truncate max-w-[60px] sm:max-w-[80px]">
//                     {gameState?.players?.find(p => p.color === 'black')?.username ||
//                       (gameState?.gameMode === 'vs-computer' ? `Computer` : 'Opponent')}
//                   </span>
//                   <span className="bg-[#3a3a3a] text-gray-400 text-[10px] px-1 py-0.5 rounded">
//                     {gameState?.players?.find(p => p.color === 'black')?.rating || '1500'}
//                   </span>
//                 </div>
//                 {isComputerThinking && gameState?.gameMode === 'vs-computer' && (
//                   <span className="text-[10px] text-yellow-500 flex items-center gap-1">
//                     <Loader size={8} className="animate-spin" />
//                     <span className="hidden sm:inline">Thinking...</span>
//                   </span>
//                 )}
//               </div>
//             </div>
//             <div className={`font-mono text-sm sm:text-lg font-bold ${activePlayer === 'black' && gameStatus === 'playing' ? 'text-yellow-500' : 'text-white'}`}>
//               {formatTime(playerTimes.black)}
//             </div>
//           </div>

//           {/* Chess Board */}
//           <div className="bg-[#2a2a2a] p-2 flex justify-center items-center flex-1 overflow-hidden">
//             {renderBoard()}
//           </div>

//           {/* Bottom Player (White) */}
//           <div className="bg-[#2a2a2a] rounded-b-lg p-2 sm:p-2 flex items-center justify-between flex-shrink-0">
//             <div className="flex items-center gap-2 sm:gap-2">
//               <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-full flex items-center justify-center">
//                 <span className="text-white font-bold text-xs sm:text-sm">
//                   {gameState?.players?.find(p => p.color === 'white')?.username?.charAt(0) || 'Y'}
//                 </span>
//               </div>
//               <div>
//                 <div className="flex items-center gap-1">
//                   <span className="text-white font-medium text-xs">
//                     {gameState?.players?.find(p => p.color === 'white')?.username || 'You'}
//                   </span>
//                   <span className="bg-[#3a3a3a] text-gray-400 text-[10px] px-1 py-0.5 rounded">
//                     {gameState?.players?.find(p => p.color === 'white')?.rating || '1450'}
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className={`font-mono text-sm sm:text-lg font-bold ${activePlayer === 'white' && gameStatus === 'playing' ? 'text-yellow-500' : 'text-white'}`}>
//               {formatTime(playerTimes.white)}
//             </div>
//           </div>
//         </div>

//         {/* Right Sidebar - Desktop only */}
//         <div className="lg:w-64 w-full bg-[#2a2a2a] rounded-lg flex-col mt-2 lg:mt-0 hidden lg:flex overflow-hidden">
//           <div className="p-2 border-b border-[#3a3a3a] flex-shrink-0">
//             <div className="text-center">
//               <span className="text-white text-base font-semibold">
//                 {gameState?.timeControl || '10+0'}
//               </span>
//               <p className="text-gray-400 text-xs mt-0.5">
//                 {gameState?.gameMode === 'vs-computer' ? `vs Computer (${difficulty})` : 'Online Game'}
//               </p>
//             </div>
//           </div>

//           <div className="flex border-b border-[#3a3a3a] flex-shrink-0">
//             <button className="flex-1 px-2 py-1.5 text-xs font-medium text-yellow-500 border-b-2 border-yellow-500">
//               Moves
//             </button>
//             <button className="flex-1 px-2 py-1.5 text-xs font-medium text-gray-400 hover:text-white">
//               Chat
//             </button>
//           </div>

//           <div className="flex-1 overflow-y-auto p-2 custom-scrollbar" style={{ maxHeight: '180px' }}>
//             <div className="space-y-1">
//               {loadingMoves ? (
//                 <p className="text-gray-500 text-center py-2 text-xs">Loading moves...</p>
//               ) : moveHistory.length === 0 ? (
//                 <p className="text-gray-500 text-center py-2 text-xs">No moves yet</p>
//               ) : (
//                 <div className="space-y-1">
//                   {Array.from({ length: Math.ceil(moveHistory.length / 2) }).map((_, roundIndex) => {
//                     const whiteMove = moveHistory[roundIndex * 2];
//                     const blackMove = moveHistory[roundIndex * 2 + 1];

//                     return (
//                       <div key={roundIndex} className="flex items-center gap-2 text-xs py-1 border-b border-[#3a3a3a] last:border-0">
//                         <span className="text-gray-500 w-5">{roundIndex + 1}.</span>
//                         <span className="text-white flex-1 font-mono truncate">{whiteMove || ''}</span>
//                         {blackMove && (
//                           <span className="text-white flex-1 font-mono truncate">{blackMove}</span>
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="border-t border-[#3a3a3a] p-2 space-y-1.5 flex-shrink-0">
//             <button
//               onClick={() => setOrientation(orientation === 'white' ? 'black' : 'white')}
//               className="w-full bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white py-1.5 rounded-lg text-xs transition flex items-center justify-center gap-1"
//               disabled={isComputerThinking || loadingMoves}
//             >
//               <RotateCcw size={12} />
//               <span>Flip Board</span>
//             </button>
//             <button
//               onClick={cycleTheme}
//               className="w-full bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white py-1.5 rounded-lg text-xs transition flex items-center justify-center gap-1"
//               disabled={isComputerThinking || loadingMoves}
//             >
//               <RotateCcw size={12} />
//               <span>Cycle Board Theme</span>
//             </button>
//             <button
//               onClick={resign}
//               disabled={orientation !== activePlayer}
//               className={`w-full py-1.5 rounded-lg text-xs transition flex items-center justify-center gap-1 ${gameStatus === 'playing' && !isComputerThinking && !loadingMoves && orientation === activePlayer
//                   ? 'bg-red-500 hover:bg-red-600 text-white'
//                   : 'bg-[#3a3a3a] text-gray-500 cursor-not-allowed'
//                 }`}
//             >
//               <Flag size={12} />
//               <span>Resign</span>
//             </button>
//             <button
//               onClick={offerDraw}
//               disabled={gameStatus !== 'playing' || isComputerThinking || loadingMoves}
//               className={`w-full py-1.5 rounded-lg text-xs transition flex items-center justify-center gap-1 ${gameStatus === 'playing' && !isComputerThinking && !loadingMoves
//                   ? 'bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white'
//                   : 'bg-[#3a3a3a] text-gray-500 cursor-not-allowed'
//                 }`}
//             >
//               <Share2 size={12} />
//               <span>Offer Draw</span>
//             </button>

//             <div className="mt-1 pt-1 border-t border-[#3a3a3a] text-center">
//               <p className={`text-xs font-semibold ${activePlayer === currentPlayer?.color ? 'text-green-500' : 'text-yellow-500'
//                 }`}>
//                 {getGameStatusMessage()}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Tablet Sidebar */}
//         {isTablet && showTabletSidebar && (
//           <div className="w-1/3 bg-[#2a2a2a] rounded-lg flex flex-col ml-2 animate-slideIn overflow-hidden">
//             <div className="p-2 border-b border-[#3a3a3a] flex justify-between items-center flex-shrink-0">
//               <span className="text-white font-semibold text-xs">Game Info</span>
//               <button onClick={() => setShowTabletSidebar(false)} className="text-gray-400 hover:text-white">
//                 <ArrowLeft size={14} />
//               </button>
//             </div>

//             <div className="p-2 border-b border-[#3a3a3a] flex-shrink-0">
//               <p className="text-gray-400 text-xs">Time Control</p>
//               <p className="text-white text-xs font-semibold">{gameState?.timeControl || '10+0'}</p>
//             </div>

//             <div className="flex border-b border-[#3a3a3a] flex-shrink-0">
//               <button className="flex-1 px-2 py-1 text-xs font-medium text-yellow-500 border-b-2 border-yellow-500">
//                 Moves
//               </button>
//               <button className="flex-1 px-2 py-1 text-xs font-medium text-gray-400">
//                 Chat
//               </button>
//             </div>

//             <div className="flex-1 overflow-y-auto p-2 custom-scrollbar" style={{ maxHeight: '200px' }}>
//               {loadingMoves ? (
//                 <p className="text-gray-500 text-center py-2 text-xs">Loading moves...</p>
//               ) : moveHistory.length === 0 ? (
//                 <p className="text-gray-500 text-center py-2 text-xs">No moves yet</p>
//               ) : (
//                 <div className="space-y-1">
//                   {Array.from({ length: Math.ceil(moveHistory.length / 2) }).map((_, roundIndex) => {
//                     const whiteMove = moveHistory[roundIndex * 2];
//                     const blackMove = moveHistory[roundIndex * 2 + 1];

//                     return (
//                       <div key={roundIndex} className="flex items-center gap-2 text-xs py-1 border-b border-[#3a3a3a] last:border-0">
//                         <span className="text-gray-500 w-5">{roundIndex + 1}.</span>
//                         <span className="text-white flex-1 font-mono truncate">{whiteMove || ''}</span>
//                         {blackMove && (
//                           <span className="text-white flex-1 font-mono truncate">{blackMove}</span>
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Mobile Move History */}
//         {isMobile && (
//           <div className="mt-1 bg-[#2a2a2a] rounded-lg p-2 mx-1 flex-shrink-0">
//             <div className="flex items-center justify-between mb-1">
//               <span className="text-white font-semibold text-xs">Move History</span>
//               <span className="text-gray-400 text-[10px]">{moveHistory.length} moves</span>
//             </div>
//             <div className="max-h-16 overflow-y-auto custom-scrollbar">
//               {loadingMoves ? (
//                 <p className="text-gray-500 text-center py-1 text-xs">Loading moves...</p>
//               ) : moveHistory.length === 0 ? (
//                 <p className="text-gray-500 text-center py-1 text-xs">No moves yet</p>
//               ) : (
//                 <div className="grid grid-cols-4 gap-1">
//                   {moveHistory.map((move, index) => (
//                     <div key={index} className="text-[10px] text-gray-300">
//                       {index + 1}. {move}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Toast Notification */}
//       {showToast && (
//         <div className={`fixed top-20 right-4 z-50 p-3 rounded-lg shadow-lg animate-slideIn ${toastType === 'success' ? 'bg-green-600' :
//             toastType === 'error' ? 'bg-red-600' : 'bg-blue-600'
//           }`}>
//           <p className="text-white text-sm">{toastMessage}</p>
//         </div>
//       )}

//       {/* Game Over Popup */}
//       {showGameOverPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
//           <div className="bg-[#2a2a2a] rounded-lg shadow-xl max-w-md w-full border border-[#3a3a3a] animate-fadeIn">
//             <div className="p-4 sm:p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-white text-lg sm:text-xl font-bold">Game Over</h3>
//                 <button
//                   onClick={() => setShowGameOverPopup(false)}
//                   className="text-gray-400 hover:text-white transition"
//                 >
//                   <X size={20} />
//                 </button>
//               </div>

//               <div className="text-center mb-6">
//                 <p className="text-yellow-500 text-xl sm:text-2xl font-bold mb-2">{gameOverMessage}</p>

//                 {winner && winner !== 'draw' && (
//                   <div className="inline-flex items-center gap-2 bg-[#3a3a3a] px-4 py-2 rounded-full">
//                     <div className={`w-6 h-6 rounded-full ${winner === 'white' ? 'bg-yellow-500' : 'bg-gray-600'}`} />
//                     <span className="text-white text-sm font-medium">
//                       {winner === 'white' ? 'White' : 'Black'} wins
//                     </span>
//                   </div>
//                 )}

//                 {winner === 'draw' && (
//                   <div className="inline-flex items-center gap-2 bg-[#3a3a3a] px-4 py-2 rounded-full">
//                     <span className="text-white text-sm font-medium">Game Drawn</span>
//                   </div>
//                 )}
//               </div>

//               <div className="flex flex-col sm:flex-row gap-3">
//                 <button
//                   onClick={resetGame}
//                   className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-3 rounded-lg text-sm font-semibold transition"
//                 >
//                   Play Again
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowGameOverPopup(false);
//                     onExit();
//                   }}
//                   className="flex-1 bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white px-4 py-3 rounded-lg text-sm font-semibold transition"
//                 >
//                   Exit
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Custom scrollbar styles */}
//       <style jsx>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 3px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: #2a2a2a;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #4a4a4a;
//           border-radius: 3px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: #555;
//         }
//         .scroll-hide::-webkit-scrollbar {
//           display: none;
//         }
//         .scroll-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//         @keyframes slideIn {
//           from {
//             opacity: 0;
//             transform: translateX(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }
//         .animate-slideIn {
//           animation: slideIn 0.3s ease-out;
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.2s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }