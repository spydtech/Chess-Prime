// import express from 'express';
// import auth from '../middleware/auth.js';
// import {
//   createGame,
//   getGame,
//   makeMove,
//   resignGame,
//   offerDraw,
//   acceptDraw,
//   getGameHistory
// } from '../controllers/gameController.js';

// const router = express.Router();

// router.post('/create', auth, createGame);
// router.get('/:gameId', auth, getGame);
// router.post('/:gameId/move', auth, makeMove);
// router.post('/:gameId/resign', auth, resignGame);
// router.post('/:gameId/draw/offer', auth, offerDraw);
// router.post('/:gameId/draw/accept', auth, acceptDraw);
// router.get('/history/all', auth, getGameHistory);

// export default router;





import express from 'express';
import {
  createGame,
  getGame,
  makeMove,
  endGame,
  getUserGames
} from '../controllers/gameController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, createGame);
router.get('/:gameId', auth, getGame);
router.post('/:gameId/move', auth, makeMove);
router.post('/:gameId/end', auth, endGame);
router.get('/user/history', auth, getUserGames);

export default router;