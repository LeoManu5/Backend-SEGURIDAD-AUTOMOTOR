const express = require('express');
const productsRoutes = require('./routes/products');
const cartsRoutes = require('./routes/carts');

const app = express();
app.use(express.json());

app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
