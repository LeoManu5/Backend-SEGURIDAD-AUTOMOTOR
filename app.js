const express = require('express');
const { create } = require('express-handlebars');
const path = require('path');

const app = express();
const hbs = create({
  extname: '.handlebars',
});

app.engine('.handlebars', hbs.engine);
app.set('view engine', '.handlebars');
app.set('views', path.join(__dirname, 'views'));


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


const productsRoutes = require('./routes/products');
const cartRoutes = require('./routes/carts');
const viewsRoutes = require('./routes/views'); 

app.use('/api/products', productsRoutes);
app.use('/api/carts', cartRoutes);
app.use('/', viewsRoutes); 

module.exports = app;
