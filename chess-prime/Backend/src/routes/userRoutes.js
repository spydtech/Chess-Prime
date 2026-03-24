// In userRoutes.js - Add this route

import express from 'express';
import {
  getUserProfile,
  updateSettings,
  getLeaderboard,
  addFriend,
  getFriends,
  searchUsers  // Add this import
} from '../controllers/userController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/leaderboard', getLeaderboard);
router.get('/search', auth, searchUsers);  
router.get('/:userId', auth, getUserProfile);
router.put('/settings', auth, updateSettings);
router.post('/friends', auth, addFriend);
router.get('/friends/list', auth, getFriends);

export default router;