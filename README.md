# 💒 Wedding Page - Ngô Trung Kiên & Phạm Ngọc Thùy

Một trang web cưới sang trọng với tông màu **Tươi Sáng, Thanh Lịch** (Trắng Kem và Xanh Navy), được xây dựng với React/Next.js và các hiệu ứng GSAP đẹp mắt.

## 🎨 Bảng Màu

| Màu | Hex Code | Sử dụng |
|-----|----------|---------|
| Trắng Kem | `#FAF9F6` | Nền chính |
| Xanh Navy | `#192F4A` | Text/Tiêu đề |
| Xanh Lá Tươi | `#6B8E23` | Điểm nhấn (Accent) |

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **Animations:** GSAP (GreenSock Animation Platform)
- **Language:** TypeScript
- **Fonts:** Playfair Display (Tiêu đề) + Montserrat (Nội dung)

## 📦 Cài Đặt

### Yêu Cầu
- Node.js 18+ 
- Yarn hoặc npm

### Các Bước Cài Đặt

1. **Di chuyển vào thư mục dự án:**
```bash
cd wedding-page
```

2. **Cài đặt dependencies:**
```bash
yarn install
```

Hoặc nếu dùng npm:
```bash
npm install
```

3. **Chạy development server:**
```bash
yarn dev
```

Hoặc:
```bash
npm run dev
```

4. **Mở trình duyệt:**
Truy cập [http://localhost:3000](http://localhost:3000)

## 🏗️ Cấu Trúc Dự Án

```
wedding-page/
├── app/
│   ├── globals.css      # Global styles & Tailwind imports
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Main page
├── components/
│   ├── EnvelopeIntro.tsx   # Hiệu ứng mở phong bì
│   ├── Announcement.tsx    # Section thông báo + Parallax
│   ├── Countdown.tsx       # Đếm ngược với Flip animation
│   ├── Details.tsx         # Chi tiết lễ cưới + Google Maps
│   ├── Family.tsx          # Thông tin gia đình
│   ├── Gallery.tsx         # Gallery ảnh với Lightbox
│   ├── RSVP.tsx           # Form xác nhận tham dự
│   └── Footer.tsx         # Footer
├── public/
│   └── images/            # Ảnh cưới
├── package.json
├── tailwind.config.ts
└── README.md
```

## ✨ Các Tính Năng

### 🎭 Hiệu Ứng GSAP

| Section | Hiệu Ứng |
|---------|----------|
| **Intro** | Mở phong bì 3D với animation mượt mà |
| **Announcement** | Parallax + Fade Out khi cuộn |
| **Countdown** | Digital Flip cho các con số |
| **Details** | Reveal cân xứng từ hai bên |
| **Family** | Slide-Up & Fade tuần tự |
| **Gallery** | Hover Scale + Border Accent |
| **RSVP** | Glowing Shadow Button |

### 📱 Responsive Design
- Tương thích hoàn toàn với mobile, tablet và desktop
- Navigation responsive với menu hamburger cho mobile

### 🗺️ Tích Hợp
- Google Maps embed cho địa điểm tiệc cưới
- Form RSVP với validation
- Lightbox cho gallery ảnh

## 📸 Thêm Ảnh

Đặt ảnh vào thư mục `public/images/`:
- Ảnh 15x21: `public/images/15x21/`
- Ảnh 60x120: `public/images/60x120/`

## 🚀 Build Production

```bash
yarn build
yarn start
```

## 📄 License

Made with ❤️ for Trung Kiên & Ngọc Thùy Wedding - 03.01.2026

