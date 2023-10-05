const pool = require('../config/databaseController');

module.exports = {

    // Consulta para obtener todos los estudiantes
    obtenerTodosLosEstudiantes: async() => {
        try {
            const result = await pool.query('SELECT * FROM estudiantes');
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
          return result.insertId;

        }catch(error){
          console.error('Erro al eliminar el registro', error);
        }
    },

    // Actualizar un estudiante por ID
    actualizarEstudiante: async (nuevosDatosEstudiante) => {
        try {
        // Debes proporcionar los valores que deseas actualizar en la consulta SQL.
        const result = await pool.query(
          'UPDATE estudiantes SET nombre = ?, apellido = ?, email = ?, idcarrera = ?, usuario = ? WHERE idEstudiante = ?',
          [nuevosDatosEstudiante.nombre, nuevosDatosEstudiante.apellido, nuevosDatosEstudiante.email, nuevosDatosEstudiante.idcarrera, nuevosDatosEstudiante.usuario, nuevosDatosEstudiante.idestudiante]          
        );
    
        
        return result.affectedRows > 0;
        } catch (error) {
        console.error('Error al actualizar el registro', error);
        // Puedes manejar el error de otra manera si lo deseas, como lanzar una excepción.
        throw error;
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
