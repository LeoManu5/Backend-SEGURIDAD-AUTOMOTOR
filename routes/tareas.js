const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { isValidDate } = require('../../utils/validate');

let tareas = [];

router.get('/', (req, res) => {
    res.json(tareas);
});

router.get('/:id', (req, res) => {
    const tarea = tareas.find(tarea => tarea.id === req.params.id);
    if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json(tarea);
});

router.post('/', (req, res) => {
    const { titulo, descripcion, fechaVencimiento, categoria, prioridad } = req.body;

    if (!titulo || !descripcion || !fechaVencimiento || !isValidDate(fechaVencimiento) || !categoria || !prioridad) {
        return res.status(400).json({ error: 'Datos inválidos' });
    }

    const nuevaTarea = {
        id: uuidv4(),
        titulo,
        descripcion,
        fechaVencimiento,
        categoria,
        prioridad
    };

    tareas.push(nuevaTarea);
    res.status(201).json(nuevaTarea);
});

router.put('/:id', (req, res) => {
    const tareaIndex = tareas.findIndex(tarea => tarea.id === req.params.id);
    if (tareaIndex === -1) return res.status(404).json({ error: 'Tarea no encontrada' });

    const { titulo, descripcion, fechaVencimiento, categoria, prioridad } = req.body;

    if (fechaVencimiento && !isValidDate(fechaVencimiento)) {
        return res.status(400).json({ error: 'Fecha de vencimiento inválida' });
    }

    tareas[tareaIndex] = {
        ...tareas[tareaIndex],
        titulo,
        descripcion,
        fechaVencimiento,
        categoria,
        prioridad
    };

    res.json(tareas[tareaIndex]);
});

router.delete('/:id', (req, res) => {
    const tareaIndex = tareas.findIndex(tarea => tarea.id === req.params.id);
    if (tareaIndex === -1) return res.status(404).json({ error: 'Tarea no encontrada' });

    tareas.splice(tareaIndex, 1);
    res.status(204).json({ mensaje: 'Tarea eliminada' });
});

module.exports = router;
