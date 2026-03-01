# Faberlic - Go'zallik Galereya PWA

Zamonaviy, responsive va offline ishlaydigan Progressive Web App (PWA) katalog sayt.

## ✨ Xususiyatlari

- 📱 **Progressive Web App** - O'rnatib, offline foydalanish
- 🌓 **Kun/Tun rejimlari** - Qulay ko'rish uchun
- 📞 **Telefon qo'ng'iroq** - Har bir mahsulot uchun to'g'ridan-to'g'ri buyurtma
- 🎨 **Zamonaviy dizayn** - Chiroyli va professional
- 📱 **To'liq responsive** - Barcha qurilmalarda mukammal ishlaydi
- ⚡ **Tez yuklash** - Optimallashtirilgan va keshlanadi
- 🔄 **Avtomatik scroll** - Sahifaga kirganda yumshoq pastga tushish

## 🚀 GitHub Pages ga joylashtirish

### 1-qadam: Repository yarating

1. GitHub.com da yangi repository yarating
2. Repository nomini kiriting (masalan: `faberlic-catalog`)
3. Public qiling (yoki Private, lekin GitHub Pages uchun Pro kerak bo'ladi)

### 2-qadam: Fayllarni yuklang

Terminalda quyidagi buyruqlarni bajaring:

```bash
# Git repositoriyasini boshlang
git init

# Barcha fayllarni qo'shing
git add .

# Commit qiling
git commit -m "Initial commit - Faberlic PWA website"

# Remote repository qo'shing (USERNAME va REPO_NAME ni o'zingizniki bilan almashtiring)
git remote add origin https://github.com/USERNAME/REPO_NAME.git

# Main branchga push qiling
git branch -M main
git push -u origin main
```

### 3-qadam: GitHub Pages ni yoqing

1. GitHub repository sahifangizga o'ting
2. "Settings" tugmasini bosing
3. Chap tarafdagi menyudan "Pages" ni tanlang
4. "Source" qismida "Deploy from a branch" ni tanlang
5. "Branch" qismida "main" va "/ (root)" ni tanlang
6. "Save" tugmasini bosing

### 4-qadam: Tayyor!

Bir necha daqiqadan so'ng saytingiz tayyor bo'ladi:
```
https://username.github.io/repo-name/
```

## 📝 Sozlashlar

### Telefon raqamini o'zgartirish

`index.html` faylida barcha `tel:+998901234567` qismlarini o'z raqamingiz bilan almashtiring.

### Mahsulotlarni o'zgartirish

`index.html` faylida `.product-card` blokini o'zgartiring yoki yangilarini qo'shing.

### Ranglarni sozlash

`styles.css` faylining boshidagi `:root` va `[data-theme="dark"]` qismlarida ranglarni o'zgartirishingiz mumkin:

```css
:root {
    --accent-primary: #d4a574;  /* Asosiy rang */
    --accent-secondary: #e8c9a5; /* Ikkilamchi rang */
    /* ... */
}
```

### Logo va nomni o'zgartirish

`index.html` va `manifest.json` fayllarida logo va nom ma'lumotlarini o'zgartiring.

## 🎨 Dizayn xususiyatlari

- **Font**: Cormorant Garamond (sarlavhalar) + Poppins (matn)
- **Rang palitra**: Yumshoq, kosmetika uchun mos ranglar
- **Animatsiyalar**: CSS transitions va keyframes
- **Responsive**: Mobile-first yondashuv

## 📱 PWA Xususiyatlari

### Offline ishlash
Service worker orqali sayt offline rejimda ham ishlaydi. Bir marta yuklanganidan keyin, internet bo'lmasa ham ko'rish mumkin.

### O'rnatish
Android qurilmalarda:
1. Chrome, Firefox, Edge yoki boshqa brauzerda oching
2. "O'rnatish" taklifi paydo bo'ladi
3. "O'rnatish" tugmasini bosing
4. Sayt dastur sifatida o'rnatiladi

iOS qurilmalarda:
1. Safari brauzerda oching
2. Share tugmasini bosing
3. "Add to Home Screen" ni tanlang

## 🛠️ Texnologiyalar

- **HTML5** - Semantik markup
- **CSS3** - Zamonaviy styling, CSS Grid, Flexbox
- **JavaScript (ES6+)** - Interaktivlik va PWA funksiyalari
- **Service Worker** - Offline ishlash
- **Web Manifest** - PWA sozlamalari
- **Lazy Loading** - Rasmlarni optimallashtirish

## 📂 Fayl strukturasi

```
├── index.html          # Asosiy HTML fayl
├── styles.css          # Barcha CSS stillari
├── app.js             # JavaScript funksiyalari
├── service-worker.js  # PWA service worker
├── manifest.json      # PWA manifest
├── icon-192.png       # Kichik icon
├── icon-512.png       # Katta icon
└── README.md          # Bu fayl
```

## 🔧 Lokal ishlab chiqish

Lokal kompyuterda test qilish uchun:

```bash
# Python HTTP server (Python 3)
python3 -m http.server 8000

# Node.js http-server (agar o'rnatilgan bo'lsa)
npx http-server

# VS Code Live Server extension ishlatishingiz mumkin
```

Keyin brauzerda `http://localhost:8000` ga o'ting.

## 📸 Screenshot qo'shish

Manifest faylda screenshot ko'rsatilgan. Screenshot olish uchun:

1. Saytni oching va to'liq yuklanishini kuting
2. Brauzerda screenshot oling (540x720 o'lchamda)
3. `screenshot1.png` nomi bilan saqlang
4. Repository ga yuklang

## 🎯 Kelajakda qo'shish mumkin

- [ ] Qidiruv funksiyasi
- [ ] Mahsulot filtrlash
- [ ] Sevimlilar ro'yxati
- [ ] Mahsulot tafsilotlari sahifasi
- [ ] Korzinka (savatcha)
- [ ] Admin panel (mahsulot qo'shish/o'zgartirish)
- [ ] Backend integratsiya
- [ ] To'lov tizimi
- [ ] Telegram bot integratsiya

## 📞 Aloqa

Savollar bo'lsa, GitHub Issues orqali yoki telefon qo'ng'irog'i orqali bog'laning.

## 📄 Litsenziya

Bu loyiha erkin foydalanish uchun.

## 🙏 Minnatdorchilik

- [Unsplash](https://unsplash.com) - Bepul rasmlar
- [Google Fonts](https://fonts.google.com) - Fonts
- Faberlic - Go'zallik mahsulotlari

---

**Eslatma**: Bu demo sayt. Haqiqiy mahsulotlar va narxlar qo'shilgandan keyin to'liq ishga tushadi.