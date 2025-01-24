const express = require('express');
const { imageUpload, multerMiddleware } = require('../controllers/imageUploadController');

const router = express.Router();

router.post('/',  multerMiddleware, imageUpload);

module.exports = router;