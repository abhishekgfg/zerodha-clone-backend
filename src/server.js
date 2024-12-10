// import 'dotenv/config'; // Load environment variables
// import express from 'express';
// import cors from 'cors';
// import connectDB from './config/db.js'; // Importing as an ES module
// import authRoutes from './routes/authRoutes.js';
// import stockRoutes from './routes/stockRoutes.js';
// import orderRoutes from './routes/orderRoutes.js';
// import watchRoutes from './routes/watchlistRoutes.js'
// const app = express();


// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(cors());
// app.use(express.json()); // Use express's built-in JSON parsing middleware

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/stocks', stockRoutes);
// app.use('/api/orders',orderRoutes);
// app.use('/api/watchlist',watchRoutes);

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


import 'dotenv/config'; // Load environment variables
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// Import routes
import authRoutes from './routes/authRoutes.js';
import stockRoutes from './routes/stockRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import watchlistRoutes from './routes/watchlistRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/yourDBName';
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('MongoDB connection error:', error));

// API Routes
app.use('/api/auth', authRoutes);       // Authentication routes
app.use('/api/stocks', stockRoutes);   // Stock management routes
app.use('/api/orders', orderRoutes);   // Order management routes
app.use('/api/watchlist', watchlistRoutes); // Watchlist routes

// Default error handling for undefined routes
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

