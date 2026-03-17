# ⚙️ Fitness Sports Center - Backend

This is the **Node.js + Express.js** backend for the Fitness Sports Center website. It handles contact form submissions, validation, and email notifications.

## 🚀 Features
- RESTful API for contact form
- Input validation with express-validator
- Email notifications (admin + user) via Nodemailer
- Rate limiting (5 requests per 15 minutes)
- Security headers with Helmet
- CORS configuration
- Error handling middleware
- Modular code structure

## 📦 Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   
2.Install dependencies:
npm install

3.Create environment file:
cp .env.example .env

4.Update .env with your credentials:
PORT=5000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
FRONTEND_URL=http://localhost:5173

5. Start development server:
npm run dev

📂 Project Structure
Code
backend/
├── controllers/          # Contact form logic
├── middleware/           # Validation + security
├── routes/               # API routes
├── utils/                # Email service
├── server.js             # Entry point
├── package.json
└── .env.example

🌐 API Endpoints
GET /api/health → Health check
POST /api/contact → Submit contact form

Example Request:
json
{
  "name": "John Doe",
  "email": "john@example.com",
  "goal": "Weight Loss",
  "message": "I want to join the gym. Please provide information."
}
Success Response
json
{
  "success": true,
  "message": "Form submitted successfully! We will contact you soon."
}

Validation Error Response:
json
{
  "success": false,
  "errors": {
    "name": "Name must be at least 3 characters long",
    "email": "Please enter a valid email address",
    "message": "Message must be at least 10 characters long"
  }
}

🌐 Deployment
Backend can be deployed on Vercel (Serverless Functions), Render, or Heroku.
