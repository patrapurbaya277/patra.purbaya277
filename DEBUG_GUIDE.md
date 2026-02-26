# Debug Guide - Modal Not Working

## 🔍 Debug Steps:

### 1. **Buka Browser Console**
- Tekan `F12` atau `Cmd+Option+I` (Mac)
- Pergi ke tab "Console"

### 2. **Check Logs Saat Page Load**
Seharusnya muncul:
```
Setting up modal event listeners
Modal event listeners setup complete
```

### 3. **Check Logs Saat Klik Button**
Klik tombol "View Details", seharusnya muncul:
```
View details button clicked
Project ID: qoin-app (atau project id lainnya)
Loading project: qoin-app
Project loaded: {object dengan data project}
Modal created successfully
```

### 4. **Possible Issues & Solutions:**

#### Issue A: "Modal events already bound" muncul terus
**Penyebab**: Event listener sudah di-bind sebelumnya
**Solusi**: Refresh page (hard refresh: Cmd+Shift+R atau Ctrl+Shift+R)

#### Issue B: "View details button clicked" tidak muncul
**Penyebab**: Button tidak memiliki class `.view-detail-btn`
**Solusi**: Check HTML generated di Inspector
- Look for: `<button class="portfolio-link view-detail-btn" data-project-id="...">`
- If missing `view-detail-btn` class → uiManager.js issue

#### Issue C: "Project ID: undefined"
**Penyebab**: Button tidak memiliki `data-project-id` attribute
**Solusi**: Check uiManager.js line ~295-305

#### Issue D: "Project not found"
**Penyebab**: portfolioLoader tidak bisa load project file
**Solusi**: Check network tab untuk 404 errors

#### Issue E: "Error showing project modal"
**Penyebab**: Error dalam rendering modal
**Solusi**: Check full error message di console

---

## 🛠️ Quick Fixes:

### Fix 1: Hard Refresh
```
Windows: Ctrl + Shift + R
Mac: Cmd + Shift + R
```

### Fix 2: Clear Cache & Reload
```
Chrome: Cmd+Option+I → Network tab → Disable cache checkbox
Then refresh
```

### Fix 3: Check Button HTML
In console, run:
```javascript
document.querySelector('.view-detail-btn')
```
Should return button element with `data-project-id`

### Fix 4: Manual Test
In console, run:
```javascript
app.showProjectModal('qoin-app')
```
Should open modal

---

## 📋 Checklist:

- [ ] Console shows "Setting up modal event listeners"
- [ ] Console shows "Modal event listeners setup complete"  
- [ ] Button has class `view-detail-btn`
- [ ] Button has `data-project-id="project-id-here"`
- [ ] Click shows "View details button clicked"
- [ ] Click shows "Project ID: xxx"
- [ ] Click shows "Loading project: xxx"
- [ ] Click shows "Project loaded: {..."
- [ ] Click shows "Modal created successfully"
- [ ] Modal appears on screen

---

**Jika semua checklist ✅, modal seharusnya berfungsi dengan sempurna!**
