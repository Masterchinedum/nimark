# Nimark E-Commerce Platform

A modern, full-stack e-commerce platform built with Next.js 16, React 19, and TypeScript.

## 📁 Project Structure

This is a monorepo containing:

### 🔧 nimark-admin
**Admin Dashboard & Backend API** (Updated 2025)
- Multi-tenant store management
- Product, category, brand management
- Prisma + PostgreSQL database
- NextAuth 5 authentication
- Paystack & Stripe integration
- Cloudinary image management
- Revenue analytics & reporting

**Tech Stack:** Next.js 16, React 19, Prisma 6, TypeScript 5.9

[📖 Admin Documentation](./nimark-admin/README.md)

---

### 🛍️ nimark-store
**Customer-Facing Storefront** (New - 2025)
- Modern shopping experience
- Product browsing & filtering
- Shopping cart with persistence
- Checkout integration
- Responsive design
- Image galleries

**Tech Stack:** Next.js 16, React 19, Zustand, shadcn/ui, TypeScript 5.9

[📖 Store Documentation](./nimark-store/README.md) | [🚀 Setup Guide](./nimark-store/SETUP.md)

---

## 🚀 Quick Start

### 1. Start the Admin Backend

```bash
cd nimark-admin
npm install
npm run dev
# Runs on http://localhost:3000
```

### 2. Start the Storefront

```bash
cd nimark-store
npm install

# Configure .env.local with your store ID
echo "NEXT_PUBLIC_API_URL=http://localhost:3000/api" > .env.local
echo "NEXT_PUBLIC_STORE_ID=your-store-id" >> .env.local

npm run dev
# Runs on http://localhost:3001
```

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     CUSTOMERS                            │
│                         ↓                                │
│              nimark-store (Port 3001)                    │
│         Next.js 16 | React 19 | TypeScript               │
│    Product Browsing | Cart | Checkout | Filters          │
└────────────────────────┬────────────────────────────────┘
                         │ API Calls
                         ↓
┌─────────────────────────────────────────────────────────┐
│              nimark-admin (Port 3000)                    │
│         Next.js 16 | Prisma | PostgreSQL                 │
│    Product Management | Orders | Analytics               │
│         ↓                                                 │
│   PostgreSQL Database (Products, Orders, etc.)           │
└─────────────────────────────────────────────────────────┘
```

## 📊 Technology Stack

| Layer | Admin | Store |
|-------|-------|-------|
| **Framework** | Next.js 16 | Next.js 16 |
| **React** | 19.2 | 19.2 |
| **TypeScript** | 5.9 | 5.9 |
| **Styling** | Tailwind 4 | Tailwind 4 |
| **UI Components** | Radix UI | shadcn/ui |
| **State** | Zustand | Zustand |
| **Database** | Prisma + PostgreSQL | - |
| **Auth** | NextAuth 5 | - |
| **Payments** | Paystack + Stripe | API Integration |
| **Images** | Cloudinary | Next/Image |

## 🎯 Features

### Admin Dashboard
- ✅ Multi-store management
- ✅ Product CRUD with variants
- ✅ Category & brand management
- ✅ Color & size attributes
- ✅ Order management
- ✅ Revenue analytics
- ✅ Image uploads (Cloudinary)
- ✅ Payment processing
- ✅ User authentication

### Customer Store
- ✅ Product browsing
- ✅ Category filtering
- ✅ Color & size filters
- ✅ Product detail pages
- ✅ Image galleries
- ✅ Shopping cart
- ✅ Persistent cart storage
- ✅ Quantity management
- ✅ Checkout integration
- ✅ Mobile responsive
- ✅ Toast notifications

## 🔧 Development

### Prerequisites
- Node.js 18+
- PostgreSQL (for admin)
- npm or yarn

### Environment Variables

**nimark-admin (.env):**
```env
DATABASE_URL="postgresql://..."
AUTH_SECRET="your-secret"
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
PAYSTACK_SECRET_KEY="..."
STRIPE_SECRET_KEY="..."
```

**nimark-store (.env.local):**
```env
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
NEXT_PUBLIC_STORE_ID="your-store-id"
```

## 📱 Ports

- **Admin**: http://localhost:3000
- **Store**: http://localhost:3001

## 🚢 Deployment

### Deploy Admin (Vercel)
1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Set up PostgreSQL database
5. Deploy!

### Deploy Store (Vercel)
1. Push to GitHub
2. Import in Vercel
3. Add `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_STORE_ID`
4. Deploy!

Both can be deployed to Vercel, Netlify, or any platform supporting Next.js.

## 📖 Documentation

- [Admin Setup Guide](./nimark-admin/SETUP.md)
- [Admin README](./nimark-admin/README.md)
- [Store Setup Guide](./nimark-store/SETUP.md)
- [Store README](./nimark-store/README.md)
- [Store Project Summary](./nimark-store/PROJECT-SUMMARY.md)

## 🗂️ What Happened to Old Frontends?

This project previously had two outdated frontends:
- ❌ **nimark-client** (Next.js 14, outdated) - Deleted
- ❌ **nimark-front** (Next.js 14, incomplete) - Deleted

They have been replaced with:
- ✅ **nimark-store** (Next.js 16, modern, complete)

## 🎨 Customization

### Change Brand Name
- Admin: Update in `nimark-admin/components/navbar.tsx`
- Store: Update in `nimark-store/components/layout/navbar.tsx`

### Change Colors
- Both: Edit `globals.css` CSS variables

### Add Logo
- Add to `public/` folder
- Update navbar components

## 🐛 Troubleshooting

### Admin won't start
- Check PostgreSQL is running
- Verify DATABASE_URL
- Run `npx prisma generate`
- Run `npx prisma db push`

### Store shows no products
- Verify admin is running
- Check NEXT_PUBLIC_API_URL
- Confirm NEXT_PUBLIC_STORE_ID is correct
- Add products in admin first

### Images not loading
- Check Cloudinary config in admin
- Verify images are uploaded
- Check `next.config.ts` remotePatterns

## 📞 Support

- Check documentation in each folder
- Review browser console for errors
- Check Network tab for API issues
- Verify environment variables

## 🎉 Latest Updates (November 2025)

- ✅ Updated nimark-admin to Next.js 16 & React 19
- ✅ Created brand new nimark-store from scratch
- ✅ Removed outdated frontends
- ✅ Modern TypeScript throughout
- ✅ Production-ready architecture
- ✅ Comprehensive documentation

## 📄 License

MIT

---

**Built with ❤️ using Next.js 16, React 19, and TypeScript**