const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars'); // Necesario para utilizar el motor de plantillas handlebars
const path = require('path');

//ProbandoIFCOND
const handlebars = require('handlebars');

// Helper personalizado para la comparación
handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
  switch (operator) {
    case '==':
      return v1 == v2 ? options.fn(this) : options.inverse(this);
    case '===':
      return v1 === v2 ? options.fn(this) : options.inverse(this);
    case '!=':
      return v1 != v2 ? options.fn(this) : options.inverse(this);
    case '!==':
      return v1 !== v2 ? options.fn(this) : options.inverse(this);
    case '<':
      return v1 < v2 ? options.fn(this) : options.inverse(this);
    case '<=':
      return v1 <= v2 ? options.fn(this) : options.inverse(this);
    case '>':
      return v1 > v2 ? options.fn(this) : options.inverse(this);
    case '>=':
      return v1 >= v2 ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
});

// Inicializaciones
const app = express();

require('dotenv').config()
// Ajustes del servidor
app.set('port', process.env.PORT || 4500);
app.set('views', path.join(__dirname, 'views')); // Configuracion de la ruta donde se encuentran las vistas

app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main.hbs', // Configuracion del layout principal
    layoutsDir: path.join(app.get('views'), 'layouts'), // Configuracion de la ruta de los layouts extname: '.hbs' // Configura la extensión que tendran los archivos HandleBars
}));

app.set('view engine', '.hbs'); // Configuracion para ejecutar el motor de plantillas

app.use(morgan('dev')); // Configurando el middleware morgan para visualizar que esta llegando al servidor

app.use(express.urlencoded({ extended: false })); // Sirve para poder aceptar datos desde formularios

// Configuracion de rutas
app.use(require('./routes')); // Node automaticamente busca el index.js del modulo

app.use('/estudiantes', require('./routes/estudiantes')); // Configuracion de ruta para estudiantes
// Archivos publicos (aca se coloca todo el código al cual el navegador puede acceder)
app.use('/carreras', require('./routes/carreras')); // Configuracion de ruta para estudiantes
// Archivos publicos (aca se coloca todo el código al cual el navegador puede acceder)
app.use(express.static(path.join(__dirname, 'public')));

// Iniciar el servidor
app.listen(app.get('port'), () => {
    console.log('Servidor iniciado en el puerto: ', app.get('port'));
});
