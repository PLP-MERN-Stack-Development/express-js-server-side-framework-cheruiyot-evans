// middleware/index.js

// ✅ Logger Middleware
const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};

// ✅ Authentication Middleware
const authenticate = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ message: 'Unauthorized - Invalid API Key' });
  }
  next();
};

// ✅ Validation Middleware
const validateProduct = (req, res, next) => {
  const { name, price } = req.body;
  if (!name || price === undefined) {
    return res
      .status(400)
      .json({ message: 'Validation Error: name and price are required' });
  }
  next();
};

module.exports = { logger, authenticate, validateProduct };
