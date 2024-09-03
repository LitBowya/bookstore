import express from 'express';
import {
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    deleteUser
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js'; // Middleware for route protection

const router = express.Router();

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router.route('/')
    .get(protect, admin, getUsers);

router.route('/:id')
    .get(protect, admin, getUserById)
    .delete(protect, admin, deleteUser);

export default router;
