// middleware/validateProduct.js
const ValidationError = require('../errors/ValidationError');

function validateProductCreate(req, res, next) {
  const { name, description, price, category, inStock } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string') errors.push('name (string) required');
  if (!description || typeof description !== 'string')
    errors.push('description (string) required');
  if (price === undefined || typeof price !== 'number')
    errors.push('price (number) required');
  if (!category || typeof category !== 'string')
    errors.push('category (string) required');
  if (inStock === undefined || typeof inStock !== 'boolean')
    errors.push('inStock (boolean) required');

  if (errors.length)
    return next(new ValidationError('Invalid product data', errors));
  next();
}

function validateProductUpdate(req, res, next) {
  const { name, description, price, category, inStock } = req.body;
  const errors = [];

  if (name !== undefined && typeof name !== 'string')
    errors.push('name must be string');
  if (description !== undefined && typeof description !== 'string')
    errors.push('description must be string');
  if (price !== undefined && typeof price !== 'number')
    errors.push('price must be number');
  if (category !== undefined && typeof category !== 'string')
    errors.push('category must be string');
  if (inStock !== undefined && typeof inStock !== 'boolean')
    errors.push('inStock must be boolean');

  if (errors.length)
    return next(new ValidationError('Invalid update data', errors));
  next();
}

module.exports = { validateProductCreate, validateProductUpdate };
