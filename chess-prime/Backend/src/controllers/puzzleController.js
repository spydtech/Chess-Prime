import Puzzle from '../models/Puzzle.js';

// Initial puzzle data from your React component
const initialPuzzles = [
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

// @desc    Initialize puzzles in database
// @route   POST /api/puzzles/init
// @access  Public
export const initializePuzzles = async (req, res) => {
  try {
    await Puzzle.deleteMany({});
    await Puzzle.insertMany(initialPuzzles);
    res.status(201).json({ 
      message: 'Puzzles initialized successfully',
      count: initialPuzzles.length 
    });
  } catch (error) {
    console.error('Initialize error:', error);
    res.status(500).json({ 
      message: 'Error initializing puzzles', 
      error: error.message 
    });
  }
};

// @desc    Get all puzzles
// @route   GET /api/puzzles
// @access  Public
export const getAllPuzzles = async (req, res) => {
  try {
    const puzzles = await Puzzle.find({}).sort({ level: 1 });
    res.json(puzzles);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ 
      message: 'Error fetching puzzles', 
      error: error.message 
    });
  }
};

// @desc    Get puzzles for game (formatted as object with level keys)
// @route   GET /api/puzzles/game
// @access  Public
export const getGamePuzzles = async (req, res) => {
  try {
    const puzzles = await Puzzle.find({}).sort({ level: 1 });
    
    const formattedPuzzles = puzzles.reduce((acc, puzzle) => {
      acc[puzzle.level] = {
        name: puzzle.name,
        description: puzzle.description,
        hint: puzzle.hint,
        initialBoard: puzzle.initialBoard,
        solution: puzzle.solution,
        difficulty: puzzle.difficulty
      };
      return acc;
    }, {});
    
    res.json(formattedPuzzles);
  } catch (error) {
    console.error('Fetch game puzzles error:', error);
    res.status(500).json({ 
      message: 'Error fetching puzzles', 
      error: error.message 
    });
  }
};

// @desc    Get single puzzle by level
// @route   GET /api/puzzles/level/:level
// @access  Public
export const getPuzzleByLevel = async (req, res) => {
  try {
    const level = parseInt(req.params.level);
    
    if (level < 1 || level > 10) {
      return res.status(400).json({ message: 'Level must be between 1 and 10' });
    }
    
    const puzzle = await Puzzle.findOne({ level });
    
    if (!puzzle) {
      return res.status(404).json({ message: 'Puzzle not found' });
    }
    
    res.json(puzzle);
  } catch (error) {
    console.error('Fetch by level error:', error);
    res.status(500).json({ 
      message: 'Error fetching puzzle', 
      error: error.message 
    });
  }
};

// @desc    Get puzzle by ID
// @route   GET /api/puzzles/:id
// @access  Public
export const getPuzzleById = async (req, res) => {
  try {
    const puzzle = await Puzzle.findById(req.params.id);
    
    if (!puzzle) {
      return res.status(404).json({ message: 'Puzzle not found' });
    }
    
    res.json(puzzle);
  } catch (error) {
    console.error('Fetch by ID error:', error);
    res.status(500).json({ 
      message: 'Error fetching puzzle', 
      error: error.message 
    });
  }
};

// @desc    Create a new puzzle
// @route   POST /api/puzzles
// @access  Private/Admin
export const createPuzzle = async (req, res) => {
  try {
    console.log('Creating puzzle with data:', JSON.stringify(req.body, null, 2));
    
    const { level, name, description, hint, initialBoard, solution, difficulty } = req.body;
    
    if (!level || !name || !description || !hint || !initialBoard || !solution || !difficulty) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        received: { level, name, description, hint, initialBoard: !!initialBoard, solution: !!solution, difficulty }
      });
    }

    const existingPuzzle = await Puzzle.findOne({ level: parseInt(level) });
    if (existingPuzzle) {
      return res.status(400).json({ 
        message: `Puzzle with level ${level} already exists` 
      });
    }

    const puzzle = new Puzzle({
      level: parseInt(level),
      name: name,
      description: description,
      hint: hint,
      initialBoard: initialBoard,
      solution: {
        from: [parseInt(solution.from[0]), parseInt(solution.from[1])],
        to: [parseInt(solution.to[0]), parseInt(solution.to[1])]
      },
      difficulty: difficulty
    });
    
    const savedPuzzle = await puzzle.save();
    console.log('Puzzle created successfully:', savedPuzzle._id);
    
    res.status(201).json(savedPuzzle);
  } catch (error) {
    console.error('Create puzzle error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: messages 
      });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: 'Duplicate key error. Level must be unique.' 
      });
    }
    
    res.status(400).json({ 
      message: 'Error creating puzzle', 
      error: error.message 
    });
  }
};

// @desc    Update a puzzle
// @route   PUT /api/puzzles/:id
// @access  Private/Admin
export const updatePuzzle = async (req, res) => {
  try {
    console.log('Updating puzzle:', req.params.id);
    
    const updateData = {
      level: parseInt(req.body.level),
      name: req.body.name,
      description: req.body.description,
      hint: req.body.hint,
      initialBoard: req.body.initialBoard,
      solution: {
        from: [parseInt(req.body.solution.from[0]), parseInt(req.body.solution.from[1])],
        to: [parseInt(req.body.solution.to[0]), parseInt(req.body.solution.to[1])]
      },
      difficulty: req.body.difficulty
    };
    
    const puzzle = await Puzzle.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!puzzle) {
      return res.status(404).json({ message: 'Puzzle not found' });
    }
    
    console.log('Puzzle updated successfully');
    res.json(puzzle);
  } catch (error) {
    console.error('Update puzzle error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: messages 
      });
    }
    
    res.status(400).json({ 
      message: 'Error updating puzzle', 
      error: error.message 
    });
  }
};

// @desc    Delete a puzzle
// @route   DELETE /api/puzzles/:id
// @access  Private/Admin
export const deletePuzzle = async (req, res) => {
  try {
    const puzzle = await Puzzle.findByIdAndDelete(req.params.id);
    
    if (!puzzle) {
      return res.status(404).json({ message: 'Puzzle not found' });
    }
    
    res.json({ message: 'Puzzle deleted successfully' });
  } catch (error) {
    console.error('Delete puzzle error:', error);
    res.status(500).json({ 
      message: 'Error deleting puzzle', 
      error: error.message 
    });
  }
};

// @desc    Validate a move
// @route   POST /api/puzzles/validate
// @access  Public
export const validateMove = async (req, res) => {
  try {
    const { level, from, to } = req.body;
    
    if (!level || !from || !to) {
      return res.status(400).json({ 
        message: 'Please provide level, from position, and to position' 
      });
    }
    
    const puzzle = await Puzzle.findOne({ level: parseInt(level) });
    
    if (!puzzle) {
      return res.status(404).json({ message: 'Puzzle not found' });
    }
    
    const isValid = puzzle.solution.from[0] === from[0] && 
                    puzzle.solution.from[1] === from[1] &&
                    puzzle.solution.to[0] === to[0] && 
                    puzzle.solution.to[1] === to[1];
    
    res.json({ 
      valid: isValid,
      solution: isValid ? null : puzzle.solution
    });
  } catch (error) {
    console.error('Validate move error:', error);
    res.status(500).json({ 
      message: 'Error validating move', 
      error: error.message 
    });
  }
};

// @desc    Get random puzzle
// @route   GET /api/puzzles/random
// @access  Public
export const getRandomPuzzle = async (req, res) => {
  try {
    const { difficulty } = req.query;
    
    let query = {};
    if (difficulty) {
      query.difficulty = difficulty;
    }
    
    const count = await Puzzle.countDocuments(query);
    if (count === 0) {
      return res.status(404).json({ message: 'No puzzles found' });
    }
    
    const random = Math.floor(Math.random() * count);
    const puzzle = await Puzzle.findOne(query).skip(random);
    
    res.json(puzzle);
  } catch (error) {
    console.error('Random puzzle error:', error);
    res.status(500).json({ 
      message: 'Error fetching random puzzle', 
      error: error.message 
    });
  }
};

// @desc    Get puzzles by difficulty
// @route   GET /api/puzzles/difficulty/:difficulty
// @access  Public
export const getPuzzlesByDifficulty = async (req, res) => {
  try {
    const { difficulty } = req.params;
    
    if (!['easy', 'medium', 'hard'].includes(difficulty)) {
      return res.status(400).json({ message: 'Invalid difficulty level' });
    }
    
    const puzzles = await Puzzle.find({ difficulty }).sort({ level: 1 });
    res.json(puzzles);
  } catch (error) {
    console.error('Fetch by difficulty error:', error);
    res.status(500).json({ 
      message: 'Error fetching puzzles', 
      error: error.message 
    });
  }
};