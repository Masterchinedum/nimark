# Nimark Admin - Setup Complete! 🎉

This is the admin dashboard for Nimark, built with Next.js 14, Auth.js, and PostgreSQL.

## ✅ What's Been Set Up

- ✅ PostgreSQL database running in Docker (port 5433)
- ✅ Auth.js (NextAuth v5) for authentication
- ✅ Prisma ORM with database schema
- ✅ All dependencies installed
- ✅ Environment variables configured

## 🚀 Quick Start

### 1. Start the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### 2. Create Your First Account

1. Navigate to [http://localhost:3000/sign-up](http://localhost:3000/sign-up)
2. Create an account with your email and password
3. You'll be automatically signed in

## 🗄️ Database

### Docker Container

The PostgreSQL database is running in a Docker container:

```bash
# View container status
docker ps

# Stop the database
docker-compose down

# Start the database
docker-compose up -d

# View logs
docker-compose logs -f
```

### Database Connection

- **Host**: localhost
- **Port**: 5433
- **Database**: nimark_admin
- **Username**: nimark
- **Password**: nimark_password

### Prisma Commands

```bash
# View your data in Prisma Studio
npx prisma studio

# Push schema changes to database
npx prisma db push

# Generate Prisma Client
npx prisma generate

# Reset database (WARNING: Deletes all data)
npx prisma db push --force-reset
```

## 🔐 Authentication

### Auth.js (NextAuth v5)

The app uses Auth.js with the following providers:

1. **Credentials (Email/Password)** - Ready to use
2. **Google OAuth** - Requires setup (optional)

### Setting up Google OAuth (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to `.env`:

```env
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
```

## 📦 Environment Variables

The `.env` file has been created with:

- ✅ Database connection string
- ✅ Auth.js secret (generated)
- 🔴 Cloudinary settings (needs your keys)
- 🔴 Stripe keys (needs your keys)
- 🔴 Paystack keys (needs your keys)

### Required External Services

You'll need to sign up for these services and add their keys:

1. **Cloudinary** (for image uploads)
   - Sign up at: https://cloudinary.com
   - Get your Cloud Name from the dashboard
   - Add to `.env`: `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`

2. **Stripe** (for payments)
   - Sign up at: https://stripe.com
   - Get API keys from: https://dashboard.stripe.com/apikeys
   - Add to `.env`: `STRIPE_API_KEY` and `STRIPE_WEBHOOK_SECRET`

3. **Paystack** (alternative payment provider)
   - Sign up at: https://paystack.com
   - Get secret key from: https://dashboard.paystack.com/#/settings/developer
   - Add to `.env`: `PAYSTACK_SECRET_KEY`

## 🏗️ Project Structure

```
nimark-admin/
├── app/
│   ├── (auth)/          # Authentication pages (sign-in, sign-up)
│   ├── (dashboard)/     # Protected dashboard routes
│   ├── (root)/          # Root layout
│   └── api/             # API routes
├── components/          # React components
├── lib/                 # Utility functions
├── prisma/             # Database schema
├── auth.ts             # Auth.js configuration
├── middleware.ts       # Route protection
└── .env                # Environment variables
```

## 📝 Database Schema

The database includes models for:

- **User** - User accounts with authentication
- **Store** - Multi-store support
- **Product** - Products with variants
- **Category** - Product categories with hierarchy
- **Billboard** - Homepage banners
- **Order** - Customer orders
- **Size, Color, Brand** - Product attributes
- **Image** - Product images

## 🔒 Protected Routes

All routes are protected by default except:
- `/sign-in` - Sign in page
- `/sign-up` - Sign up page
- `/api/*` - API routes (some may have their own auth)

## 🐛 Troubleshooting

### Port 5432 Already in Use

The database is configured to use port 5433 to avoid conflicts with local PostgreSQL installations.

### Database Connection Issues

```bash
# Check if container is running
docker ps

# Restart the container
docker-compose restart

# View container logs
docker-compose logs postgres
```

### Authentication Not Working

1. Make sure `AUTH_SECRET` is set in `.env`
2. Clear your browser cookies
3. Restart the development server

## 📚 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Authentication**: Auth.js (NextAuth v5)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Payment**: Stripe + Paystack
- **Image Upload**: Cloudinary

## 🎯 Next Steps

1. ✅ Start the dev server: `npm run dev`
2. ✅ Create your first account at `/sign-up`
3. 🔲 Add Cloudinary credentials for image uploads
4. 🔲 Add Stripe/Paystack keys for payments
5. 🔲 Create your first store
6. 🔲 Add products and start selling!

## 📖 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Auth.js Documentation](https://authjs.dev)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

Happy coding! 🚀
