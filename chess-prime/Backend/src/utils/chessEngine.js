// Simple chess engine for computer moves
export const getComputerMove = (fen, difficulty) => {
  const difficultyLevels = {
    beginner: 1,
    intermediate: 2,
    advanced: 3,
    expert: 4,
    grandmaster: 5
  };

  const level = difficultyLevels[difficulty] || 2;
  
  // Sample moves based on difficulty
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
};

export const evaluatePosition = (fen) => {
  // Simple evaluation based on piece count
  return Math.random() * 100;
};

export const getBestMove = (fen, depth) => {
  return getComputerMove(fen, 'intermediate');
};