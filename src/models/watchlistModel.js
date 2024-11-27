import mongoose from 'mongoose';

// Watchlist schema definition
const watchlistSchema = new mongoose.Schema(
  {
    stockName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    totalValue: {
      type: Number,
    },
  },
  { timestamps: true }
);

// Pre-save middleware to calculate total value before saving
watchlistSchema.pre('save', function (next) {
  this.totalValue = this.price * this.quantity; // Calculate total value
  next(); // Proceed with saving
});

const Watchlist = mongoose.model('Watchlist', watchlistSchema);
export default Watchlist;
