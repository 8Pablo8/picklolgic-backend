const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Ruta del archivo de la base de datos
const dbPath = path.resolve(__dirname, 'database.sqlite');

// Conectar a la base de datos
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message);
    return;
  }
  console.log('Conectado a la base de datos SQLite.');

  // Crear la tabla si no existe
  const sqlCreateTable = `
    CREATE TABLE IF NOT EXISTS campeones (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      foto TEXT NOT NULL
    );
  `;

  db.run(sqlCreateTable, (err) => {
    if (err) {
      console.error('Error al crear la tabla:', err.message);
    } else {
      console.log('Tabla "campeones" creada exitosamente.');
    }
  });
});

// Cerrar la conexión a la base de datos
db.close((err) => {
  if (err) {
    console.error('Error al cerrar la conexión:', err.message);
  } else {
    console.log('Conexión a la base de datos cerrada.');
  }
});
