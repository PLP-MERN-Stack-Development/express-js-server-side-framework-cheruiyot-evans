// middleware/auth.js
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = function auth(req, res, next) {
  const key = req.get('x-api-key');
  const expected = process.env.API_KEY || 'secret123';
  if (!key) return next(new UnauthorizedError('Missing API key'));
  if (key !== expected) return next(new UnauthorizedError('Invalid API key'));
  next();
};
