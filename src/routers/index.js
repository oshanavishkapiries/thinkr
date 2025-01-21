const express = require('express');
const getServerStatus = require('../utils/helthcheck')
const exampleRouter = require('./exampleRouter');


const router = express.Router();

router.use('/health' , getServerStatus)
router.use('/example', exampleRouter);


module.exports = router;