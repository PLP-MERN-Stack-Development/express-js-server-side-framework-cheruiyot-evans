const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { authenticate, validateProduct } = require('../middleware');

// ✅ GET all products (with filtering, pagination)
router.get('/', async (req, res, next) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const query = category ? { category } : {};

    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const count = await Product.countDocuments(query);

    res.json({ total: count, page: Number(page), products });
  } catch (err) {
    next(err);
  }
});

// ✅ GET product by ID
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// ✅ CREATE product
router.post('/', authenticate, validateProduct, async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
});

// ✅ UPDATE product
router.put('/:id', authenticate, validateProduct, async (req, res, next) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// ✅ DELETE product
router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    next(err);
  }
});

// ✅ STATS endpoint
router.get('/stats/count', async (req, res, next) => {
  try {
    const stats = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]);
    res.json(stats);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
