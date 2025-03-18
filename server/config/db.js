const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: Successfully connected to MongoDB at ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    console.log('Please make sure:');
    console.log('1. MongoDB is installed on your system');
    console.log('2. MongoDB service is running');
    console.log('3. You can connect to MongoDB using MongoDB Compass or mongo shell');
    process.exit(1);
  }
};

module.exports = connectDB; 