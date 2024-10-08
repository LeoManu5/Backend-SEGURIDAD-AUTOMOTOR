const express = require('express');
const router = express.Router();

// Ruta para mostrar la vista "home.handlebars"
router.get('/', (req, res) => {
  res.render('home'); // Renderiza home.handlebars
});

// Otras rutas para views...

module.exports = router;
