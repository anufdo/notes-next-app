# Quick Start Guide

## 🚀 Get Started in 3 Minutes

### 1. Setup Environment (30 seconds)
```bash
# Run the automated setup script
./setup-auth.sh

# Or manually:
cp .env.example .env
# Edit .env and set NEXTAUTH_SECRET
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

Visit: **http://localhost:3000/signin**

---

## 🔑 What's Included

✅ **Email/Password Authentication**
- Secure password hashing (bcryptjs)
- Separate signup and signin flows
- Password validation (8+ chars)

✅ **Google OAuth**
- One-click sign in with Google
- Automatic account creation
- Profile sync (name, email, image)

✅ **Security Features**
- JWT sessions (30-day expiry)
- Protected routes (middleware)
- SQL injection prevention
- User enumeration prevention
- Secure error handling

✅ **User Experience**
- Modern, responsive UI
- Loading states
- Error messages
- Auto-redirect after auth

---

## 📝 Quick Test

### Test Signup:
1. Go to http://localhost:3000/signin
2. Click "Don't have an account? Sign up"
3. Enter: 
   - Email: test@example.com
   - Password: password123
4. Submit → Should auto-login to /notes

### Test Login:
1. Go to http://localhost:3000/signin
2. Enter your credentials
3. Submit → Redirects to /notes

### Test Google OAuth:
1. Configure Google OAuth in .env (see AUTH_SETUP.md)
2. Click "Sign in with Google"
3. Authorize → Redirects to /notes

---

## 🛠️ Commands

```bash
# Development
pnpm dev              # Start dev server (localhost:3000)
pnpm build            # Build for production
pnpm start            # Start production server

# Database
pnpm prisma studio    # Open database GUI
pnpm prisma migrate dev    # Create/apply migration
pnpm prisma generate  # Regenerate Prisma client

# Useful
pnpm lint             # Check code quality
```

---

## 📂 Key Files

```
lib/
  ├── auth.ts         # NextAuth configuration
  └── prisma.ts       # Database client

app/
  ├── signin/
  │   └── page.tsx    # Sign in/up page
  └── api/auth/
      ├── [...nextauth]/route.ts  # Auth handler
      └── signup/route.ts         # Signup endpoint

middleware.ts         # Route protection
prisma/
  └── schema.prisma   # Database schema
.env                  # Environment variables (create this!)
```

---

## 🔧 Common Tasks

### Add a new OAuth provider:
Edit `lib/auth.ts` and add provider to `providers` array:
```typescript
providers: [
  GoogleProvider({ ... }),
  GitHubProvider({ ... }), // Add this
]
```

### Protect a new route:
Edit `middleware.ts` matcher:
```typescript
export const config = {
  matcher: [
    "/notes/:path*",
    "/dashboard/:path*", // Add this
  ],
}
```

### Change session expiry:
Edit `lib/auth.ts`:
```typescript
session: {
  strategy: "jwt",
  maxAge: 7 * 24 * 60 * 60, // 7 days instead of 30
}
```

---

## 🐛 Troubleshooting

**"Invalid credentials" error:**
- Check email/password are correct
- Ensure user exists (try signing up first)
- Check database connection

**Google OAuth not working:**
- Verify .env has GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET
- Check redirect URI in Google Console matches
- Ensure Google+ API is enabled

**TypeScript errors:**
- Run: `pnpm prisma generate`
- Restart VS Code TypeScript server

**Database errors:**
- Run: `pnpm prisma migrate dev`
- Check DATABASE_URL in .env

---

## 📖 More Information

- **Full Setup Guide:** `AUTH_SETUP.md`
- **Change Summary:** `CHANGES.md`
- **NextAuth Docs:** https://next-auth.js.org
- **Prisma Docs:** https://prisma.io

---

## 🎯 Production Checklist

Before deploying:
- [ ] Set strong NEXTAUTH_SECRET
- [ ] Update NEXTAUTH_URL to production domain
- [ ] Use production database (PostgreSQL)
- [ ] Set up Google OAuth with production callback
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Set up monitoring (e.g., Sentry)
- [ ] Test all auth flows

See `AUTH_SETUP.md` for complete production guide.
