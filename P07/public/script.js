// File: script.js
// Full-Stack CRUD Mahasiswa dengan 3 Fitur Interaktif:
// 1. Kolom Pencarian Real-Time (Search Filter)
// 2. Validasi Pencegahan NIM Duplikat di Frontend
// 3. Indikator Counter Total Mahasiswa

document.addEventListener('DOMContentLoaded', () => {
  // ==================== STATE ====================
  let listMahasiswa = [];      // Data asli dari database
  let filteredMahasiswa = [];  // Data yang sudah difilter (untuk pencarian)
  let isEditing = false;       // Flag mode edit
  let editId = null;           // ID mahasiswa yang sedang diedit

  // ==================== DOM ELEMENTS ====================
  const form = document.getElementById('mahasiswaForm');
  const tableBody = document.getElementById('tableBody');
  const emptyState = document.getElementById('emptyState');
  const searchInput = document.getElementById('searchInput');
  const totalCounter = document.getElementById('totalCounter');
  const statusMessage = document.getElementById('statusMessage');
  const formTitle = document.getElementById('formTitle');
  const btnSubmit = document.getElementById('btnSubmit');
  const btnCancel = document.getElementById('btnCancel');
  const mahasiswaIdInput = document.getElementById('mahasiswaId');
  
  // Form fields
  const nimInput = document.getElementById('nim');
  const namaInput = document.getElementById('nama');
  const jurusanInput = document.getElementById('jurusan');
  const emailInput = document.getElementById('email');

  // ==================== API BASE URL ====================
  const API_BASE = '/api/mahasiswa';

  // ==================== UTILITY FUNCTIONS ====================
  
  // Tampilkan pesan status
  const showStatus = (message, type = 'info') => {
    statusMessage.textContent = message;
    statusMessage.className = `status-message ${type}`;
    statusMessage.style.display = 'block';
    if (type === 'success') {
      setTimeout(() => { statusMessage.style.display = 'none'; }, 3000);
    }
  };

  // Validasi form
  const validateForm = () => {
    let isValid = true;
    
    // Reset error
    document.querySelectorAll('.error-text').forEach(el => el.textContent = '');
    document.querySelectorAll('input, select').forEach(el => el.classList.remove('error'));
    
    // Validasi NIM
    if (!nimInput.value.trim()) {
      document.getElementById('nimError').textContent = 'NIM wajib diisi';
      nimInput.classList.add('error');
      isValid = false;
    }
    
    // Validasi Nama
    if (!namaInput.value.trim()) {
      document.getElementById('namaError').textContent = 'Nama wajib diisi';
      namaInput.classList.add('error');
      isValid = false;
    }
    
    // Validasi Jurusan
    if (!jurusanInput.value) {
      document.getElementById('jurusanError').textContent = 'Jurusan wajib dipilih';
      jurusanInput.classList.add('error');
      isValid = false;
    }
    
    // Validasi Email (optional tapi jika diisi harus valid)
    if (emailInput.value.trim() && !emailInput.value.includes('@')) {
      document.getElementById('emailError').textContent = 'Format email tidak valid';
      emailInput.classList.add('error');
      isValid = false;
    }
    
    return isValid;
  };

  // Reset form
  const resetForm = () => {
    form.reset();
    mahasiswaIdInput.value = '';
    isEditing = false;
    editId = null;
    formTitle.textContent = 'Tambah Mahasiswa Baru';
    btnSubmit.textContent = 'Tambah Mahasiswa';
    btnCancel.style.display = 'none';
    document.querySelectorAll('.error-text').forEach(el => el.textContent = '');
    document.querySelectorAll('input, select').forEach(el => el.classList.remove('error'));
  };

  // Update counter (Fitur 3)
  const updateCounter = () => {
    totalCounter.textContent = `Total Mahasiswa Terdaftar: ${listMahasiswa.length} Orang`;
  };

  // Render tabel dengan data filteredMahasiswa
  const renderTable = () => {
    tableBody.innerHTML = '';
    
    if (filteredMahasiswa.length === 0) {
      emptyState.style.display = 'block';
      return;
    }
    
    emptyState.style.display = 'none';
    
    filteredMahasiswa.forEach((mhs, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${mhs.nim}</td>
        <td>${mhs.nama}</td>
        <td>${mhs.jurusan}</td>
        <td>${mhs.email || '-'}</td>
        <td class="action-buttons">
          <button class="btn-action btn-edit" data-id="${mhs.id}" title="Edit">✏️</button>
          <button class="btn-action btn-delete" data-id="${mhs.id}" title="Hapus">🗑️</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
    
    // Event listeners untuk tombol Edit dan Hapus
    document.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', handleEdit);
    });
    
    document.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', handleDelete);
    });
  };

  // ==================== FITUR 1: PENCARIAN REAL-TIME ====================
  // Event listener 'input' untuk filter tabel secara instan
  searchInput.addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase().trim();
    
    if (keyword === '') {
      // Jika kosong, tampilkan semua data
      filteredMahasiswa = [...listMahasiswa];
    } else {
      // Filter menggunakan listMahasiswa.filter(...)
      filteredMahasiswa = listMahasiswa.filter(mhs => 
        mhs.nim.toLowerCase().includes(keyword) ||
        mhs.nama.toLowerCase().includes(keyword) ||
        mhs.jurusan.toLowerCase().includes(keyword) ||
        (mhs.email && mhs.email.toLowerCase().includes(keyword))
      );
    }
    
    renderTable();
  });

  // ==================== FITUR 2: VALIDASI NIM DUPLIKAT DI FRONTEND ====================
  // Cek NIM duplikat menggunakan .some() sebelum submit
  const checkDuplicateNIM = (nim, excludeId = null) => {
    return listMahasiswa.some(mhs => 
      mhs.nim === nim && (excludeId === null || mhs.id !== excludeId)
    );
  };

  // ==================== API CALLS ====================
  
  // Fetch semua mahasiswa
  const fetchMahasiswa = async () => {
    try {
      showStatus('Memuat data mahasiswa...', 'info');
      const response = await fetch(API_BASE);
      const result = await response.json();
      
      if (result.success) {
        listMahasiswa = result.data;
        filteredMahasiswa = [...listMahasiswa];
        renderTable();
        updateCounter(); // Fitur 3: Update counter
        showStatus(`Berhasil memuat ${listMahasiswa.length} data mahasiswa`, 'success');
      } else {
        showStatus('Gagal memuat data: ' + result.message, 'error');
      }
    } catch (error) {
      console.error('Error fetch:', error);
      showStatus('Error koneksi ke server', 'error');
    }
  };

  // Tambah mahasiswa
  const addMahasiswa = async (data) => {
    try {
      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      
      if (result.success) {
        showStatus(result.message, 'success');
        resetForm();
        await fetchMahasiswa();
      } else {
        showStatus(result.message, 'error');
      }
    } catch (error) {
      console.error('Error add:', error);
      showStatus('Error menambahkan data', 'error');
    }
  };

  // Update mahasiswa
  const updateMahasiswa = async (id, data) => {
    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      
      if (result.success) {
        showStatus(result.message, 'success');
        resetForm();
        await fetchMahasiswa();
      } else {
        showStatus(result.message, 'error');
      }
    } catch (error) {
      console.error('Error update:', error);
      showStatus('Error mengupdate data', 'error');
    }
  };

  // Hapus mahasiswa
  const deleteMahasiswa = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus data mahasiswa ini?')) {
      return;
    }
    
    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE'
      });
      const result = await response.json();
      
      if (result.success) {
        showStatus(result.message, 'success');
        await fetchMahasiswa();
      } else {
        showStatus(result.message, 'error');
      }
    } catch (error) {
      console.error('Error delete:', error);
      showStatus('Error menghapus data', 'error');
    }
  };

  // ==================== EVENT HANDLERS ====================
  
  // Handle form submit (Tambah/Update)
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const nim = nimInput.value.trim();
    const nama = namaInput.value.trim();
    const jurusan = jurusanInput.value;
    const email = emailInput.value.trim();
    
    // FITUR 2: Validasi NIM Duplikat di Frontend menggunakan .some()
    if (checkDuplicateNIM(nim, isEditing ? editId : null)) {
      showStatus('NIM sudah terdaftar!', 'error');
      nimInput.classList.add('error');
      document.getElementById('nimError').textContent = 'NIM sudah terdaftar!';
      return;
    }
    
    const data = { nim, nama, jurusan, email };
    
    if (isEditing) {
      await updateMahasiswa(editId, data);
    } else {
      await addMahasiswa(data);
    }
  });
  
  // Handle Edit
  const handleEdit = (e) => {
    const id = parseInt(e.target.closest('.btn-edit').dataset.id);
    const mhs = listMahasiswa.find(m => m.id === id);
    
    if (!mhs) return;
    
    isEditing = true;
    editId = id;
    
    mahasiswaIdInput.value = id;
    nimInput.value = mhs.nim;
    namaInput.value = mhs.nama;
    jurusanInput.value = mhs.jurusan;
    emailInput.value = mhs.email || '';
    
    formTitle.textContent = 'Edit Data Mahasiswa';
    btnSubmit.textContent = 'Update Mahasiswa';
    btnCancel.style.display = 'inline-block';
    
    // Scroll ke form
    form.scrollIntoView({ behavior: 'smooth' });
    nimInput.focus();
  };
  
  // Handle Delete
  const handleDelete = (e) => {
    const id = parseInt(e.target.closest('.btn-delete').dataset.id);
    deleteMahasiswa(id);
  };
  
  // Handle Cancel Edit
  btnCancel.addEventListener('click', resetForm);
  
  // Real-time clear error on input
  [nimInput, namaInput, jurusanInput, emailInput].forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('error');
      const errorId = input.id + 'Error';
      const errorEl = document.getElementById(errorId);
      if (errorEl) errorEl.textContent = '';
    });
  });

  // ==================== INITIALIZATION ====================
  fetchMahasiswa();
});