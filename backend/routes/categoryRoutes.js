import express from 'express';
import {
    addCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} from '../controllers/categoryController.js';
import { protect, admin } from '../middleware/authMiddleware.js'; // Middleware for route protection

const router = express.Router();

router.route('/')
    .get(getAllCategories)
    .post(protect, admin, addCategory);

router.route('/:id')
    .get(getCategoryById)
    .put(protect, admin, updateCategory)
    .delete(protect, admin, deleteCategory);

export default router;
