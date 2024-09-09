const express = require('express');
const productsRoutes = require('./routes/products');
const cartsRoutes = require('./routes/carts');

const app = require('./app');

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

