# 🌿 Maa Astha samajik seva sanstha (beghar nivara kendra) - Community Field Project

![MERN Stack](https://img.shields.io/badge/MERN-Stack-059669?style=for-the-badge&logo=mongodb)
![React](https://img.shields.io/badge/React-18.x-059669?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-059669?style=for-the-badge&logo=tailwind-css)
![Node.js](https://img.shields.io/badge/Node.js-Backend-059669?style=for-the-badge&logo=nodedotjs)

> **Empowering the Homeless. Restoring Human Dignity.**
> Maa Astha is a comprehensive Full-Stack MERN web application developed as a Community Field Project. It is designed to digitalize and optimize the operations of an NGO working with homeless, abandoned, and destitute individuals.

---

## ✨ Key Features

### 🌍 Public Portal

- **🚨 Emergency Rescue Alerts:** Users can report people in need with live **GPS Geolocation fetching** and image uploads.
- **🔍 Missing Persons Directory:** A dedicated database to list and search for missing individuals to facilitate family reunions.
- **🤝 Report/Claim Portal:** Secure mechanism for families to claim identified missing persons.
- **💚 Donations & Volunteering:** Built-in forms to collect volunteer applications and track donation references.
- **🌐 Bilingual Support:** Native integration of Marathi and English to cater to local ground realities.

### 🛡️ Admin Dashboard (Secure Portal)

- **📊 Live Analytics Overview:** Real-time stats for total sheltered, rescued, and reunited individuals.
- **🏥 Digital Attendance & Resident Registration:** Add new residents with complete medical condition tracking, ID proof, and photo capture.
- **📋 Record Management:** Centralized database to view and manage all current shelter residents.
- **📸 Event Management:** Admins can post upcoming NGO events and success stories dynamically.
- **✉️ Centralized Communications:** View and manage all volunteer requests, rescue alerts, and contact queries in one place.

---

## 🛠️ Technology Stack

- **Frontend:** React.js, Tailwind CSS (Custom Emerald/Green Theme), React Router DOM, Lucide React Icons
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ORM with strict Schema Validation)
- **Authentication:** JSON Web Tokens (JWT), Bcrypt.js for encrypted passwords
- **Media Management:** Multer (Parsing) & Cloudinary (Cloud Storage)

## 📂 Architecture & Data Flow

- **Client-Side Rendering:** Utilizing React's Virtual DOM for a seamless, app-like user experience.
- **RESTful APIs:** The Express backend exposes secure endpoints for CRUD operations.
- **Middleware Integration:**
  - `authMiddleware`: Verifies JWT tokens to protect Admin routes.
  - `multerMiddleware`: Intercepts `multipart/form-data` to safely upload images to Cloudinary before storing the secure URL in MongoDB.

---

## 👥 Contributors

- **Tanmay Purushottam Bokade**
- **Kush Nitesh Patel**
- **Abhay Sudhir Panchal**
- **Dhanaraj Sudhakar More**


---

## 📜 License

This software was developed for a field project. All rights reserved.
