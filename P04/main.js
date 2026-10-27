// File: main.js
// Integrasi logika data (dari data.js) dengan render ke elemen DOM.

let currentCategory = "Semua";
let currentSearch = "";

/**
 * Hitung ringkasan statistik lalu tampilkan pada kartu ringkasan.
 */
const updateStats = () => {
  const totalProjects = projects.length;
  const totalBudget = projects.reduce((acc, curr) => acc + curr.budget, 0);
  const completedCount = projects.filter((item) => item.completed).length;

  const elTotal = document.getElementById("stat-total-projects");
  const elBudget = document.getElementById("stat-total-budget");
  const elCompleted = document.getElementById("stat-completed-projects");

  if (elTotal) elTotal.textContent = totalProjects;
  if (elBudget) elBudget.textContent = formatRupiah(totalBudget);
  if (elCompleted) elCompleted.textContent = completedCount;
};

/**
 * Mendapatkan daftar proyek yang sudah difilter berdasarkan kategori dan pencarian
 */
const getFilteredProjects = () => {
  let filtered = projects;

  if (currentCategory !== "Semua") {
    filtered = filtered.filter((p) => p.category === currentCategory);
  }

  if (currentSearch.trim() !== "") {
    const searchLower = currentSearch.toLowerCase();
    filtered = filtered.filter((p) =>
      p.title.toLowerCase().includes(searchLower)
    );
  }

  return filtered;
};

/**
 * Render daftar proyek ke dalam #project-list.
 */
const renderProjects = () => {
  const container = document.getElementById("project-list");
  if (!container) return;

  const filteredList = getFilteredProjects();

  if (filteredList.length === 0) {
    container.innerHTML =
      '<p class="empty-message">Tidak ada proyek yang ditemukan.</p>';
    return;
  }

  container.innerHTML = filteredList
    .map((proj) => {
      const statusClass = proj.completed ? "status-done" : "status-pending";
      const statusText = proj.completed ? "Selesai" : "Dalam Pengerjaan";

      return `
      <div class="project-item" data-id="${proj.id}">
        <div class="project-header">
          <span class="project-title">${proj.title}</span>
          <span class="project-category">${proj.category}</span>
        </div>
        <div class="project-budget">${formatRupiah(proj.budget)}</div>
        <span class="project-status ${statusClass}">${statusText}</span>
        <div class="project-actions">
          <button class="btn-action btn-toggle" data-action="toggle" data-id="${proj.id}">
            Ubah Status
          </button>
          <button class="btn-action btn-delete" data-action="delete" data-id="${proj.id}">
            Hapus Proyek
          </button>
        </div>
      </div>
    `;
    })
    .join("");
};

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  updateStats();

  const filterButtons = document.querySelectorAll(".btn-filter");
  const projectForm = document.getElementById("projectForm");
  const searchInput = document.getElementById("searchInput");
  const projectList = document.getElementById("project-list");

  // Filter kategori
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      currentCategory = btn.getAttribute("data-category");

      renderProjects();
      updateStats();
    });
  });

  // Pencarian real-time
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearch = e.target.value;
      renderProjects();
      updateStats();
    });
  }

  // Form handling & validation
  if (projectForm) {
    projectForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const titleInput = document.getElementById("projectTitle");
      const categorySelect = document.getElementById("projectCategory");
      const budgetInput = document.getElementById("projectBudget");
      const completedCheckbox = document.getElementById("projectCompleted");

      const title = titleInput.value.trim();
      const category = categorySelect.value;
      const budget = Number(budgetInput.value);
      const completed = completedCheckbox.checked;

      // Validasi
      if (title === "") {
        alert("Judul proyek tidak boleh kosong!");
        titleInput.focus();
        return;
      }

      if (category === "") {
        alert("Kategori harus dipilih!");
        categorySelect.focus();
        return;
      }

      if (budgetInput.value === "" || isNaN(budget) || budget <= 0) {
        alert("Anggaran harus lebih besar dari 0!");
        budgetInput.focus();
        return;
      }

      // Buat objek proyek baru
      const newProject = {
        id: Date.now(),
        title: title,
        category: category,
        budget: budget,
        completed: completed,
      };

      // Tambahkan ke array
      projects.push(newProject);

      // Reset form
      projectForm.reset();

      // Render ulang
      renderProjects();
      updateStats();
    });
  }

  // Event delegation untuk tombol aksi
  if (projectList) {
    projectList.addEventListener("click", (e) => {
      const target = e.target;
      if (target.classList.contains("btn-action")) {
        const action = target.getAttribute("data-action");
        const id = Number(target.getAttribute("data-id"));

        if (action === "toggle") {
          const projectIndex = projects.findIndex((p) => p.id === id);
          if (projectIndex !== -1) {
            projects[projectIndex].completed = !projects[projectIndex].completed;
            renderProjects();
            updateStats();
          }
        } else if (action === "delete") {
          const projectIndex = projects.findIndex((p) => p.id === id);
          if (projectIndex !== -1) {
            if (confirm("Apakah Anda yakin ingin menghapus proyek ini?")) {
              projects.splice(projectIndex, 1);
              renderProjects();
              updateStats();
            }
          }
        }
      }
    });
  }
});
