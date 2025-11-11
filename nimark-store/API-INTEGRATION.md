# API Integration Guide

This document explains how the NIMARK Store communicates with the NIMARK Admin backend.

## Architecture

```
┌─────────────────┐          ┌─────────────────┐
│                 │          │                 │
│  NIMARK STORE   │◄────────►│  NIMARK ADMIN   │
│  (Frontend)     │   API    │   (Backend)     │
│                 │          │                 │
└────────┬────────┘          └────────┬────────┘
         │                            │
         │                            │
    ┌────▼─────┐                 ┌───▼──────┐
    │  Store   │                 │  Admin   │
    │    DB    │                 │    DB    │
    │ (5436)   │                 │  (5435)  │
    └──────────┘                 └──────────┘
```

## Why Separate Databases?

### Security
- Store frontend **never** has direct database access to admin DB
- API keys provide controlled access
- Rate limiting on API endpoints
- Audit trail for all data access

### Scalability
- Store and admin can scale independently
- Different read/write patterns optimized separately
- Store can be cached aggressively
- Admin has transactional consistency

### Separation of Concerns
- **Store DB**: User data, orders, reviews, wishlist
- **Admin DB**: Product catalog, inventory, pricing
- Clear data ownership boundaries

## API Communication

### Authentication

All API requests from store to admin must include an API key:

```typescript
headers: {
  'X-API-Key': process.env.ADMIN_API_KEY,
  'Content-Type': 'application/json'
}
```

### Endpoints Needed in Admin

The admin backend should expose these API endpoints:

#### Products
```
GET    /api/products              - List all products
GET    /api/products/:id          - Get single product
GET    /api/products/search?q=    - Search products
```

#### Categories
```
GET    /api/categories            - List all categories
GET    /api/categories/:id        - Get single category
```

#### Brands
```
GET    /api/brands                - List all brands
GET    /api/brands/:id            - Get single brand
```

#### Billboards
```
GET    /api/billboards            - Get active billboards
GET    /api/billboards/:id        - Get single billboard
```

#### Order Webhooks
```
POST   /api/orders/webhook        - Notify admin of new orders
```

## Implementation in Store

### Using the API Client

```typescript
import { adminProductApi } from '@/lib/admin-api';

// Get all products
const products = await adminProductApi.getProducts();

// Get featured products
const featured = await adminProductApi.getProducts({ 
  isFeatured: true 
});

// Get single product
const product = await adminProductApi.getProduct('product-id');

// Search products
const results = await adminProductApi.searchProducts('laptop');
```

### Example: Product Page

```typescript
// app/product/[id]/page.tsx
import { adminProductApi } from '@/lib/admin-api';

export default async function ProductPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const product = await adminProductApi.getProduct(params.id);
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>${product.price}</p>
      {/* ... */}
    </div>
  );
}
```

### Example: Category Page

```typescript
// app/category/[id]/page.tsx
import { adminCategoryApi, adminProductApi } from '@/lib/admin-api';

export default async function CategoryPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const category = await adminCategoryApi.getCategory(params.id);
  const products = await adminProductApi.getProducts({ 
    categoryId: params.id 
  });
  
  return (
    <div>
      <h1>{category.name}</h1>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

## Admin Backend Setup

### 1. Create API Routes

In `nimark-admin`, create public API routes:

```typescript
// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import prisma from '@/lib/prismadb';

export async function GET(req: Request) {
  try {
    // Verify API key
    const headersList = headers();
    const apiKey = headersList.get('X-API-Key');
    
    if (apiKey !== process.env.ADMIN_API_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('categoryId');
    const isFeatured = searchParams.get('isFeatured');

    const products = await prisma.product.findMany({
      where: {
        isArchived: false,
        ...(categoryId && { categoryId }),
        ...(isFeatured && { isFeatured: true }),
      },
      include: {
        category: true,
        brand: true,
        images: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
```

### 2. Configure CORS

Allow store frontend to access admin API:

```typescript
// middleware.ts in nimark-admin
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Allow store frontend
  const origin = request.headers.get('origin');
  if (origin === process.env.STORE_URL) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, X-API-Key');
  }
  
  return response;
}
```

### 3. Generate API Key

```bash
# Generate secure API key
openssl rand -hex 32

# Add to admin .env
ADMIN_API_KEY="your-generated-api-key"

# Add to store .env
ADMIN_API_KEY="same-api-key"
```

## Caching Strategy

### Server-Side Caching

```typescript
import { cache } from '@/lib/redis';

export async function getCachedProducts() {
  const cacheKey = 'products:all';
  
  // Try cache first
  const cached = await cache.get(cacheKey);
  if (cached) return cached;
  
  // Fetch from API
  const products = await adminProductApi.getProducts();
  
  // Cache for 5 minutes
  await cache.set(cacheKey, products, 300);
  
  return products;
}
```

### Next.js Revalidation

```typescript
// Revalidate every hour
export const revalidate = 3600;

export default async function ProductsPage() {
  const products = await adminProductApi.getProducts();
  // ...
}
```

## Error Handling

```typescript
try {
  const products = await adminProductApi.getProducts();
} catch (error) {
  if (error.message.includes('401')) {
    // Invalid API key
    console.error('API authentication failed');
  } else if (error.message.includes('500')) {
    // Server error
    console.error('Admin API is down');
  } else {
    // Network error
    console.error('Cannot reach admin API');
  }
  
  // Return fallback data or error page
  return <ErrorPage message="Unable to load products" />;
}
```

## Rate Limiting

Implement rate limiting on admin API:

```typescript
// In nimark-admin API routes
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '1 m'),
});

export async function GET(req: Request) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  const { success } = await ratelimit.limit(ip);
  
  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    );
  }
  
  // ... rest of handler
}
```

## Webhooks

### Order Creation Webhook

When a customer places an order in the store, notify admin:

```typescript
// In store checkout
import { adminOrderApi } from '@/lib/admin-api';

async function createOrder(orderData) {
  // Create order in store database
  const order = await prisma.order.create({ data: orderData });
  
  // Notify admin for inventory update
  try {
    await adminOrderApi.createOrder({
      orderNumber: order.orderNumber,
      items: order.items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    });
  } catch (error) {
    console.error('Failed to notify admin:', error);
    // Log for retry later
  }
  
  return order;
}
```

## Environment Variables

### Store (.env)
```bash
ADMIN_API_URL="http://localhost:3001"
ADMIN_API_KEY="your-api-key-here"
```

### Admin (.env)
```bash
ADMIN_API_KEY="your-api-key-here"
STORE_URL="http://localhost:3000"
```

### Production
```bash
# Store
ADMIN_API_URL="https://admin.nimark.com"
ADMIN_API_KEY="production-api-key"

# Admin
ADMIN_API_KEY="production-api-key"
STORE_URL="https://store.nimark.com"
```

## Security Checklist

- [ ] API keys are stored in environment variables
- [ ] API keys are different for dev/staging/production
- [ ] CORS is configured to allow only store origin
- [ ] Rate limiting is enabled on all API routes
- [ ] API requests are logged for audit
- [ ] Sensitive data is not exposed in API responses
- [ ] SSL/TLS is enforced in production
- [ ] API versioning is implemented (/api/v1/)
- [ ] Error messages don't leak implementation details
- [ ] Webhooks have signature verification

## Monitoring

### Log All API Calls

```typescript
// lib/admin-api.ts
async function adminApiRequest<T>(endpoint: string, options: RequestOptions = {}) {
  const startTime = Date.now();
  
  try {
    const response = await fetch(url, options);
    const duration = Date.now() - startTime;
    
    console.log({
      endpoint,
      method: options.method,
      status: response.status,
      duration,
    });
    
    return await response.json();
  } catch (error) {
    console.error('API call failed:', { endpoint, error });
    throw error;
  }
}
```

## Next Steps

1. Implement API routes in `nimark-admin`
2. Test API endpoints with Postman
3. Update store actions to use API client
4. Implement caching strategy
5. Set up monitoring and logging
6. Configure production API keys
7. Test error handling and fallbacks
