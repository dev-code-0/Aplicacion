const db = require('../db/database');
const { remote } = require('electron');
const path = require('path');

document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const usuario = document.getElementById('usuario').value;
  const clave = document.getElementById('clave').value;
  const mensaje = document.getElementById('mensaje');

  db.get(
    'SELECT * FROM usuarios WHERE nombre = ? AND clave = ?',
    [usuario, clave],
    (err, row) => {
      if (err) {
        mensaje.textContent = 'Error en la base de datos';
        console.error(err);
        return;
      }

      if (row) {
        let win = remote.getCurrentWindow();
        win.loadFile(path.join(__dirname, '../views/panel.html'));
      } else {
        mensaje.textContent = 'Usuario o contraseña incorrectos';
      }
    }
  );
});
