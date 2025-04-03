import express from 'express';
import { createOrJoinMatch, submitAnswer } from '../controllers/matchControllers.js';
import isAuthenticated from '../middleware/isAuthenticated.js';


const router = express.Router();

router.route('/createOrJoin').post(isAuthenticated, createOrJoinMatch);
router.route('/submitAnswer').post(isAuthenticated, submitAnswer);

export default router;