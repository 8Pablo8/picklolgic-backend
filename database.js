const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Crear la conexión a la base de datos SQLite
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite.');
  }
});

// Exportar la base de datos para usarla en otros módulos
module.exports = db;
