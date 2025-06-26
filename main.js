const { app, BrowserWindow } = require('electron');
const path = require('path');
const remoteMain = require('@electron/remote/main');

// Inicializar el módulo remote
remoteMain.initialize();

function createWindow(file = 'views/index.html') {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,          // permite usar require() en los .js de frontend
      contextIsolation: false         // necesario junto con nodeIntegration para que funcione remote
    },
  });

  // Habilitar @electron/remote para esta ventana
  remoteMain.enable(win.webContents);

  // Cargar archivo HTML (por defecto index)
  win.loadFile(file);
  win.webContents.openDevTools(); // ← Abre automáticamente las herramientas

}

// Crear ventana al iniciar
app.whenReady().then(() => {
  createWindow();


  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Cerrar la app completamente cuando todas las ventanas están cerradas (excepto en Mac)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
