import Watchlist from '../models/watchlistModel.js';

// Add stocks to the watchlist
const addStockToWatchlist = async (req, res) => {
    try {
      const stocks = req.body; // Expecting an array of stock objects
  
      // Validate that the array is not empty
      if (!Array.isArray(stocks) || stocks.length === 0) {
        return res.status(400).json({ message: 'No stocks provided.' });
      }
  
      // Loop through each stock and save to the database
      const savedStocks = [];
      for (const stock of stocks) {
        const { stockName, price, quantity } = stock;
  
        if (!stockName || !price || !quantity) {
          return res.status(400).json({ message: 'Missing required fields.' });
        }
  
        const newStock = new Watchlist({
          stockName,
          price,
          quantity,
        });
  
        // Calculate totalValue before saving
        newStock.totalValue = newStock.price * newStock.quantity;
        const savedStock = await newStock.save();
        savedStocks.push(savedStock);
      }
  
      res.status(201).json(savedStocks);
    } catch (error) {
      console.error('Error adding stock to watchlist:', error);
      res.status(500).json({ message: 'Error adding stock to watchlist' });
    }
  };
  

// Get all stocks in the watchlist
const getWatchlist = async (req, res) => {
  try {
    const watchlist = await Watchlist.find();
    res.status(200).json(watchlist);
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    res.status(500).json({ message: 'Error fetching watchlist' });
  }
};

export { addStockToWatchlist, getWatchlist };
