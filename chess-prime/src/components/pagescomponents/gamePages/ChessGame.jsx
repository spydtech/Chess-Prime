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
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [validMoves, setValidMoves] = useState([]);
  
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

  // Update refs
  useEffect(() => {
    gameRef.current = game;
    activePlayerRef.current = activePlayer;
    gameStatusRef.current = gameStatus;
  }, [game, activePlayer, gameStatus]);

  // Computer move logic
  useEffect(() => {
    if (computerMoveTimeoutRef.current) {
      clearTimeout(computerMoveTimeoutRef.current);
    }

    const shouldComputerMove = () => {
      if (gameState?.gameMode !== 'vs-computer') return false;
      if (gameStatusRef.current !== 'playing') return false;
      if (isComputerThinking) return false;
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
  }, [activePlayer, gameState?.gameMode, gameStatus]);

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
      
      if (currentGame.isGameOver()) {
        checkGameStatus(currentGame);
        setIsComputerThinking(false);
        return;
      }

      const possibleMoves = currentGame.moves({ verbose: true });
      
      if (possibleMoves.length === 0) {
        checkGameStatus(currentGame);
        setIsComputerThinking(false);
        return;
      }

      const randomIndex = Math.floor(Math.random() * possibleMoves.length);
      const move = possibleMoves[randomIndex];
      
      const gameCopy = new Chess(gameRef.current.fen());
      const result = gameCopy.move({
        from: move.from,
        to: move.to,
        promotion: 'q'
      });
      
      if (result) {
        setGame(gameCopy);
        setMoveHistory(prev => [...prev, result.san]);
        setActivePlayer('white');
        checkGameStatus(gameCopy);
      }
    } catch (error) {
      console.error("Computer move error:", error);
    } finally {
      setIsComputerThinking(false);
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

  const handleSquareClick = (square) => {
    if (gameStatus !== 'playing') return;
    if (gameState?.gameMode === 'vs-computer' && activePlayer !== 'white') return;

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
          setActivePlayer(gameState?.gameMode === 'vs-computer' ? 'black' : (activePlayer === 'white' ? 'black' : 'white'));
          checkGameStatus(gameCopy);
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
      return boardColors.highlight;
    }
    
    return isDark ? boardColors.dark : boardColors.light;
  };

  const renderBoard = () => {
    const squares = [];
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const square = files[col] + (8 - row);
        const piece = game.get(square);
        const isDark = (row + col) % 2 === 1;
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

        squares.push(
          <div
            key={square}
            onClick={() => handleSquareClick(square)}
            className="relative flex items-center justify-center text-4xl cursor-pointer transition-colors duration-200"
            style={{
              backgroundColor: bgColor,
              width: '100px',
              height: '100px',
              color: piece?.color === 'w' ? '#ffffff' : '#000000',
              textShadow: piece?.color === 'w' ? '1px 1px 2px rgba(0,0,0,0.3)' : '1px 1px 2px rgba(255,255,255,0.3)'
            }}
          >
            {pieceSymbol}
            {/* Coordinate labels */}
            {row === 7 && (
              <span className="absolute bottom-0 right-1 text-xs opacity-50">
                {files[col]}
              </span>
            )}
            {col === 0 && (
              <span className="absolute top-0 left-1 text-xs opacity-50">
                {8 - row}
              </span>
            )}
          </div>
        );
      }
    }

    // If board is flipped, reverse the squares
    if (orientation === 'black') {
      squares.reverse();
    }

    return (
      <div className="grid grid-cols-8 gap-0 border-4 border-[#3a3a3a] rounded-lg overflow-hidden">
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
    if (winner === 'white') return 'White wins!';
    if (winner === 'black') return 'Black wins!';
    if (winner === 'draw') return 'Game drawn!';
    if (game.isCheck()) return 'Check!';
    if (isComputerThinking) return 'Computer thinking...';
    return '';
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
    setPlayerTimes({
      white: parseInt(gameState?.timeControl?.split('+')[0]) * 60 || 600,
      black: parseInt(gameState?.timeControl?.split('+')[0]) * 60 || 600
    });
  };

  const resign = () => {
    setGameStatus('finished');
    setWinner(activePlayer === 'white' ? 'black' : 'white');
    setSelectedSquare(null);
    setValidMoves([]);
  };

  const offerDraw = () => {
    alert('Draw offer sent to opponent');
  };

  const changeBoardColor = (colorType, colorValue) => {
    setBoardColors(prev => ({
      ...prev,
      [colorType]: colorValue
    }));
  };

  const cycleTheme = () => {
    const themes = [
      { dark: "#b58863", light: "#f0d9b5", highlight: "#f7f769", lastMove: "#b9d68c" },
      { dark: "#769656", light: "#eeeed2", highlight: "#f7f769", lastMove: "#b9d68c" },
      { dark: "#4a6c8f", light: "#dee3e6", highlight: "#f7f769", lastMove: "#b9d68c" },
      { dark: "#7d5e4c", light: "#eadbbd", highlight: "#f7f769", lastMove: "#b9d68c" },
      { dark: "#2c2c2c", light: "#a0a0a0", highlight: "#f7f769", lastMove: "#b9d68c" },
      { dark: "#8b4513", light: "#d2b48c", highlight: "#f7f769", lastMove: "#b9d68c" },
    ];
    
    const currentThemeIndex = themes.findIndex(
      theme => theme.dark === boardColors.dark && theme.light === boardColors.light
    );
    
    const nextThemeIndex = (currentThemeIndex + 1) % themes.length;
    setBoardColors(themes[nextThemeIndex]);
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
            <div className="flex justify-center">
              {renderBoard()}
            </div>
            
            {/* Color Controls */}
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex justify-center gap-2">
                <button
                  onClick={cycleTheme}
                  className="bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white px-4 py-2 rounded-lg text-sm transition"
                >
                  Cycle Board Theme
                </button>
              </div>
              
              {/* Individual color pickers */}
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="flex items-center gap-2">
                  <label className="text-gray-400 text-xs">Dark:</label>
                  <input
                    type="color"
                    value={boardColors.dark}
                    onChange={(e) => changeBoardColor('dark', e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-gray-400 text-xs">Light:</label>
                  <input
                    type="color"
                    value={boardColors.light}
                    onChange={(e) => changeBoardColor('light', e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-gray-400 text-xs">Highlight:</label>
                  <input
                    type="color"
                    value={boardColors.highlight}
                    onChange={(e) => changeBoardColor('highlight', e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer"
                  />
                </div>
              </div>
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




// import React, { useState, useEffect, useCallback, useRef } from "react";
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
//   const [isComputerThinking, setIsComputerThinking] = useState(false);
  
//   // Refs to prevent stale closures
//   const gameRef = useRef(game);
//   const activePlayerRef = useRef(activePlayer);
//   const gameStatusRef = useRef(gameStatus);
//   const computerMoveTimeoutRef = useRef(null);
//   const timerIntervalRef = useRef(null);

//   // Update refs when state changes
//   useEffect(() => {
//     gameRef.current = game;
//     activePlayerRef.current = activePlayer;
//     gameStatusRef.current = gameStatus;
//   }, [game, activePlayer, gameStatus]);

//   // Computer move logic
//   useEffect(() => {
//     // Clear any existing computer move timeout
//     if (computerMoveTimeoutRef.current) {
//       clearTimeout(computerMoveTimeoutRef.current);
//     }

//     // Check if computer should move
//     const shouldComputerMove = () => {
//       if (gameState?.gameMode !== 'vs-computer') return false;
//       if (gameStatusRef.current !== 'playing') return false;
//       if (isComputerThinking) return false;
      
//       // In vs-computer mode, computer plays as black
//       // So computer moves when activePlayer is 'black'
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
//   }, [activePlayer, gameState?.gameMode, gameStatus, isComputerThinking]);

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
      
//       // Check if game is over
//       if (currentGame.isGameOver()) {
//         checkGameStatus(currentGame);
//         setIsComputerThinking(false);
//         return;
//       }

//       // Get all possible moves
//       const possibleMoves = currentGame.moves({ verbose: true });
      
//       if (possibleMoves.length === 0) {
//         checkGameStatus(currentGame);
//         setIsComputerThinking(false);
//         return;
//       }

//       // Select a random move (simple computer AI)
//       const randomIndex = Math.floor(Math.random() * possibleMoves.length);
//       const move = possibleMoves[randomIndex];
      
//       // Make the move
//       const gameCopy = new Chess(gameRef.current.fen());
//       const result = gameCopy.move({
//         from: move.from,
//         to: move.to,
//         promotion: 'q' // Always promote to queen for simplicity
//       });
      
//       if (result) {
//         setGame(gameCopy);
//         setMoveHistory(prev => [...prev, result.san]);
//         setActivePlayer('white'); // Switch back to player's turn
//         checkGameStatus(gameCopy);
//       }
//     } catch (error) {
//       console.error("Computer move error:", error);
//     } finally {
//       setIsComputerThinking(false);
//     }
//   }, []);

//   const makeMove = useCallback((from, to, promotion = 'q') => {
//     try {
//       const gameCopy = new Chess(gameRef.current.fen());
      
//       // Try to make the move
//       const result = gameCopy.move({
//         from,
//         to,
//         promotion
//       });
      
//       if (result) {
//         setGame(gameCopy);
//         setMoveHistory(prev => [...prev, result.san]);
//         setActivePlayer('black'); // Switch to computer's turn
//         checkGameStatus(gameCopy);
//         return true;
//       }
//       return false;
//     } catch (error) {
//       console.error("Move error:", error);
//       return false;
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

//   const onDrop = useCallback((sourceSquare, targetSquare, piece) => {
//     // Prevent moves if game is finished
//     if (gameStatusRef.current !== 'playing') return false;
    
//     // In vs-computer mode, only allow moves on player's turn (white)
//     if (gameState?.gameMode === 'vs-computer' && activePlayerRef.current !== 'white') {
//       return false;
//     }

//     // Determine promotion piece (for pawn promotion)
//     const promotion = piece[1] === 'p' && (targetSquare[1] === '8' || targetSquare[1] === '1') ? 'q' : undefined;
    
//     // Make the move
//     const moveSuccessful = makeMove(sourceSquare, targetSquare, promotion);
    
//     return moveSuccessful;
//   }, [makeMove, gameState?.gameMode]);

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
//     // Clear all timeouts and intervals
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
//     setPlayerTimes({
//       white: parseInt(gameState?.timeControl?.split('+')[0]) * 60 || 600,
//       black: parseInt(gameState?.timeControl?.split('+')[0]) * 60 || 600
//     });
//   };

//   const resign = () => {
//     setGameStatus('finished');
//     setWinner(activePlayer === 'white' ? 'black' : 'white');
//   };

//   const offerDraw = () => {
//     alert('Draw offer sent to opponent');
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
//                 arePiecesDraggable={gameStatus === 'playing' && !(gameState?.gameMode === 'vs-computer' && activePlayer === 'black')}
//               />
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