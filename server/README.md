# Netai Stationery Works Pvt. Ltd.

![MERN](https://img.shields.io/badge/MERN-Stack-brightgreen)
![Node.js](https://img.shields.io/badge/Node.js-22.15.0-green)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Image%20CDN-blue)
![JWT](https://img.shields.io/badge/JWT-Auth-orange)
![License](https://img.shields.io/badge/License-ISC-yellow)

A full‑stack **MERN** e‑commerce and business website for a Kolkata‑based stationery manufacturing company. It features a public storefront with product catalog, contact forms, and a secure admin dashboard for managing products, images, and customer inquiries.

![Homepage Screenshot](./screenshots/homepage.png) _(optional – add a screenshot later)_

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Security & Best Practices](#-security--best-practices)
- [Testing](#-testing)
- [Roadmap](#-roadmap)
- [License](#-license)
- [Author](#-author)

## ✨ Features

### 🛒 Public Storefront (React)

- **Modern, responsive UI** with custom CSS (Pencil + Paper theme)
- **Product catalog** with category filtering, search, and pagination
- **Product details** with image gallery and quick view
- **Contact form** with email notifications
- **Service pages** showcasing manufacturing capabilities
- **About page** with company stats, team highlights, and FAQ

### 🔐 Admin Dashboard (Protected)

- **Secure login** using JWT (HTTP‑only cookies optional)
- **Product management** – Create, Read, Update, Delete
- **Image upload** – Multiple images per product, stored on Cloudinary
- **Contact management** – View, mark as read, and delete inquiries
- **Real‑time updates** – Changes reflect immediately on the public site

### ⚙️ Backend API (Node.js/Express)

- **RESTful architecture** with feature‑based modules
- **MongoDB Atlas** for cloud database storage
- **Cloudinary integration** for image CDN and optimization
- **JWT authentication** with role‑based access control
- **Email notifications** via Nodemailer (Gmail/SendGrid)
- **Pagination, filtering, and sorting** on product lists
- **Request ID tracing** for debugging
- **Graceful shutdown** for zero‑downtime deployments
- **Security middleware** – Helmet, CORS, Rate Limiting, Input Validation

## 🧰 Tech Stack

| Layer        | Technologies                                                  |
| ------------ | ------------------------------------------------------------- |
| **Frontend** | React 18, React Router 6, CSS Modules, Vite                   |
| **Backend**  | Node.js, Express 4, Mongoose ODM                              |
| **Database** | MongoDB Atlas                                                 |
| **Storage**  | Cloudinary (image upload & CDN)                               |
| **Auth**     | JSON Web Tokens (JWT), bcryptjs                               |
| **Email**    | Nodemailer (Gmail SMTP)                                       |
| **Tooling**  | Nodemon, Morgan, Compression, Helmet, Express‑validator, UUID |

## 📁 Project Structure

netai-stationery/
│
├── client/ # React frontend
│ ├── public/
│ ├── src/
│ │ ├── app/ # App entry & routing
│ │ ├── pages/ # Page components (Home, About, Products, Contact, etc.)
│ │ ├── components/ # Reusable UI (Header, Footer, Button, Card)
│ │ ├── features/ # Custom hooks & API services
│ │ ├── styles/ # Global CSS variables & resets
│ │ ├── assets/ # Images, icons
│ │ └── main.jsx
│ ├── .env.example
│ ├── vite.config.js
│ └── package.json
│
├── server/ # Node.js/Express backend
│ ├── config/ # DB & Cloudinary setup
│ ├── modules/ # Feature modules (product, admin, contact)
│ │ ├── product/
│ │ ├── admin/
│ │ └── contact/
│ ├── middleware/ # Auth, error, upload, validation, requestId
│ ├── utils/ # asyncHandler, ApiResponse, emailService, etc.
│ ├── routes/ # Central route loader
│ ├── scripts/ # Utility scripts (seedAdmin, resetPassword)
│ ├── app.js
│ ├── server.js
│ ├── .env.example
│ └── package.json
│
├── .gitignore
└── README.md # You are here

## 🚀 Getting Started

### Prerequisites

- Node.js (v22.15.0 or later)
- npm (v10+)
- MongoDB Atlas account (free tier works)
- Cloudinary account (free tier works)
- Gmail account (for email notifications – optional)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/rajesh36sarkar/netai-stationery.git
   cd netai-stationery

   ```

2. **Install backend dependencies**
   cd server
   npm install

3. **Install frontend dependencies**
   cd ../client
   npm install

## Environment Variables
## Backend (server/.env.example)

PORT=5000
NODE_ENV=development

# MongoDB Atlas
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/stationery_db?retryWrites=true&w=majority

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# JWT
JWT_SECRET=your_strong_secret_key
JWT_EXPIRE=30d

# CORS
CLIENT_URL=http://localhost:5173

# Email (Gmail with App Password)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-digit-app-password
EMAIL_FROM="Netai Stationery" <your-email@gmail.com>
EMAIL_TO=admin@nswpl.com


License
This project is licensed under the ISC License.

Author
Rajesh Sarkar
Full‑Stack Developer

Portfolio

GitHub

LinkedIn

Built with ❤️ for Netai Stationery Works Pvt. Ltd.