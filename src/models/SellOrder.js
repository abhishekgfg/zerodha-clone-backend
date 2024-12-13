// models/SellOrder.js
import mongoose from 'mongoose';

const sellOrderSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  quantitySold: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  saleDate: {
    type: Date,
    default: Date.now,
  },
});

const SellOrder = mongoose.model('SellOrder', sellOrderSchema);

export default SellOrder;
