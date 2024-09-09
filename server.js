import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const server = app.listen(8080, () => console.log("Listening on PORT 8080"));

app.use(express.json()); // Para manejar JSON
app.use(express.urlencoded({ extended: true })); // Para manejar datos en URL

let productos = [];

// Función para validar precio (debe ser un número positivo)
function isValidPrice(price) {
    return !isNaN(price) && price > 0;
}

// Función para validar disponibilidad (debe ser booleano)
function isValidAvailability(availability) {
    return typeof availability === "boolean";
}

// GET /productos : Obtener todos los productos
app.get('/productos', (req, res) => {
    res.json(productos);
});

// GET /productos/:id : Obtener un producto específico por su ID
app.get('/productos/:id', (req, res) => {
    const productoId = req.params.id;
    const producto = productos.find(p => p.id === productoId);

    if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(producto);
});

// POST /productos : Crear un nuevo producto
app.post('/productos', (req, res) => {
    const { nombre, descripcion, precio, disponibilidad } = req.body;

    // Validaciones
    if (!nombre || !descripcion || !isValidPrice(precio) || !isValidAvailability(disponibilidad)) {
        return res.status(400).json({ error: 'Datos inválidos' });
    }

    const nuevoProducto = {
        id: uuidv4(),
        nombre,
        descripcion,
        precio,
        disponibilidad
    };

    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto); // 201 - Created
});

// PUT /productos/:id : Actualizar un producto existente
app.put('/productos/:id', (req, res) => {
    const productoId = req.params.id;
    const { nombre, descripcion, precio, disponibilidad } = req.body;
    const productoIndex = productos.findIndex(p => p.id === productoId);

    if (productoIndex === -1) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Validación
    if (!isValidPrice(precio) || !isValidAvailability(disponibilidad)) {
        return res.status(400).json({ error: 'Datos inválidos' });
    }

    productos[productoIndex] = {
        ...productos[productoIndex],
        nombre,
        descripcion,
        precio,
        disponibilidad
    };

    res.json(productos[productoIndex]);
});

// DELETE /productos/:id : Eliminar un producto
app.delete('/productos/:id', (req, res) => {
    const productoId = req.params.id;
    const productoIndex = productos.findIndex(p => p.id === productoId);

    if (productoIndex === -1) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    productos.splice(productoIndex, 1);
    res.status(204).json({ mensaje: 'Producto eliminado' }); // 204 - No Content
});
