# Nimark Store - Quick Setup Guide

## 🎯 What is this?

**Nimark Store** is the customer-facing storefront where shoppers browse and buy products. It connects to your **Nimark Admin** backend to display products, handle carts, and process checkouts.

## 📋 Prerequisites

Before setting up the store, make sure you have:

1. ✅ **Nimark Admin** running and accessible
2. ✅ At least one **store created** in admin
3. ✅ Some **products, categories, colors, and sizes** added in admin
4. ✅ **Node.js 18+** installed
5. ✅ **npm** or **yarn** installed

## 🚀 Setup Steps

### Step 1: Install Dependencies

```bash
cd nimark-store
npm install
```

### Step 2: Configure Your Store

1. Create `.env.local` file in the root:
   ```bash
   cp .env.local.example .env.local
   ```
   (Or just create it manually)

2. Edit `.env.local`:
   ```env
   # Your admin API URL (usually http://localhost:3000/api)
   NEXT_PUBLIC_API_URL=http://localhost:3000/api

   # Your store ID from admin (get this from admin dashboard)
   NEXT_PUBLIC_STORE_ID=your-store-id-here
   ```

### Step 3: Get Your Store ID

**Option A - From Admin URL:**
1. Open Nimark Admin in browser
2. Navigate to any page in your store
3. Look at the URL: `http://localhost:3000/abc123-xyz/products`
4. Copy the part after the first slash: `abc123-xyz`
5. That's your Store ID!

**Option B - From Admin Dashboard:**
1. Go to Settings → Store Settings
2. Copy the Store ID shown there

### Step 4: Update .env.local

Paste your Store ID:
```env
NEXT_PUBLIC_STORE_ID=abc123-xyz-your-actual-store-id
```

### Step 5: Run the Store

```bash
npm run dev
```

The store will start at: **http://localhost:3001**

### Step 6: Test It Out

1. Open **http://localhost:3001** in your browser
2. You should see your store's homepage
3. Click on categories in the navigation
4. Browse products
5. Add items to cart
6. Try the checkout flow

## 🔧 Configuration Options

### Change Port

If port 3001 is busy, change it:

```bash
PORT=3002 npm run dev
```

### Production Build

```bash
npm run build
npm start
```

### Connect to Production Admin

Update `.env.local`:
```env
NEXT_PUBLIC_API_URL=https://your-admin-domain.com/api
NEXT_PUBLIC_STORE_ID=your-store-id
```

## 🐛 Troubleshooting

### "No products found"

**Causes:**
- Admin backend is not running
- Wrong `NEXT_PUBLIC_API_URL`
- Wrong `NEXT_PUBLIC_STORE_ID`
- No products added in admin

**Fix:**
1. Start nimark-admin: `cd ../nimark-admin && npm run dev`
2. Verify environment variables are correct
3. Add products in admin dashboard
4. Refresh the store

### Images not showing

**Causes:**
- Images not uploaded in admin
- Cloudinary not configured in admin

**Fix:**
1. Upload images via Nimark Admin
2. Check Cloudinary configuration in admin
3. Verify `next.config.ts` has Cloudinary in `remotePatterns`

### Cart not working

**Causes:**
- Browser localStorage disabled
- JavaScript errors

**Fix:**
1. Open browser console (F12)
2. Check for errors
3. Clear localStorage: `localStorage.clear()`
4. Refresh page

### API connection errors

**Causes:**
- Admin not running
- Wrong URL
- CORS issues

**Fix:**
1. Verify admin is running: `http://localhost:3000`
2. Check `NEXT_PUBLIC_API_URL` includes `/api` at the end
3. Check admin CORS settings

## 📱 Mobile Testing

Test on mobile:
```bash
# Get your local IP
ipconfig getifaddr en0  # macOS
# or
hostname -I  # Linux

# Access from mobile browser
http://YOUR-IP:3001
```

## 🎨 Customization

### Change Store Name

Edit `components/layout/navbar.tsx`:
```tsx
<p className="text-xl font-bold">YOUR STORE NAME</p>
```

### Change Colors

Edit `app/globals.css` - update CSS variables.

### Add Logo

1. Add logo to `public/logo.png`
2. Update navbar to use Image component
3. Point to `/logo.png`

## 🚢 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `NEXT_PUBLIC_API_URL`
   - `NEXT_PUBLIC_STORE_ID`
5. Click Deploy!

### Deploy to Netlify

1. Build command: `npm run build`
2. Publish directory: `.next`
3. Add environment variables
4. Deploy!

## 📞 Need Help?

- Check the main [README.md](./README.md) for more details
- Review [Nimark Admin docs](../nimark-admin/README.md)
- Check browser console for errors
- Verify API endpoints in Network tab

## ✅ Checklist

- [ ] Dependencies installed (`npm install`)
- [ ] `.env.local` file created
- [ ] `NEXT_PUBLIC_API_URL` configured
- [ ] `NEXT_PUBLIC_STORE_ID` configured
- [ ] Admin backend is running
- [ ] Products exist in admin
- [ ] Store starts successfully (`npm run dev`)
- [ ] Homepage loads
- [ ] Products display correctly
- [ ] Cart works
- [ ] Categories work

## 🎉 You're All Set!

Your Nimark Store is now ready to accept customers! Make sure your Nimark Admin is always running when the store is live.

**Happy Selling! 🛍️**
