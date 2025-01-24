const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const multer = require('multer');
const crypto = require('crypto'); 

const upload = multer();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imageUpload = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError('No file uploaded', 400));
  }

  const uniqueId = crypto.randomUUID();
  const customFilename = `thinkr-${uniqueId}`;

  const stream = streamifier.createReadStream(req.file.buffer);
  const options = {
    folder: 'thinkr',
    public_id: customFilename, 
    use_filename: true,
    unique_filename: false,
    overwrite: true, 
  };

  const uploadResult = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
    stream.pipe(uploadStream);
  });

  res.status(200).json({ url: uploadResult.secure_url });
});

const multerMiddleware = upload.single('image');

module.exports = { imageUpload, multerMiddleware };
