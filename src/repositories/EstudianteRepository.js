const pool = require('../config/databaseController');

module.exports = {

    // Consulta para obtener todos los estudiantes
    obtenerTodosLosEstudiantes: async() => {
        try {
            const result = await pool.query('SELECT idestudiante, nombre, apellido, email, c.idCarrera, c.carrera, usuario FROM estudiantes e, carreras c WHERE e.idcarrera = c.idcarrera');
            return result;
        } catch (error) {
            console.error('Ocurrio un problema al consultar la lista de estudiantes: ', error);
        }
    },

    // Eliminar un estudiante
    eliminarEstudiante: async(idestudiante) => {
        try{
          const result = await pool.query('DELETE FROM estudiantes WHERE idestudiante = ?', [idestudiante]);
          return result.affectedRows > 0;
        }catch(error){
          console.error('Erro al eliminar el registro', error);
        }
    },

    // Insertar un estudiante
     insertarEstudiante: async(nuevoEstudiante) => {
        try{
          const result = await pool.query("INSERT INTO estudiantes SET ? ", nuevoEstudiante);
          return result.affectedRows > 0;

        }catch(error){
          console.error('Erro al eliminar el registro', error);
        }
    },

    // Actualizar un estudiante
    actualizarEstudiante: async(idestudiante, actualizacion) => {
      try {
        const resultado = await pool.query('UPDATE estudiantes SET ? WHERE idestudiante = ?', [actualizacion, idestudiante]);
        return resultado.affectedRows > 0;  
      } catch (error) {
        console.log('Error al actualizar estudiante', error);
      }
    },
  // Eliminar un estudiante
  obtenerEstudiantePorId: async (idestudiante) => {
    try {
      const result = await pool.query('SELECT * FROM estudiantes WHERE idestudiante = ?', [idestudiante]);
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
