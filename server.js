const express = require('express');
const productsRoutes = require('./routes/products');
const cartsRoutes = require('./routes/carts');

// server.js
const app = require('./app'); // Importar la configuración desde app.js

// Levantar el servidor en el puerto 8080
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
