require('dotenv').config();
// src/app.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// imports
const errorHandler = require('./utils/errorHandler');
const AppError = require('./utils/AppError')
const router = require('./routers');

// Middleware
app.use(express.json());

// Routes
app.use('/api', router);

// 404 Route Handler
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error Handling Middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});