const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

// Simulate an async function (replace this with your actual logic)
const someAsyncFunction = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: 'Example data' });
    }, 1000);
  });
};

const getExampleData = catchAsync(async (req, res, next) => {
  const data = await someAsyncFunction();
  if (!data) {
    throw new AppError('Data not found', 404);
  }
  res.status(200).json({ data });
});

module.exports = { getExampleData };