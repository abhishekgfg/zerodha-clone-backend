// models/orderModel.js

import mongoose from 'mongoose';

// Order schema definition
const orderSchema = new mongoose.Schema(
  {
    stockName: {
      type: String,
      required: true,
      trim: true, // Removes any extra spaces before or after the stock name
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price must be a positive number'], // Ensures price is non-negative
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'], // Ensures quantity is positive and not zero
    },
    total: {
      type: Number,
      required: true,
      min: [0, 'Total must be a positive number'], // Ensures total is non-negative
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Pre-save middleware to calculate the total price
orderSchema.pre('save', function (next) {
  this.total = this.price * this.quantity; // Calculate total price (price * quantity)
  next(); // Proceed with saving the document
});

// Create a compound index for efficient queries (userId and stock name)
orderSchema.index({ userId: 1, stockName: 1 });

const Order = mongoose.model('Order', orderSchema);

export default Order;
