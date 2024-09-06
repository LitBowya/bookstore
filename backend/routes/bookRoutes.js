import express from 'express';
import {
    addBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
    searchBooks // Import search function
} from '../controllers/bookController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { uploadBookFiles } from '../utils/fileUpload.js';

const router = express.Router();

router.route('/')
    .get(getAllBooks)
    .post(uploadBookFiles, protect, admin, addBook);

router.route('/search')
    .get(searchBooks); // Add the search route

router.route('/:id')
    .get(getBookById)
    .put(protect, admin, updateBook)
    .delete(protect, admin, deleteBook);

export default router;
