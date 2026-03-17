# 🖥️ Fitness Sports Center - Frontend

This is the **React + Vite + TypeScript** frontend for the Fitness Sports Center website. It provides a responsive UI, smooth animations, and interactive features.

## 🚀 Features
- Fully responsive design (mobile, tablet, desktop)
- Smooth animations with Framer Motion
- Interactive navbar with scroll effects
- Hero section with CTA buttons
- About section with stats
- Services section with cards + search/filter
- Contact form with validation
- Footer with social links
- Custom color scheme with Tailwind CSS

## 📦 Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   
Install dependencies:
npm install

Start development server:
npm run dev

Build for production:
npm run build

⚙️ Environment Variables
VITE_API_URL=http://localhost:5000   # Backend URL (for development)

📂 Project Structure
Code
frontend/
├── public/              # Static assets
├── src/
│   ├── assets/images/   # Local images
│   ├── components/      # React components (Navbar, Hero, About, Services, Contact, Footer)
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── vite.config.ts
└── package.json
