#!/bin/bash

# Authentication Setup Script
# This script helps you set up authentication for your notes app

echo "🔐 Notes App Authentication Setup"
echo "=================================="
echo ""

# Check if .env exists
if [ -f .env ]; then
    echo "⚠️  .env file already exists!"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Setup cancelled."
        exit 0
    fi
fi

# Copy .env.example to .env
cp .env.example .env
echo "✅ Created .env file from template"
echo ""

# Generate NEXTAUTH_SECRET
echo "🔑 Generating NEXTAUTH_SECRET..."
NEXTAUTH_SECRET=$(openssl rand -base64 32)
if [ -z "$NEXTAUTH_SECRET" ]; then
    echo "❌ Failed to generate secret. Please install openssl."
    exit 1
fi

# Update .env with generated secret
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s|NEXTAUTH_SECRET=\"your-secret-key-here-generate-with-openssl-rand-base64-32\"|NEXTAUTH_SECRET=\"$NEXTAUTH_SECRET\"|" .env
else
    # Linux
    sed -i "s|NEXTAUTH_SECRET=\"your-secret-key-here-generate-with-openssl-rand-base64-32\"|NEXTAUTH_SECRET=\"$NEXTAUTH_SECRET\"|" .env
fi
echo "✅ Generated and set NEXTAUTH_SECRET"
echo ""

# Prompt for Google OAuth credentials
echo "🔍 Google OAuth Setup"
echo "---------------------"
echo "To enable Google sign-in, you need to:"
echo "1. Go to https://console.cloud.google.com/"
echo "2. Create a project or select existing one"
echo "3. Enable Google+ API"
echo "4. Create OAuth 2.0 credentials"
echo "5. Add redirect URI: http://localhost:3000/api/auth/callback/google"
echo ""
echo "See AUTH_SETUP.md for detailed instructions."
echo ""

read -p "Do you have Google OAuth credentials? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    read -p "Enter your Google Client ID: " GOOGLE_CLIENT_ID
    read -p "Enter your Google Client Secret: " GOOGLE_CLIENT_SECRET
    
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s|GOOGLE_CLIENT_ID=\"your-google-client-id\"|GOOGLE_CLIENT_ID=\"$GOOGLE_CLIENT_ID\"|" .env
        sed -i '' "s|GOOGLE_CLIENT_SECRET=\"your-google-client-secret\"|GOOGLE_CLIENT_SECRET=\"$GOOGLE_CLIENT_SECRET\"|" .env
    else
        # Linux
        sed -i "s|GOOGLE_CLIENT_ID=\"your-google-client-id\"|GOOGLE_CLIENT_ID=\"$GOOGLE_CLIENT_ID\"|" .env
        sed -i "s|GOOGLE_CLIENT_SECRET=\"your-google-client-secret\"|GOOGLE_CLIENT_SECRET=\"$GOOGLE_CLIENT_SECRET\"|" .env
    fi
    echo "✅ Google OAuth credentials configured"
else
    echo "⏭️  Skipping Google OAuth setup. You can add credentials to .env later."
fi

echo ""
echo "🎉 Setup Complete!"
echo ""
echo "Your environment is configured:"
echo "  ✅ Database URL: file:./dev.db (SQLite)"
echo "  ✅ NEXTAUTH_URL: http://localhost:3000"
echo "  ✅ NEXTAUTH_SECRET: Generated (32 chars)"
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "  ✅ Google OAuth: Configured"
else
    echo "  ⏭️  Google OAuth: Not configured (optional)"
fi
echo ""
echo "Next steps:"
echo "1. Review your .env file: cat .env"
echo "2. Install dependencies: pnpm install"
echo "3. Run database migrations: pnpm prisma migrate dev"
echo "4. Start development server: pnpm dev"
echo "5. Visit: http://localhost:3000/signin"
echo ""
echo "📖 For more information, see AUTH_SETUP.md"
