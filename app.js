const express = require('express');
const app = express();


app.use(express.json());

const productsRoutes = require('./routes/products');
const cartsRoutes = require('./routes/carts');

app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);

module.exports = app;
