import express from 'express';
import { createOrder, getOrders,sellOrders,getSoldOrders } from '../controllers/orderController.js'; // Import controller functions


const router = express.Router(); // Create a new router instance

// Route to create orders
router.post('/', createOrder);

// Route to get all orders
router.get('/', getOrders);

// Route to handle selling orders
router.post('/sell', sellOrders);
router.get('/sold', getSoldOrders);
// Make sure to use the correct function

export default router; // Export the router
