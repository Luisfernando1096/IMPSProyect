const express = require('express');
const router = express.Router();
const queries = require('../repositories/ProfesorRepository');

// Endpoint para mostrar todos los profesores
router.get('/', async (request, response) => {
    const profesores = await queries.obtenerTodosLosProfesores();

     response.render('profesores/listado', {profesores}); // Mostramos el listado de profesores
});

// Endpoint que permite mostrar el formulario para agregar un nuevo profesor
router.get('/agregar', async(request, response) => {
    // Renderizamos el formulario
    response.render('profesores/agregar');
});

// Endpoint para mostrar el formulario de edición
router.get('/editar/:idprofesor', async (request, response) => {
    try {
        const { idprofesor } = request.params;
        const profesor = await queries.obtenerProfesorPorId(idprofesor);

        if (!profesor) {
            return response.status(404).send('Profesor no encontrado');
        }

        response.render('profesores/editar', { idprofesor, profesor });
    } catch (error) {
        console.error('Error al cargar el formulario de edición', error);
        response.status(500).send('Error interno del servidor');
    }
});

  

// Endpoint para agregar un profesor
router.post('/agregar', async(request, response) => {
    // Falta agregar logica
    const { idprofesor, profesor } = request.body;
    const nuevoProfesor = { idprofesor, profesor };

    const resultado = await queries.insertarProfesor(nuevoProfesor);

    response.redirect('/profesores');
});

// Endpoint que permite eliminar un profesor
router.get('/eliminar/:idprofesor', async(request, response) => {
    // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idprofesor
    const { idprofesor } = request.params;
    const resultado = await queries.eliminarProfesor(idprofesor);
    if(resultado > 0){
        console.log('Eliminado con éxito');
    }
    response.redirect('/profesores');
});

// Enpoint que permite realizar la modificacion de una Profesor
router.post('/editar/:id', async(request, response) => {
  const { id } = request.params;
  const { idprofesor, profesor } = request.body;
  nuevoProfesor = { idprofesor, profesor };

  const actualizacion = await queries.actualizarProfesor(id, nuevoProfesor);

  response.redirect('/profesores');

});

module.exports = router;