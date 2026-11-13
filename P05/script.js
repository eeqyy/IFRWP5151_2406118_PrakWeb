// File: script.js
document.addEventListener("DOMContentLoaded", () => {
    // 1. Ambil elemen DOM
    const todoForm = document.querySelector("#todoForm");
    const taskInput = document.querySelector("#taskInput");
    const inputError = document.querySelector("#inputError");
    const countError = document.querySelector("#countError");
    const todoList = document.querySelector("#todoList");
    const taskCounter = document.querySelector("#taskCounter");
    const clearCompletedBtn = document.querySelector("#clearCompletedBtn");

    // 2. Fungsi membaca dan menyimpan ke LocalStorage
    const getTasks = () => JSON.parse(localStorage.getItem("todo_tasks")) || [];
    const saveTasks = (tasks) =>
        localStorage.setItem("todo_tasks", JSON.stringify(tasks));

    // 2b. Fungsi update counter
    const updateCounter = () => {
        const tasks = getTasks();
        const total = tasks.length;
        const completed = tasks.filter((task) => task.completed).length;
        const belumSelesai = total - completed;
        if (taskCounter) {
            taskCounter.textContent = `Total: ${total} Tugas | Selesai: ${completed} | Belum Selesai: ${belumSelesai}`;
        }
    };

    // 3. Fungsi menampilkan daftar tugas ke layar
    const renderTasks = () => {
        const tasks = getTasks();
        todoList.innerHTML = "";

        if (tasks.length === 0) {
            todoList.innerHTML =
                "<p style='text-align:center;color:#64748b; font-size:13px; padding:10px;'>Belum ada tugas tersimpan.</p>";
            updateCounter();
            return;
        }

        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.className = `todo-item ${task.completed ? "completed" : ""}`;
            li.innerHTML = `
                <span class="todo-text">${task.text}</span>
                <div class="todo-actions">
                    <button class="action-btn complete-btn" data-index="${index}">
                        ${task.completed ? "Batal" : "Selesai"}
                    </button>
                    <button class="action-btn delete-btn" data-index="${index}">Hapus</button>
                </div>
            `;
            todoList.appendChild(li);
        });

        updateCounter();
    };

    // 4. Tambah tugas saat formulir dikirim
    todoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();

        // Validasi input sederhana
        if (taskText.length < 3) {
            taskInput.classList.add("error");
            if (inputError) inputError.style.display = "block";
            if (countError) countError.style.display = "none";
            return;
        }

        // Jika valid, hilangkan pesan error
        taskInput.classList.remove("error");
        if (inputError) inputError.style.display = "none";

        // Simpan tugas baru ke array LocalStorage
        const tasksCount = getTasks();
        if (tasksCount.length >= 5) {
            taskInput.classList.add("error");
            if (countError) {
                countError.textContent = "Anda sudah mencapai batas maksimum tugas (5 tugas)!";
                countError.style.display = "block";
            }
            if (inputError) inputError.style.display = "none";
            return;
        }

        if (countError) countError.style.display = "none";

        tasksCount.push({ text: taskText, completed: false });
        saveTasks(tasksCount);

        taskInput.value = "";
        renderTasks();
    });

    // 5. Tangani klik tombol Selesai, Hapus menggunakan Event Listener pada todoList
    todoList.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        if (index === undefined) return;

        const tasks = getTasks();
        if (e.target.classList.contains("complete-btn")) {
            tasks[index].completed = !tasks[index].completed;
            saveTasks(tasks);
            renderTasks();

        } else if (e.target.classList.contains("delete-btn")) {
            const konfirmasi = confirm("Apakah Anda yakin ingin menghapus tugas ini?");
            if (!konfirmasi) {
                return;
            }
            tasks.splice(index, 1);
            saveTasks(tasks);
            renderTasks();
        }
    });

    // 6. Bersihkan tugas yang sudah selesai
    if (clearCompletedBtn) {
        clearCompletedBtn.addEventListener("click", () => {
            const tasks = getTasks();
            const hasCompleted = tasks.some((task) => task.completed);
            if (!hasCompleted) {
                alert("Tidak ada tugas yang sudah selesai untuk dibersihkan.");
                return;
            }
            const konfirmasi = confirm("Apakah Anda yakin ingin menghapus semua tugas yang sudah selesai?");
            if (!konfirmasi) {
                return;
            }

            const remainingTasks = tasks.filter((task) => !task.completed);
            saveTasks(remainingTasks);
            renderTasks();
        });
    }

    // Render pertama kali saat halaman selesai dimuat
    renderTasks();
});
