# 📘 Nandita – Netai Stationery Works

A **full-stack MERN web application** for a **book printing & stationery business**, built with a clean UI, admin-controlled system, and modern backend architecture.

This project allows customers to browse products and place orders **without login or payment**, while the admin has **full control** over products and orders through a secure dashboard.

---

## 🚀 Live Project Type
**Business-ready MVP / Portfolio Project**

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- React Router
- Axios
- Raw CSS (no Tailwind)
- Framer Motion (animations)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

### Tools
- Git & GitHub
- Thunder Client / Postman
- VS Code

---

## ✨ Features

### 👥 Customer Side
- Product catalog
- Product details page
- Order placement via form
- Mobile-first responsive design
- Clean, Flatlogic-style UI
- No login required
- No online payment

### 🧑‍💼 Admin Side
- Secure admin login (JWT)
- Admin dashboard
- Product management (Add / Edit / Delete)
- Order management
- Logout & session handling
- Full website control

---

## 📂 Project Structure

```
Nandita/
│
├── client/
│   ├── src/
│   │   ├── admin/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── .gitignore
└── README.md
```

---

## 🔐 Authentication
- Only **admin authentication** is implemented
- Customers can freely browse and place orders
- Admin routes are protected using **JWT**

---

## ⚙️ Environment Variables

Create a `.env` file inside the `server` folder:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/netai-stationery
JWT_SECRET=your_secret_key
```

> ⚠️ `.env` is ignored in GitHub for security reasons.

---

## ▶️ How to Run the Project Locally

### 1️⃣ Clone the repository
```
git clone https://github.com/rajesh36sarkar/Nandita.git
cd Nandita
```

### 2️⃣ Start Backend Server
```
cd server
npm install
npm run dev
```

Backend runs on:
```
http://localhost:5000
```

### 3️⃣ Start Frontend Client
```
cd client
npm install
npm run dev
```

Frontend runs on:
```
http://localhost:5173
```

---

## 🧪 Admin Login Credentials (Local)

```
Email: admin@netai.com
Password: admin123
```

> Change credentials before production use.

---

## 🔮 Future Improvements
- Order status update
- Image upload (Cloudinary)
- Admin route protection
- WhatsApp quick order integration
- SEO optimization
- Deployment

---

## 👨‍💻 Author

**Rajesh Kumar Sarkar**  
Full Stack Web Developer  
Kolkata, India 🇮🇳

GitHub: https://github.com/rajesh36sarkar

---

## ⭐ Final Note
This project is built as a **real-world business application**, not a tutorial clone.
