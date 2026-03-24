import React, { useState, useEffect } from "react";
import { Menu, ChevronLeft, ChevronRight, Check, RotateCcw, Palette } from "lucide-react";
import { useGame } from "../../context/GameContext";

export default function Puzzle() {
  const { fetchPuzzles, loading: gameLoading, error: gameError } = useGame();
  
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [showSolution, setShowSolution] = useState(false);
  const [completedLevels, setCompletedLevels] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [validMoves, setValidMoves] = useState([]);
  const [board, setBoard] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showWrongMove, setShowWrongMove] = useState(false);
  const [puzzles, setPuzzles] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [boardColors, setBoardColors] = useState({
    lightSquare: "#f0d9b5",
    darkSquare: "#b58863",
    highlight: "#f7f769"
  });

  // Predefined color themes
  const colorThemes = [
    { name: "Classic", light: "#f0d9b5", dark: "#b58863" },
    { name: "Green", light: "#eeeed2", dark: "#769656" },
    { name: "Blue", light: "#dee3e6", dark: "#4a6c8f" },
    { name: "Brown", light: "#eadbbd", dark: "#7d5e4c" },
    { name: "Gray", light: "#a0a0a0", dark: "#2c2c2c" },
    { name: "Wood", light: "#d2b48c", dark: "#8b4513" }
  ];

  // Piece set state
  const [pieceSet, setPieceSet] = useState("alpha");
  const availablePieceSets = ["alpha", "california", "celtic", "fantasy", "horsey", "anarcandy", "dubrovny", "kosal", "pirouetti"];

  // Load board colors from localStorage
  useEffect(() => {
    const savedColors = localStorage.getItem("boardStyle");
    if (savedColors) {
      try {
        const parsed = JSON.parse(savedColors);
        setBoardColors({
          lightSquare: parsed.lightSquare || "#f0d9b5",
          darkSquare: parsed.darkSquare || "#b58863",
          highlight: "#f7f769"
        });
      } catch (e) {
        console.log("No saved colors found, using defaults");
      }
    }
  }, []);

  // Save board colors to localStorage
  useEffect(() => {
    localStorage.setItem("boardStyle", JSON.stringify({
      lightSquare: boardColors.lightSquare,
      darkSquare: boardColors.darkSquare
    }));
  }, [boardColors]);

  // Load completed levels from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('completedLevels');
    if (saved) {
      setCompletedLevels(JSON.parse(saved));
    }
  }, []);

  // Save completed levels to localStorage
  useEffect(() => {
    localStorage.setItem('completedLevels', JSON.stringify(completedLevels));
  }, [completedLevels]);

  // Fetch puzzles from API using GameContext
  useEffect(() => {
    loadPuzzles();
  }, []);

  const loadPuzzles = async () => {
    setLoading(true);
    const result = await fetchPuzzles();
    
    if (result.success) {
      setPuzzles(result.puzzles);
      setError(null);
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  // Initialize board when level changes or puzzles load
  useEffect(() => {
    if (puzzles[selectedLevel]) {
      setBoard(puzzles[selectedLevel].initialBoard.map(row => [...row]));
      setSelectedSquare(null);
      setValidMoves([]);
      setShowSolution(false);
      setShowHint(false);
      setShowSuccess(false);
      setShowWrongMove(false);
    }
  }, [selectedLevel, puzzles]);

  // Get piece image
  const getPieceImage = (piece) => {
    if (!piece) return null;
    
    const pieceMap = {
      'white-pawn': { color: 'w', type: 'p' },
      'white-knight': { color: 'w', type: 'n' },
      'white-bishop': { color: 'w', type: 'b' },
      'white-rook': { color: 'w', type: 'r' },
      'white-queen': { color: 'w', type: 'q' },
      'white-king': { color: 'w', type: 'k' },
      'black-pawn': { color: 'b', type: 'p' },
      'black-knight': { color: 'b', type: 'n' },
      'black-bishop': { color: 'b', type: 'b' },
      'black-rook': { color: 'b', type: 'r' },
      'black-queen': { color: 'b', type: 'q' },
      'black-king': { color: 'b', type: 'k' }
    };
    
    const pieceInfo = pieceMap[piece];
    if (!pieceInfo) return null;
    
    return `/src/assets/chesspieces/${pieceSet}/${pieceInfo.color}${pieceInfo.type.toUpperCase()}.svg`;
  };

  const currentPuzzle = puzzles[selectedLevel] || null;

  const getValidMovesForPiece = (row, col) => {
    if (!currentPuzzle) return [];
    const piece = board[row][col];
    if (!piece || !piece.includes('white')) return [];

    const solution = currentPuzzle.solution;
    if (row === solution.from[0] && col === solution.from[1]) {
      return [solution.to];
    }
    return [];
  };

  const handleSquareClick = (rowIndex, colIndex) => {
    if (!board || showSuccess || !currentPuzzle) return;

    const piece = board[rowIndex][colIndex];

    if (!selectedSquare) {
      if (piece && piece.includes('white')) {
        setSelectedSquare({ row: rowIndex, col: colIndex });
        const moves = getValidMovesForPiece(rowIndex, colIndex);
        setValidMoves(moves);
      }
      return;
    }

    if (selectedSquare.row === rowIndex && selectedSquare.col === colIndex) {
      setSelectedSquare(null);
      setValidMoves([]);
      return;
    }

    const isValidMove = validMoves.some(
      move => move[0] === rowIndex && move[1] === colIndex
    );

    if (isValidMove) {
      const newBoard = board.map(row => [...row]);
      const movingPiece = newBoard[selectedSquare.row][selectedSquare.col];
      newBoard[selectedSquare.row][selectedSquare.col] = null;
      newBoard[rowIndex][colIndex] = movingPiece;

      setBoard(newBoard);
      setShowSuccess(true);

      const newCompletedLevels = completedLevels.includes(selectedLevel)
        ? completedLevels
        : [...completedLevels, selectedLevel];

      setCompletedLevels(newCompletedLevels);

      setTimeout(() => {
        setShowSuccess(false);
        if (selectedLevel < 10 && puzzles[selectedLevel + 1]) {
          setSelectedLevel(selectedLevel + 1);
        }
      }, 1500);
    } else {
      setShowWrongMove(true);
      setTimeout(() => setShowWrongMove(false), 800);
    }

    setSelectedSquare(null);
    setValidMoves([]);
  };

  const handleReset = () => {
    if (currentPuzzle) {
      setBoard(currentPuzzle.initialBoard.map(row => [...row]));
      setSelectedSquare(null);
      setValidMoves([]);
      setShowSuccess(false);
      setShowWrongMove(false);
    }
  };

  const cycleTheme = () => {
    const currentThemeIndex = colorThemes.findIndex(
      theme => theme.light === boardColors.lightSquare && theme.dark === boardColors.darkSquare
    );
    
    const nextThemeIndex = (currentThemeIndex + 1) % colorThemes.length;
    const nextTheme = colorThemes[nextThemeIndex];
    
    setBoardColors({
      ...boardColors,
      lightSquare: nextTheme.light,
      darkSquare: nextTheme.dark
    });
  };

  const isCompleted = (level) => completedLevels.includes(level);

  const getSquareColor = (row, col) => {
    const isDark = (row + col) % 2 === 1;
    
    if (selectedSquare && selectedSquare.row === row && selectedSquare.col === col) {
      return boardColors.highlight;
    }
    
    if (validMoves.some(move => move[0] === row && move[1] === col)) {
      return boardColors.highlight;
    }
    
    return isDark ? boardColors.darkSquare : boardColors.lightSquare;
  };

  if (loading || gameLoading) {
    return (
      <div className="h-screen w-full bg-gradient-to-r from-[#2b2623] to-[#1c1917] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff9900] mx-auto mb-4"></div>
          <p>Loading puzzles...</p>
        </div>
      </div>
    );
  }

  if (error || gameError) {
    return (
      <div className="h-screen w-full bg-gradient-to-r from-[#2b2623] to-[#1c1917] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error || gameError}</p>
          <button 
            onClick={loadPuzzles}
            className="bg-[#ff9900] text-black px-4 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!currentPuzzle || !board || Object.keys(puzzles).length === 0) {
    return (
      <div className="h-screen w-full bg-gradient-to-r from-[#2b2623] to-[#1c1917] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4">No puzzles found in database.</p>
          <p className="text-sm text-white/60">Please go to the admin panel and click "Initialize Default Puzzles" to load puzzles.</p>
          <button 
            onClick={() => window.location.href = 'puzzlesAdmin'}
            className="mt-4 bg-[#ff9900] text-black px-4 py-2 rounded-lg"
          >
            Go to Admin Panel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-gradient-to-r from-[#2b2623] to-[#1c1917] text-white">
      {/* LEFT SIDE - Chess Board */}
      <div className="flex-1 flex items-center justify-center p-1 sm:p-2 md:p-3 min-w-0 relative">
        <div className="w-full max-w-[min(95vh,95vw)] sm:max-w-[min(90vh,90vw)] md:max-w-[min(85vh,85vw)] lg:max-w-[min(95vh,95vw)] aspect-square rounded-md overflow-hidden shadow-2xl border border-black relative">
          {/* Chess Grid */}
          <div className="grid grid-cols-8 grid-rows-8 w-full h-full">
            {board.map((row, rowIndex) =>
              row.map((piece, colIndex) => {
                const bgColor = getSquareColor(rowIndex, colIndex);
                
                const isSource = showSolution &&
                  rowIndex === currentPuzzle.solution.from[0] &&
                  colIndex === currentPuzzle.solution.from[1];
                const isTarget = showSolution &&
                  rowIndex === currentPuzzle.solution.to[0] &&
                  colIndex === currentPuzzle.solution.to[1];

                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => handleSquareClick(rowIndex, colIndex)}
                    style={{
                      backgroundColor: bgColor
                    }}
                    className={`
                      flex items-center justify-center
                      cursor-pointer transition-all duration-200 relative
                      ${isSource ? "ring-2 md:ring-4 ring-blue-400 ring-inset" : ""}
                      ${isTarget ? "ring-2 md:ring-4 ring-green-400 ring-inset" : ""}
                      hover:opacity-90
                    `}
                  >
                    {piece && (
                      <img
                        src={getPieceImage(piece)}
                        alt={piece}
                        className="w-4/5 h-4/5 object-contain pointer-events-none select-none"
                      />
                    )}
                    
                    {rowIndex === 7 && (
                      <span className="absolute bottom-0 right-1 text-[6px] sm:text-[8px] md:text-xs opacity-50 text-black">
                        {String.fromCharCode(97 + colIndex)}
                      </span>
                    )}
                    
                    {colIndex === 0 && (
                      <span className="absolute top-0 left-1 text-[6px] sm:text-[8px] md:text-xs opacity-50 text-black">
                        {8 - rowIndex}
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {showSuccess && (
            <div className="absolute inset-0 bg-green-500/90 flex items-center justify-center z-10">
              <div className="text-center p-2 sm:p-3 md:p-4">
                <Check className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 mx-auto mb-1 sm:mb-2 md:mb-3 text-white" />
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white">Perfect!</p>
                <p className="text-xs sm:text-sm md:text-base text-white/90">Puzzle {selectedLevel} Solved</p>
                {selectedLevel < 10 && puzzles[selectedLevel + 1] && (
                  <p className="text-[10px] sm:text-xs md:text-sm text-white/80 mt-1 md:mt-2">Moving to next puzzle...</p>
                )}
              </div>
            </div>
          )}

          {showWrongMove && (
            <div className="absolute inset-0 bg-red-500/90 flex items-center justify-center z-10">
              <div className="text-center p-2 sm:p-3 md:p-4">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white">Not Quite</p>
                <p className="text-xs sm:text-sm md:text-base text-white/90">Try a different move</p>
              </div>
            </div>
          )}

          {showHint && !showSuccess && !showWrongMove && (
            <div className="absolute bottom-1 sm:bottom-2 md:bottom-4 left-1 sm:left-2 md:left-4 right-1 sm:right-2 md:right-4 bg-black/80 text-white p-1 sm:p-2 md:p-3 rounded-lg text-[10px] sm:text-xs md:text-sm z-20">
              <p className="font-bold mb-0.5 sm:mb-1">💡 Hint:</p>
              <p>{currentPuzzle.hint}</p>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SIDE - Puzzle Panel */}
      <div className="w-full md:w-[320px] lg:w-[380px] p-2 sm:p-3 md:p-4 md:overflow-y-auto">
        <div className="bg-[#0f0703] rounded-xl h-full flex flex-col justify-between shadow-lg md:max-h-[calc(100vh-2rem)]">

          {/* Header */}
          <div className="bg-[#0f0703]/40 backdrop-blur-md p-2 sm:p-3 md:p-4 rounded-t-xl border border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-md flex items-center justify-center font-bold text-white text-[10px] sm:text-xs md:text-sm">
                  ♟
                </div>
                <h2 className="text-xs sm:text-sm md:text-base font-bold text-white">Chess Puzzles</h2>
              </div>

              <div className="text-[8px] sm:text-[10px] md:text-xs bg-white/20 px-1.5 sm:px-2 py-0.5 rounded-full">
                {selectedLevel}/10
              </div>
            </div>

            <div className="mt-1 sm:mt-2">
              <h3 className="font-bold text-[10px] sm:text-xs md:text-sm text-center">
                {currentPuzzle.name}
              </h3>
              <p className="text-[8px] sm:text-[10px] md:text-xs text-white/80 text-center mt-0.5">
                {currentPuzzle.description}
              </p>
            </div>
          </div>

          {/* Puzzle Levels */}
          <div className="flex-1 p-2 sm:p-3 md:p-4 overflow-y-auto">
            <div className="grid grid-cols-5 gap-1 sm:gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  disabled={!puzzles[level]}
                  className={`
                    w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 rounded-md flex items-center justify-center font-bold
                    shadow hover:scale-105 transition text-[8px] sm:text-[10px] md:text-xs lg:text-sm
                    ${!puzzles[level] ? 'opacity-50 cursor-not-allowed' : ''}
                    ${selectedLevel === level
                      ? "bg-[#ff9900] text-black ring-2"
                      : isCompleted(level)
                        ? "bg-green-500 text-white"
                        : "bg-[#c79b55] text-black"}
                  `}
                >
                  {level}
                </button>
              ))}
            </div>

            {/* Piece Set Selector */}
            <div className="mt-2 sm:mt-3 md:mt-4 bg-white/10 rounded-lg p-2 sm:p-3">
              <p className="text-[8px] sm:text-[10px] md:text-xs font-semibold text-white mb-1 sm:mb-2">Piece Set</p>
              <select
                value={pieceSet}
                onChange={(e) => setPieceSet(e.target.value)}
                className="w-full bg-[#0f0703] text-white text-[8px] sm:text-[10px] md:text-xs p-1 sm:p-1.5 md:p-2 rounded border border-white/20"
              >
                {availablePieceSets.map(set => (
                  <option key={set} value={set}>
                    {set.charAt(0).toUpperCase() + set.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Theme Cycle Button */}
            <div className="mt-2 sm:mt-3 md:mt-4">
              <button
                onClick={cycleTheme}
                className="w-full bg-[#ff9900] hover:bg-[#ffaa22] text-black px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[8px] sm:text-[10px] md:text-xs font-semibold transition flex items-center justify-center gap-1 sm:gap-2"
              >
                <Palette size={12} className="sm:w-3 sm:h-3 md:w-3.5 md:h-3.5" />
                Cycle Board Theme
              </button>
            </div>

            {/* Stats */}
            <div className="mt-2 sm:mt-3 md:mt-4 bg-white/10 rounded-lg p-2 sm:p-3">
              <div className="flex justify-between text-[8px] sm:text-[10px] md:text-xs mb-1">
                <span>Completed</span>
                <span>{completedLevels.length}/10</span>
              </div>

              <div className="w-full bg-white/20 rounded-full h-1 sm:h-1.5 md:h-2">
                <div
                  className="bg-green-400 h-1 sm:h-1.5 md:h-2 rounded-full transition-all"
                  style={{ width: `${(completedLevels.length / 10) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="p-2 sm:p-3 md:p-4 space-y-1.5 sm:space-y-2 md:space-y-3">

            {/* Navigation */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setSelectedLevel(Math.max(1, selectedLevel - 1))}
                disabled={selectedLevel === 1 || !puzzles[selectedLevel - 1]}
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 flex items-center justify-center rounded-lg bg-[#261f1c] text-white disabled:opacity-50"
              >
                <ChevronLeft size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </button>

              <button
                onClick={() => setSelectedLevel(Math.min(10, selectedLevel + 1))}
                disabled={selectedLevel === 10 || !puzzles[selectedLevel + 1]}
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 flex items-center justify-center rounded-lg bg-[#261f1c] text-white disabled:opacity-50"
              >
                <ChevronRight size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </button>

              <button
                onClick={() => setShowHint(!showHint)}
                className="flex-1 h-6 sm:h-7 md:h-8 lg:h-9 rounded-lg bg-[#ff9900] text-white text-[8px] sm:text-[10px] md:text-xs font-semibold"
              >
                {showHint ? "Hide Hint" : "Hint"}
              </button>
            </div>

            {/* Main buttons */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 flex items-center justify-center rounded-lg bg-[#261f1c] text-white">
                <Menu size={14} className="sm:w-4 sm:h-4 md:w-4.5 md:h-4.5" />
              </button>

              <button
                onClick={() => setShowSolution(!showSolution)}
                className="flex-1 h-6 sm:h-7 md:h-8 lg:h-9 rounded-lg bg-[#ff9900] text-white text-[8px] sm:text-[10px] md:text-xs font-semibold"
              >
                {showSolution ? "Hide Solution" : "Solution"}
              </button>

              <button
                onClick={handleReset}
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 flex items-center justify-center rounded-lg bg-[#261f1c] text-white"
              >
                <RotateCcw size={14} className="sm:w-4 sm:h-4 md:w-4.5 md:h-4.5" />
              </button>
            </div>

            {/* Messages */}
            {!selectedSquare && !showSuccess && (
              <div className="bg-blue-500/20 text-blue-200 p-1 sm:p-1.5 md:p-2 rounded text-[8px] sm:text-[10px] md:text-xs text-center">
                Click a white piece
              </div>
            )}

            {selectedSquare && !showSuccess && (
              <div className="bg-yellow-500/20 text-yellow-200 p-1 sm:p-1.5 md:p-2 rounded text-[8px] sm:text-[10px] md:text-xs text-center">
                Choose where to move
              </div>
            )}

            {isCompleted(selectedLevel) && selectedLevel < 10 && !showSuccess && puzzles[selectedLevel + 1] && (
              <div className="bg-green-500/20 text-green-300 p-1 sm:p-1.5 md:p-2 rounded text-[8px] sm:text-[10px] md:text-xs text-center">
                Puzzle solved! Move to next level
              </div>
            )}

            {isCompleted(10) && (
              <div className="bg-purple-500/20 text-purple-300 p-1 sm:p-1.5 md:p-2 rounded text-[8px] sm:text-[10px] md:text-xs text-center">
                All puzzles complete! 🏆
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}