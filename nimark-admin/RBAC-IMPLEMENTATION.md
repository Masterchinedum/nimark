# Multi-Vendor Role-Based Access Control (RBAC) Implementation

## Overview

The nimark-admin platform has been restructured to support a true multi-vendor marketplace with role-based access control. The system now distinguishes between **Admins** and **Vendors**, with different levels of access and capabilities.

## Key Changes

### 1. Role System

#### User Roles
- **ADMIN**: Full platform access
  - Can view all stores, users, and products across the platform
  - Can create and manage taxonomy (billboards, categories, colors, brands, sizes)
  - Has administrative dashboard with platform-wide analytics
  - Can access any vendor's store

- **VENDOR** (default role): Limited store access
  - Can only view and manage their own store(s)
  - Can create and manage products and orders
  - **Cannot** create or modify taxonomy (must use existing options)
  - Standard store dashboard with store-specific analytics

### 2. Database Schema Updates

Added `Role` enum and `User.role` field:

```prisma
enum Role {
  ADMIN
  VENDOR
}

model User {
  // ... existing fields
  role          Role      @default(VENDOR)
}
```

### 3. Authentication & Authorization

#### Enhanced Auth Helpers (`lib/auth-helpers.ts`)

- `requireAuth()` - Basic authentication check
- `requireAdmin()` - Requires ADMIN role (403 if not admin)
- `requireVendorOrAdmin()` - Allows both roles
- `assertStoreAccess(userId, storeId, role)` - Validates store ownership (admins bypass)

#### Session Updates
- JWT and session now include user role
- Role is available throughout the application via `session.user.role`

### 4. API Route Protection

#### Admin-Only Resources (POST/PATCH/DELETE)
All taxonomy creation/modification requires ADMIN role:
- `/api/[storeId]/billboards/*`
- `/api/[storeId]/categories/*`
- `/api/[storeId]/colors/*`
- `/api/[storeId]/brands/*`
- `/api/[storeId]/sizes/*`

#### Vendor-Accessible Resources
Vendors can manage:
- `/api/[storeId]/products/*` - Create, update, delete products
- `/api/[storeId]/orders/*` - View and manage orders

#### Admin Store Access
Admins can access and manage any store using `assertStoreAccess()` which grants full access based on role.

### 5. Admin Dashboard

New admin-exclusive routes at `/admin`:

- **`/admin`** - Platform overview with statistics:
  - Total users
  - Total stores
  - Total products
  - Total orders

- **`/admin/users`** - User management:
  - View all registered users
  - See user roles (ADMIN/VENDOR badge)
  - See store count per user
  - Sortable and searchable table

- **`/admin/stores`** - Store management:
  - View all vendor stores
  - See store owners and contact info
  - Product and order counts per store
  - Quick link to access any store

### 6. Navigation Updates

#### Role-Based Menu
Navigation automatically adjusts based on user role:

**Admin sees:**
- Admin Dashboard
- Users
- All Stores
- [When viewing a store] All taxonomy + products/orders

**Vendor sees:**
- [Only their store(s)]
- Products
- Orders
- Settings
- **No access to:** Billboards, Categories, Colors, Brands, Sizes

#### Enhanced UI
- User role badge in profile dropdown
- Store switcher shows all stores for admins
- Responsive navigation with mobile support

## Getting Started

### Initial Admin Setup

An admin user has been created with the following credentials:

```
Email: admin@nimark.com
Password: admin123
```

**⚠️ IMPORTANT:** Change this password immediately after first login!

### Creating Additional Admins

To promote an existing user to admin, update their role in the database:

```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'user@example.com';
```

Or run the seed script:

```bash
npx tsx scripts/seed-admin.ts
```

### For Vendors

New vendor accounts are created with the default `VENDOR` role through:
1. Standard sign-up flow
2. OAuth (Google) authentication

Vendors will only see their own stores and have limited access to taxonomy resources.

## Architecture Decisions

### Store-Scoped Taxonomy
Current implementation keeps taxonomy (billboards, categories, etc.) **store-scoped** but **admin-managed**. This allows:
- Each store to have custom taxonomy
- Centralized control by admins
- Consistency across vendor products

**Alternative consideration:** Global taxonomy shared across all stores (would require schema changes to remove `storeId` from taxonomy models).

### Access Control Pattern
Uses a two-layer approach:
1. **Role check** via `requireAdmin()` / `requireVendorOrAdmin()`
2. **Store ownership** via `assertStoreAccess()` (admins bypass)

This ensures:
- Clean separation of concerns
- Easy to extend with new roles
- Admins can debug/manage any store

## Testing

### Admin Access
1. Login as admin: `admin@nimark.com` / `admin123`
2. Navigate to `/admin` - should see platform dashboard
3. Try accessing `/admin/users` and `/admin/stores`
4. View any vendor store via store switcher

### Vendor Access
1. Create new account (will be VENDOR by default)
2. Create a store
3. Try to access taxonomy pages - should see Products, Orders, Settings only
4. Try to create a product - should work
5. Try to access `/admin` - should be redirected

### API Protection
Test taxonomy creation as vendor (should return 403):
```bash
# As vendor, should fail
POST /api/[storeId]/billboards
```

## Migration Guide

### Existing Users
All existing users have been assigned the `VENDOR` role by default. To convert to admin, update the database as shown above.

### Existing Stores
All existing stores remain unchanged and accessible to their owners. Admins can now view all stores.

### Breaking Changes
- Navigation components now require `userRole` prop
- Auth helpers return both `userId` and `role`
- Store ownership checks now use `assertStoreAccess()`

## Future Enhancements

1. **Role Management UI** - Allow admins to change user roles via dashboard
2. **Permissions System** - Fine-grained permissions beyond just roles
3. **Store Approval** - Require admin approval for new stores
4. **Vendor Analytics** - Limited analytics for vendors
5. **Global Taxonomy** - Option to share taxonomy across stores
6. **Multi-Store Admins** - Allow vendors to have multiple admins for their stores

## File Structure

```
nimark-admin/
├── app/
│   ├── (dashboard)/
│   │   ├── admin/                    # Admin-only routes
│   │   │   ├── layout.tsx           # Admin role guard
│   │   │   ├── page.tsx             # Platform overview
│   │   │   ├── users/               # User management
│   │   │   └── stores/              # Store management
│   │   └── [storeId]/               # Store routes (role-aware)
│   └── api/
│       └── [storeId]/
│           ├── billboards/          # Admin-only (POST/PATCH/DELETE)
│           ├── categories/          # Admin-only (POST/PATCH/DELETE)
│           ├── colors/              # Admin-only (POST/PATCH/DELETE)
│           ├── brands/              # Admin-only (POST/PATCH/DELETE)
│           ├── sizes/               # Admin-only (POST/PATCH/DELETE)
│           └── products/            # Vendor + Admin access
├── components/
│   ├── main-nav.tsx                 # Updated with role-based routing
│   ├── VerticalMainNav.tsx          # Mobile nav with roles
│   ├── navbar.tsx                   # Fetches stores based on role
│   └── ClientNavbar.tsx             # Displays role badge
├── lib/
│   └── auth-helpers.ts              # Enhanced with role guards
├── prisma/
│   └── schema.prisma                # Added Role enum
└── scripts/
    └── seed-admin.ts                # Admin user seeding
```

## Support & Troubleshooting

### Cannot access admin dashboard
- Verify your user role in the database
- Check that you're logged in with the correct account
- Clear browser cache and cookies

### Vendor cannot create products
- Ensure taxonomy exists (admin must create first)
- Check that the store belongs to the vendor
- Verify API authentication headers

### Store switcher empty for admin
- Check database connection
- Verify stores exist in the database
- Review server logs for errors

## Security Notes

1. **Password Security**: Change default admin password immediately
2. **Role Validation**: All protected routes verify role server-side
3. **Store Isolation**: Vendors cannot access other vendors' data
4. **API Protection**: All mutations require authentication + role check
5. **Session Security**: Role is stored in JWT and validated on each request

---

**Version:** 1.0.0  
**Last Updated:** November 15, 2025  
**Migration:** Completed with zero downtime
