const express = require('express');
const { engine } = require('express-handlebars'); 
const productsRoutes = require('./routes/products');
const cartsRoutes = require('./routes/carts');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 


app.engine('handlebars', engine()); 
app.set('view engine', 'handlebars');
app.set('views', './views'); 


app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
