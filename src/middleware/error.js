export const notFound = (req, res, next) => {
  res.status(404).json({ error: "Route not found" });
};

export const errorHandler = (err, req, res, next) => {
  console.error("Error:", {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString(),
    userAgent: req.get('User-Agent')
  });
  
  const status = err.status || err.statusCode || 500;
  let message = err.message;
  
  // Handle specific error types
  if (err.name === 'ValidationError') {
    message = Object.values(err.errors).map(e => e.message).join(', ');
  } else if (err.name === 'CastError') {
    message = 'Invalid ID format';
  } else if (err.code === 11000) {
    message = 'Duplicate entry found';
  } else if (status === 500) {
    message = 'Internal server error';
  }
  
  res.status(status).json({ 
    error: message,
    timestamp: new Date().toISOString(),
    path: req.url
  });
};