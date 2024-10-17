import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Ensure you have dotenv configured if you're using environment variables.
    const MONGO_URI = process.env.MONGO_URI; // Use environment variable for MongoDB URI
    if (!MONGO_URI) {
      throw new Error('Mongo URI is undefined. Please check your .env file.');
    }
    
    // Mongoose connection options can be provided here if needed
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,       // Use the new MongoDB connection string parser
      useUnifiedTopology: true,    // Use the new Server Discover and Monitoring engine
    });

    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the application if connection fails
  }
};

export default connectDB;
