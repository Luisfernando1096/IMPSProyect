const mysql = require('mysql2');
const{promisify} = require('util');
const{database} = require('./keys');
const{CONSTANTS} = require('../utils/utils');

const pool = mysql.createPool(database);

//Iniciando la conexion
pool.getConnection((error, conexion) => {
    if(error){
        //Validando codigos de error
        switch (error.code) {
            case CONSTANTS.PROTOCOL_CONNECTION_LOST:
                //Cuando se pierde la conexion con la base de datos
                console.error('Se perdio la conexion con la base de datos');
                break;
            case CONSTANTS.ER_CON_COUNT_ERROR:
                //Existen demasiadas conexiones
                console.error('Existen demasiadas conexiones');
                break;
            case CONSTANTS.ECONNREFUSED:
                //La conexion fue rechazada
                console.error('La conexion fue rechazada');
                break;
            case CONSTANTS.ER_ACCESS_DENIED_ERROR:
                //Acceso denegado
                console.error('Acceso denegado');
                break;
            default:
                console.log('Error de base de datos no encontrado');
                break;
        }
    }
    //Si la conexion es exitosa
    if(conexion){
        console.log('Conexion establecida con exito');
        conexion.release();
    }
    return;
});

//Configurando el promisify
pool.query = promisify(pool.query);

module.exports = pool;