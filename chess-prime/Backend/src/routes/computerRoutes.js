import express from 'express';
import auth from '../middleware/auth.js';
import {
  startComputerGame,
  getComputerMove,
  getComputerDifficulty
} from '../controllers/computerController.js';

const router = express.Router();

router.post('/start', auth, startComputerGame);
router.post('/:gameId/move', auth, getComputerMove);
router.get('/difficulties', auth, getComputerDifficulty);

export default router;