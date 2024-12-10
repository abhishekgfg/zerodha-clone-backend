const express = require('express');
const Stock = require('../models/Stock');
const router = express.Router();

// Add Stock
router.post('/add-stock', async (req, res) => {
    const { name, price, category } = req.body;
    try {
        const newStock = new Stock({ name, price, category });
        await newStock.save();
        res.status(201).json({ message: 'Stock added successfully', stock: newStock });
    } catch (err) {
        res.status(500).json({ message: 'Error adding stock', error: err });
    }
});

// Get All Stocks
router.get('/stocks', async (req, res) => {
    try {
        const stocks = await Stock.find();
        res.status(200).json(stocks);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching stocks', error: err });
    }
});

// Delete Stock
router.delete('/delete-stock/:id', async (req, res) => {
    try {
        await Stock.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Stock deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting stock', error: err });
    }
});

module.exports = router;
