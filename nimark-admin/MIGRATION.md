# Migration Complete: Clerk → Auth.js ✅

## Summary

Successfully migrated nimark-admin from Clerk authentication to Auth.js (NextAuth v5 beta).

## What Was Changed

### 1. **Removed Clerk Dependencies**
- Uninstalled `@clerk/nextjs`
- Removed all Clerk imports and usage

### 2. **Installed Auth.js**
- `next-auth@beta` (NextAuth v5)
- `@auth/prisma-adapter`
- `bcryptjs` for password hashing
- `@types/bcryptjs`

### 3. **Configuration Files Created**
- `auth.ts` - Main Auth.js configuration with:
  - Credentials provider (email/password)
  - Google OAuth provider
  - JWT session strategy
  - Custom callbacks for session/JWT

- `middleware.ts` - Updated for Auth.js route protection
- `lib/auth-helpers.ts` - Helper functions for API routes
- `types/next-auth.d.ts` - TypeScript definitions

### 4. **Database Schema Updated**
- Added Auth.js models:
  - `User` - User accounts with hashedPassword
  - `Account` - OAuth accounts
  - `Session` - User sessions  
  - `VerificationToken` - Email verification
- Connected `Store` model to `User` model
- Pushed schema to PostgreSQL database

### 5. **API Endpoints Created**
- `/api/auth/[...nextauth]` - Auth.js handler
- `/api/auth/register` - User registration

### 6. **Components Updated**

**`components/ClientNavbar.tsx`**
- Replaced `UserButton` with custom dropdown menu
- Added sign-out functionality
- Displays user name and email

**`components/navbar.tsx`**
- Updated to use Auth.js session
- Passes user data to ClientNavbar

**`app/layout.tsx`**
- Replaced `ClerkProvider` with `SessionProvider`

### 7. **Layouts Updated**

**`app/(root)/layout.tsx`**
- Uses `auth()` from Auth.js
- Checks `session.user.id` instead of `userId`

**`app/(dashboard)/[storeId]/layout.tsx`**
- Uses `auth()` from Auth.js
- Checks `session.user.id` instead of `userId`

### 8. **Pages Updated**

**Sign-in page** (`app/(auth)/(routes)/sign-in/[[...sign-in]]/page.tsx`)
- Custom form with email/password
- Google OAuth button
- Link to sign-up page

**Sign-up page** (`app/(auth)/(routes)/sign-up/[[...sign-up]]/page.tsx`)
- Registration form with validation
- Auto sign-in after registration
- Google OAuth option

**Settings page** (`app/(dashboard)/[storeId]/(routes)/settings/page.tsx`)
- Updated auth check to use Auth.js

### 9. **All API Routes Updated**
Updated auth pattern in all API endpoints:
- `app/api/stores/route.ts`
- `app/api/stores/[storeId]/route.ts`
- `app/api/[storeId]/billboards/route.ts`
- `app/api/[storeId]/billboards/[billboardId]/route.ts`
- `app/api/[storeId]/categories/route.ts`
- `app/api/[storeId]/categories/[categoryId]/route.ts`
- `app/api/[storeId]/products/route.ts`
- `app/api/[storeId]/products/[productId]/route.ts`
- `app/api/[storeId]/sizes/route.ts`
- `app/api/[storeId]/sizes/[sizeId]/route.ts`
- `app/api/[storeId]/colors/route.ts`
- `app/api/[storeId]/colors/[colorId]/route.ts`
- `app/api/[storeId]/brands/route.ts`
- `app/api/[storeId]/brands/[brandId]/route.ts`

## Environment Variables

### Old (Clerk) - REMOVED ❌
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_SIGN_IN_URL
NEXT_PUBLIC_CLERK_SIGN_UP_URL
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL
```

### New (Auth.js) - ADDED ✅
```env
AUTH_SECRET=bxzwAOc4uTmXPDBJ81XUaTM/4uV1aFZ4n1SOKyrm8SI=
AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

## How to Use

### 1. **Create an Account**
Visit `http://localhost:3000/sign-up` and register with:
- Name
- Email
- Password (min 6 characters)

### 2. **Sign In**
Visit `http://localhost:3000/sign-in` and log in with:
- Email
- Password

Or use Google OAuth (if configured)

### 3. **Protected Routes**
All routes are protected by default except:
- `/sign-in`
- `/sign-up`
- `/api/*` (some have their own auth)

### 4. **API Authentication**
API routes now use:
```typescript
const { userId, error } = await requireAuth();
if (error) return error;
```

## Testing Checklist

✅ Server compiles without errors  
✅ No Clerk references remaining  
✅ Auth.js configured properly  
✅ Database schema updated  
✅ Sign-up page works  
✅ Sign-in page works  
⬜ Test creating a store (requires account)  
⬜ Test protected routes  
⬜ Test API endpoints  
⬜ Test sign-out  
⬜ Test Google OAuth (if configured)

## Next Steps

1. **Create your first account** at `/sign-up`
2. **Sign in** at `/sign-in`
3. **Create a store** - you'll be redirected to create one
4. **Add external service keys** (when needed):
   - Cloudinary for image uploads
   - Stripe for payments
   - Paystack as payment alternative

## Troubleshooting

### "No matching decryption secret" error
- Make sure `AUTH_SECRET` is set in `.env`
- Restart the dev server after changing `.env`

### Can't sign in
- Check database is running: `docker ps`
- Check Prisma Client is generated: `npx prisma generate`

### API returns 401
- Make sure you're signed in
- Check session in browser dev tools

## Key Differences from Clerk

| Feature | Clerk | Auth.js |
|---------|-------|---------|
| Provider | `<ClerkProvider>` | `<SessionProvider>` |
| Auth Check | `const { userId } = auth()` | `const session = await auth()` |
| User ID | `userId` | `session.user.id` |
| User Button | `<UserButton />` | Custom dropdown menu |
| Sign-in/up | Clerk components | Custom forms |
| Protected Routes | Middleware with `createRouteMatcher` | Middleware with `auth()` callback |

---

**Migration completed successfully! The application is now running with Auth.js authentication.** 🎉
