import User from '../models/User.js'; // Add the .js extension for ES modules
import Stock from '../models/Stock.js';

// Add stock to watchlist
export const addToWatchlist = async (req, res) => {
  const { stockId } = req.body;
  try {
    const stock = await Stock.findById(stockId);
    const user = await User.findById(req.user.id);

    if (!user.watchlist.includes(stockId)) {
      user.watchlist.push(stockId);
      await user.save();
    }

    res.status(200).json({ message: 'Stock added to watchlist' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buy stock (add to orders)
export const buyStock = async (req, res) => {
  const { stockId } = req.body;
  try {
    const stock = await Stock.findById(stockId);
    const user = await User.findById(req.user.id);

    if (!user.orders.includes(stockId)) {
      user.orders.push(stockId);
      await user.save();
    }

    res.status(200).json({ message: 'Stock purchased' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
