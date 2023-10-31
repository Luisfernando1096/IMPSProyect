const express = require('express');
const router = express.Router();
const queries = require('../repositories/CarreraRepository');

// Endpoint para mostrar todos los estudiantes
router.get('/', async (request, response) => {
    const carreras = await queries.obtenerTodasLasCarreras();
    const activarCarrera = "active";

    response.render('carreras/listado', { carreras, activarCarrera }); // Mostramos el listado de estudiantes
});

// Endpoint que permite mostrar el formulario para agregar un nuevo estudiante
router.get('/agregar', async (request, response) => {
    // Renderizamos el formulario
    response.render('carreras/agregar');
});

// Endpoint para mostrar el formulario de edición
router.get('/editar/:idcarrera', async (request, response) => {
    try {
        const { idcarrera } = request.params;
        const carrera = await queries.obtenerCarreraPorId(idcarrera);

        if (!carrera) {
            return response.status(404).send('Carrera no encontrada');
        }

        response.render('carreras/editar', { idcarrera, carrera });
    } catch (error) {
        console.error('Error al cargar el formulario de edición', error);
        response.status(500).send('Error interno del servidor');
    }
});



// Endpoint para agregar un estudiante
router.post('/agregar', async (request, response) => {
    // Falta agregar logica
    const { idcarrera, carrera } = request.body;
    const nuevaCarrera = { idcarrera, carrera };

    const resultado = await queries.insertarCarrera(nuevaCarrera);
    if (resultado) {
        request.flash('success', 'Registro insertado con exito');
    } else {
        request.flash('error', 'Ocurrio un problema al guardar el registro');
    }

    response.redirect('/carreras');
});

// Endpoint que permite eliminar un estudiante
router.get('/eliminar/:idcarrera', async (request, response) => {
    // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idestudiante
    const { idcarrera } = request.params;
    const resultado = await queries.eliminarCarrera(idcarrera);
    if (resultado > 0) {
        request.flash('success', 'Eliminacion correcta');
    } else {
        request.flash('error', 'Error al eliminar');
    }
    response.redirect('/carreras');
});

// Enpoint que permite realizar la modificacion de una carrera
router.post('/editar/:id', async (request, response) => {
    const { id } = request.params;
    const { idcarrera, carrera } = request.body;
    nuevaCarrera = { idcarrera, carrera };

    const actualizacion = await queries.actualizarCarrera(id, nuevaCarrera);

    if (actualizacion) {
        request.flash('success', 'Registro actualizado con exito');
    } else {
        request.flash('error', 'Ocurrio un problema al actualizar el registro');
    }

    response.redirect('/carreras');

});

module.exports = router;