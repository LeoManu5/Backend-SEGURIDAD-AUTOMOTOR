const express = require('express');
const app = express();
const PORT = 8080;

// Middleware para manejar JSON
app.use(express.json());

// Rutas
const tareaRoutes = require('./routes/tareas');
app.use('/api/tareas', tareaRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
