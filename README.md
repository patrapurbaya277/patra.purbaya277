# Portfolio Website - Patra Purbaya

## Struktur Proyek yang Diperbarui

### 📁 Struktur Folder

```
Portfolio/
├── index.html                 # HTML utama
├── form-handler.php          # PHP untuk form handling
│
├── css/                      # CSS Modular (BARU)
│   ├── base.css             # Variables, typography, global styles
│   ├── navigation.css       # Navbar & language selector
│   ├── buttons.css          # Button styles
│   ├── home.css             # Home/Hero section
│   ├── portfolio.css        # Portfolio section
│   ├── about.css            # About section (skills tanpa percentage bars)
│   ├── contact.css          # Contact section & forms
│   ├── effects.css          # Visual effects & animations
│   └── footer.css           # Footer & utilities
│
├── js/                       # JavaScript Modular (BARU)
│   ├── main.js              # Main application entry point
│   ├── config.js            # Configuration constants
│   ├── languageManager.js   # Language switching dengan caching
│   ├── uiManager.js         # UI updates & content management
│   ├── effectsManager.js    # Visual effects (particles, cursor, etc.)
│   └── portfolioLoader.js   # Dynamic portfolio loading
│
├── data/                     # Data & Content
│   ├── en.json              # English content
│   ├── id.json              # Indonesian content
│   ├── ms.json              # Malay content
│   └── projects/            # Portfolio Projects (BARU)
│       ├── index.json       # Projects index & categories
│       ├── qoin-app.json
│       ├── qoinpay.json
│       ├── dokars.json
│       ├── obsidian.json
│       ├── satind.json
│       ├── eksism.json
│       ├── daily-santri.json
│       ├── mojarnik.json
│       ├── pikunikku.json
│       ├── filago.json
│       ├── rumah-gsi.json
│       ├── vectrococo.json
│       ├── walk-the-talk.json
│       ├── poledium.json
│       ├── pramuka-kalbar.json
│       └── ultima-digital.json
│
├── images/                   # Image assets
│   ├── profile_photo.JPG
│   ├── about_me_image.JPG
│   └── portfolio/           # Portfolio project images
│       ├── Mobile/
│       └── Web/
│
└── backup/                   # Backup files (OTOMATIS)
    ├── script.js.backup
    └── style.css.backup
```

---

## 🎯 Perubahan Utama

### 1. **Problem Solved: Language Switching Performance**

**Masalah sebelumnya:**
- Setiap ganti bahasa, website di-reinitialize ulang
- Particles, cursor, dan animations dibuat berulang kali
- AOS library di-init berkali-kali
- Loading sangat lambat dan perlu refresh

**Solusi:**
- ✅ **Caching System**: Data bahasa di-cache di memory
- ✅ **Single Initialization**: Effects hanya dibuat sekali
- ✅ **Selective Updates**: Hanya content yang diupdate, bukan visual effects
- ✅ **Smooth Transitions**: Loading indicator cepat dan halus

### 2. **Skills Section - No More Percentage Bars**

**Perubahan:**
- ❌ Dihapus: Progress bars dengan percentage
- ✅ Ditambahkan: Tag-style display (sama seperti soft skills)
- ✅ Lebih clean, fokus pada capabilities, bukan "measuring greatness"

### 3. **Portfolio Projects - Modular Structure**

**Struktur Baru:**
- Setiap project punya file JSON sendiri
- Organized by category (mobile/web)
- Multi-language support built-in
- **TODO placeholders** untuk setiap description

**Format Project File:**
```json
{
  "id": "project-id",
  "category": "mobile",
  "platforms": ["android", "ios"],
  "name": { "en": "...", "id": "...", "ms": "..." },
  "description": {
    "en": "TODO: Add detailed description...",
    "id": "TODO: Tambahkan deskripsi detail...",
    "ms": "TODO: Tambah penerangan terperinci..."
  },
  "shortDescription": { ... },
  "tags": [...],
  "technologies": [...],
  "links": { ... },
  "featured": true/false,
  "order": 1
}
```

### 4. **Modular Code Structure**

**CSS Separation:**
- 9 modular CSS files (base, navigation, buttons, home, portfolio, about, contact, effects, footer)
- Lebih mudah maintain & debug
- Better organization

**JavaScript Separation:**
- 6 modular JS files dengan ES6 modules
- Clear separation of concerns:
  - `config.js`: Constants
  - `languageManager.js`: Language handling
  - `uiManager.js`: Content updates
  - `effectsManager.js`: Visual effects
  - `portfolioLoader.js`: Portfolio loading
  - `main.js`: App orchestration

---

## 🚀 Cara Mengisi TODO Descriptions

### Step 1: Edit Project Files

Buka file project di `data/projects/`, contoh: `qoin-app.json`

### Step 2: Ganti TODO dengan Deskripsi Real

```json
"description": {
  "en": "Qoin App is a comprehensive digital payment and loyalty rewards platform that allows users to make transactions while earning points. Features include: QR code payments, loyalty program integration, transaction history, merchant discovery, and rewards redemption. Built with Flutter for seamless cross-platform experience.",
  "id": "Qoin App adalah platform pembayaran digital dan reward loyalitas komprehensif yang memungkinkan pengguna melakukan transaksi sambil mengumpulkan poin. Fitur meliputi: pembayaran QR code, integrasi program loyalitas, riwayat transaksi, penemuan merchant, dan penukaran reward. Dibangun dengan Flutter untuk pengalaman lintas platform yang mulus.",
  "ms": "Qoin App ialah platform pembayaran digital dan ganjaran kesetiaan komprehensif yang membolehkan pengguna membuat transaksi sambil mengumpul mata. Ciri termasuk: pembayaran kod QR, integrasi program kesetiaan, sejarah transaksi, penemuan pedagang, dan penebusan ganjaran. Dibina dengan Flutter untuk pengalaman merentas platform yang lancar."
}
```

### Step 3: Minta Terjemahan

Setelah mengisi deskripsi dalam satu bahasa, katakan ke AI:
> "Tolong terjemahkan description project [nama-project] ke bahasa Indonesia dan Melayu"

---

## 🔧 Development Notes

### Running Locally

Karena menggunakan ES6 modules, Anda perlu menjalankan dengan local server:

```bash
# Option 1: Python
python -m http.server 8000

# Option 2: PHP
php -S localhost:8000

# Option 3: Node.js (http-server)
npx http-server -p 8000

# Option 4: VS Code Live Server Extension
# Right-click index.html → "Open with Live Server"
```

Kemudian buka: `http://localhost:8000`

### Browser Compatibility

- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ ES6 modules support required
- ✅ Responsive design untuk mobile & tablet

---

## 📝 Maintenance Guide

### Menambah Project Baru

1. Buat file JSON di `data/projects/nama-project.json`
2. Update `data/projects/index.json` (tambahkan ID project)
3. Tambahkan images di `images/portfolio/`

### Menambah Bahasa Baru

1. Buat file `data/xx.json` (xx = language code)
2. Update `languageSelector.options` di file JSON bahasa lain
3. Tidak perlu edit JavaScript!

### Mengubah Visual Styles

- Edit CSS files di folder `css/`
- Setiap section punya file sendiri
- Variables ada di `css/base.css`

---

## ✅ Features Implemented

- ✅ Performance optimized language switching
- ✅ Caching system untuk data bahasa
- ✅ Modular & scalable code structure
- ✅ Portfolio projects dalam file terpisah
- ✅ Skills tanpa percentage bars (tag style)
- ✅ Clean, maintainable CSS
- ✅ ES6 modules JavaScript
- ✅ TODO placeholders untuk descriptions
- ✅ Responsive design
- ✅ Smooth animations & transitions
- ✅ Professional code organization

---

## 📧 Support

Untuk pertanyaan atau bantuan, hubungi:
- Email: patra.purbaya277@gmail.com
- WhatsApp: +62 813 5196 3101

---

**Last Updated**: February 2026  
**Version**: 2.0  
**Status**: Production Ready ✅
