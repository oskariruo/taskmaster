// routes/index.js
const express = require('express');
const router = express.Router();
const tasksRoute = require('./tasks');

// Use different route files as needed
router.use('/tasks', tasksRoute);

module.exports = router;