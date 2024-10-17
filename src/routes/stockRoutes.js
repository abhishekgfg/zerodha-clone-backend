import express from 'express';
const router = express.Router();

// Example route for getting stocks
router.get('/', (req, res) => {
  // Your logic to get stocks
  res.json({ message: 'Stock data' });
});

// Example route for adding stocks
router.post('/add', (req, res) => {
  // Your logic to add a stock
  res.json({ message: 'Stock added' });
});

export default router;
