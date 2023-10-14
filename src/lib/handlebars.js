const helpers = require('handlebars');

// Este helper nos permite comparar 2 valores en la plantilla Handlebars
helpers.registerHelper('eq', function (a, b, options) {
  return a === b ? options.fn(this) : options.inverse(this); // Usamos un if ternario
});

// Helper para formatear una fecha en la plantilla Handlebars
helpers.registerHelper('formatDate', function (date) {
  const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('es-ES', options);
});

module.exports = helpers;
