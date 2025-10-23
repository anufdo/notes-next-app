# Notes App

A modern, secure notes application built with Next.js, featuring production-ready authentication with email/password and Google OAuth.

## ✨ Features

- 📝 **Notes Management** - Create, edit, and organize your notes
- 🔐 **Secure Authentication** - Email/password + Google OAuth
- 🎨 **Modern UI** - Beautiful, responsive interface with Tailwind CSS
- 🗄️ **Database** - Prisma ORM with SQLite (easy upgrade to PostgreSQL)
- 🔒 **Protected Routes** - Middleware-based route protection
- 🚀 **Production Ready** - Security best practices implemented

## 🚀 Quick Start

### 1. Setup Authentication (30 seconds)
```bash
./setup-auth.sh
# Or manually copy .env.example to .env and configure
```

### 2. Install & Migrate (1 minute)
```bash
pnpm install
pnpm prisma migrate dev
```

### 3. Run the App (30 seconds)
```bash
pnpm dev
```

Visit **http://localhost:3000/signin** to get started!

## 📚 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Get up and running in 3 minutes
- **[AUTH_SETUP.md](AUTH_SETUP.md)** - Complete authentication setup guide
- **[CHANGES.md](CHANGES.md)** - Detailed implementation summary

## 🔑 Authentication

This app includes production-ready authentication:

✅ **Email/Password**
- Secure password hashing with bcryptjs
- Input validation and sanitization
- User registration and login

✅ **Google OAuth**
- One-click Google sign-in
- Automatic account creation
- Profile synchronization

✅ **Security**
- JWT sessions with 30-day expiry
- Protected API routes
- SQL injection prevention
- User enumeration prevention

## 🛠️ Tech Stack

- **Framework:** Next.js 16.0
- **Authentication:** NextAuth.js v4
- **Database:** Prisma ORM + SQLite (upgradable to PostgreSQL)
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript
- **Password Hashing:** bcryptjs

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
