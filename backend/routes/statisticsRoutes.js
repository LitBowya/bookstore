import express from 'express';
import { getCounts } from '../controllers/statisticsController.js';

const router = express.Router();

router.route('/counts').get(getCounts);

export default router;
