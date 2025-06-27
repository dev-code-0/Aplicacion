//scripts/login.js
document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const usuario = document.getElementById('usuario').value;
  const clave = document.getElementById('clave').value;

  window.electronAPI.validarLogin(usuario, clave);
});

window.electronAPI.onLoginCorrecto(() => {
  // OPCIONAL: puedes poner mensaje o animación aquí
  console.log('✅ Login correcto');
});


window.electronAPI.onLoginIncorrecto(() => {
  document.getElementById('mensaje').textContent = 'Usuario o contraseña incorrectos';
});