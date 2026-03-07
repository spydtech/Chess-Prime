// routes/profileRoutes.js
import express from 'express';
import { body } from 'express-validator';
import auth from '../middleware/auth.js';
import {
  getMyProfile,
  getUserProfile,
  updateProfile,
  changeName,
  changePassword,
  changeEmail,
  updateSettings,
  toggleKidMode,
  getProfileCompletion,
  closeAccount,
  addFriend,
  getFriends
} from '../controllers/profileController.js';

const router = express.Router();

// All routes require authentication
router.use(auth);

// Profile routes
router.get('/me', getMyProfile);
router.get('/:name', getUserProfile);
router.put('/update', updateProfile);
router.get('/completion/percentage', getProfileCompletion);

// Name change validation
router.put(
  '/change-name',
  [
    body('newName')
      .isLength({ min: 3, max: 20 })
      .withMessage('Name must be between 3 and 20 characters')
      .matches(/^[a-zA-Z0-9_]+$/)
      .withMessage('Name can only contain letters, numbers, and underscores')
  ],
  changeName
);

// Password change validation
router.put(
  '/change-password',
  [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword')
      .isLength({ min: 6 })
      .withMessage('New password must be at least 6 characters long')
  ],
  changePassword
);

// Email change validation
router.put(
  '/change-email',
  [
    body('newEmail')
      .isEmail()
      .withMessage('Please provide a valid email')
      .normalizeEmail()
  ],
  changeEmail
);

// Settings
router.put('/settings', updateSettings);
router.put('/kid-mode', toggleKidMode);

// Account management
router.post('/close-account', closeAccount);

// Friends
router.post('/friends/add', addFriend);
router.get('/friends/list', getFriends);

export default router;