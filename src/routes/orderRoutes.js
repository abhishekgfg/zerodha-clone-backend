// routes/orderRoutes.js

import express from 'express';
import { createOrder, getOrders } from '../controllers/orderController.js'; // Import controller functions

const router = express.Router(); // Create a new router instance

// Route to create orders
router.post('/', createOrder);

// Route to get all orders
router.get('/', getOrders);

export default router; // Export the router
