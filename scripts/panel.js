//scripts/panel
document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      window.electronAPI.cerrarApp();
    });
  }

  const toggle = document.getElementById('toggle-theme');
toggle.addEventListener('click', () => {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme') || 'light';
  html.setAttribute(
    'data-theme',
    current === 'dark' ? 'light' : 'dark'
  );
});

  // Chart.js
  const canvas = document.getElementById("chart");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Enero", "Febrero", "Marzo", "Abril"],
        datasets: [
          {
            label: "Ventas",
            data: [1200, 900, 1500, 2000],
            backgroundColor: "rgba(0, 123, 255, 0.5)",
          },
          {
            label: "Compras",
            data: [800, 700, 1200, 1500],
            backgroundColor: "rgba(40, 167, 69, 0.5)",
          },
        ],
      },
    });
  }
});