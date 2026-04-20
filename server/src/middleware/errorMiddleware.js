import ApiResponse from '../utils/ApiResponse.js';

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.code === 11000) {
    statusCode = 400;
    message = 'Duplicate field value entered';
  }
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map(val => val.message).join(', ');
  }
  if (err.name === 'CastError') {
    statusCode = 404;
    message = 'Resource not found';
  }

  ApiResponse.error(res, message, process.env.NODE_ENV === 'development' ? err.stack : null, statusCode);
};

export { notFound, errorHandler };