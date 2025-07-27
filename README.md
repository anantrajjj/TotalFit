# 🏋️‍♂️ TotalFit – AI-Powered Athlete Management Platform

TotalFit is a centralized, AI-driven platform built for athletes, coaches, and sports organizations to track performance, prevent injuries, personalize training, manage finances, and plan athletic careers. Developed as part of the **Google Solution Challenge 2025**, TotalFit aligns with UN SDG #3 – *Good Health & Well-being*.

---

## 🚀 Features

- 📊 Real-time performance analytics and dashboards
- 🧠 Injury prediction using historical data via Google Vertex AI
- 🏋️ Personalized workout and nutrition plans
- 💰 Financial tracking for training, sponsorships, and earnings
- 🗺️ Career planning and AI-based mentorship suggestions

---

## 🧠 Tech Stack

- **Frontend:** React.js, Tailwind CSS, Flutter (planned for mobile)
- **Backend:** Node.js, Express.js
- **Database:** Firebase Firestore, Supabase (PostgreSQL)
- **Authentication & Security:** Firebase Auth, OAuth 2.0, Google Cloud IAM, AES encryption
- **AI/ML:** Google Vertex AI, BigQuery
- **Hosting:** Firebase Hosting, Vercel

---

## 🔐 Security Highlights

- Implemented secure OAuth 2.0 authentication and Google Cloud IAM for access control
- Used AES encryption to secure sensitive athlete and health data
- Protected APIs with middleware-level validation and role-based access

---

## 🧩 Architecture Overview

- Frontend connects to a secure backend API
- Backend syncs user data between Firestore and Supabase
- Vertex AI processes athlete data to deliver predictions and personalized plans
- Real-time updates handled via Firebase listeners and Supabase triggers

---

## 👨‍💻 Team & Roles

- **Aum Panchal** – Security & Integration Engineer  
  - OAuth 2.0 setup, IAM configuration, Firebase/Supabase sync, API security
- **Team Member 2** – Frontend Developer (React.js, UI/UX)
- **Team Member 3** – AI Lead (Vertex AI, BigQuery)

---

## 🏆 Event

**Google Solution Challenge 2025**  
Aligned with **UN Sustainable Development Goal #3**: *Good Health & Well-being*

---

## 📦 Project Structure
totalfit/
├── client/ # React frontend
├── server/ # Node.js backend
├── firebase/ # Firebase config and rules
├── supabase/ # Supabase functions and config
├── ai-models/ # Vertex AI model handlers
├── public/ # Static assets
└── README.md


---

## 🛠️ How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/totalfit.git
   cd totalfit
cd client && npm install
cd ../server && npm install
# Start frontend
cd client && npm start

# In a new terminal, start backend
cd server && npm run dev

