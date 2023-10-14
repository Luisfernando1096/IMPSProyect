const express = require('express');
const router = express.Router();
const queries = require('../repositories/ProfesorRepository');
const formatDate = require('../lib/handlebars');

// Endpoint para mostrar todos los carreras
router.get('/', async (request, response) => {
    const profesores = await queries.obtenerTodosLosProfesores();
     response.render('profesores/listado', {profesores: profesores}); // Mostramos el listado de profesores
});

// Endpoint que permite mostrar el formulario para agregar una nueva carrera
router.get('/agregar', async(request, response) => {
   
    // Renderizamos el formulario
    response.render('profesores/agregar');
});

// Endpoint que permite mostrar el formulario para editar una carrera
router.get('/editar/:idprofesor', async(request, response) => {
    const {idprofesor} = request.params;

    // Aca es de obtener el objeto del carrera
    const profesor = await queries.obtenerProfesorPorID(idprofesor);
    // Formatea la fecha aquí antes de pasarla a la vista
    const fecha_nacimiento = formatDate(profesor.fecha_nacimiento);

    response.render('profesores/editar',{idprofesor, profesor, fecha_nacimiento});
});


// Enpoint que permite realizar la modificacion de una carrera
router.post('/editar/:id', async(request, response) => {
    const { id } = request.params;
    const { idprofesor, nombre, apellido, fch, profesion, genero, email } = request.body;
    const fecha_nacimiento = formatDate(fch); // Formatea la fecha aquí
    const nuevoProfesor = { idprofesor, nombre, apellido, fecha_nacimiento, profesion, genero, email};

    const actualizacion = await queries.editarProfesor(id, nuevoProfesor);

    response.redirect('/profesores');

});

// Endpoint para agregar una carrera
router.post('/agregar', async(request, response) => {
    
    const { idprofesor, nombre, apellido, fch, profesion, genero, email } = request.body;
    const fecha_nacimiento = formatDate(fch); // Formatea la fecha aquí

    const nuevoProfesor = { idprofesor, nombre, apellido, fecha_nacimiento, profesion, genero, email};
    
    // Se trata de una insercion
    const resultado = await queries.insertarProfesor(nuevoProfesor);
    
    response.redirect('/profesores');
});

// Endpoint que permite eliminar una carrera
router.get('/eliminar/:idprofesor', async(request, response) => {
    // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idcarrera
    const { idprofesor } = request.params;
    const resultado = await queries.eliminarProfesor(idprofesor);
    if(resultado > 0){
        console.log('Eliminado con éxito');
    }
    response.redirect('/profesores');
});

module.exports = router;