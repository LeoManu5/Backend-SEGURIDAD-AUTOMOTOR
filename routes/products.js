// routes/products.js
const express = require('express');
const router = express.Router();

// Definir las rutas para productos
router.get('/', (req, res) => {
  res.send('List of products');
});

module.exports = router;
