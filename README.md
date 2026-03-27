# 🚀 College Website (Campus OS)

A **modern, AI-powered college management platform** built with full-stack architecture.  
Includes chatbot, search, APIs, and anti-ragging alert system.

---

## 🌟 Features

### 🎓 Core Features
- 📚 Courses & Departments API
- 🔍 Smart Search
- 🤖 AI Chatbot (Campus Assistant)
- 🔐 Authentication (Signup/Login)
- 📊 Dynamic Dashboard

### 🚨 Advanced Features
- 🧠 Mental Health AI Support
- 🚨 Anti-Ragging Alert System (Email Trigger)
- 📡 RESTful APIs
- ☁️ Render + Vercel Deployment

---

## 🖼️ UI Preview

### 🏫 Home Page
![Home](./assets/home.png)

### 👨‍🏫 Leadership Section
![Leadership](./assets/leadership.png)

### 🤖 AI Chatbot
![Chatbot](./assets/chatbot.png)

### 🧪 Centres of Excellence
![COE](./assets/coe.png)

---

## ⚙️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Framer Motion

### Backend
- Node.js
- Express.js
- Nodemailer

### Database
- Supabase

### AI
- Mistral API

---

## 🔗 Live Links

Frontend:  
https://college-website-nu-wheat.vercel.app  

Backend API:  
https://college-website-7yxi.onrender.com/api  

---

## 🧩 API Endpoints

```bash
/api/auth/signup
/api/auth/login
/api/chat
/api/search?q=...
/api/data/courses
/api/data/events
/api/data/departments
/api/data/faculty
/api/ragging/alert
```

---

## 🚨 Anti-Ragging Feature

POST request:
```
/api/ragging/alert
```

Sends emergency alert email 🚨

---

## 📂 Project Structure
## 📂 Backend Structure

```bash
Backend/
├── src/
│   ├── controllers/        # Business logic (auth, chat, ragging, data)
│   │   ├── auth.controller.js
│   │   ├── chat.controller.js
│   │   ├── ragging.controller.js
│   │   └── data.controller.js
│   │
│   ├── routes/             # API route definitions
│   │   ├── auth.routes.js
│   │   ├── chat.routes.js
│   │   ├── ragging.routes.js
│   │   ├── data.routes.js
│   │   └── search.routes.js
│   │
│   ├── services/           # Core logic / integrations
│   │   ├── auth.service.js
│   │   ├── ai.service.js
│   │   ├── email.service.js
│   │   ├── mentalHealth.service.js
│   │   └── supabase.service.js
│   │
│   ├── config/             # Config files (DB, env setup)
│   │   └── db.config.js
│   │
│   ├── middleware/         # Express middleware
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   │
│   ├── models/             # Data models (if needed)
│   │   └── user.model.js
│   │
│   ├── app.js              # Express app setup
│   └── server.js           # Entry point
│
├── .env                    # Environment variables
├── .gitignore
├── package.json
└── package-lock.json


frontend/
│
├── app/                     # Next.js App Router
│   ├── layout.tsx           # Global layout
│   ├── page.tsx             # Home page
│   ├── globals.css
│   │
│   ├── (auth)/              # Auth routes group
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── signup/
│   │       └── page.tsx
│   │
│   ├── dashboard/
│   │   ├── page.tsx
│   │   ├── ragging/
│   │   │   └── page.tsx     # Anti-ragging UI
│   │   ├── mental-health/
│   │   │   └── page.tsx
│   │   └── chatbot/
│   │       └── page.tsx
│   │
│   ├── api/ (optional)      # If using Next API routes
│
├── components/              # Reusable UI components
│   ├── ui/                  # Buttons, cards, inputs
│   ├── layout/              # Navbar, footer
│   ├── chatbot/             # Chat UI
│   ├── dashboard/           # Dashboard widgets
│   └── common/              # Shared components
│
├── lib/                     # Utility & helpers
│   ├── api.ts               # Axios / fetch wrapper
│   ├── constants.ts
│   ├── utils.ts
│   └── config.ts
│
├── hooks/                   # Custom React hooks
│   ├── useAuth.ts
│   ├── useChat.ts
│   └── useFetch.ts
│
├── services/                # API calls (VERY IMPORTANT)
│   ├── auth.service.ts
│   ├── chat.service.ts
│   ├── data.service.ts
│   ├── ragging.service.ts
│   └── mentalHealth.service.ts
│
├── store/                   # State management
│   ├── authStore.ts
│   ├── chatStore.ts
│   └── index.ts
│
├── types/                   # TypeScript types
│   ├── auth.types.ts
│   ├── api.types.ts
│   └── user.types.ts
│
├── public/                  # Static assets
│   ├── images/
│   └── icons/
│
├── styles/
│   └── globals.css
│
├── .env.local
├── package.json
├── next.config.ts
└── tsconfig.json
---
```
## 🔐 Environment Variables

```
MISTRAL_API_KEY=your_key
SUPABASE_URL=your_url
SUPABASE_KEY=your_key
JWT_SECRET=your_secret

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

---

## 🚀 Setup

Clone:
```
git clone https://github.com/your-repo.git
cd Backend
```

Install:
```
npm install
```

Run:
```
npm run dev
```

---

## 🧪 API Testing

Chat:
```
curl -X POST http://localhost:5001/api/chat \
-H "Content-Type: application/json" \
-d '{"message":"Hello"}'
```

Ragging Alert:
```
curl -X POST http://localhost:5001/api/ragging/alert \
-H "Content-Type: application/json" \
-d '{"studentId":"123"}'
```

---

## 💡 Future Features
- 360° Campus View
- Mobile App
- Notification System
- Complaint Tracking

---

## 👨‍💻 Contributors
- Harshit Raj
- Vansh Baranwal
- Poorvik A

---

## ⭐ Support
Star ⭐ the repo if you like it!

---

## 🔥 Tagline
Smart Campus. Safe Students. AI-Powered Future.
