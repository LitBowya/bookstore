// In your routes file

import express from 'express';
import { createTestimonial, getRandomTestimonials, getAllTestimonials, deleteTestimonial } from '../controllers/testimonialController.js';
import { protect, admin } from '../middleware/authMiddleware.js'; // Middleware to protect routes

const router = express.Router();

router.route('/')
    .post(protect, createTestimonial)
    .get(protect, admin, getAllTestimonials);

router.route('/:id')
    .delete(protect, admin, deleteTestimonial);

// Route to get random testimonials
router.get('/random', getRandomTestimonials);

export default router;
