import express from 'express';
import {
    getPayments,
    getAllPayments,
    createPayment,
    initiatePayment,
    verifyPayment
} from '../controllers/paymentController.js';
import { protect, admin } from '../middleware/authMiddleware.js'; // Middleware for route protection

const router = express.Router();

router.route('/')
    .get(protect, getPayments)
    .post(protect, createPayment);

router.route('/all')
    .get(protect, admin, getAllPayments);

router.route('/initiate')
    .post(protect, initiatePayment);

router.route('/verify')
    .get(protect, verifyPayment);

export default router;
