# 🎨 Creative Showcase

**Creative Showcase** is a full-stack web platform that allows users to upload, manage, and publicly showcase creative images through a modern, responsive interface.

The application was designed to meet all specified functional requirements while also incorporating additional real-world features such as authentication security, private dashboards, and future-ready account flows.

🌐 **Live Application**  
https://creativeshowcase.sahinmallick.tech/

---

## 🧠 Project Overview

The goal of this project is to provide a seamless experience where:
- Visitors can explore creative work without logging in
- Registered users can securely manage their own content
- Each creator has a dedicated public presence

The platform behaves like a real product rather than a static demo, focusing on usability, security, and scalability.

---

## 📄 Pages & Features

### 1️⃣ Landing Page (Public)

- Displays a **randomized selection of user-uploaded images**
- Images are presented in a **mosaic / masonry-style layout**
- Layout adapts smoothly across screen sizes
- Entry point for discovering creators and their work
- Clearly visible **Login** and **Sign Up** actions for new users

This page is designed to immediately showcase the platform’s purpose and visual appeal.

---

### 2️⃣ Sign Up Page

- Secure user registration flow
- Enforces unique usernames and email addresses
- Account creation triggers an **email verification process**
- Prevents unverified accounts from accessing protected features

The signup process is intentionally simple while maintaining proper validation and security.

---

### 3️⃣ Login Page

- Secure authentication mechanism
- Session handled via **HTTP-only cookies**
- User remains logged in across refreshes
- Invalid credentials are safely handled without exposing sensitive details

This ensures a smooth and secure login experience consistent with real-world applications.

---

### 4️⃣ User Profile (Private Dashboard)

Accessible only after authentication, this is the user’s **personal workspace**.

Features include:
- Private dashboard view
- Image upload form with metadata (title / description)
- List of **previously uploaded images**
- Ability to **delete uploaded images**
- Immediate reflection of changes in the dashboard

This page allows users to fully manage their own content without affecting other users.

---

### 5️⃣ User Public Page (`/profile/[username]`)

- Publicly accessible creator profile
- Displays only the selected user’s images
- Images shown in a **mosaic / masonry layout**
- No authentication required to view
- Clean separation between private dashboard and public presence

This page acts as a creator’s **public showcase**, similar to a portfolio or gallery.

---

## 🔐 Authentication & Account Handling

Beyond the required pages, the platform includes additional account-level capabilities:

- Email verification flow after registration
- Protection against unauthorized access
- Session persistence using secure cookies
- Account-scoped data access (users can only manage their own uploads)
- Foundation in place for:
  - Password reset
  - Verification email resend
  - Account recovery workflows

These additions make the system closer to a production-ready application rather than a basic prototype.

---

## 🎯 What This Project Demonstrates

- Clear understanding of **user flows**
- Proper separation between **public and private content**
- Secure handling of authentication and sessions
- Real-world dashboard behavior
- Scalable design that supports future features
- Attention to both **UX and system integrity**

---

## 🧠 Design Philosophy

- Visitors should be able to explore content without friction
- Creators should have full control over their own uploads
- Authentication should be secure but invisible to the user
- Public pages should feel like curated galleries, not raw data

---

## 👨‍💻 Author

**Sahin Mallick**  
Full-Stack Web Developer
hi@sahinmallick.tech  

Creative Showcase was built to demonstrate the ability to design and implement a complete, user-focused web application that goes beyond minimum requirements.

---

## 📌 Notes for Reviewers

- All required pages are fully implemented
- Additional account and security features are included
- The application is live and publicly accessible
- Designed with extensibility and real-world usage in mind
