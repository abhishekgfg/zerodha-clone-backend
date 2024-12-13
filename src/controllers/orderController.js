import Order from '../models/Order.js';
import SellOrder from '../models/SellOrder.js';
// Create a new order
export const createOrder = async (req, res) => {
  try {
    const orderData = req.body; // Array of orders to be inserted
    const orders = await Order.insertMany(orderData); // Insert many orders at once
    res.status(201).json(orders); // Return the created orders
  } catch (error) {
    console.error('Error creating orders:', error);
    res.status(500).json({ message: 'Error creating orders' });
  }
};

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find(); // Retrieve all orders from the database
    res.status(200).json(orders); // Return the list of orders
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

// Sell orders

export const sellOrders = async (req, res) => {
  const { ordersToSell } = req.body;

  try {
    const sellRecords = []; // To hold the successful sell order records

    // Loop through each order to be sold
    for (const order of ordersToSell) {
      const { orderId, quantitySold } = order;

      // Find the order by ID
      const updatedOrder = await Order.findById(orderId);

      // If the order exists and there is enough stock
      if (updatedOrder) {
        if (updatedOrder.quantity >= quantitySold) {
          // Calculate the total price for the sold quantity
          const totalPrice = updatedOrder.price * quantitySold;

          // Create a new SellOrder record
          const sellOrder = new SellOrder({
            orderId: updatedOrder._id,
            quantitySold,
            totalPrice,
          });

          // Save the SellOrder
          await sellOrder.save();

          // Update the order's quantity in stock
          updatedOrder.quantity -= quantitySold;
          updatedOrder.total = updatedOrder.price * updatedOrder.quantity; // Update the total value of the remaining stock
          await updatedOrder.save();

          // Store the sell record for response
          sellRecords.push(sellOrder);
        } else {
          // Return an error if there isn't enough stock for a particular item
          return res.status(400).json({ error: `Insufficient stock for order ID ${orderId}` });
        }
      } else {
        // Return an error if the order was not found
        return res.status(404).json({ error: `Order ID ${orderId} not found` });
      }
    }

    // Return the list of sell orders that were successfully recorded
    res.status(200).json({ message: 'Sell operation successful', soldOrders: sellRecords });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error selling orders' });
  }
};

export const getSoldOrders = async (req, res) => {
  try {
    const soldOrders = await SellOrder.find().populate('orderId', 'stockName price quantity');
    res.status(200).json({ soldOrders });  // Return an object with the 'soldOrders' key
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching sold orders.' });
  }
};

