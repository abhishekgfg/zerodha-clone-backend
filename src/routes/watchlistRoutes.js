import express from 'express';
import { addStockToWatchlist, getWatchlist,updateStockPrice } from '../controllers/watchlistController.js';

const router = express.Router();
// Add a stock to the watchlist
router.post('/', addStockToWatchlist);
// Get all stocks in the watchlist
router.get('/', getWatchlist);
router.put('/watchlist/update/:id', updateStockPrice);
export default router;





