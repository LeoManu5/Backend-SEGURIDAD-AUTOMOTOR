const express = require('express');
const { createCart, getCartById, addProductToCart } = require('../controllers/cartsController');
const router = express.Router();

// Crear un nuevo carrito
router.post('/', createCart);

// Obtener carrito por ID
router.get('/:cid', getCartById);

// Agregar producto a carrito por ID
router.post('/:cid/product/:pid', addProductToCart);

module.exports = router;
