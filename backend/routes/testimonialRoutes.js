import express from 'express';
import { createTestimonial, getRandomTestimonials } from '../controllers/testimonialController.js';
import { protect } from '../middleware/authMiddleware.js'; // Middleware to protect routes

const router = express.Router();

// Route to create a testimonial (protected)
router.post('/', protect, createTestimonial);

// Route to get random testimonials
router.get('/random', getRandomTestimonials);

export default router;
