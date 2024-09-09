// app.js
const express = require('express');
const app = express();

// Middlewares
app.use(express.json());

// Rutas
const productsRoutes = require('./routes/products');
const cartsRoutes = require('./routes/carts');

app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);

module.exports = app;
