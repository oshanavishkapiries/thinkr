const express = require('express');
const exampleController = require('../controllers/exampleController');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();

router.get('/', catchAsync(exampleController.getExampleData));

module.exports = router;