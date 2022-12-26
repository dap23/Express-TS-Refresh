import express from 'express';
import { deleteUserHandler, getAllUsersHandler, getMeHandler, updateUserHandler } from '../controllers/user.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { restrictTo } from '../middleware/restrictTo';

const router = express.Router();

router.use(deserializeUser, requireUser);

// Admin Get Users route
router.get('/', restrictTo('admin'), getAllUsersHandler);

// Get my info route
router.get('/me', getMeHandler);

// Delete & Update
router.route('/:id').put(updateUserHandler).delete(deleteUserHandler);

export default router;
