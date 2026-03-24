import React, { useState, useEffect } from "react";
import { Save, Database, RefreshCw, Trash2, Check, AlertCircle, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useGame } from "../../../context/GameContext";

export default function PuzzleAdmin() {
  const { 
    fetchAllPuzzles, 
    initializePuzzles: initPuzzles, 
    createPuzzle: createNewPuzzle,
    updatePuzzle: updateExistingPuzzle,
    deletePuzzle: removePuzzle,
    deleteAllPuzzles: removeAllPuzzles,
    loading: gameLoading,
    error: gameError 
  } = useGame();

  const [puzzles, setPuzzles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [selectedPuzzle, setSelectedPuzzle] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [stats, setStats] = useState({ total: 0, easy: 0, medium: 0, hard: 0 });
  const [editingMode, setEditingMode] = useState('place'); // 'place', 'erase'
  const [selectedPiece, setSelectedPiece] = useState(null);
  const puzzlesPerPage = 5;

  // Define all available pieces with their display properties
  const pieces = {
    // White pieces
    'white-pawn': { symbol: '♙', color: 'white', name: 'White Pawn' },
    'white-knight': { symbol: '♘', color: 'white', name: 'White Knight' },
    'white-bishop': { symbol: '♗', color: 'white', name: 'White Bishop' },
    'white-rook': { symbol: '♖', color: 'white', name: 'White Rook' },
    'white-queen': { symbol: '♕', color: 'white', name: 'White Queen' },
    'white-king': { symbol: '♔', color: 'white', name: 'White King' },
    // Black pieces
    'black-pawn': { symbol: '♟︎', color: 'black', name: 'Black Pawn' },
    'black-knight': { symbol: '♞', color: 'black', name: 'Black Knight' },
    'black-bishop': { symbol: '♝', color: 'black', name: 'Black Bishop' },
    'black-rook': { symbol: '♜', color: 'black', name: 'Black Rook' },
    'black-queen': { symbol: '♛', color: 'black', name: 'Black Queen' },
    'black-king': { symbol: '♚', color: 'black', name: 'Black King' },
  };

  // Create a proper empty 8x8 board
  const createEmptyBoard = () => {
    return Array(8).fill().map(() => Array(8).fill(null));
  };

  // Form state for creating/editing puzzles
  const [formData, setFormData] = useState({
    level: '',
    name: '',
    description: '',
    hint: '',
    initialBoard: createEmptyBoard(),
    solution: { from: [0, 0], to: [0, 0] },
    difficulty: 'easy'
  });

  // Initial puzzle data (keep your existing initialPuzzlesData array)
  const initialPuzzlesData = [
    {
      level: 1,
      name: "Save Your Rook",
      description: "Black is attacking your rook. Move it to safety.",
      hint: "Move the rook to the corner where it's protected",
      initialBoard: [
        ["black-rook", "black-knight", null, "black-queen", "black-king", "black-bishop", "black-knight", "black-rook"],
        ["black-pawn", "black-pawn", "black-pawn", "black-pawn", "black-pawn", "black-pawn", "black-pawn", "black-pawn"],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, "black-bishop", null, null, null, null, null, "white-rook"],
        ["white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", null],
        ["white-rook", "white-knight", "white-bishop", "white-queen", "white-king", "white-bishop", "white-knight", null],
      ],
      solution: { from: [5, 7], to: [5, 1] },
      difficulty: "easy"
    },
    {
      level: 2,
      name: "Capture the Attacker",
      description: "Capture the knight that's threatening your king.",
      hint: "Use your queen to take the knight",
      initialBoard: [
        ["black-rook", "black-knight", null, null, "black-king", "black-bishop", null, "black-rook"],
        ["black-pawn", "black-pawn", "black-pawn", null, null, null, "black-pawn", "black-pawn"],
        [null, null, null, null, "black-knight", null, null, null],
        [null, null, null, null, null, null, "white-bishop", null],
        [null, null, "white-bishop", null, null, null, null, null],
        [null, null, null, null, "white-queen", null, null, null],
        ["white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn"],
        ["white-rook", "white-knight", null, null, "white-king", null, "white-knight", "white-rook"],
      ],
      solution: { from: [5, 4], to: [2, 4] },
      difficulty: "easy"
    },
    {
      level: 3,
      name: "Move the Piece",
      description: "Use your knight to stop the bishop's attack.",
      hint: "Move the knight to eliminate the bishop",
      initialBoard: [
        ["black-rook", "black-knight", "black-bishop", "black-queen", "black-king", "black-bishop", "black-knight", "black-rook"],
        ["black-pawn", "black-pawn", "black-pawn", "black-pawn", "black-pawn", "black-pawn", null, "black-pawn"],
        [null, null, null, null, null, null, "black-pawn", null],
        [null, null, null, null, "black-bishop", null, null, null],
        [null, null, "white-knight", null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        ["white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn"],
        ["white-rook", "white-knight", "white-bishop", "white-queen", "white-king", "white-bishop", null, "white-rook"],
      ],
      solution: { from: [4, 2], to: [3, 4] },
      difficulty: "medium"
    },
    {
      level: 4,
      name: "Win a Free Pawn",
      description: "Capture the unprotected black pawn.",
      hint: "Your knight can jump in and take it",
      initialBoard: [
        ["black-rook", "black-knight", "black-bishop", "black-queen", "black-king", "black-bishop", "black-knight", "black-rook"],
        ["black-pawn", "black-pawn", "black-pawn", null, "black-pawn", "black-pawn", "black-pawn", "black-pawn"],
        [null, null, null, null, null, null, null, null],
        [null, null, null, "black-pawn", null, null, null, null],
        [null, "white-knight", null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        ["white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn"],
        ["white-rook", null, "white-bishop", "white-queen", "white-king", "white-bishop", "white-knight", "white-rook"],
      ],
      solution: { from: [4, 1], to: [3, 3] },
      difficulty: "medium"
    },
    {
      level: 5,
      name: "Escape the Trap",
      description: "Your queen is trapped. Move her to safety.",
      hint: "Move the queen diagonally away from the attacking pieces",
      initialBoard: [
        ["black-rook", null, "black-bishop", "black-rook", "black-king", null, null, null],
        ["black-pawn", "black-pawn", "black-pawn", null, "black-bishop", "black-pawn", "black-pawn", "black-pawn"],
        [null, null, null, null, null, null, null, null],
        [null, null, null, "black-queen", null, null, null, "black-knight"],
        ["white-pawn", null, null, null, "white-queen", null, null, null],
        [null, "black-knight", null, null, null, null, null, null],
        [null, "white-pawn", "white-pawn", "white-pawn", null, "white-pawn", "white-pawn", "white-pawn"],
        ["white-rook", "white-knight", "white-bishop", null, "white-king", "white-bishop", "white-knight", "white-rook"],
      ],
      solution: { from: [4, 4], to: [5, 4] },
      difficulty: "hard"
    },
    {
      level: 6,
      name: "Defend Your Pawn",
      description: "Your pawn is being attacked. Protect it with your rook.",
      hint: "Move the rook next to the pawn",
      initialBoard: [
        ["black-rook", "black-knight", "black-bishop", null, "black-king", "black-bishop", "black-knight", "black-rook"],
        ["black-pawn", "black-pawn", "black-pawn", "black-pawn", null, "black-pawn", "black-pawn", "black-pawn"],
        [null, null, null, null, "black-queen", null, null, null],
        [null, null, null, null, "white-pawn", null, null, null],
        [null, null, null, null, null, null, "white-rook", null],
        [null, null, null, null, null, null, null, null],
        ["white-pawn", "white-pawn", "white-pawn", "white-pawn", null, "white-pawn", "white-pawn", "white-pawn"],
        [null, "white-knight", "white-bishop", "white-queen", "white-king", "white-bishop", "white-knight", "white-rook"],
      ],
      solution: { from: [4, 6], to: [4, 4] },
      difficulty: "medium"
    },
    {
      level: 7,
      name: "Create a Threat",
      description: "Move your bishop to attack the black queen.",
      hint: "Bishops move diagonally - line up with the queen",
      initialBoard: [
        ["black-rook", "black-knight", "black-bishop", null, "black-king", "black-bishop", "black-knight", "black-rook"],
        ["black-pawn", "black-pawn", "black-pawn", "black-pawn", null, "black-pawn", "black-pawn", "black-pawn"],
        [null, null, null, null, null, "black-queen", null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, "white-bishop", null, null, null, null],
        [null, null, null, null, null, null, null, null],
        ["white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn"],
        ["white-rook", "white-knight", null, "white-queen", "white-king", null, "white-knight", "white-rook"],
      ],
      solution: { from: [4, 3], to: [2, 5] },
      difficulty: "medium"
    },
    {
      level: 8,
      name: "Stop the Mate",
      description: "Black is threatening checkmate. Move your pawn to block.",
      hint: "Push the pawn forward one square to block the bishop's path",
      initialBoard: [
        ["black-rook", "black-knight", "black-bishop", null, "black-king", "black-bishop", "black-knight", "black-rook"],
        ["black-pawn", "black-pawn", "black-pawn", "black-pawn", null, "black-pawn", "black-pawn", "black-pawn"],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, "black-pawn", null, null, null],
        [null, null, null, null, "white-pawn", null, null, "black-bishop"],
        [null, null, null, null, null, null, null, null],
        ["white-pawn", "white-pawn", "white-pawn", "white-pawn", null, null, "white-pawn", "white-pawn"],
        ["white-rook", "white-knight", "white-bishop", "white-queen", "white-king", "white-bishop", "white-knight", "white-rook"],
      ],
      solution: { from: [6, 6], to: [5, 6] },
      difficulty: "hard"
    },
    {
      level: 9,
      name: "Make a Check",
      description: "Make check using knight",
      hint: "Use your knight to put the black king in check",
      initialBoard: [
        ["black-rook", null, null, "black-queen", "black-king", "black-bishop", "black-knight", null],
        ["black-pawn", "black-pawn", null, "black-pawn", "black-rook", "black-pawn", null, "black-pawn"],
        [null, null, null, null, null, null, "black-pawn", null],
        [null, null, null, null, null, "white-knight", null, null],
        [null, null, null, null, null, null, null, null],
        [null, "white-rook", null, null, null, null, null, null],
        ["white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn"],
        [null, "white-knight", "white-bishop", "white-queen", "white-king", "white-bishop", null, "white-rook"],
      ],
      solution: { from: [3, 5], to: [2, 3] },
      difficulty: "hard"
    },
    {
      level: 10,
      name: "Deliver Checkmate",
      description: "Move your queen to deliver checkmate!",
      hint: "Move the queen diagonally to corner the king",
      initialBoard: [
        [null, null, null, null, "black-king", "black-bishop", "black-knight", "black-rook"],
        ["black-pawn", "black-pawn", "black-pawn", "black-pawn", null, "black-pawn", "black-pawn", "black-pawn"],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, "black-pawn", null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, "white-queen", null, null, null, null],
        ["white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn"],
        ["white-rook", "white-knight", "white-bishop", null, "white-king", "white-bishop", "white-knight", "white-rook"],
      ],
      solution: { from: [5, 3], to: [1, 3] },
      difficulty: "hard"
    }
  ];

  // Fetch all puzzles
  const fetchPuzzles = async () => {
    setLoading(true);
    const result = await fetchAllPuzzles();
    
    if (result.success) {
      setPuzzles(result.puzzles);
      calculateStats(result.puzzles);
      setMessage({ type: 'success', text: 'Puzzles fetched successfully!' });
    } else {
      setMessage({ type: 'error', text: result.message });
    }
    
    setLoading(false);
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  // Calculate stats
  const calculateStats = (puzzleData) => {
    const easy = puzzleData.filter(p => p.difficulty === 'easy').length;
    const medium = puzzleData.filter(p => p.difficulty === 'medium').length;
    const hard = puzzleData.filter(p => p.difficulty === 'hard').length;
    setStats({
      total: puzzleData.length,
      easy,
      medium,
      hard
    });
  };

  // Initialize puzzles in database
  const handleInitializePuzzles = async () => {
    if (!window.confirm('This will delete all existing puzzles and insert the default 10 puzzles. Continue?')) {
      return;
    }

    setLoading(true);
    const result = await initPuzzles();
    
    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      fetchPuzzles();
    } else {
      setMessage({ type: 'error', text: result.message });
    }
    
    setLoading(false);
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  // Delete all puzzles
  const handleDeleteAllPuzzles = async () => {
    if (!window.confirm('Are you sure you want to delete ALL puzzles? This action cannot be undone!')) {
      return;
    }

    setLoading(true);
    const result = await removeAllPuzzles();
    
    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      fetchPuzzles();
    } else {
      setMessage({ type: 'error', text: result.message });
    }
    
    setLoading(false);
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  // Create a new puzzle
  const handleCreatePuzzle = async () => {
    if (!validateForm()) return;

    const puzzleData = {
      ...formData,
      level: parseInt(formData.level),
      initialBoard: formData.initialBoard.map(row => 
        row.map(cell => cell === '' ? null : cell)
      )
    };

    setLoading(true);
    const result = await createNewPuzzle(puzzleData);
    
    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      fetchPuzzles();
      resetForm();
    } else {
      setMessage({ type: 'error', text: result.message });
    }
    
    setLoading(false);
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  // Update a puzzle
  const handleUpdatePuzzle = async () => {
    if (!selectedPuzzle || !validateForm()) return;

    const puzzleData = {
      ...formData,
      level: parseInt(formData.level),
      initialBoard: formData.initialBoard.map(row => 
        row.map(cell => cell === '' ? null : cell)
      )
    };

    setLoading(true);
    const result = await updateExistingPuzzle(selectedPuzzle._id, puzzleData);
    
    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      fetchPuzzles();
      resetForm();
    } else {
      setMessage({ type: 'error', text: result.message });
    }
    
    setLoading(false);
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  // Delete a single puzzle
  const handleDeletePuzzle = async (id) => {
    if (!window.confirm('Are you sure you want to delete this puzzle?')) return;

    setLoading(true);
    const result = await removePuzzle(id);
    
    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      fetchPuzzles();
      if (selectedPuzzle && selectedPuzzle._id === id) {
        resetForm();
      }
    } else {
      setMessage({ type: 'error', text: result.message });
    }
    
    setLoading(false);
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  // Validate form
  const validateForm = () => {
    if (!formData.level || formData.level < 1 || formData.level > 10) {
      setMessage({ type: 'error', text: 'Level must be between 1 and 10' });
      return false;
    }
    if (!formData.name) {
      setMessage({ type: 'error', text: 'Name is required' });
      return false;
    }
    if (!formData.description) {
      setMessage({ type: 'error', text: 'Description is required' });
      return false;
    }
    if (!formData.hint) {
      setMessage({ type: 'error', text: 'Hint is required' });
      return false;
    }
    
    if (!Array.isArray(formData.initialBoard) || formData.initialBoard.length !== 8) {
      setMessage({ type: 'error', text: 'Initial board must be an 8x8 array' });
      return false;
    }
    
    return true;
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      level: '',
      name: '',
      description: '',
      hint: '',
      initialBoard: createEmptyBoard(),
      solution: { from: [0, 0], to: [0, 0] },
      difficulty: 'easy'
    });
    setSelectedPuzzle(null);
    setSelectedPiece(null);
  };

  // Edit puzzle
  const editPuzzle = (puzzle) => {
    setSelectedPuzzle(puzzle);
    setFormData({
      level: puzzle.level,
      name: puzzle.name,
      description: puzzle.description,
      hint: puzzle.hint,
      initialBoard: puzzle.initialBoard,
      solution: puzzle.solution,
      difficulty: puzzle.difficulty
    });
  };

  // Load puzzle from initial data by level
  const loadFromInitialData = (level) => {
    const puzzle = initialPuzzlesData.find(p => p.level === level);
    if (puzzle) {
      setFormData({
        level: puzzle.level,
        name: puzzle.name,
        description: puzzle.description,
        hint: puzzle.hint,
        initialBoard: puzzle.initialBoard,
        solution: puzzle.solution,
        difficulty: puzzle.difficulty
      });
    } else {
      setMessage({ type: 'error', text: 'Puzzle not found in initial data' });
    }
  };

  // Handle board cell click for visual editing
  const handleBoardCellClick = (rowIndex, colIndex) => {
    if (editingMode === 'erase') {
      // Erase mode - remove piece
      const newBoard = formData.initialBoard.map(row => [...row]);
      newBoard[rowIndex][colIndex] = null;
      setFormData({
        ...formData,
        initialBoard: newBoard
      });
    } else if (selectedPiece) {
      // Place mode - place selected piece
      const newBoard = formData.initialBoard.map(row => [...row]);
      newBoard[rowIndex][colIndex] = selectedPiece;
      setFormData({
        ...formData,
        initialBoard: newBoard
      });
    }
  };

  // Clear a specific cell
  const clearCell = (rowIndex, colIndex) => {
    const newBoard = formData.initialBoard.map(row => [...row]);
    newBoard[rowIndex][colIndex] = null;
    setFormData({
      ...formData,
      initialBoard: newBoard
    });
  };

  // Clear entire board
  const clearBoard = () => {
    if (window.confirm('Clear the entire board?')) {
      setFormData({
        ...formData,
        initialBoard: createEmptyBoard()
      });
    }
  };

  // Load puzzles on component mount
  useEffect(() => {
    fetchPuzzles();
  }, []);

  // Get current puzzles for pagination
  const indexOfLastPuzzle = currentPage * puzzlesPerPage;
  const indexOfFirstPuzzle = indexOfLastPuzzle - puzzlesPerPage;
  const currentPuzzles = puzzles.slice(indexOfFirstPuzzle, indexOfLastPuzzle);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#2b2623] to-[#1c1917] text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Puzzle Administration</h1>

        {/* Message Display */}
        {message.text && (
          <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 ${
            message.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
          }`}>
            {message.type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
            {message.text}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-[#0f0703] rounded-lg p-4 border border-white/10">
            <p className="text-sm text-white/60">Total Puzzles</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-[#0f0703] rounded-lg p-4 border border-white/10">
            <p className="text-sm text-white/60">Easy</p>
            <p className="text-2xl font-bold text-green-400">{stats.easy}</p>
          </div>
          <div className="bg-[#0f0703] rounded-lg p-4 border border-white/10">
            <p className="text-sm text-white/60">Medium</p>
            <p className="text-2xl font-bold text-yellow-400">{stats.medium}</p>
          </div>
          <div className="bg-[#0f0703] rounded-lg p-4 border border-white/10">
            <p className="text-sm text-white/60">Hard</p>
            <p className="text-2xl font-bold text-red-400">{stats.hard}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={fetchPuzzles}
            disabled={loading || gameLoading}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
          <button
            onClick={handleInitializePuzzles}
            disabled={loading || gameLoading}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
          >
            <Database size={18} />
            Initialize Default Puzzles
          </button>
          <button
            onClick={handleDeleteAllPuzzles}
            disabled={loading || gameLoading}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
          >
            <Trash2 size={18} />
            Delete All
          </button>
        </div>

        {/* Main Content - Two Columns */}
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column - Puzzle List */}
          <div className="bg-[#0f0703] rounded-lg border border-white/10 p-4">
            <h2 className="text-xl font-bold mb-4">Puzzle List</h2>
            
            {/* Quick Load from Initial Data */}
            <div className="mb-4">
              <p className="text-sm text-white/60 mb-2">Quick Load from Initial Data:</p>
              <div className="grid grid-cols-5 gap-2">
                {[1,2,3,4,5,6,7,8,9,10].map(level => (
                  <button
                    key={level}
                    onClick={() => loadFromInitialData(level)}
                    className="bg-[#ff9900] hover:bg-[#ffaa22] text-black text-sm py-1 rounded"
                  >
                    Level {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Puzzle List */}
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {currentPuzzles.map(puzzle => (
                <div
                  key={puzzle._id}
                  className={`p-3 rounded-lg border cursor-pointer transition ${
                    selectedPuzzle?._id === puzzle._id
                      ? 'bg-[#ff9900]/20 border-[#ff9900]'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                  onClick={() => editPuzzle(puzzle)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-bold">Level {puzzle.level}:</span> {puzzle.name}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded ${
                        puzzle.difficulty === 'easy' ? 'bg-green-500/20 text-green-300' :
                        puzzle.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-red-500/20 text-red-300'
                      }`}>
                        {puzzle.difficulty}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeletePuzzle(puzzle._id);
                        }}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 mt-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-1 rounded bg-white/10 disabled:opacity-50"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-sm">
                Page {currentPage} of {Math.ceil(puzzles.length / puzzlesPerPage)}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(Math.ceil(puzzles.length / puzzlesPerPage), prev + 1))}
                disabled={currentPage === Math.ceil(puzzles.length / puzzlesPerPage)}
                className="p-1 rounded bg-white/10 disabled:opacity-50"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Right Column - Visual Puzzle Editor */}
          <div className="bg-[#0f0703] rounded-lg border border-white/10 p-4">
            <h2 className="text-xl font-bold mb-4">
              {selectedPuzzle ? 'Edit Puzzle' : 'Create New Puzzle'}
            </h2>

            <form onSubmit={(e) => {
              e.preventDefault();
              selectedPuzzle ? handleUpdatePuzzle() : handleCreatePuzzle();
            }}>
              <div className="space-y-4">
                {/* Basic Info - Compact layout */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-white/60 mb-1">Level (1-10)</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={formData.level}
                      onChange={(e) => setFormData({...formData, level: parseInt(e.target.value)})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-1">Difficulty</label>
                    <select
                      value={formData.difficulty}
                      onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-1">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white"
                    rows="2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-1">Hint</label>
                  <textarea
                    value={formData.hint}
                    onChange={(e) => setFormData({...formData, hint: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white"
                    rows="2"
                    required
                  />
                </div>

                {/* Solution - Compact layout */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-white/60 mb-1">From (row, col)</label>
                    <div className="flex gap-1">
                      <input
                        type="number"
                        min="0"
                        max="7"
                        value={formData.solution.from[0]}
                        onChange={(e) => setFormData({
                          ...formData,
                          solution: {
                            ...formData.solution,
                            from: [parseInt(e.target.value), formData.solution.from[1]]
                          }
                        })}
                        className="w-1/2 bg-white/5 border border-white/10 rounded-lg p-2 text-white"
                        placeholder="Row"
                      />
                      <input
                        type="number"
                        min="0"
                        max="7"
                        value={formData.solution.from[1]}
                        onChange={(e) => setFormData({
                          ...formData,
                          solution: {
                            ...formData.solution,
                            from: [formData.solution.from[0], parseInt(e.target.value)]
                          }
                        })}
                        className="w-1/2 bg-white/5 border border-white/10 rounded-lg p-2 text-white"
                        placeholder="Col"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-1">To (row, col)</label>
                    <div className="flex gap-1">
                      <input
                        type="number"
                        min="0"
                        max="7"
                        value={formData.solution.to[0]}
                        onChange={(e) => setFormData({
                          ...formData,
                          solution: {
                            ...formData.solution,
                            to: [parseInt(e.target.value), formData.solution.to[1]]
                          }
                        })}
                        className="w-1/2 bg-white/5 border border-white/10 rounded-lg p-2 text-white"
                        placeholder="Row"
                      />
                      <input
                        type="number"
                        min="0"
                        max="7"
                        value={formData.solution.to[1]}
                        onChange={(e) => setFormData({
                          ...formData,
                          solution: {
                            ...formData.solution,
                            to: [formData.solution.to[0], parseInt(e.target.value)]
                          }
                        })}
                        className="w-1/2 bg-white/5 border border-white/10 rounded-lg p-2 text-white"
                        placeholder="Col"
                      />
                    </div>
                  </div>
                </div>

                {/* Visual Board Editor */}
                <div className="border border-white/10 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold">Board Editor</h3>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingMode('place')}
                        className={`px-3 py-1 text-sm rounded ${
                          editingMode === 'place' 
                            ? 'bg-[#ff9900] text-black' 
                            : 'bg-white/10 hover:bg-white/20'
                        }`}
                      >
                        Place
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingMode('erase')}
                        className={`px-3 py-1 text-sm rounded flex items-center gap-1 ${
                          editingMode === 'erase' 
                            ? 'bg-red-600 text-white' 
                            : 'bg-white/10 hover:bg-white/20'
                        }`}
                      >
                        <X size={14} /> Erase
                      </button>
                      <button
                        type="button"
                        onClick={clearBoard}
                        className="px-3 py-1 text-sm rounded bg-white/10 hover:bg-white/20"
                      >
                        Clear Board
                      </button>
                    </div>
                  </div>

                  {/* Piece Palette - Larger icons */}
                  <div className="mb-4">
                    <p className="text-sm text-white/60 mb-2">Select a piece to place:</p>
                    <div className="grid grid-cols-6 gap-2">
                      {Object.entries(pieces).map(([pieceKey, piece]) => (
                        <button
                          key={pieceKey}
                          type="button"
                          onClick={() => {
                            setSelectedPiece(pieceKey);
                            setEditingMode('place');
                          }}
                          className={`p-3 rounded flex items-center justify-center text-3xl ${
                            selectedPiece === pieceKey 
                              ? 'bg-[#ff9900] text-black ring-2 ring-white' 
                              : piece.color === 'white' 
                                ? 'bg-white text-black hover:bg-gray-200' 
                                : 'bg-gray-900 text-white hover:bg-gray-800 border border-gray-700'
                          }`}
                          title={piece.name}
                        >
                          {piece.symbol}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Board - Larger size */}
                  <div className="flex justify-center">
                    <div className="grid grid-cols-8 w-[480px] h-[480px] border-2 border-white/20 shadow-2xl">
                      {formData.initialBoard.map((row, rowIndex) =>
                        row.map((piece, colIndex) => {
                          const isDark = (rowIndex + colIndex) % 2 === 1;
                          const pieceData = piece ? pieces[piece] : null;
                          
                          return (
                            <div
                              key={`${rowIndex}-${colIndex}`}
                              onClick={() => handleBoardCellClick(rowIndex, colIndex)}
                              style={{ backgroundColor: isDark ? '#b58863' : '#f0d9b5' }}
                              className={`flex items-center justify-center text-4xl cursor-pointer transition-all relative group w-[60px] h-[60px] ${
                                editingMode === 'erase' ? 'hover:opacity-70' : 'hover:ring-2 hover:ring-white'
                              }`}
                            >
                              {pieceData && (
                                <span className={pieceData.color === 'white' ? 'text-black drop-shadow-lg' : 'text-black drop-shadow-lg'}>
                                  {pieceData.symbol}
                                </span>
                              )}
                              {/* Clear button overlay on hover */}
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/30 rounded">
                                {editingMode === 'erase' && (
                                  <X size={20} className="text-white" />
                                )}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-white/40 mt-2 text-center">
                    {editingMode === 'place' 
                      ? selectedPiece 
                        ? `Click on a square to place ${pieces[selectedPiece]?.name}` 
                        : 'Select a piece from above first'
                      : 'Click on any square to erase the piece'}
                  </p>
                </div>

                {/* Form Buttons */}
                <div className="flex gap-2 pt-4">
                  <button
                    type="submit"
                    disabled={loading || gameLoading}
                    className="flex-1 bg-[#ff9900] hover:bg-[#ffaa22] text-black py-2 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Save size={18} />
                    {selectedPuzzle ? 'Update Puzzle' : 'Create Puzzle'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 bg-white/10 hover:bg-white/20 rounded-lg"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}