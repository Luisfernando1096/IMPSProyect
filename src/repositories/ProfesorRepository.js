const pool = require('../config/databaseController');

module.exports = {

    // Consulta para obtener todos los estudiantes
    obtenerTodosLosProfesores: async() => {
        try {
            const result = await pool.query('SELECT * FROM profesores');
            return result;
        } catch (error) {
            console.error('Ocurrio un problema al consultar la lista de profesores: ', error);
        }
    },

    // Eliminar un estudiante
    eliminarProfesor: async(idprofesor) => {
        try{
          const result = await pool.query('DELETE FROM profesores WHERE idprofesor = ?', [idprofesor]);
          return result.affectedRows > 0;
        }catch(error){
          console.error('Erro al eliminar el registro', error);
        }
    },

    // Insertar un estudiante
     insertarProfesor: async(nuevaProfesor) => {
        try{
          const result = await pool.query("INSERT INTO profesores SET ? ", nuevaProfesor);
          return result.insertId;

        }catch(error){
          console.error('Erro al eliminar el registro', error);
        }
    },

    // Actualizar una Profesor
    actualizarProfesor: async(idprofesor, actualizacion) => {
      try {
        const resultado = await pool.query('UPDATE profesores SET ? WHERE idprofesor = ?', [actualizacion, idprofesor]);
        return resultado.affectedRows > 0;  
      } catch (error) {
        console.log('Error al actualizar profesor', error);
      }
    },
  // Eliminar un estudiante
  obtenerProfesorPorId: async (idprofesor) => {
    try {
      const result = await pool.query('SELECT * FROM profesores WHERE idprofesor = ?', [idprofesor]);
      if (result.length > 0) { // Verificar si se encontraron registros
        return result[0]; // Devolver el primer registro encontrado (asumiendo que solo debería haber uno)
      } else {
        return null; // Devolver null si no se encontraron registros
      }
    } catch (error) {
      console.error('Error al obtener el registro', error);
      throw error; // Puedes lanzar el error para manejarlo en el lugar donde se llama a esta función
    }
  },
  
}
