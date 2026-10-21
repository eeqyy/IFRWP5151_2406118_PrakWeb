// File: main.js
// Integrasi logika data (dari data.js) dengan render ke elemen DOM.
// Dijalankan di browser — buka P04/index.html.

/**
 * Hitung ringkasan statistik lalu tampilkan pada kartu ringkasan.
 * @param {Array<Object>} dataList daftar proyek
 */
const updateStats = (dataList) => {
  const totalProjects = dataList.length;
  const totalBudget = dataList.reduce((acc, curr) => acc + curr.budget, 0);
  const completedCount = dataList.filter((item) => item.completed).length;

  document.getElementById("stat-total-projects").textContent = totalProjects;
  document.getElementById("stat-total-budget").textContent =
    formatRupiah(totalBudget);
  document.getElementById("stat-completed-projects").textContent =
    completedCount;
};

/**
 * Render daftar proyek ke dalam #project-list.
 * @param {Array<Object>} filteredList daftar proyek yang sudah difilter
 */
const renderProjects = (filteredList) => {
  const container = document.getElementById("project-list");
  if (!container) return;

  if (filteredList.length === 0) {
    container.innerHTML =
      '<p class="empty-message">Tidak ada proyek pada kategori ini.</p>';
    return;
  }

  container.innerHTML = filteredList
    .map((proj) => {
      const badgeClass = proj.completed ? "badge-success" : "badge-pending";
      const statusText = proj.completed ? "Selesai" : "Dalam Pengerjaan";

      return `
      <article class="project-card">
        <div class="project-info">
          <span class="project-category">${proj.category}</span>
          <h4>${proj.title}</h4>
          <p class="project-budget">${formatRupiah(proj.budget)}</p>
        </div>
        <div>
          <span class="badge ${badgeClass}">${statusText}</span>
        </div>
      </article>
    `;
    })
    .join("");
};

document.addEventListener("DOMContentLoaded", () => {
  renderProjects(projects);
  updateStats(projects);

  const filterButtons = document.querySelectorAll(".btn-filter");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const selectedCategory = btn.getAttribute("data-category");
      const filtered =
        selectedCategory === "Semua"
          ? projects
          : projects.filter((p) => p.category === selectedCategory);

      renderProjects(filtered);
      updateStats(filtered);
    });
  });
});
