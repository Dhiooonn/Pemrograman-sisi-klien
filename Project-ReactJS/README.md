# PROJECT-REACTJS (Aplikasi Manajemen Mahasiswa)

**PROJECT-REACTJS** adalah sebuah aplikasi dashboard admin yang dibangun dengan React dan Vite. Aplikasi ini dirancang sebagai Sistem Informasi Manajemen Mahasiswa, yang memungkinkan admin untuk mengelola data mahasiswa.

---

✨ Fitur Utama
Berdasarkan struktur folder, aplikasi ini memiliki fitur-fitur berikut:
- **Autentikasi Pengguna**: Terdapat halaman Login dengan layout khusus (AuthLayout.jsx).
- **Rute Terproteksi**: Menggunakan komponen ProtectedRoute.jsx untuk mengamankan halaman-halaman admin.
- **Dashboard Admin**: Halaman utama setelah login (Dashboard.jsx).
- **Manajemen Mahasiswa (CRUD)**:
    - Menampilkan data mahasiswa dalam tabel (TableMahasiswa.jsx).
    - Kemampuan untuk menambah/mengedit data melalui modal (ModalMahasiswa.jsx).
    - Halaman untuk melihat detail mahasiswa (MahasiswaDetail.jsx).
- **Komponen UI Reusable**: Proyek ini memiliki kumpulan komponen kustom yang spesifik untuk halaman admin (seperti Button.jsx, Card.jsx, Sidebar.jsx, Header.jsx, dll).
- **Notifikasi Canggih**: Menggunakan helper untuk notifikasi (kemungkinan SweetAlert dari SwalHelpers.jsx dan Toast dari ToastHelpers.jsx).
- **Penanganan Error**: Halaman 404 kustom (PageNotFound.jsx) untuk rute yang tidak ditemukan.
- **Data Dummy**: Menggunakan data dummy (Dummy.js) untuk keperluan pengembangan.

---

## 🚀 Tech Stack

- Teknologi yang Digunakan
- Framework: React.js
- Build Tool: Vite
- Bahasa: JavaScript (JSX) & Tailwindcss
- Linting: ESLint
- Utilities: SweetAlert2, React Toastify, ReactRouter

---

## 📁 Struktur Proyek

PROJECT-REACTJS/
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── vite.config.js
├── node_modules/
├── public/
└── src/
    ├── App.css
    ├── App.jsx
    ├── main.jsx
    ├── Data/
    │   └── Dummy.js
    ├── Pages/
    │   ├── Admin/
    │   │   ├── Components/     # Komponen khusus Admin
    │   │   │   ├── Button.jsx
    │   │   │   ├── Card.jsx
    │   │   │   ├── Footer.jsx
    │   │   │   ├── Form.jsx
    │   │   │   ├── Header.jsx
    │   │   │   ├── Heading.jsx
    │   │   │   ├── Input.jsx
    │   │   │   ├── Label.jsx
    │   │   │   ├── Link.jsx
    │   │   │   ├── ProtectedRoute.jsx
    │   │   │   └── Sidebar.jsx
    │   │   ├── Dashboard/        # Halaman Dashboard
    │   │   │   └── Dashboard.jsx
    │   │   ├── Mahasiswa/        # Fitur Manajemen Mahasiswa
    │   │   │   ├── Mahasiswa.jsx
    │   │   │   ├── ModalMahasiswa.jsx
    │   │   │   └── TableMahasiswa.jsx
    │   │   ├── MahasiswaDetail/  # Halaman Detail Mahasiswa
    │   │   │   └── MahasiswaDetail.jsx
    │   │   └── AdminLayout.jsx   # Layout utama untuk Admin
    │   ├── Auth/
    │   │   ├── Login/
    │   │   │   └── Login.jsx
    │   │   └── AuthLayout.jsx    # Layout untuk halaman Autentikasi
    │   ├── Error/
    │   │   └── PageNotFound.jsx  # Halaman 404
    │   └── Home.jsx              # Halaman beranda publik
    └── Utils/
        └── Helpers/
            ├── SwalHelpers.jsx
            └── ToastHelpers.jsx

---

## 🧩 Fitur Utama

- Tampilan dashboard dengan navigasi antar halaman.
- Desain responsif berbasis Tailwind CSS.
- Struktur proyek modular dan mudah dikembangkan.
- Routing dinamis menggunakan React Router.

---

## ⚙️ Cara Menjalankan Proyek

1. Clone repository ini:
   ```bash
   git clone https://github.com/username/dashboard-mahasiswa.git

2. Instal dependensi:

    ``npm install``

3. Jalankan server pengembangan: Proyek ini menggunakan Vite, jadi jalankan:

    ``npm run dev``

4. Buka http://localhost:5173 (atau port lain yang ditampilkan di terminal) di browser Anda.
