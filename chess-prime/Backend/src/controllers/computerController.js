import Game from '../models/Game.js';
import User from '../models/User.js';

// Helper function to get computer rating
function getComputerRating(difficulty, playerRating) {
  const levels = {
    beginner: Math.max(400, playerRating - 400),
    intermediate: playerRating - 100,
    advanced: playerRating + 100,
    expert: playerRating + 300,
    grandmaster: 2500
  };
  return levels[difficulty] || playerRating;
}

// Helper function to generate computer move
async function generateComputerMove(fen, difficulty) {
  const difficultyLevels = {
    beginner: 1,
    intermediate: 2,
    advanced: 3,
    expert: 4,
    grandmaster: 5
  };

  const level = difficultyLevels[difficulty] || 2;
  
  // Simulate computer thinking time
  await new Promise(resolve => setTimeout(resolve, 500 + level * 200));

  // Sample moves for demo
  const moves = [
    { from: 'e2', to: 'e4', san: 'e4', fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1' },
    { from: 'd2', to: 'd4', san: 'd4', fen: 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1' },
    { from: 'g1', to: 'f3', san: 'Nf3', fen: 'rnbqkbnr/pppppppp/8/8/8/5N2/PPPPPPPP/RNBQKB1R b KQkq - 1 1' },
    { from: 'e7', to: 'e5', san: 'e5', fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2' },
    { from: 'd7', to: 'd5', san: 'd5', fen: 'rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2' },
    { from: 'g8', to: 'f6', san: 'Nf6', fen: 'rnbqkb1r/pppppppp/5n2/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 1 2' }
  ];
  
  // Better moves for higher difficulty
  const index = Math.floor(Math.random() * (level + 2));
  return moves[index % moves.length];
}

export const startComputerGame = async (req, res) => {
  try {
    const { timeControl, difficulty = 'intermediate' } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    const gameId = 'COMP_' + Math.random().toString(36).substring(2, 8).toUpperCase();

    const [initial, increment] = timeControl.split('+').map(Number);

    // Computer rating based on difficulty
    const computerRating = getComputerRating(difficulty, user.rating);

    const game = await Game.create({
      gameId,
      players: [
        {
          userId: userId,
          name: user.name,
          rating: user.rating,
          color: 'white'
        },
        {
          name: `Computer (${difficulty})`,
          rating: computerRating,
          color: 'black'
        }
      ],
      gameMode: 'vs-computer',
      timeControl: {
        initial: initial || 10,
        increment: increment || 0
      },
      status: 'active',
      startTime: new Date()
    });

    res.status(201).json({
      success: true,
      gameId,
      game,
      computerLevel: difficulty,
      computerRating
    });
  } catch (error) {
    console.error('Start computer game error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getComputerMove = async (req, res) => {
  try {
    const { gameId } = req.params;
    const { fen, difficulty } = req.body;

    const game = await Game.findOne({ gameId });
    
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Generate computer move based on difficulty
    const computerMove = await generateComputerMove(fen, difficulty);

    // Add move to game
    game.moves.push({
      from: computerMove.from,
      to: computerMove.to,
      promotion: computerMove.promotion || 'q',
      san: computerMove.san,
      fen: computerMove.fen,
      timestamp: new Date()
    });

    game.fenHistory.push(computerMove.fen);
    await game.save();

    res.json({
      success: true,
      move: computerMove
    });
  } catch (error) {
    console.error('Get computer move error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getComputerDifficulty = async (req, res) => {
  try {
    const difficulties = [
      { id: 'beginner', name: 'Beginner', rating: 800, description: 'Perfect for learning' },
      { id: 'intermediate', name: 'Intermediate', rating: 1200, description: 'Casual player' },
      { id: 'advanced', name: 'Advanced', rating: 1600, description: 'Challenging opponent' },
      { id: 'expert', name: 'Expert', rating: 2000, description: 'Strong player' },
      { id: 'grandmaster', name: 'Grandmaster', rating: 2400, description: 'Near perfect play' }
    ];

    res.json({
      success: true,
      difficulties
    });
  } catch (error) {
    console.error('Get computer difficulty error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};