# 🌬️ The Comfort Guardians HVAC Website

> A modern, responsive marketing website for The Comfort Guardians HVAC company based in Atlanta.  
> Built with Next.js, Tailwind CSS, Framer Motion, and integrated with Jobber's Client Hub and a contact form.

[Visit Live Site 🚀](https://thecomfortsguardians.com)

---

![Next.js](https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-EF008F?style=for-the-badge&logo=framer&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)

---

## ✨ Features

- Hero section with animation and call-to-action
- Services section for HVAC offerings
- Framer Motion animations
- Contact form with validation and toast messages
- Nodemailer backend (email sending logic ready)
- Integrated Jobber Client Hub link for real appointment booking
- Fully responsive layout (mobile/tablet/desktop)
- Deployed on Vercel

---

## 🛠️ How to Run Locally

1. **Clone the repo**

   ```bash
   git clone https://github.com/your-username/the-comfort-guardians.git
   cd the-comfort-guardians

   ```

2. **Install Dependencies**
   npm install

3. **Create a .env file at the root**

   SMTP_HOST=smtp.office365.com
   SMTP_PORT=587
   SMTP_USER=your_business_email | Your personal email
   SMTP_PASS=your_app_password
   EMAIL_TO=your_business_email

4. **Start the development server**
   npm run dev

5. **Visit http://localhost:3000 to view the site**

   💡 If not ready to connect an actual email, you can leave the contact form backend configured but skip filling in real .env values.

6. **📁Folder Structure**

   /src
   /app → Main application routing
   /components → Reusable UI components (Hero, Services, ContactForm, etc.)
   /lib → Backend logic (e.g. email sending)
   /styles → Tailwind and global styles
   /public → Static assets (logos, images)

7. **🚀Deployment**

   The site is deployed and automatically updated via Vercel:

   GitHub → Push changes to main

   Vercel → Detects new commit and redeploys

   Backend logic for the contact form is deployed separately to Railway, which handles API routing and .env secrets securely.

8. **🙌 Credits**

   Built by Gerard Eku as a freelance project.

   Client: The Comfort Guardians HVAC (Atlanta, GA)

9. **📝 License**

   This project is for portfolio and client use only. Do not redistribute or reuse without permission.
