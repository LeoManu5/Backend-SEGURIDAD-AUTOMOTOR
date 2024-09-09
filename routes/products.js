const express = require('express');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productsController');
const router = express.Router();

// Listar todos los productos
router.get('/', getProducts);

// Obtener producto por ID
router.get('/:pid', getProductById);

// Crear un nuevo producto
router.post('/', createProduct);

// Actualizar producto por ID
router.put('/:pid', updateProduct);

// Eliminar producto por ID
router.delete('/:pid', deleteProduct);

module.exports = router;
