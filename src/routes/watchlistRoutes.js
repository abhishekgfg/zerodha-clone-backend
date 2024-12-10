import express from 'express';
import { addStockToWatchlist, getWatchlist } from '../controllers/watchlistController.js';

const router = express.Router();

// Add a stock to the watchlist
router.post('/', addStockToWatchlist);

// Get all stocks in the watchlist
router.get('/', getWatchlist);

export default router;





