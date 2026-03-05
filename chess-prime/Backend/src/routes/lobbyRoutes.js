// import express from 'express';
// //import { auth } from '../middleware/auth.js';
// import auth from '../middleware/auth.js';  
// import {
//   joinQuickMatch,
//   leaveQuickMatch,
//   getQueueStatus
// } from '../controllers/quickMatchController.js';

// const router = express.Router();

// router.post('/join', auth, joinQuickMatch);
// router.post('/leave', auth, leaveQuickMatch);
// router.get('/status/:timeControl', auth, getQueueStatus);

// export default router;  // Add this line



import express from 'express';
import {
  createLobby,
  getLobby,
  joinLobby,
  toggleReady,
  inviteUser,
  leaveLobby,
  startGame
} from '../controllers/lobbyController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, createLobby);
router.get('/:lobbyCode', auth, getLobby);
router.post('/:lobbyCode/join', auth, joinLobby);
router.put('/:lobbyCode/ready', auth, toggleReady);
router.post('/:lobbyCode/invite', auth, inviteUser);
router.delete('/:lobbyCode/leave', auth, leaveLobby);
router.post('/:lobbyCode/start', auth, startGame);

export default router;