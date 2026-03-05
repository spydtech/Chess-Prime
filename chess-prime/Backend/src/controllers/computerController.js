import Game from '../models/Game.js';
import User from '../models/User.js';
import { Chess } from 'chess.js';

// Helper function to get computer rating based on difficulty
const getComputerRating = (difficulty, playerRating) => {
  const levels = {
    beginner: Math.max(400, playerRating - 400),
    easy: Math.max(600, playerRating - 300),
    medium: playerRating - 50,
    hard: playerRating + 100,
    expert: playerRating + 300,
    grandmaster: 2500
  };
  return levels[difficulty] || playerRating;
};

// Helper function to generate computer move based on difficulty
const generateComputerMove = async (chess, difficulty) => {
  const moves = chess.moves({ verbose: true });
  
  if (moves.length === 0) return null;

  // Simulate thinking time based on difficulty
  const thinkingTimes = {
    beginner: 300,
    easy: 500,
    medium: 800,
    hard: 1200,
    expert: 1500,
    grandmaster: 2000
  };
  
  await new Promise(resolve => setTimeout(resolve, thinkingTimes[difficulty] || 500));

  let selectedMove;

  switch(difficulty) {
    case 'beginner':
      // Completely random moves
      selectedMove = moves[Math.floor(Math.random() * moves.length)];
      break;
      
    case 'easy':
      // Mostly random, occasionally prefer captures
      if (Math.random() > 0.7) {
        const captures = moves.filter(m => m.flags.includes('c'));
        if (captures.length > 0) {
          selectedMove = captures[Math.floor(Math.random() * captures.length)];
          break;
        }
      }
      selectedMove = moves[Math.floor(Math.random() * moves.length)];
      break;
      
    case 'medium':
      // Prefer captures and checks
      const goodMoves = moves.filter(m => 
        m.flags.includes('c') || // captures
        m.flags.includes('ch')    // checks
      );
      
      if (goodMoves.length > 0 && Math.random() > 0.4) {
        selectedMove = goodMoves[Math.floor(Math.random() * goodMoves.length)];
      } else {
        selectedMove = moves[Math.floor(Math.random() * moves.length)];
      }
      break;
      
    case 'hard':
      // Prefer center control and development
      const centerMoves = moves.filter(m => {
        const toCol = m.to.charCodeAt(0) - 97;
        const toRow = parseInt(m.to[1]) - 1;
        return (toCol >= 2 && toCol <= 5 && toRow >= 2 && toRow <= 5);
      });
      
      if (centerMoves.length > 0 && Math.random() > 0.3) {
        selectedMove = centerMoves[Math.floor(Math.random() * centerMoves.length)];
      } else {
        selectedMove = moves[Math.floor(Math.random() * moves.length)];
      }
      break;
      
    case 'expert':
      // More sophisticated - prefer checks and captures
      const excellentMoves = moves.filter(m => 
        m.flags.includes('c') || 
        m.flags.includes('ch') ||
        m.flags.includes('cp')  // capture promotion
      );
      
      if (excellentMoves.length > 0) {
        selectedMove = excellentMoves[Math.floor(Math.random() * excellentMoves.length)];
      } else {
        selectedMove = moves[Math.floor(Math.random() * moves.length)];
      }
      break;
      
    case 'grandmaster':
      // Prefer best moves (simulated - in real app, would use engine)
      const bestMoves = moves.filter(m => 
        m.flags.includes('c') || 
        m.flags.includes('ch') ||
        m.flags.includes('cp') ||
        m.piece === 'n' || // knight moves (development)
        m.piece === 'b'    // bishop moves (development)
      );
      
      if (bestMoves.length > 0) {
        selectedMove = bestMoves[Math.floor(Math.random() * bestMoves.length)];
      } else {
        selectedMove = moves[Math.floor(Math.random() * moves.length)];
      }
      break;
      
    default:
      selectedMove = moves[Math.floor(Math.random() * moves.length)];
  }

  return selectedMove;
};

export const startComputerGame = async (req, res) => {
  try {
    const { timeControl, difficulty = 'medium' } = req.body;
    
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const gameId = 'C' + Date.now() + Math.random().toString(36).substring(2, 7).toUpperCase();
    
    const [initial, increment] = timeControl.split('+').map(Number);
    
    // Get computer rating based on difficulty and user rating
    const computerRating = getComputerRating(difficulty, user.rating);

    const game = new Game({
      gameId,
      gameType: 'vs-computer',
      timeControl: {
        initial: initial * 60,
        increment: increment || 0
      },
      players: [
        {
          userId: user._id,
          username: user.name,
          color: 'white',
          rating: user.rating,
          timeRemaining: initial * 60,
          isComputer: false
        },
        {
          userId: null,
          username: `Computer (${difficulty})`,
          color: 'black',
          rating: computerRating,
          timeRemaining: initial * 60,
          isComputer: true
        }
      ],
      status: 'active',
      startedAt: new Date(),
      currentFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    });
    
    await game.save();
    
    res.status(201).json({
      success: true,
      message: 'Computer game started successfully',
      game: {
        gameId: game.gameId,
        gameType: game.gameType,
        timeControl: game.timeControl,
        players: game.players,
        status: game.status,
        currentFen: game.currentFen,
        difficulty
      }
    });
  } catch (error) {
    console.error('Start computer game error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getComputerMove = async (req, res) => {
  try {
    const { gameId } = req.params;
    const { fen, difficulty = 'medium' } = req.body;

    const game = await Game.findOne({ gameId });
    
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Initialize chess with current position
    const chess = new Chess(fen || game.currentFen);
    
    // Check if game is over
    if (chess.isGameOver()) {
      let result = null;
      if (chess.isCheckmate()) {
        result = chess.turn() === 'w' ? 'black' : 'white';
      } else if (chess.isDraw()) {
        result = 'draw';
      }
      
      return res.json({ 
        gameOver: true, 
        result,
        message: chess.isCheckmate() ? 'Checkmate' : 
                chess.isStalemate() ? 'Stalemate' :
                chess.isDraw() ? 'Draw' : 'Game over'
      });
    }
    
    // Generate computer move
    const computerMove = await generateComputerMove(chess, difficulty);
    
    if (!computerMove) {
      return res.status(400).json({ message: 'No valid moves available' });
    }

    // Make the move on the chess instance
    const moveResult = chess.move({
      from: computerMove.from,
      to: computerMove.to,
      promotion: 'q'
    });

    if (!moveResult) {
      return res.status(400).json({ message: 'Invalid move generated' });
    }

    // Update game in database
    game.moves.push({
      from: computerMove.from,
      to: computerMove.to,
      promotion: 'q',
      san: moveResult.san,
      fen: chess.fen(),
      moveNumber: game.moves.length + 1,
      time: 1 // Computer takes 1 second per move
    });

    game.currentFen = chess.fen();
    game.lastMoveAt = new Date();

    // Update computer's time
    const computerPlayer = game.players.find(p => p.isComputer);
    if (computerPlayer) {
      computerPlayer.timeRemaining -= 1; // Computer takes 1 second
      computerPlayer.timeRemaining += game.timeControl.increment;
    }

    await game.save();

    // Check game status after move
    const gameStatus = {
      gameOver: chess.isGameOver(),
      check: chess.isCheck(),
      checkmate: chess.isCheckmate(),
      draw: chess.isDraw(),
      stalemate: chess.isStalemate(),
      threefold: chess.isThreefoldRepetition(),
      insufficient: chess.isInsufficientMaterial()
    };

    res.json({
      success: true,
      move: {
        from: computerMove.from,
        to: computerMove.to,
        promotion: 'q',
        san: moveResult.san
      },
      fen: chess.fen(),
      gameStatus,
      timeRemaining: computerPlayer?.timeRemaining
    });
  } catch (error) {
    console.error('Get computer move error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getComputerDifficulties = async (req, res) => {
  try {
    const difficulties = [
      { id: 'beginner', name: 'Beginner', rating: 800, description: 'Perfect for learning the basics' },
      { id: 'easy', name: 'Easy', rating: 1000, description: 'Good for practice' },
      { id: 'medium', name: 'Medium', rating: 1200, description: 'Casual player level' },
      { id: 'hard', name: 'Hard', rating: 1500, description: 'Challenging opponent' },
      { id: 'expert', name: 'Expert', rating: 1800, description: 'Strong player' },
      { id: 'grandmaster', name: 'Grandmaster', rating: 2200, description: 'Near perfect play' }
    ];

    res.json({
      success: true,
      difficulties
    });
  } catch (error) {
    console.error('Get computer difficulties error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};