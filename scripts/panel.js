window.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout-btn");

  if (logoutBtn) {
    const { remote } = require("@electron/remote");
    const path = require("path");

    logoutBtn.addEventListener("click", () => {
      let win = remote.getCurrentWindow();
      win.loadFile(path.join(__dirname, "../views/index.html"));
    });
  }

  // Gráfico de ejemplo
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
