import mongoose from 'mongoose';

// Define the schema for orders
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    stock: {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true, min: [1, 'Quantity must be at least 1'] },
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Pre-save middleware to calculate total price
orderSchema.pre('save', function (next) {
  this.totalPrice = this.stock.price * this.stock.quantity; // Calculate total cost
  next();
});

// Create a compound index for efficient queries (userId and stock name)
orderSchema.index({ userId: 1, 'stock.name': 1 });

const Order = mongoose.model('Order', orderSchema);

export default Order;
 