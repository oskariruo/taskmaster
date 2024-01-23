// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dbConfig = require('./config/db');
const routes = require('./routes/tasks');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3001;



// Connect to MongoDB Atlas
mongoose.connect(dbConfig.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Use routes
app.use('/tasks', routes); // Using /api as a base route
app.use('/auth', authRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

