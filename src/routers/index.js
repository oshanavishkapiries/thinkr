const express = require('express');
const router = express.Router();

// fuctions
const getServerStatus = require('../utils/helthcheck')

// Routers
const imageRouter = require('./imageRouter');

router.use('/health', getServerStatus)
router.use('/uploads', imageRouter);


module.exports = router;