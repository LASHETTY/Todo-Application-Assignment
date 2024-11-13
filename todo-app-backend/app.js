// app.js (Backend for Express application)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config/config');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');

// Create an Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());  // Parse incoming JSON data

// API Routes
app.use('/api/auth', authRoutes);  // Authentication routes
app.use('/api/users', userRoutes); // User Profile routes
app.use('/api/todos', todoRoutes); // Todo Management routes

// Connect to MongoDB
mongoose.connect(config.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Start server
const PORT = config.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
