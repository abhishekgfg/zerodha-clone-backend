import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },  // Adding an index on the name field
  price: { type: Number, required: true },
});

// Create compound or other indexes if needed (e.g., for multiple fields)
stockSchema.index({ name: 1, price: -1 }); // Compound index with ascending 'name' and descending 'price'

const Stock = mongoose.model('Stock', stockSchema);

export default Stock;
