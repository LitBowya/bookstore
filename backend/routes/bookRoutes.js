import express from 'express';
import {
    addBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
} from '../controllers/bookController.js';
import { protect, admin } from '../middleware/authMiddleware.js'; // Middleware for route protection
import { uploadBookFiles } from '../utils/fileUpload.js'

const router = express.Router();

router.route('/')
    .get(getAllBooks)
    .post(uploadBookFiles, protect, admin, addBook);

router.route('/:id')
    .get(getBookById)
    .put(protect, admin, updateBook)
    .delete(protect, admin, deleteBook);

export default router;
