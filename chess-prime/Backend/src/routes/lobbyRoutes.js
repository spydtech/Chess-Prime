import express from 'express';
//import { auth } from '../middleware/auth.js';
import auth from '../middleware/auth.js';  
import {
  joinQuickMatch,
  leaveQuickMatch,
  getQueueStatus
} from '../controllers/quickMatchController.js';

const router = express.Router();

router.post('/join', auth, joinQuickMatch);
router.post('/leave', auth, leaveQuickMatch);
router.get('/status/:timeControl', auth, getQueueStatus);

export default router;  // Add this line