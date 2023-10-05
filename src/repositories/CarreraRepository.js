const pool = require('../config/databaseController');

module.exports = {

    // Consulta para obtener todos los estudiantes
    obtenerTodasLasCarreras: async() => {
        try {
            const result = await pool.query('SELECT * FROM carreras');
            return result;
        } catch (error) {
            console.error('Ocurrio un problema al consultar la lista de estudiantes: ', error);
        }
    },

    // Eliminar un estudiante
    eliminarCarrera: async(idCarrera) => {
        try{
          const result = await pool.query('DELETE FROM carreras WHERE idcarrera = ?', [idCarrera]);
          return result.affectedRows > 0;
        }catch(error){
          console.error('Erro al eliminar el registro', error);
        }
    },

    // Insertar un estudiante
     insertarCarrera: async(nuevaCarrera) => {
        try{
          const result = await pool.query("INSERT INTO carrera SET ? ", nuevaCarrera);
          return result.insertId;

        }catch(error){
          console.error('Erro al eliminar el registro', error);
        }
    },

    // Actualizar un estudiante por ID
    actualizarCarrera: async (nuevosDatosCarrera) => {
        try {
        // Debes proporcionar los valores que deseas actualizar en la consulta SQL.
        const result = await pool.query(
          'UPDATE carrera SET nombre = ? WHERE idcarrera = ?',
          [nuevosDatosCarrera.carrera, nuevosDatosCarrera.idcarrera]          
        );
    
        
        return result.affectedRows > 0;
        } catch (error) {
        console.error('Error al actualizar el registro', error);
        // Puedes manejar el error de otra manera si lo deseas, como lanzar una excepción.
        throw error;
        }
  }, 
  // Eliminar un estudiante
  obtenerCarreraPorId: async (idcarrera) => {
    try {
      const result = await pool.query('SELECT * FROM carreras WHERE idcarrera = ?', [idcarrera]);
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
