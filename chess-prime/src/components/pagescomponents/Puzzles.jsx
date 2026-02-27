import React, { useState, useEffect } from "react";
import { Menu, ChevronLeft, ChevronRight, Check, RotateCcw } from "lucide-react";

export default function Puzzle() {
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [showSolution, setShowSolution] = useState(false);
  const [completedLevels, setCompletedLevels] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [board, setBoard] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showWrongMove, setShowWrongMove] = useState(false);
  const [boardColors, setBoardColors] = useState({
    lightSquare: "#eeeed2",
    darkSquare: "#769656"
  });

  // Load board colors from localStorage
  useEffect(() => {
    const savedColors = localStorage.getItem("boardStyle");
    if (savedColors) {
      try {
        const parsed = JSON.parse(savedColors);
        setBoardColors({
          lightSquare: parsed.lightSquare,
          darkSquare: parsed.darkSquare
        });
      } catch (e) {
        console.log("No saved colors found, using defaults");
      }
    }
  }, []);

  // 10 different puzzles - each with a unique single-move solution
  const puzzles = {
    1: {
      name: "Save Your Rook",
      description: "Black is attacking your rook. Move it to safety.",
      hint: "Move the rook to the corner where it's protected",
      initialBoard: [
        ["♜", "♞", "  ", "♛", "♚", "♝", "♞", "♜"],
        ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
        ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["  ", "♝", "  ", "  ", "  ", "  ", "  ", "♖"],
        ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "  "],
        ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "  "],
      ],
      solution: [5, 7, 5, 1],
    },
    2: {
      name: "Capture the Attacker",
      description: "capture the king.",
      hint: "Use your queen to take the knight",
      initialBoard: [
        ["♜", "♞", "  ", "  ", "♚", "♝", "  ", "♜"],
        ["♟", "♟", "♟", "  ", "  ", "  ", "♟", "♟"],
        ["  ", "  ", "  ", "  ", "♞", "  ", "  ", "  "],
        ["  ", "  ", "  ", "  ", "  ", "  ", "♗", "  "],
        ["  ", "  ", "♗", "  ", "  ", "  ", "  ", "  "],
        ["  ", "  ", "  ", "  ", "♕", "  ", "  ", "  "],
        ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
        ["♖", "♘", "  ", "  ", "♔", "  ", "♘", "♖"],
      ],
      solution: [5, 4, 2, 4],
    },
    3: {
      name: "move the piece",
      description: "use your knight to stop bishop",
      hint: "Move the knight eleminate the bishop",
      initialBoard: [
        ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
        ["♟", "♟", "♟", "♟", "♟", "♟", "  ", "♟"],
        ["  ", "  ", "  ", "  ", "  ", "  ", "♟", "  "],
        ["  ", "  ", "  ", "  ", "♝", "  ", "  ", "  "],
        ["  ", "  ", "♘", "  ", "  ", "  ", "  ", "  "],
        ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
        ["♖", "♘", "♗", "♕", "♔", "♗", "  ", "♖"],
      ],
      solution: [4, 2, 3, 4],
    },
    4: {
      name: "Win a Free Pawn",
      description: "Capture the unprotected black pawn.",
      hint: "Your knight can jump in and take it",
      initialBoard: [
        ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
        ["♟", "♟", "♟", "  ", "♟", "♟", "♟", "♟"],
        ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["  ", "  ", "  ", "♟", "  ", "  ", "  ", "  "],
        ["  ", "♘", "  ", "  ", "  ", "  ", "  ", "  "],
        ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
        ["♖", "  ", "♗", "♕", "♔", "♗", "♘", "♖"],
      ],
      solution: [4, 1, 3, 3],
    },
    5: {
      name: "Escape the Trap",
      description: "Your queen is trapped. Move her to safety.",
      hint: "Move the queen diagonally away from the attacking pieces",
      initialBoard: [
        ["♜", "  ", "♝", "♜ ", "♚", "  ", "  ", "  "],
        ["♟", "♟", "♟", "  ", "♝", "♟", "♟", "♟"],
        ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["  ", "  ", "  ", "♛", "  ", "  ", "  ", "♞"],
        ["♙", "  ", "  ", "  ", "♕", "  ", "  ", "  "],
        ["  ", "♞", "  ", "  ", "  ", "  ", "  ", "  "],
        ["  ", "♙", "♙", "♙", "  ", "♙", "♙", "♙"],
        ["♖", "♘", "♗", "  ", "♔", "♗", "♘", "♖"],
      ],
      solution: [4, 4, 5, 4],
    },
    6: {
      name: "Defend Your Pawn",
      description: "Your pawn is being attacked. Protect it with your rook.",
      hint: "Move the rook next to the pawn",
      initialBoard: [
        ["♜", "♞", "♝", "  ", "♚", "♝", "♞", "♜"],
        ["♟", "♟", "♟", "♟", "  ", "♟", "♟", "♟"],
        ["  ", "  ", "  ", "  ", "♛", "  ", "  ", "  "],
        ["  ", "  ", "  ", "  ", "♙", "  ", "  ", "  "],
        ["  ", "  ", "  ", "  ", "  ", "  ", "♖", "  "],
        ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["♙", "♙", "♙", "♙", "  ", "♙", "♙", "♙"],
        ["  ", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
      ],
      solution: [4, 6, 4, 4],
    },
    7: {
      name: "Create a Threat",
      description: "Move your bishop to attack the black queen.",
      hint: "Bishops move diagonally - line up with the queen",
      initialBoard: [
        ["♜", "♞", "♝", "  ", "♚", "♝", "♞", "♜"],
        ["♟", "♟", "♟", "♟", " ", "♟", "♟", "♟"],
        ["  ", "  ", "  ", "  ", "  ", "♛", "  ", "  "],
        ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["  ", "  ", "  ", "♗", "  ", "  ", "  ", "  "],
        ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
        ["♖", "♘", "  ", "♕", "♔", "  ", "♘", "♖"],
      ],
      solution: [4, 3, 2, 5],
    },
    8: {
      name: "Stop the Mate",
      description: "Black is threatening checkmate. Move your pawn to block.",
      hint: "Push the pawn forward one square to block the bishop's path",
      initialBoard: [
        ["♜", "♞", "♝", "  ", "♚", "♝", "♞", "♜"],
        ["♟", "♟", "♟", "♟", "  ", "♟", "♟", "♟"],
        ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["  ", "  ", "  ", "  ", "♟", "  ", "  ", "  "],
        ["  ", "  ", "  ", "  ", "♙", "  ", "  ", "♝"],
        ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["♙", "♙", "♙", "♙", "  ", "  ", "♙", "♙"],
        ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
      ],
      solution: [6, 6, 5, 6],
    },
    9: {
      name: "make a check",
      description: "make check using knight",
      hint: "Use your knight to put the black king in check",
      initialBoard: [
        ["♜", "  ", " ", "♛", "♚", "♝", "♞", "  "],
        ["♟", "♟", "  ", "♟", "♜", "♟", "  ", "♟"],
        ["  ", "  ", "  ", "  ", "  ", "  ", "♟", "  "],
        ["  ", "  ", "  ", "  ", "  ", "♘", "  ", "  "],
        ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["  ", "♖", "  ", "  ", "  ", "  ", "  ", "  "],
        ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
        ["  ", "♘", "♗", "♕", "♔", "♗", "  ", "♖"],
      ],
      solution: [3, 5, 2, 3],
    },
    10: {
      name: "Deliver Checkmate",
      description: "Move your queen to deliver checkmate!",
      hint: "Move the queen diagonally to corner the king",
      initialBoard: [
        ["  ", "  ", "  ", "  ", "♚", "♝", "♞", "♜"],
        ["♟", "♟", "♟", "♟", "  ", "♟", "♟", "♟"],
        ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["  ", "  ", "  ", "  ", "♟", "  ", "  ", "  "],
        ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["  ", "  ", "  ", "♕", "  ", "  ", "  ", "  "],
        ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
        ["♖", "♘", "♗", "  ", "♔", "♗", "♘", "♖"],
      ],
      solution: [5, 3, 1, 3],
    },
  };

  // Initialize board when level changes
  useEffect(() => {
    setBoard(puzzles[selectedLevel].initialBoard.map(row => [...row]));
    setSelectedPiece(null);
    setShowSolution(false);
    setShowHint(false);
    setShowSuccess(false);
    setShowWrongMove(false);
  }, [selectedLevel]);

  const currentPuzzle = puzzles[selectedLevel] || puzzles[1];

  const handleSquareClick = (rowIndex, colIndex) => {
    if (!board || showSuccess) return;

    const piece = board[rowIndex][colIndex];

    // If no piece selected
    if (!selectedPiece) {
      // Only allow selecting white pieces
      if (piece && piece.charCodeAt(0) >= 9812 && piece.charCodeAt(0) <= 9817) {
        setSelectedPiece({ row: rowIndex, col: colIndex });
      }
      return;
    }

    // Try to move the selected piece
    if (selectedPiece.row === rowIndex && selectedPiece.col === colIndex) {
      // Clicked the same piece - deselect
      setSelectedPiece(null);
      return;
    }

    // Check if this is the correct move
    const isCorrectMove =
      selectedPiece.row === currentPuzzle.solution[0] &&
      selectedPiece.col === currentPuzzle.solution[1] &&
      rowIndex === currentPuzzle.solution[2] &&
      colIndex === currentPuzzle.solution[3];

    if (isCorrectMove) {
      // Correct move! Update the board
      const newBoard = board.map(row => [...row]);
      const movingPiece = newBoard[selectedPiece.row][selectedPiece.col];
      newBoard[selectedPiece.row][selectedPiece.col] = "";
      newBoard[rowIndex][colIndex] = movingPiece;

      setBoard(newBoard);
      setShowSuccess(true);

      // Mark level as completed
      const newCompletedLevels = completedLevels.includes(selectedLevel)
        ? completedLevels
        : [...completedLevels, selectedLevel];

      setCompletedLevels(newCompletedLevels);

      // Move to next puzzle after showing success
      setTimeout(() => {
        setShowSuccess(false);

        // If there's a next puzzle, move to it
        if (selectedLevel < 10) {
          setSelectedLevel(selectedLevel + 1);
        }
      }, 1500);
    } else {
      // Wrong move - show error
      setShowWrongMove(true);
      setTimeout(() => setShowWrongMove(false), 800);
    }

    setSelectedPiece(null);
  };

  const handleReset = () => {
    setBoard(puzzles[selectedLevel].initialBoard.map(row => [...row]));
    setSelectedPiece(null);
    setShowSuccess(false);
    setShowWrongMove(false);
  };

  const isCompleted = (level) => completedLevels.includes(level);

  if (!board) return null;

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full overflow-hidden bg-gradient-to-r from-[#2b2623] to-[#1c1917] text-white">
      {/* LEFT SIDE - Chess Board - Made larger */}
      <div className="flex-1 flex items-center justify-center p-2 sm:p-4 lg:p-6 min-w-0">
        <div className="w-full max-w-[min(90vh,90vw)] lg:max-w-[min(95vh,95vw)] aspect-square rounded-md overflow-hidden shadow-2xl border border-black relative">
          {/* Chess Grid */}
          <div className="grid grid-cols-8 grid-rows-8 w-full h-full">
            {board.map((row, rowIndex) =>
              row.map((piece, colIndex) => {
                const isDark = (rowIndex + colIndex) % 2 === 1;
                const isSelected = selectedPiece &&
                  selectedPiece.row === rowIndex &&
                  selectedPiece.col === colIndex;

                // Highlight solution squares if showSolution is true
                const isSource = showSolution &&
                  rowIndex === currentPuzzle.solution[0] &&
                  colIndex === currentPuzzle.solution[1];
                const isTarget = showSolution &&
                  rowIndex === currentPuzzle.solution[2] &&
                  colIndex === currentPuzzle.solution[3];

                // Larger text size for bigger board
                const textSize = "text-[clamp(2rem,8vw,5rem)] lg:text-[clamp(2.5rem,6vw,5.5rem)]";

                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => handleSquareClick(rowIndex, colIndex)}
                    style={{
                      backgroundColor: isDark ? boardColors.darkSquare : boardColors.lightSquare
                    }}
                    className={`
                      flex items-center justify-center ${textSize} font-bold
                      cursor-pointer transition-all duration-200 relative
                      ${isSelected ? "ring-4 ring-yellow-400 ring-inset" : ""}
                      ${isSource ? "ring-4 ring-blue-400 ring-inset" : ""}
                      ${isTarget ? "ring-4 ring-green-400 ring-inset" : ""}
                      hover:opacity-90
                    `}
                  >
                    {piece}
                  </div>
                );
              })
            )}
          </div>

          {/* Success overlay */}
          {showSuccess && (
            <div className="absolute inset-0 bg-green-500/90 flex items-center justify-center z-10">
              <div className="text-center p-4">
                <Check className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 text-white" />
                <p className="text-2xl sm:text-3xl font-bold text-white">Perfect!</p>
                <p className="text-base sm:text-lg text-white/90">Puzzle {selectedLevel} Solved</p>
                {selectedLevel < 10 && (
                  <p className="text-sm sm:text-base text-white/80 mt-2">Moving to next puzzle...</p>
                )}
              </div>
            </div>
          )}

          {/* Wrong move overlay */}
          {showWrongMove && (
            <div className="absolute inset-0 bg-red-500/90 flex items-center justify-center z-10">
              <div className="text-center p-4">
                <p className="text-2xl sm:text-3xl font-bold text-white">Not Quite</p>
                <p className="text-base sm:text-lg text-white/90">Try a different move</p>
              </div>
            </div>
          )}

          {/* Hint overlay */}
          {showHint && !showSuccess && !showWrongMove && (
            <div className="absolute bottom-4 left-4 right-4 bg-black/80 text-white p-4 rounded-lg text-sm sm:text-base z-20">
              <p className="font-bold mb-1">💡 Hint:</p>
              <p>{currentPuzzle.hint}</p>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SIDE - Puzzle Panel - Slightly wider on desktop */}
      <div className="w-full lg:w-[380px] p-3">
        <div className="bg-[#2f5233] rounded-xl h-full flex flex-col justify-between shadow-lg">

          {/* Header */}
          <div className="bg-[#8fa3a2]/40 backdrop-blur-md p-3 rounded-t-xl border border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-orange-500 rounded-md flex items-center justify-center font-bold text-white text-sm">
                  ♟
                </div>
                <h2 className="text-base font-bold text-white">Chess Puzzles</h2>
              </div>

              <div className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                {selectedLevel}/10
              </div>
            </div>

            <div className="mt-2">
              <h3 className="font-bold text-sm text-center">
                {currentPuzzle.name}
              </h3>
              <p className="text-xs text-white/80 text-center mt-0.5">
                {currentPuzzle.description}
              </p>
            </div>
          </div>

          {/* Puzzle Levels */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`
              w-9 h-9 rounded-md flex items-center justify-center font-bold
              shadow hover:scale-105 transition text-sm
              ${selectedLevel === level
                      ? "bg-yellow-400 text-black ring-2 ring-yellow-300"
                      : isCompleted(level)
                        ? "bg-green-500 text-white"
                        : "bg-[#c79b55] text-black"}
            `}
                >
                  {level}
                </button>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-4 bg-white/10 rounded-lg p-3">
              <div className="flex justify-between text-xs mb-1">
                <span>Completed</span>
                <span>{completedLevels.length}/10</span>
              </div>

              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-green-400 h-2 rounded-full transition-all"
                  style={{ width: `${(completedLevels.length / 10) * 100}%` }}
                />
              </div>

              <div className="mt-3 text-xs text-white/80">
                <p className="font-semibold text-white mb-1">Puzzle tips</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>One correct move</li>
                  <li>Look for captures</li>
                  <li>Check threats</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="p-4 space-y-3">

            {/* Nav */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedLevel(Math.max(1, selectedLevel - 1))}
                disabled={selectedLevel === 1}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#406340] text-white disabled:opacity-50"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                onClick={() => setSelectedLevel(Math.min(10, selectedLevel + 1))}
                disabled={selectedLevel === 10}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#406340] text-white disabled:opacity-50"
              >
                <ChevronRight size={16} />
              </button>

              <button
                onClick={() => setShowHint(!showHint)}
                className="flex-1 h-9 rounded-lg bg-[#5f4a3a] text-white text-xs font-semibold"
              >
                {showHint ? "Hide Hint" : "Hint"}
              </button>
            </div>

            {/* Main buttons */}
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#406340] text-white">
                <Menu size={18} />
              </button>

              <button
                onClick={() => setShowSolution(!showSolution)}
                className="flex-1 h-9 rounded-lg bg-[#7FA650] text-white text-xs font-semibold"
              >
                {showSolution ? "Hide Solution" : "Solution"}
              </button>

              <button
                onClick={handleReset}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-blue-600 text-white"
              >
                <RotateCcw size={18} />
              </button>
            </div>

            {/* Messages */}
            {!selectedPiece && !showSuccess && (
              <div className="bg-blue-500/20 text-blue-200 p-2 rounded text-xs text-center">
                Click a white piece
              </div>
            )}

            {selectedPiece && !showSuccess && (
              <div className="bg-yellow-500/20 text-yellow-200 p-2 rounded text-xs text-center">
                Choose where to move
              </div>
            )}

            {isCompleted(selectedLevel) && selectedLevel < 10 && !showSuccess && (
              <div className="bg-green-500/20 text-green-300 p-2 rounded text-xs text-center">
                Puzzle solved!
              </div>
            )}

            {isCompleted(10) && (
              <div className="bg-purple-500/20 text-purple-300 p-2 rounded text-xs text-center">
                All puzzles complete!
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}