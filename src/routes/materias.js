const express = require('express');
const router = express.Router();
const queries = require('../repositories/MateriaRepository');
const profesoresQuery = require('../repositories/ProfesorRepository');

// Endpoint para mostrar todos los materias
router.get('/', async (request, response) => {
    const materias = await queries.obtenerTodasLasMaterias();

     response.render('materias/listado', {materias}); // Mostramos el listado de materias
});

// Endpoint que permite mostrar el formulario para agregar un nuevo materia
router.get('/agregar', async(request, response) => {
    const lstProfesores = await profesoresQuery.obtenerTodosLosProfesores();
    // Renderizamos el formulario
    response.render('materias/agregar', {lstProfesores});
});

// Endpoint para mostrar el formulario de edición
router.get('/editar/:idmateria', async (request, response) => {
  const {idmateria} = request.params; 
  const lstProfesores = await profesoresQuery.obtenerTodosLosProfesores();

  // Aca es de obtener el objeto del materia
  const materia = await queries.obtenerMateriaPorId(idmateria);

  response.render('materias/editar', {lstProfesores, idmateria, materia});
});

  

// Endpoint para agregar un materia
router.post('/agregar', async(request, response) => {
    // Falta agregar logica
    const { idmateria, materia, idprofesor } = request.body;
    const nuevaMateria = { idmateria, materia, idprofesor };

    const resultado = await queries.insertarMateria(nuevaMateria);

    response.redirect('/materias');
});

// Endpoint que permite eliminar un materia
router.get('/eliminar/:idmateria', async(request, response) => {
    // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idmateria
    const { idmateria } = request.params;
    const resultado = await queries.eliminarMateria(idmateria);
    if(resultado > 0){
        console.log('Eliminado con éxito');
    }
    response.redirect('/materias');
});

// Endpoint que permite editar un materia
router.post('/editar/:id', async (request, response) => {
  const {id} = request.params; 
  const {  idmateria, materia, idprofesor } = request.body;
  const nuevaMateria = { idmateria, materia, idprofesor };

  const actualizacion = await queries.actualizarMateria(id, nuevaMateria);

  response.redirect('/materias');
  });

module.exports = router;