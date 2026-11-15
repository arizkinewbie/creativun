# Creativun Portal — Phiraka Sinergi Indonesia
## The Annual Gathering & Celebration Platform

Website resmi portal multi-tahun perhelatan akbar **Creativun** yang diselenggarakan oleh **Phiraka Sinergi Indonesia** (Tim People & Culture dan Tim Development & Services).

---

### 🌐 Struktur Portal & Live URL

| Edisi | Status | URL Akses | Deskripsi & Lokasi |
| :--- | :--- | :--- | :--- |
| **Creativun 2027** | ⚡ **Coming Soon** | [`https://creativun.nbies.id/`](https://creativun.nbies.id/) | *The Next Wave of Innovation, Creativity & Fun* |
| **Creativun 2026** | 🚀 **Arsip Aktif** | [`https://creativun.nbies.id/2026/`](https://creativun.nbies.id/2026/) | *Bring Back the 80s, Your Way! · Lumé Coffee Tebet* |
| **Creativun 2025** | ✨ **Arsip Aktif** | [`https://creativun.nbies.id/2025/`](https://creativun.nbies.id/2025/) | *More Creative and So Much Fun · Sentul* |

---

### 🌿 Manajemen Repositori & Git

Repositori ini menggunakan strategi **Single Branch (`main`)** berbasis folder tahunan (*folder-based monorepo*) yang bersih dan terpadu:

- **Branch `main` (Single Source of Truth)**:
  - Root (`/index.html`): Halaman utama portal **Creativun 2027 Coming Soon**.
  - Folder [`/2026/`](./2026/): Seluruh website dan aset resmi Creativun 2026.
  - Folder [`/2025/`](./2025/): Seluruh website dan aset resmi Creativun 2025.
- Cukup kelola, push, dan pull pada satu branch `main`. Semua edisi tahunan otomatis aktif di server Nginx tanpa perlu branching terpisah.

---

### 🗂️ Struktur Direktori

```text
creativun/
├── 2025/                                        # Arsip lengkap website Creativun 2025 (Sentul)
│   ├── banner.png, favicon.png, poster.png
│   ├── index.html, script.js, styles.css
│   └── teaser.mp4, teaser.MOV
│
├── 2026/                                        # Arsip lengkap website Creativun 2026 (Lumé Coffee)
│   ├── audio/                                   # Audio background retro (Take On Me, Anak Sekolah)
│   ├── denah.png                                # Denah layout venue Lumé Coffee
│   ├── FAQ CREATIVUN 2GETHER.pdf                # Dokumen FAQ resmi
│   ├── index.html                               # Halaman utama Creativun 2026
│   ├── PerformanceLineUp.mov/.mp4/.png          # Media video & poster line up panggung
│   ├── Phiraka Creativun 2gether 2026...pdf     # Booklet guideline
│   ├── poster.png, favicon.png, team.png        # Grafis identitas & foto panitia
│
├── index.html                                   # Halaman utama portal: Coming Soon Creativun 2027
├── favicon.png                                  # Favicon portal
├── poster.png                                   # Poster default
├── robots.txt                                   # Direktif search engine crawler
├── sitemap.xml                                  # Sitemap XML multi-edisi (2025, 2026, 2027)
├── .gitignore                                   # Konfigurasi file yang diabaikan git
└── README.md                                    # Dokumentasi portal ini
```

---

### 🎯 Pengembangan & Pengujian Lokal

```bash
# Menggunakan Python
python3 -m http.server 8000

# Menggunakan PHP
php -S localhost:8000
```

Buka peramban di `http://localhost:8000` untuk halaman 2027, `http://localhost:8000/2026/` untuk 2026, atau `http://localhost:8000/2025/` untuk 2025.

---

### 📄 Hak Cipta

&copy; 2027 Phiraka Sinergi Indonesia. All rights reserved.
