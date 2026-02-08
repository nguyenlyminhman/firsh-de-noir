# 🌑 Firsh de Noir

**Firsh de Noir** là một dự án **landing page nước hoa cao cấp**, được xây dựng bằng **Next.js App Router**, tập trung vào hiệu năng, SEO và trải nghiệm thị giác (hero image, gallery, typography).

Repo này phù hợp cho:
- Landing page marketing
- Demo Next.js App Router
- Thực hành `next/image`, assets, layout, component structure

---

## ✨ Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **next/image** (tối ưu hình ảnh)
- **ESM config (`next.config.mjs`)**

---

## 📁 Project Structure

```bash
src/
├─ app/
│  ├─ layout.tsx        # Root layout
│  ├─ page.tsx          # Home page
│  └─ globals.css
│
├─ components/
│  ├─ layout/           # Header, Footer
│  ├─ sections/         # Hero, Gallery, CTA...
│  └─ ui/               # UI components
│
├─ hooks/               # Custom hooks
├─ lib/                 # Utils, helpers
├─ assets/              # (optional) imported assets
│
public/
├─ assets/
│  └─ perfume-*.jpg     # Static images
│
└─ fonts/               # Local fonts (nếu có)
```

---

## 🖼️ Images & Assets

- **Ảnh marketing / hero / gallery** được đặt trong:
  ```
  public/assets/
  ```
- Sử dụng trực tiếp với `next/image`:
  ```tsx
  <Image
    src="/assets/perfume-6.jpg"
    alt="Perfume"
    fill
    className="object-cover"
    sizes="100vw"
  />
  ```

📌 Không import ảnh từ `public/`.

---

## 🚀 Getting Started

### 1️⃣ Clone repo
```bash
git clone https://github.com/nguyenlyminhman/firsh-de-noir.git
cd firsh-de-noir
```

### 2️⃣ Cài dependencies
```bash
npm install
# hoặc
pnpm install
```

### 3️⃣ Chạy dev server
```bash
npm run dev
```

Mở trình duyệt tại:  
👉 `http://localhost:3000`

---

## 🧠 Notes & Best Practices

- Component **tái sử dụng** được đặt ngoài `app/`
- `app/` chỉ dùng cho:
  - routing
  - layout
  - loading / error
- Hero image dùng `fill` để tránh CLS
- Alias `@/*` trỏ về `src/*`

---

## 📦 Build & Deploy

```bash
npm run build
npm start
```

Dự án tương thích tốt với:
- Vercel
- Docker
- Static hosting (với cấu hình phù hợp)

---

## 📜 License

MIT License © 2026  
Made with ❤️ by **Mẫn Nguyễn**