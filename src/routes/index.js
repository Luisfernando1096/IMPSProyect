//Este archivo se utilizara para configurar las rutas principales
const express = require('express');
const router = express.Router();
const estudianteRepository = require('../repositories/EstudianteRepository');

//Configuracion de ruta inicial
router.get('/', async (request, response) =>{
    //Probando la conexion a la base de datos
    const lstEstudiantes = await estudianteRepository.obtenerTodosLosEstudiantes();
    console.log('Listado', lstEstudiantes);

    response.send('Bienvenido al laboratorio de IMPS');
});

module.exports = router;