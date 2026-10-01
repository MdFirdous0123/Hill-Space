'use strict';

/**
 * Global error handling middleware.
 * Must be registered LAST in Express middleware chain (4-argument signature).
 *
 * Handles:
 *  - Mongoose CastError (invalid ObjectId)
 *  - Mongoose ValidationError
 *  - Mongoose duplicate key (code 11000)
 *  - JWT errors
 *  - Generic errors with optional statusCode
 */
const errorHandler = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  let error = { ...err };
  error.message = err.message;
  error.statusCode = err.statusCode || 500;

  // Log in development for debugging
  if (process.env.NODE_ENV === 'development') {
    console.error('❌ Error:', {
      name: err.name,
      message: err.message,
      stack: err.stack,
    });
  }

  // ── Mongoose: Bad ObjectId ───────────────────────────────────────────────
  if (err.name === 'CastError') {
    error.message = `Resource not found. Invalid ID: ${err.value}`;
    error.statusCode = 404;
  }

  // ── Mongoose: Validation Error ───────────────────────────────────────────
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    error.message = messages.join('. ');
    error.statusCode = 400;
  }

  // ── Mongoose: Duplicate Key ──────────────────────────────────────────────
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    const value = err.keyValue ? err.keyValue[field] : '';
    error.message = `Duplicate value: '${value}' already exists for field '${field}'.`;
    error.statusCode = 409;
  }

  // ── JWT: Invalid Token ───────────────────────────────────────────────────
  if (err.name === 'JsonWebTokenError') {
    error.message = 'Invalid token. Please log in again.';
    error.statusCode = 401;
  }

  // ── JWT: Expired Token ───────────────────────────────────────────────────
  if (err.name === 'TokenExpiredError') {
    error.message = 'Your session has expired. Please log in again.';
    error.statusCode = 401;
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;
