# Authentication Configuration Guide

This guide explains how to set up authentication for the NIMARK Store application.

## Required Environment Variables

Create a `.env` file in the root of your project with the following variables:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/nimark_store"

# NextAuth.js
AUTH_SECRET="your-secret-key-here"  # Generate with: openssl rand -base64 32

# Google OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Redis (Required for production)
REDIS_URL="redis://localhost:6379"

# Application URL
NEXTAUTH_URL="http://localhost:3000"  # Change to your production URL in production
```

## Setup Steps

### 1. Database Setup

1. Install PostgreSQL if you haven't already
2. Create a database:
   ```bash
   createdb nimark_store
   ```
3. Update `DATABASE_URL` in your `.env` file
4. Run Prisma migrations:
   ```bash
   npx prisma migrate dev
   ```
5. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

### 2. Redis Setup

#### Local Development

**Option A: Using Docker**
```bash
docker run -d -p 6379:6379 redis:alpine
```

**Option B: Using Homebrew (macOS)**
```bash
brew install redis
brew services start redis
```

#### Production

Use a managed Redis service:
- **Upstash** (recommended): https://upstash.com
- **Redis Cloud**: https://redis.com/redis-enterprise-cloud
- **AWS ElastiCache**
- **Azure Cache for Redis**

### 3. Generate AUTH_SECRET

Generate a secure random string for `AUTH_SECRET`:

```bash
openssl rand -base64 32
```

Copy the output and add it to your `.env` file.

### 4. Google OAuth Setup (Optional)

If you want to enable Google sign-in:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Create OAuth 2.0 credentials:
   - Go to "Credentials" > "Create Credentials" > "OAuth client ID"
   - Application type: "Web application"
   - Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
   - For production, add: `https://yourdomain.com/api/auth/callback/google`
5. Copy the Client ID and Client Secret to your `.env` file

### 5. Test Authentication

1. Start your development server:
   ```bash
   npm run dev
   ```
2. Visit http://localhost:3000/auth/signin
3. Test registration and login

## Features

### Enterprise-Level Security

- **NextAuth.js v5**: Authentication with JWT strategy, OAuth, credentials provider
- **bcryptjs**: Password hashing with salt rounds of 12
- **@auth/prisma-adapter**: Database adapter for NextAuth
- **shadcn/ui**: Modern UI component library
- **Zustand 5.0.8**: Client-side state management (shopping cart)

### Security Features
- **Password Hashing**: bcryptjs with 12 salt rounds
- **Rate Limiting**: 
  - Login: 5 attempts per 15 minutes per email
  - Registration: 3 attempts per hour per IP
- **Session Management**: JWT with Redis caching (30-day expiry)
- **Account Protection**: Suspension and active status flags
- **Route Protection**: Proxy guards authenticated routes (Next.js 16)

## Authentication API

### Register New User

```typescript
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Rate Limit**: 3 requests per hour per IP

### Sign In

Users can sign in via:
1. **Email/Password** - Traditional credentials
2. **Google OAuth** - One-click sign-in with Google

### Sign Out

```typescript
POST /api/auth/signout
```

## Database Schema

### User Model

```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  password      String?
  role          String    @default("user")
  isActive      Boolean   @default(true)
  isSuspended   Boolean   @default(false)
  
  // Two-Factor Authentication
  twoFactorEnabled Boolean @default(false)
  twoFactorSecret  String?
  
  // Relations
  accounts      Account[]
  sessions      Session[]
  orders        Order[]
  addresses     Address[]
  reviews       Review[]
  wishlistItems WishlistItem[]
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Troubleshooting

### Database Connection Issues

```bash
# Test database connection
npx prisma studio
```

If you see connection errors, verify:
1. PostgreSQL is running
2. DATABASE_URL is correct
3. Database exists

### Redis Connection Issues

```bash
# Test Redis connection
redis-cli ping
# Should return: PONG
```

If connection fails:
1. Check if Redis is running: `redis-cli ping`
2. Verify REDIS_URL in `.env`
3. Check firewall settings

### Rate Limiting Not Working

Rate limiting requires Redis. If disabled:
1. Check REDIS_URL is set
2. Verify Redis is accessible
3. Review Redis logs for errors

### OAuth Issues

1. **Invalid Redirect URI**: Add all callback URLs to Google Console
2. **Credentials Not Working**: Regenerate OAuth credentials
3. **User Not Created**: Check database for conflicts

## Production Deployment

### Checklist

- [ ] Set strong `AUTH_SECRET`
- [ ] Update `NEXTAUTH_URL` to production URL
- [ ] Use managed PostgreSQL service
- [ ] Use managed Redis service
- [ ] Configure OAuth redirect URIs for production
- [ ] Enable HTTPS
- [ ] Set up database backups
- [ ] Configure logging and monitoring
- [ ] Review rate limiting thresholds
- [ ] Test password reset flow

### Recommended Services

**Database**:
- Vercel Postgres
- Supabase
- PlanetScale
- AWS RDS

**Redis**:
- Upstash (serverless)
- Redis Cloud
- AWS ElastiCache

**Hosting**:
- Vercel (recommended)
- AWS Amplify
- Netlify

## Security Best Practices

1. **Never commit `.env` files** to version control
2. **Rotate AUTH_SECRET** periodically in production
3. **Use HTTPS** in production (required for OAuth)
4. **Monitor rate limiting** logs for suspicious activity
5. **Implement email verification** for new accounts
6. **Add CAPTCHA** to registration if abuse occurs
7. **Set up audit logging** for sensitive operations
8. **Regular security audits** and dependency updates

## Additional Features to Implement

Future enhancements you can add:

- [ ] Email verification on registration
- [ ] Password reset via email
- [ ] Two-factor authentication (TOTP)
- [ ] Social OAuth (Facebook, Twitter, etc.)
- [ ] Account recovery options
- [ ] Login history tracking
- [ ] Device management
- [ ] Suspicious activity alerts

## Support

For issues or questions:
- Check [NextAuth.js documentation](https://next-auth.js.org)
- Review [Prisma documentation](https://www.prisma.io/docs)
- Check application logs in development
