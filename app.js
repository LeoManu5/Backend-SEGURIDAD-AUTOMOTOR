const express = require('express');
const { engine } = require('express-handlebars'); // Importa correctamente
const productsRoutes = require('./routes/products');
const cartsRoutes = require('./routes/carts');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para manejar formularios

// Configura Handlebars
app.engine('handlebars', engine()); // Usa engine() en lugar de exphbs()
app.set('view engine', 'handlebars');
app.set('views', './views'); // Asegúrate de que esta carpeta exista

// Rutas
app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);

// Inicializa el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
