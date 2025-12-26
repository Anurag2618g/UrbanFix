# 🏙️ Civic Problem Reporting Platform

A full-stack **Next.js (App Router)** application that allows citizens to report civic problems
(such as potholes, garbage overflow, water leakage, broken streetlights) using **image upload and voice recording**.

Reports are securely managed through an **admin dashboard** with authentication, status tracking,
and moderation features.

---

## 🚀 Core Features

### Citizen Features
- JWT-based authentication
- Report civic issues using:
  - 📸 Image upload
  - 🎙️ Voice recording
- Track report status (Pending → In Progress → Resolved)

### Admin Features
- Secure admin login
- View, filter, and manage all reports
- Update report status
- Remove invalid or spam reports

---

## 🧠 Why This Project Matters

Traditional civic reporting systems are slow, inaccessible, and opaque.

This app:
- Reduces friction using media-first reporting
- Demonstrates real-world full-stack architecture
- Mirrors production-grade government systems

---

## 🏗️ Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **Cloudinary** (image + audio storage)
- **Tailwind CSS**

---

## 📁 Project Structure

app/
├─ auth/
├─ report/
├─ admin/
├─ api/
│ ├─ auth/
│ ├─ reports/
├─ layout.tsx
├─ page.tsx

lib/
├─ db.ts
├─ auth.ts

models/
├─ User.ts
├─ Report.ts

yaml
Copy code

---

## 🔐 Environment Variables

Create `.env.local`:

```env
MONGODB_URI=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

## 🛠️ Run Locally

npm install
npm run dev

## 📈 Future Enhancements

AI-based issue classification

Speech-to-text processing

Map-based visualization

Department-wise routing