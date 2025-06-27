//preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  validarLogin: (usuario, clave) => ipcRenderer.send('validar-login', { usuario, clave }),
  onLoginCorrecto: (callback) => ipcRenderer.on('login-correcto', callback),
  onLoginIncorrecto: (callback) => ipcRenderer.on('login-incorrecto', callback),
  cerrarApp: () => ipcRenderer.send('cerrar-app') // 👈 nuevo
});