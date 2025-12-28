# 🌎 Portfolio Website

My personal developer portfolio highlights recent work for the SorenLab and Earth Plus initiatives. It is built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS 4**, and deployed to **Vercel**.

---

## 🧠 Overview

This site is the central hub for my featured projects (Blog, Dashboard, CT-App), certifications, and professional details. The interface embraces the unified Soren dark theme — black base, dark blue accents, and green/red state indicators.

---

## 🚀 Tech Stack

- Next.js 16 (App Router + Turbopack)
- React 19 & TypeScript 5.9
- Tailwind CSS 4
- Node.js 20+

---

## ⚙️ Getting Started

### 🔹 Prerequisites

- **Node.js** v20+
- **Git**
- Package manager of your choice (npm, pnpm, or Bun)

### 🔹 Clone & Install

```bash
git clone https://github.com/Drakeze/Portfolio.git
cd Portfolio
# npm install
# pnpm install
# bun install
```

### 🔹 Local Development

```bash
npm run dev
# pnpm dev
# bun run dev
```

### 🔹 Quality Checks

- `npm run lint` — runs ESLint with local stubs so it works offline.  
  When you have registry access, install the real ESLint toolchain for full coverage:
  `npm install -D eslint @eslint/js @next/eslint-plugin-next eslint-plugin-react eslint-config-prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin`
- `npm run typecheck` — strict TypeScript check (`tsc --noEmit`).

### 🔹 Production Build & Preview

```bash
npm run build
npm run start
```

---

## 📦 Deployment on Vercel

| Setting          | Value           |
| ---------------- | --------------- |
| Install Command  | `npm install` (or `pnpm install` / `bun install`) |
| Build Command    | `npm run build`                                   |
| Output Directory | `.next`         |

### Environment Variables

This portfolio does not require runtime environment variables. If you add integrations (analytics, forms, etc.), document the necessary variables here before deploying.

Custom Next.js configuration is currently unnecessary because all images are served from the local `/public` directory.

---

## 👤 Author

Anthony Shead
