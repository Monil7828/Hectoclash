import express from 'express';
import { registerUser, loginUser, logoutUser, getMyProfile, getUserProfile } from '../controllers/userControllers.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/me').get(isAuthenticated, getMyProfile);
router.route('/:id').get(isAuthenticated, getUserProfile);

export default router;