# Quick Start Guide - Portfolio Website v2.0

## 🚀 Start in 3 Steps

### Step 1: Open Terminal

Buka Terminal / Command Prompt di folder portfolio Anda.

### Step 2: Start Local Server

Pilih salah satu command (sesuai yang terinstall di komputer Anda):

```bash
# Option 1: Python (paling umum)
python -m http.server 8000

# Option 2: Python 3
python3 -m http.server 8000

# Option 3: PHP
php -S localhost:8000

# Option 4: Node.js
npx http-server -p 8000
```

### Step 3: Open Browser

Buka browser dan ketik:
```
http://localhost:8000
```

---

## ✅ Cek Apakah Berhasil

Jika berhasil, Anda akan melihat:
- ✅ Website loading dengan cepat
- ✅ Language switching instant (< 1 detik)
- ✅ Particles animation di background
- ✅ Custom cursor (lingkaran yang mengikuti mouse)
- ✅ Console log: "🚀 Portfolio Website v2.0 Loaded Successfully!"

---

## ❌ Troubleshooting

### Problem: "Module not found error"
**Cause**: Tidak menggunakan local server (buka langsung file HTML)  
**Fix**: Gunakan salah satu command di Step 2

### Problem: "Python is not recognized"
**Cause**: Python belum terinstall  
**Fix**: 
1. Install Python dari python.org
2. Atau gunakan PHP / Node.js
3. Atau gunakan VS Code Live Server extension

### Problem: "Port 8000 already in use"
**Fix**: Ganti port-nya
```bash
python -m http.server 8001
# Then open: http://localhost:8001
```

### Problem: Styles tidak muncul
**Fix**: 
1. Buka browser Console (F12)
2. Lihat error merah
3. Pastikan semua file CSS di folder `css/`

### Problem: Language tidak switch
**Fix**:
1. Clear browser cache (Ctrl+Shift+Delete)
2. Atau buka Incognito mode
3. Refresh halaman (Ctrl+F5)

---

## 🎯 Next Steps

### 1. Fill Project Descriptions

Buka file di `data/projects/` dan ganti semua TODO:

**File yang perlu di-edit:**
- `qoin-app.json`
- `qoinpay.json`
- `dokars.json`
- ... dan 13 file lainnya

**Cari:**
```json
"description": {
  "en": "TODO: Add detailed description..."
}
```

**Ganti dengan:**
```json
"description": {
  "en": "Real description about your project here..."
}
```

### 2. Test Everything

- ✅ Click semua navigation links
- ✅ Try language switching (EN/ID/MS)
- ✅ Test portfolio filters (All/Android/iOS/Web)
- ✅ Try contact form
- ✅ Test di mobile (resize browser)

### 3. Deploy ke Server

Upload semua files ke hosting Anda via:
- FTP (FileZilla)
- cPanel File Manager
- Git deployment

**IMPORTANT**: Struktur folder harus sama persis!

---

## 📱 Test di Mobile

### Option 1: Using ngrok (Recommended)
```bash
# Install ngrok first: https://ngrok.com
ngrok http 8000
# Share URL to test on mobile
```

### Option 2: Using local network
1. Find your IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Open `http://YOUR_IP:8000` di mobile browser

---

## 🆘 Need Help?

### Common Questions

**Q: Kenapa harus pakai local server?**  
A: Karena ES6 modules tidak bisa jalan di `file://` protocol. Butuh `http://`.

**Q: Apakah bisa buka langsung file HTML?**  
A: Tidak. Akan error "Module not found". Harus pakai server.

**Q: Apakah ini akan jalan di hosting?**  
A: Yes! Di hosting otomatis pakai http:// jadi tidak masalah.

**Q: Browser apa yang support?**  
A: Chrome, Firefox, Safari, Edge (modern versions). IE tidak support.

---

## 📞 Contact

Jika masih ada masalah:
- Email: patra.purbaya277@gmail.com
- WhatsApp: +62 813 5196 3101

---

## 📚 More Info

- `README.md` - Full documentation
- `TECHNICAL_GUIDE.md` - Technical details
- `CHANGELOG.md` - What changed
- `SUMMARY.md` - Complete overview

---

**Ready?** Start with Step 1! 🚀
