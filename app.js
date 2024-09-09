// app.js
const express = require('express');
const productsRoutes = require('./routes/products');
const cartsRoutes = require('./routes/carts');

const app = express();
app.use(express.json());

// Configurar las rutas
app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);

module.exports = app; // Exportar la app para usarla en server.js
