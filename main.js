
//main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const db = require('./db/database');

let mainWindow;

function createWindow(file = './views/index.html') {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    minWidth: 700,    // nunca podrá ser más estrecha
    minHeight: 600,   // nunca podrá ser más baja
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
console.log('🔁 Cambiando a panel.html');

  mainWindow.loadFile(file);
  mainWindow.webContents.openDevTools(); // opcional
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.on('validar-login', (event, { usuario, clave }) => {
    db.get(
      'SELECT * FROM usuarios WHERE nombre = ? AND clave = ?',
      [usuario, clave],
      (err, row) => {
        if (err) {
          console.error('Error DB:', err.message);
          return;
        }

        if (row) {
          console.log('🧠 Validando login:', usuario, clave);

          event.sender.send('login-correcto');
          mainWindow.loadFile('./views/panel.html');
        } else {
          event.sender.send('login-incorrecto');
        }
      }
    );
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('cerrar-app', () => {
  app.quit(); // 👈 esto cierra toda la app
});
