# Authentication Setup Guide

## Overview
This notes app now includes production-ready authentication with:
- ✅ Email/Password authentication with secure password hashing (bcryptjs)
- ✅ Google OAuth integration
- ✅ Signup and signin functionality
- ✅ Protected routes
- ✅ Session management with JWT

## Environment Setup

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Generate NEXTAUTH_SECRET:**
   ```bash
   openssl rand -base64 32
   ```
   Copy the output and set it as `NEXTAUTH_SECRET` in your `.env` file.

3. **Set up Google OAuth:**
   
   a. Go to [Google Cloud Console](https://console.cloud.google.com/)
   
   b. Create a new project or select an existing one
   
   c. Enable Google+ API:
      - Go to "APIs & Services" > "Library"
      - Search for "Google+ API"
      - Click "Enable"
   
   d. Create OAuth credentials:
      - Go to "APIs & Services" > "Credentials"
      - Click "Create Credentials" > "OAuth client ID"
      - Select "Web application"
      - Add authorized redirect URIs:
        - Development: `http://localhost:3000/api/auth/callback/google`
        - Production: `https://yourdomain.com/api/auth/callback/google`
   
   e. Copy the Client ID and Client Secret to your `.env` file:
      ```
      GOOGLE_CLIENT_ID="your-actual-client-id"
      GOOGLE_CLIENT_SECRET="your-actual-client-secret"
      ```

4. **Update NEXTAUTH_URL for production:**
   ```
   NEXTAUTH_URL="https://yourdomain.com"
   ```

## Database Setup

The migration has already been applied. If you need to reset:

```bash
pnpm prisma migrate reset
pnpm prisma migrate dev
```

## Running the App

```bash
# Install dependencies (if not already done)
pnpm install

# Run in development mode
pnpm dev
```

Visit `http://localhost:3000/signin` to test authentication.

## Security Features Implemented

### 1. **Password Security**
- Passwords are hashed using bcryptjs with 12 salt rounds
- Never stored in plain text
- Minimum password length: 8 characters

### 2. **Session Management**
- JWT-based sessions (stateless)
- 30-day session expiry
- Secure session token handling

### 3. **Database Connection**
- Singleton Prisma client pattern
- Prevents connection exhaustion in serverless environments
- Proper connection pooling

### 4. **Input Validation**
- Email and password validation
- Duplicate user prevention
- SQL injection protection via Prisma

### 5. **Error Handling**
- Generic error messages to prevent user enumeration
- Proper error logging
- User-friendly error display

### 6. **OAuth Security**
- Google OAuth 2.0 implementation
- Secure callback handling
- Account linking support

## API Routes

### Sign Up
```
POST /api/auth/signup
Body: { email, password, name? }
```

### Sign In (Credentials)
```
POST /api/auth/signin/credentials
```

### Sign In (Google)
```
GET /api/auth/signin/google
```

### Sign Out
```
POST /api/auth/signout
```

## Production Checklist

Before deploying to production:

- [ ] Set strong `NEXTAUTH_SECRET` (use `openssl rand -base64 32`)
- [ ] Configure production `NEXTAUTH_URL`
- [ ] Set up Google OAuth credentials with production callback URL
- [ ] Use a production database (PostgreSQL recommended)
- [ ] Enable HTTPS
- [ ] Set up proper CORS policies
- [ ] Configure rate limiting (recommended: use middleware or API gateway)
- [ ] Set up monitoring and error tracking (e.g., Sentry)
- [ ] Review and test all authentication flows
- [ ] Set up email verification (recommended enhancement)
- [ ] Configure CSP headers
- [ ] Enable 2FA (recommended enhancement)

## Database Migration for Production

When deploying to production:

```bash
# Don't use migrate dev in production!
pnpm prisma migrate deploy
```

## Recommended Enhancements

1. **Email Verification**
   - Add email verification on signup
   - Implement password reset flow

2. **Rate Limiting**
   - Prevent brute force attacks
   - Use libraries like `express-rate-limit` or edge middleware

3. **Two-Factor Authentication**
   - Add TOTP-based 2FA
   - Use libraries like `@otplib/core`

4. **Session Management**
   - Add ability to view and revoke active sessions
   - Implement device tracking

5. **Additional OAuth Providers**
   - GitHub, Microsoft, Apple, etc.

## Troubleshooting

### Google OAuth not working
- Check redirect URIs match exactly
- Ensure Google+ API is enabled
- Verify client ID and secret are correct
- Check that cookies are enabled in browser

### Database connection issues
- Verify DATABASE_URL is correct
- Run `pnpm prisma generate`
- Check file permissions on SQLite database

### TypeScript errors
- Run `pnpm prisma generate` to regenerate types
- Restart TypeScript server in VS Code

## Testing Authentication

1. **Test Signup:**
   - Go to `/signin`
   - Click "Don't have an account? Sign up"
   - Create an account with email and password

2. **Test Login:**
   - Use the credentials you just created
   - Should redirect to `/notes`

3. **Test Google OAuth:**
   - Click "Sign in with Google"
   - Authorize with Google account
   - Should redirect to `/notes`

4. **Test Session:**
   - After login, refresh the page
   - Should remain logged in
   - Session expires after 30 days of inactivity
