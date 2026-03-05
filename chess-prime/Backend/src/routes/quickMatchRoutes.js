// import express from 'express';
// import auth from '../middleware/auth.js';
// import {
//   joinQuickMatch,
//   leaveQuickMatch,
//   getQueueStatus,
//   createQuickMatchGame
// } from '../controllers/quickMatchController.js';

// const router = express.Router();

// router.post('/join', auth, joinQuickMatch);
// router.post('/leave', auth, leaveQuickMatch);
// router.get('/status/:timeControl', auth, getQueueStatus);
// router.post('/create-game', auth, createQuickMatchGame);

// export default router;



import express from 'express';
import {
  joinQuickMatch,
  leaveQuickMatch,
  getQueueStatus
} from '../controllers/quickMatchController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/join', auth, joinQuickMatch);
router.post('/leave', auth, leaveQuickMatch);
router.get('/status/:timeControl', auth, getQueueStatus);

export default router;