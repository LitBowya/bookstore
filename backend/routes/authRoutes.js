import express from 'express';
import {
    registerUser,
    loginUser,
    logoutUser
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { uploadSingleImage } from '../utils/profileUpload.js';

const router = express.Router();

router.post('/register', uploadSingleImage, registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

export default router;
