import express from 'express';
import { body } from 'express-validator';
import { 
  register, 
  login, 
  getCurrentUser,
  forgotPassword 
} from '../controllers/authController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

const registerValidation = [
  body('name')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long')
    .trim(),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/me', auth, getCurrentUser);
router.post('/forgot-password', forgotPassword);

export default router;