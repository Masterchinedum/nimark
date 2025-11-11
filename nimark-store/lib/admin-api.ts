/**
 * Admin API Client
 * 
 * Secure API communication with nimark-admin backend
 * Never directly access admin database - use API endpoints
 */

const ADMIN_API_URL = process.env.ADMIN_API_URL || 'http://localhost:3001';
const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

/**
 * Make authenticated request to admin API
 */
async function adminApiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { params, ...fetchOptions } = options;

  // Build URL with query parameters
  const url = new URL(endpoint, ADMIN_API_URL);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  // Add authentication header
  const headers = new Headers(fetchOptions.headers);
  if (ADMIN_API_KEY) {
    headers.set('X-API-Key', ADMIN_API_KEY);
  }
  headers.set('Content-Type', 'application/json');

  try {
    const response = await fetch(url.toString(), {
      ...fetchOptions,
      headers,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Admin API Error: ${response.status} - ${error}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Admin API request failed:', error);
    throw error;
  }
}

/**
 * Product API
 */
export const adminProductApi = {
  /**
   * Get all products
   */
  async getProducts(params?: {
    categoryId?: string;
    brandId?: string;
    isFeatured?: boolean;
    isArchived?: boolean;
  }) {
    return adminApiRequest('/api/products', {
      method: 'GET',
      params: params as Record<string, string>,
    });
  },

  /**
   * Get single product by ID
   */
  async getProduct(id: string) {
    return adminApiRequest(`/api/products/${id}`, {
      method: 'GET',
    });
  },

  /**
   * Search products
   */
  async searchProducts(query: string) {
    return adminApiRequest('/api/products/search', {
      method: 'GET',
      params: { q: query },
    });
  },
};

/**
 * Category API
 */
export const adminCategoryApi = {
  /**
   * Get all categories
   */
  async getCategories() {
    return adminApiRequest('/api/categories', {
      method: 'GET',
    });
  },

  /**
   * Get single category by ID
   */
  async getCategory(id: string) {
    return adminApiRequest(`/api/categories/${id}`, {
      method: 'GET',
    });
  },
};

/**
 * Brand API
 */
export const adminBrandApi = {
  /**
   * Get all brands
   */
  async getBrands() {
    return adminApiRequest('/api/brands', {
      method: 'GET',
    });
  },

  /**
   * Get single brand by ID
   */
  async getBrand(id: string) {
    return adminApiRequest(`/api/brands/${id}`, {
      method: 'GET',
    });
  },
};

/**
 * Billboard API
 */
export const adminBillboardApi = {
  /**
   * Get active billboards
   */
  async getBillboards() {
    return adminApiRequest('/api/billboards', {
      method: 'GET',
    });
  },

  /**
   * Get single billboard by ID
   */
  async getBillboard(id: string) {
    return adminApiRequest(`/api/billboards/${id}`, {
      method: 'GET',
    });
  },
};

/**
 * Order Webhook (Admin notifies store of inventory changes)
 */
export const adminOrderApi = {
  /**
   * Create order in admin system (for inventory management)
   */
  async createOrder(orderData: {
    orderNumber: string;
    items: Array<{
      productId: string;
      quantity: number;
    }>;
  }) {
    return adminApiRequest('/api/orders/webhook', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },
};
