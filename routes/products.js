const express = require('express');
const { getAllProducts, addProduct } = require('../models/product');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new product
router.post('/', async (req, res) => {
  try {
    const newProduct = await addProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;