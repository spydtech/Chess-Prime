// Elo rating calculation
export const calculateRatingChange = (playerRating, opponentRating, result) => {
  const K = 32;
  
  const expectedScore = 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
  
  let actualScore;
  switch(result) {
    case 'win':
      actualScore = 1;
      break;
    case 'draw':
      actualScore = 0.5;
      break;
    case 'loss':
      actualScore = 0;
      break;
    default:
      return 0;
  }
  
  return Math.round(K * (actualScore - expectedScore));
};

export const getUpdatedRatings = (winner, players) => {
  const whitePlayer = players.find(p => p.color === 'white');
  const blackPlayer = players.find(p => p.color === 'black');
  
  if (!whitePlayer || !blackPlayer) {
    return { whiteChange: 0, blackChange: 0 };
  }
  
  let whiteChange = 0;
  let blackChange = 0;
  
  if (winner === 'white') {
    whiteChange = calculateRatingChange(whitePlayer.rating, blackPlayer.rating, 'win');
    blackChange = calculateRatingChange(blackPlayer.rating, whitePlayer.rating, 'loss');
  } else if (winner === 'black') {
    whiteChange = calculateRatingChange(whitePlayer.rating, blackPlayer.rating, 'loss');
    blackChange = calculateRatingChange(blackPlayer.rating, whitePlayer.rating, 'win');
  } else if (winner === 'draw') {
    whiteChange = calculateRatingChange(whitePlayer.rating, blackPlayer.rating, 'draw');
    blackChange = calculateRatingChange(blackPlayer.rating, whitePlayer.rating, 'draw');
  }
  
  return { whiteChange, blackChange };
};