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
router.post('/', createPuzzle);
router.put('/:id', updatePuzzle);
router.delete('/:id', deletePuzzle);

export default router;