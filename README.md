# 🍳 AI-Powered Recipe Generator & Tracker

An intelligent full-stack web application that helps users generate creative recipes based on ingredients they have. It leverages modern AI (OpenAI & Cohere) for smart suggestions, and offers recipe tracking with login/logout authentication.

---

## ✨ Features

- 🔍 **AI-Powered Recipe Generation** (OpenAI GPT / Cohere fallback)
- 🧾 **Ingredient Input** → Suggests detailed step-by-step recipes
- 💾 **Save & Track Recipes** to MongoDB
- 🧑‍🍳 **User Authentication (JWT)**: Secure login & registration
- 🎨 **Polished, Responsive UI**: Clean and professional styling
- 🔐 **Protected Routes**: Only authenticated users can generate and save
- 📁 **Modular MERN Stack**: React (Frontend), Node + Express (Backend), MongoDB (Database)

---

## 🖥️ Tech Stack

| Frontend        | Backend            | AI Models     | Auth & DB         |
|----------------|--------------------|---------------|-------------------|
| React (Vite)   | Node.js + Express  | OpenAI GPT-3.5 / Cohere | JWT + MongoDB Atlas |

---

## 🚀 How It Works

1. ✅ User signs up / logs in
2. ✍️ Enters comma-separated ingredients
3. 🤖 AI suggests a unique recipe
4. 💾 User can save recipes to their dashboard
5. 📚 Saved recipes are retrievable and viewable later

---

## 📷 Screenshots

| Generate Recipe | Saved Recipes | Auth Page |
|-----------------|----------------|-----------|
| ![generate](./screenshots/generate.png) | ![saved](./screenshots/saved.png) | ![auth](./screenshots/auth.png) |

---

## 🛠️ Setup Instructions

### 🔌 Prerequisites

- Node.js, npm
- MongoDB Atlas account
- OpenAI / Cohere API keys

---

### 📦 Installation

```bash
git clone https://github.com/your-username/ai-recipe-generator-tracker
cd ai-recipe-generator-tracker
