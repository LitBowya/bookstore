import express from 'express';
import {
    createOrder,
    getUserOrders,
    getOrderById,
    getAllOrders
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js'; // Middleware for route protection

const router = express.Router();

router.route('/')
    .post(protect, createOrder)
    .get(protect, getUserOrders)

router.route('/all').get(protect, admin, getAllOrders)

router.route('/:id')
    .get(protect, getOrderById);

export default router;
