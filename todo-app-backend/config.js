// config/config.js
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Configuration object
module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/todoapp',  // MongoDB connection URI
  JWT_SECRET: process.env.JWT_SECRET || 'your_secret_key',  // JWT Secret key
};
