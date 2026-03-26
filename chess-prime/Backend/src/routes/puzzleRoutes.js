import express from 'express';
import {
  initializePuzzles,
  getAllPuzzles,
  getPuzzleByLevel,
  getPuzzleById,
  createPuzzle,
  updatePuzzle,
  deletePuzzle,
  validateMove,
  getRandomPuzzle,
  getPuzzlesByDifficulty,
  getGamePuzzles
} from '../controllers/puzzleController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllPuzzles);
router.get('/game', getGamePuzzles);
router.get('/random', getRandomPuzzle);
router.get('/level/:level', getPuzzleByLevel);
router.get('/difficulty/:difficulty', getPuzzlesByDifficulty);
router.get('/:id', getPuzzleById);
router.post('/validate', validateMove);
router.post('/init', initializePuzzles);

// Protected routes (should add auth middleware in production)
router.post('/',auth, createPuzzle);
router.put('/:id', auth, updatePuzzle);
router.delete('/:id', auth, deletePuzzle);

export default router;