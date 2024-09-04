import express from 'express';
import {
    addToWishlist,
    removeFromWishlist,
    getWishlist,
    clearWishlist,
} from '../controllers/wishlistController.js';

const router = express.Router();

router.post('/add', addToWishlist);
router.post('/remove', removeFromWishlist);
router.post('/clear', clearWishlist);
router.get('/', getWishlist);

export default router;
