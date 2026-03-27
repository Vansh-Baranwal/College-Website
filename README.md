# 🎓 Campus OS | The Future of Academic Excellence

[![Vercel Deployment](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://college-website-frontend.vercel.app)
[![Next.js 15](https://img.shields.io/badge/Framework-Next.js%2015-blue?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Styles-Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)

**Campus OS** is a premium, intelligence-driven university platform designed for **IIT Delhi**. It transcends traditional educational portals by merging a high-performance **"Dark SaaS"** aesthetic with cutting-edge academic infrastructure—featuring real-time AI assistance, blockchain-backed verification, and immersive 360° virtual exploration.

---

## ✨ Signature Features

### 📊 Intelligence-Driven Dashboards
- **Dual-Role Architecture**: Specialized views for Students (CGPA tracking, Assignments, Routine) and Faculty (Grant tracking, PhD management, Research analytics).
- **Interactive Analytics**: Real-time data visualization using `Recharts` (Area charts for GPA trends, Bar charts for research funding).
- **Demo Mode**: Instant profile fallbacks for immediate feature verification without a login session.

### 🔬 Research & Excellence (COE)
- **Centres of Excellence Hub**: A high-intensity animated directory for pioneering research in AI, Quantum Tech, Climate Change, and more.
- **Institutional Identity**: Comprehensive "About" portal featuring global rankings (NIRF #2, QS #150) and official leadership profiles.

### 🤖 AI Campus Assistant (Mistral AI)
- **Context-Aware Intelligence**: Integrated with `mistral-small-latest` for natural language resolution.
- **Database Injection**: Automatically injects Supabase context (events, faculty, courses) into prompts for pinpoint accuracy.
- **Mental Health Safe-Guards**: Backend intercepts detect stress-related keywords and provide immediate wellness support.

### 🌐 360° Virtual Campus Tour
- **Scraped Reality**: A high-performance, zero-dependency virtual tour engine that runs on a completely local asset folder, ensuring 100% uptime and 0 CORS issues.

### 🛡️ Blockchain Certificate Registry
- **Trustless Verification**: A futuristic interface to verify university documents using simulated transaction hashes and secure ledger states.

---

## 📸 Screenshots

| Hero & Navigation | Centres of Excellence |
| :---: | :---: |
| ![Hero Section](file:///C:/Users/vansh/.gemini/antigravity/brain/01888f80-c56a-4c39-b4bd-c9f6dea380f8/media__1774615351396.png) | ![COE Page](file:///C:/Users/vansh/.gemini/antigravity/brain/01888f80-c56a-4c39-b4bd-c9f6dea380f8/media__1774615358444.png) |

| AI Campus Assistant | Institutional Leadership |
| :---: | :---: |
| ![AI Assistant](file:///C:/Users/vansh/.gemini/antigravity/brain/01888f80-c56a-4c39-b4bd-c9f6dea380f8/media__1774615365735.png) | ![Leadership Section](file:///C:/Users/vansh/.gemini/antigravity/brain/01888f80-c56a-4c39-b4bd-c9f6dea380f8/media__1774615376011.png) |

---

## 🛠️ Technological Arsenal

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion |
| **Backend** | Node.js, Express, JWT, Mistral AI SDK |
| **Database** | Supabase (PostgreSQL), Edge Functions |
| **UI/UX** | Lucide React, Space Grotesk (Typography), Glassmorphism |

---

## 📂 Project Architecture

```text
/
├── frontend/                 # Next.js 15 Application
│   ├── app/                  # App Router: Dashboards, COE, About, Mental Health
│   ├── components/           # UI Components (Navbar, Sidebar, StatCards)
│   ├── lib/                  # Auth Context, API Handlers, Framer Config
│   ├── public/               # 8K Campus Video, 360 Tour Assets, Static Photos
│   └── styles/               # Tailwind Config & Global Design Tokens
├── backend/                  # Express API
│   ├── src/                  # Controllers & AI Prompt Injection Logic
│   └── routes/               # JWT-Authenticated Endpoints
└── .git/                     # Version Control
```

---

## 🚀 Rapid Setup

### 1. Prerequisites
- Node.js 18+ 
- npm or yarn

### 2. Frontend Installation
```bash
cd frontend
npm install
npm run dev
```

### 3. Backend Installation
```bash
cd backend
npm install
node src/server.js
```

### 🗝️ Environment Variables
Create a `.env` in the `backend/` directory:
```env
MISTRAL_API_KEY=your_key_here
JWT_SECRET=your_secret_here
SUPABASE_URL=your_url
SUPABASE_KEY=your_key
```

---

## 🌟 Why Campus OS is Unique?

1. **Persistent Visual Continuity**: A global background video (`/campus-tour.mp4`) persists across all route transitions via a specialized layout-level implementation.
2. **Glassmorphism Focus**: Every component uses `backdrop-blur` and `bg-white/5` treatments to feel like a premium, state-of-the-art operating system.
3. **Smart Fallbacks**: The system gracefully degrades to high-quality mock data if the Supabase or Backend services are unreachable, maintaining a "Always Online" appearance.
4. **Emotional Intelligence**: Features like the **Mood Tracker** and **Breathing Guide** are integrated directly into the academic workflow, prioritizing student well-being.

---

## 👨‍💻 Authors & Support
Created for **IIT Delhi** as part of the **Advanced Agentic Coding** initiative.

> [!TIP]
> **Pro Tip**: Use the `Dashboard` shortcut in the Navbar to see the new **Demo Mode** in action without needing to create an account!

---
*Developed with ❤️ by Vansh Baranwal, Poorvik A, Harshit Raj.*
