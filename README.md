# 🚀 Profile Management Backend

Backend REST API for the Profile Management System built using **Node.js**, **Express 5**, **MongoDB**, and **JWT Authentication**.

This backend handles authentication, profile data management, skills, experiences, social links, and secure API access.

---

## 📌 Project Overview

The Profile Management Backend provides:

- 🔐 User Registration & Login
- 🛡️ JWT-based Authentication & Route Protection
- 👤 Profile CRUD Operations
- 🧠 Skills Management
- 💼 Experience Management
- 🌐 Social Links Management
- 📁 Image Upload Support (Multer)
- 📊 Request Logging (Morgan)
- 🌍 CORS Enabled API

---

## 🛠️ Tech Stack

- Node.js
- Express 5
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcrypt
- Multer
- Morgan
- CORS
- ESLint

---

## 📂 Project Structure

profile-management-backend/
│
├── controllers/ # Business logic
├── models/ # Mongoose schemas
├── routes/ # API routes
├── middleware/ # Auth & error middleware
├── config/ # Database connection
├── uploads/ # Uploaded files
├── server.js # Entry point
├── .env # Environment variables
└── package.json


---

## 📦 Installation & Setup

### 1️⃣ Clone Repository

```bash

git clone https://github.com/godwin845/profile-management-backend.git
cd profile-management-backend


## Install dependencies

npm install

## Create a .env file in the root directory

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key


## Run server

npm start


## Server runs on:

http://localhost:5000


---