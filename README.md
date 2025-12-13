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
- **Animations:** 
  - GSAP (GreenSock Animation Platform) với ScrollTrigger
  - Framer Motion cho UI animations
  - @tsparticles/react cho particles background
  - react-confetti cho confetti effects
- **Language:** TypeScript
- **Fonts:** 
  - Playfair Display (Tiêu đề)
  - Montserrat (Nội dung)
  - Script font (Tiêu đề đặc biệt)

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
│   ├── EnvelopeIntro.tsx      # Hiệu ứng mở phong bì 3D
│   ├── Announcement.tsx       # Section thông báo + Parallax
│   ├── Countdown.tsx          # Đếm ngược với Flip animation + Calendar
│   ├── Details.tsx            # Chi tiết lễ cưới + Google Maps
│   ├── Family.tsx             # Thông tin gia đình + Thư mời
│   ├── Quotes.tsx             # Lời chúc
│   ├── Gallery.tsx            # Gallery ảnh với Lightbox
│   ├── RSVP.tsx               # Form xác nhận tham dự + Confetti
│   ├── Footer.tsx             # Footer
│   ├── ParticlesBackground.tsx # Particles background animation
│   ├── FloatingDecorations.tsx # Floating hearts, sparkles, flowers
│   └── Sparkles.tsx           # Sparkles component
├── public/
│   └── images/            # Ảnh cưới
├── package.json
├── tailwind.config.ts
└── README.md
```

## ✨ Các Tính Năng

### 🎭 Hiệu Ứng & Tính Năng

| Section | Hiệu Ứng & Tính Năng |
|---------|---------------------|
| **Intro** | Mở phong bì 3D với animation mượt mà, floating hearts |
| **Announcement** | Parallax + Fade Out khi cuộn, floating hearts & sparkles |
| **Countdown** | Digital Flip cho các con số, **Calendar với trái tim đập đập** |
| **Details** | Reveal cân xứng từ hai bên, decorative elements |
| **Family** | Slide-Up & Fade tuần tự, avatar animations, thư mời |
| **Quotes** | Lời chúc với sparkles background |
| **Gallery** | Hover Scale + Border Accent, Lightbox slider, lazy loading |
| **RSVP** | Glowing Shadow Button, **Confetti effect** khi submit |
| **Background** | Particles animation, floating decorations (hearts, sparkles, flowers) |

### 📱 Responsive Design
- Tương thích hoàn toàn với mobile, tablet và desktop
- Optimized layout cho mobile với spacing và font size phù hợp
- Calendar responsive với flex-nowrap để tránh wrap trên mobile

### 🗺️ Tích Hợp
- Google Maps embed cho địa điểm tiệc cưới
- Form RSVP với validation và confetti celebration
- Lightbox cho gallery ảnh với keyboard navigation
- Image optimization với Next.js Image component (AVIF, WebP)

### ⚡ Performance Optimization
- **Image Optimization:** Next.js Image với AVIF/WebP formats
- **Lazy Loading:** Gallery images chỉ load khi section visible
- **Preload:** Chỉ preload ảnh quan trọng (thư mời)
- **Stagger Loading:** Gallery images load tuần tự để tránh lag
- **Quality Control:** Optimized quality settings cho từng loại ảnh

## 📸 Thêm Ảnh

Đặt ảnh vào thư mục `public/images/`:
- Ảnh 15x21 (Gallery): `public/images/15x21/` - Tên file: `DSC*.jpg`
- Ảnh 60x120 (Thư mời): `public/images/60x120/` - Tên file: `c1.jpg`, `c2.jpg`
- Avatar: `public/images/avatar/` - `cr.jpg` (chú rể), `cd.jpg` (cô dâu)

**Lưu ý:** 
- Ảnh sẽ được tự động optimize bởi Next.js (AVIF/WebP)
- Gallery images sẽ lazy load khi scroll đến section
- Chỉ ảnh thư mời (`c1.jpg`) được preload

## 🚀 Build & Deploy

### Build Production
```bash
yarn build
yarn start
```

### Deploy lên Vercel
```bash
vercel --prod
```

**Production URL:** https://wedding-kien-thuy-msucf3261-giangs-projects-331573a8.vercel.app

### Image Optimization
Website sử dụng Next.js Image Optimization với:
- Formats: AVIF, WebP (tự động fallback về JPEG)
- Responsive sizes cho mobile/tablet/desktop
- Lazy loading cho gallery images
- Quality optimization (85-90% tùy loại ảnh)

## 📄 License

Made with ❤️ for Trung Kiên & Ngọc Thùy Wedding - 03.01.2026

