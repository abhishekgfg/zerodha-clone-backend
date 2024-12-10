import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true, // Single field index for quick searches
      trim: true,  // Removes extra spaces
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price must be a non-negative value'], // Ensures price is non-negative
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
  
);

// Create compound index for 'name' (ascending) and 'price' (descending)
stockSchema.index({ name: 1, price: -1 });

const Stock = mongoose.model('Stock', stockSchema);

export default Stock;
