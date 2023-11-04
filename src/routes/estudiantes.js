const express = require('express');
const router = express.Router();
const queries = require('../repositories/EstudianteRepository');
const carrerasQuery = require('../repositories/CarreraRepository');
const { isLoggedIn } = require('../lib/auth');


// Endpoint para mostrar todos los estudiantes
router.get('/', isLoggedIn, async (request, response) => {
    const estudiantes = await queries.obtenerTodosLosEstudiantes();
    const activarEstudiante = "active";

    response.render('estudiantes/listado', { estudiantes, activarEstudiante }); // Mostramos el listado de estudiantes
});

// Endpoint que permite mostrar el formulario para agregar un nuevo estudiante
router.get('/agregar', isLoggedIn, async (request, response) => {
    const lstCarreras = await carrerasQuery.obtenerTodasLasCarreras();
    // Renderizamos el formulario
    response.render('estudiantes/agregar', { lstCarreras });
});

// Endpoint para mostrar el formulario de edición
router.get('/editar/:idestudiante', isLoggedIn, async (request, response) => {
    const { idestudiante } = request.params;
    const lstCarreras = await carrerasQuery.obtenerTodasLasCarreras();

    // Aca es de obtener el objeto del estudiante
    const estudiante = await queries.obtenerEstudiantePorId(idestudiante);

    response.render('estudiantes/editar', { lstCarreras, idestudiante, estudiante });
});



// Endpoint para agregar un estudiante
router.post('/agregar', isLoggedIn, async (request, response) => {
    // Falta agregar logica
    const { idestudiante, nombre, apellido, email, idcarrera, usuario } = request.body;
    const nuevoEstudiante = { idestudiante, nombre, apellido, email, idcarrera, usuario };

    const resultado = await queries.insertarEstudiante(nuevoEstudiante);
    if (resultado) {
        request.flash('success', 'Registro agregado con exito');
    } else {
        request.flash('error', 'Ocurrio un problema al eliminar el registro');
    }

    response.redirect('/estudiantes');
});

// Endpoint que permite eliminar un estudiante
router.get('/eliminar/:idestudiante', isLoggedIn, async (request, response) => {
    // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idestudiante
    const { idestudiante } = request.params;
    const resultado = await queries.eliminarEstudiante(idestudiante);
    if (resultado) {
        request.flash('success', 'Registro eliminado con exito');
    } else {
        request.flash('error', 'Ocurrio un problema al eliminar el registro');
    }
    response.redirect('/estudiantes');
});

// Endpoint que permite editar un estudiante
router.post('/editar/:id', isLoggedIn, async (request, response) => {
    const { id } = request.params;
    const { idestudiante, nombre, apellido, email, idcarrera, usuario } = request.body;
    const nuevoEstudiante = { idestudiante, nombre, apellido, email, idcarrera, usuario };

    const actualizacion = await queries.actualizarEstudiante(id, nuevoEstudiante);
    if (actualizacion) {
        request.flash('success', 'Registro actualizado con exito');
    } else {
        request.flash('error', 'Ocurrio un problema al actualizar el registro');
    }

    response.redirect('/estudiantes');
});

module.exports = router;