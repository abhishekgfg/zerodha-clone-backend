import 'dotenv/config'; // Load environment variables
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js'; // Importing as an ES module
import authRoutes from './routes/authRoutes.js';
import stockRoutes from './routes/stockRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Use express's built-in JSON parsing middleware

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/orders',orderRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
