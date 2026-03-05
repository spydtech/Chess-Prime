// import express from 'express';
// import auth from '../middleware/auth.js';
// import {
//   startComputerGame,
//   getComputerMove,
//   getComputerDifficulty
// } from '../controllers/computerController.js';

// const router = express.Router();

// router.post('/start', auth, startComputerGame);
// router.post('/:gameId/move', auth, getComputerMove);
// router.get('/difficulties', auth, getComputerDifficulty);

// export default router;



import express from 'express';
import {
  getComputerMove,
  startComputerGame,
  getComputerDifficulties
} from '../controllers/computerController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get available difficulties
router.get('/difficulties', getComputerDifficulties);

// Start a new computer game
router.post('/start', auth, startComputerGame);

// Get computer move for a specific game
router.post('/:gameId/move', auth, getComputerMove);

export default router;