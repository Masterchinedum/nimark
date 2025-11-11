# 🚀 Get Started with Nimark

Complete checklist to get your Nimark e-commerce platform running.

## ✅ Setup Checklist

### 📋 Prerequisites
- [ ] Node.js 18+ installed
- [ ] npm installed
- [ ] PostgreSQL installed and running
- [ ] Cloudinary account created
- [ ] Code editor (VS Code recommended)

---

## 🔧 Part 1: Nimark Admin Setup

### 1. Database Setup
```bash
cd nimark-admin
```

- [ ] Create PostgreSQL database
- [ ] Copy `.env.example` to `.env` (if exists)
- [ ] Add `DATABASE_URL` to `.env`:
  ```env
  DATABASE_URL="postgresql://user:password@localhost:5432/nimark"
  ```

### 2. Install & Configure

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push
```

- [ ] Dependencies installed
- [ ] Prisma client generated
- [ ] Database schema created

### 3. Environment Variables

Add to `.env`:
```env
# Database
DATABASE_URL="postgresql://..."

# Auth
AUTH_SECRET="run: openssl rand -base64 32"

# Cloudinary (get from cloudinary.com)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Payment (optional for now)
PAYSTACK_SECRET_KEY="sk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
```

- [ ] All environment variables added
- [ ] AUTH_SECRET generated
- [ ] Cloudinary credentials added

### 4. Start Admin

```bash
npm run dev
```

- [ ] Server starts successfully
- [ ] Accessible at http://localhost:3000
- [ ] No errors in terminal

### 5. Create Your First Store

1. [ ] Open http://localhost:3000
2. [ ] Sign up / Create admin account
3. [ ] Create your first store
4. [ ] **Copy your Store ID** (you'll need this!)
5. [ ] Add some test categories
6. [ ] Add some test products
7. [ ] Upload product images

**Your Store ID**: `____________________` ← Write it here!

---

## 🛍️ Part 2: Nimark Store Setup

### 1. Configure Environment

```bash
cd ../nimark-store
```

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_STORE_ID=your-store-id-from-admin
```

- [ ] `.env.local` created
- [ ] API URL is correct
- [ ] Store ID copied from admin

### 2. Install Dependencies

```bash
npm install
```

- [ ] Dependencies installed successfully

### 3. Start Store

```bash
npm run dev
```

- [ ] Server starts successfully
- [ ] Accessible at http://localhost:3001
- [ ] No errors in terminal

### 4. Test the Store

1. [ ] Open http://localhost:3001
2. [ ] Homepage loads
3. [ ] Products are visible
4. [ ] Can click on categories
5. [ ] Can view product details
6. [ ] Can add items to cart
7. [ ] Cart icon shows count
8. [ ] Can view cart page

---

## 🎯 Next Steps

### Data Setup (in Admin)
- [ ] Add more categories
- [ ] Add colors (e.g., Black, White, Red)
- [ ] Add sizes (e.g., Small, Medium, Large)
- [ ] Add brands (e.g., Apple, Samsung, HP)
- [ ] Upload product images
- [ ] Create featured products
- [ ] Add product descriptions

### Store Testing
- [ ] Test filtering by category
- [ ] Test filtering by color
- [ ] Test filtering by size
- [ ] Test add to cart
- [ ] Test quantity changes
- [ ] Test remove from cart
- [ ] Test mobile responsive
- [ ] Test on different browsers

### Optional Enhancements
- [ ] Set up payment (Paystack/Stripe)
- [ ] Test checkout flow
- [ ] Customize brand name
- [ ] Customize colors/theme
- [ ] Add store logo
- [ ] Update metadata/SEO

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot connect to database"
**Solution:**
- Check PostgreSQL is running
- Verify DATABASE_URL is correct
- Try: `psql -U postgres` to test connection

### Issue: "Module not found"
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Port already in use"
**Solution:**
```bash
# Admin (change port)
PORT=3002 npm run dev

# Store (edit package.json scripts)
# Change --port 3001 to --port 3002
```

### Issue: "No products showing in store"
**Solution:**
1. Check admin is running
2. Verify NEXT_PUBLIC_API_URL is correct
3. Verify NEXT_PUBLIC_STORE_ID is correct
4. Add products in admin first
5. Check browser console for errors

### Issue: "Images not loading"
**Solution:**
1. Upload images via admin dashboard
2. Check Cloudinary credentials
3. Verify `next.config.ts` has Cloudinary domain

---

## 📚 Documentation Reference

- **Admin Setup**: [nimark-admin/SETUP.md](./nimark-admin/SETUP.md)
- **Store Setup**: [nimark-store/SETUP.md](./nimark-store/SETUP.md)
- **Store Summary**: [nimark-store/PROJECT-SUMMARY.md](./nimark-store/PROJECT-SUMMARY.md)
- **Main README**: [README.md](./README.md)

---

## 🎊 Success Criteria

You're all set when:

- ✅ Admin runs on http://localhost:3000
- ✅ Store runs on http://localhost:3001
- ✅ Can create products in admin
- ✅ Products appear in store
- ✅ Can add items to cart
- ✅ Cart persists on refresh
- ✅ Images load correctly
- ✅ Mobile view works

---

## 💡 Pro Tips

1. **Always start admin first** - Store needs admin API
2. **Keep store ID safe** - You'll need it for deployment
3. **Test on mobile** - Most customers shop on phones
4. **Use featured products** - They appear on homepage
5. **Add good images** - They make or break sales
6. **Test checkout** - Even if not using real payments yet

---

## 🚀 Ready to Deploy?

Once everything works locally:

1. Push code to GitHub
2. Deploy admin to Vercel (with PostgreSQL)
3. Deploy store to Vercel
4. Update store's `NEXT_PUBLIC_API_URL` to production URL
5. Test thoroughly
6. Go live! 🎉

---

**Need Help?** Check the documentation files or review browser console for specific errors.

**Happy Building! 🛍️**
