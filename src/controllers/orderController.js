import Order from '../models/Order.js';

// Create a new order
const createOrder = async (req, res) => {
  try {
    const orderData = req.body; // Array of orders to be inserted

    // Insert many orders at once
    const orders = await Order.insertMany(orderData);
    res.status(201).json(orders); // Return the created orders
  } catch (error) {
    console.error('Error creating orders:', error);
    res.status(500).json({ message: 'Error creating orders' });
  }
};

// Get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find(); // Retrieve all orders from the database
    res.status(200).json(orders); // Return the list of orders
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

export { createOrder, getOrders }; // Use export for ES Modules
