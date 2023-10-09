const pool = require('../config/databaseController');

module.exports = {

    // Consulta para obtener todos los materias
    obtenerTodasLasMaterias: async() => {
        try {
            const result = await pool.query('SELECT * FROM materias');
            return result;
        } catch (error) {
            console.error('Ocurrio un problema al consultar la lista de materias: ', error);
        }
    },

    // Eliminar un Materia
    eliminarMateria: async(idmateria) => {
        try{
          const result = await pool.query('DELETE FROM materias WHERE idmateria = ?', [idmateria]);
          return result.affectedRows > 0;
        }catch(error){
          console.error('Erro al eliminar el registro', error);
        }
    },

    // Insertar un Materia
     insertarMateria: async(nuevaMateria) => {
        try{
          const result = await pool.query("INSERT INTO materias SET ? ", nuevaMateria);
          return result.insertId;

        }catch(error){
          console.error('Erro al eliminar el registro', error);
        }
    },

    // Actualizar un Materia
    actualizarMateria: async(idmateria, actualizacion) => {
      try {
        const resultado = await pool.query('UPDATE materias SET ? WHERE idmateria = ?', [actualizacion, idmateria]);
        return resultado.affectedRows > 0;  
      } catch (error) {
        console.log('Error al actualizar Materia', error);
      }
    },
  // Eliminar un Materia
  obtenerMateriaPorId: async (idmateria) => {
    try {
      const result = await pool.query('SELECT * FROM materias WHERE idmateria = ?', [idmateria]);
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
