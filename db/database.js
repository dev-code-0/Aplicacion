//db/database.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', 'zertic.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error al conectar con SQLite:', err.message);
  } else {
    console.log('✅ Conectado a la base de datos SQLite');
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      clave TEXT NOT NULL
    )
  `);

  db.get(`SELECT * FROM usuarios WHERE nombre = 'admin'`, (err, row) => {
    if (!row) {
      db.run(`INSERT INTO usuarios (nombre, clave) VALUES (?, ?)`, ['admin', '1234']);
      console.log('🟢 Usuario admin creado');
    }
  });

   // 👉 NUEVA tabla de compras:
  // db.run(`
  //   CREATE TABLE IF NOT EXISTS compras (
  //     id INTEGER PRIMARY KEY AUTOINCREMENT,
  //     fecha TEXT,
  //     producto TEXT,
  //     cantidad INTEGER,
  //     precio REAL,
  //     descripcion TEXT
  //   )
  // `);
});

module.exports = db;
