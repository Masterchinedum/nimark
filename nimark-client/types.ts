// types.ts

// Utility type for API responses
export type ApiResponse<T> = {
    data: T;
    error?: string;
  };
  
  export interface Store {
    id: string;
    name: string;
    userId: string;
    billboards: Billboard[];
    categories: Category[];
    products: Product[];
    sizes: Size[];
    colors: Color[];
    brands: Brand[];
    orders: Order[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Billboard {
    id: string;
    storeId: string;
    store: Store;
    label: string;
    imageUrl: string;
    categories: Category[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Category {
    id: string;
    storeId: string;
    store: Store;
    billboardId: string;
    billboard: Billboard;
    name: string;
    parentId: string | null;
    parent: Category | null;
    children: Category[];
    products: Product[];
    properties: Record<string, any> | null;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Product {
    id: string;
    storeId: string;
    store: Store;
    categoryId: string;
    category: Category;
    properties: Record<string, any> | null;
    name: string;
    description: string | null;
    price: number;
    stock: number;
    isFeatured: boolean;
    isArchived: boolean;
    relatedTo: Product[];
    relatedFrom: Product[];
    sizeId: string;
    size: Size;
    colorId: string;
    color: Color;
    brandId: string | null;
    brand: Brand | null;
    images: Image[];
    orderItems: OrderItem[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Size {
    id: string;
    storeId: string;
    store: Store;
    name: string;
    value: string;
    products: Product[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Color {
    id: string;
    storeId: string;
    store: Store;
    name: string;
    value: string;
    products: Product[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Brand {
    id: string;
    storeId: string;
    store: Store;
    name: string;
    imageUrl: string;
    isDefault: boolean;
    products: Product[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Order {
    id: string;
    storeId: string;
    store: Store;
    orderItems: OrderItem[];
    isPaid: boolean;
    phone: string;
    address: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface OrderItem {
    id: string;
    orderId: string;
    order: Order;
    productId: string;
    product: Product;
    quantity: number;
  }
  
  export interface Image {
    id: string;
    productId: string;
    product: Product;
    url: string;
    createdAt: string;
    updatedAt: string;
  }
  
  // Utility types for API requests and responses
  export type GetBillboardsResponse = ApiResponse<Billboard[]>;
  export type GetBillboardResponse = ApiResponse<Billboard>;
  
  export type GetCategoriesResponse = ApiResponse<Category[]>;
  export type GetCategoryResponse = ApiResponse<Category>;
  
  export type GetProductsResponse = ApiResponse<Product[]>;
  export type GetProductResponse = ApiResponse<Product>;
  
  export type GetSizesResponse = ApiResponse<Size[]>;
  export type GetColorsResponse = ApiResponse<Color[]>;
  export type GetBrandsResponse = ApiResponse<Brand[]>;
  
  export type GetOrdersResponse = ApiResponse<Order[]>;
  export type GetOrderResponse = ApiResponse<Order>;
  
  // Utility types for filtering and pagination
  export interface PaginationParams {
    page?: number;
    limit?: number;
  }
  
  export interface ProductFilterParams extends PaginationParams {
    categoryId?: string;
    sizeId?: string;
    colorId?: string;
    brandId?: string;
    isFeatured?: boolean;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: 'price' | 'createdAt';
    sortOrder?: 'asc' | 'desc';
  }
  
  // Utility type for create/update operations
  export type WithoutId<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
  
  export type CreateProductInput = Omit<WithoutId<Product>, 'store' | 'category' | 'size' | 'color' | 'brand' | 'images' | 'orderItems' | 'relatedTo' | 'relatedFrom'> & {
    images: string[];
  };
  
  export type UpdateProductInput = Partial<CreateProductInput>;
  
  export type CreateOrderInput = Omit<WithoutId<Order>, 'store' | 'orderItems'> & {
    orderItems: {
      productId: string;
      quantity: number;
    }[];
  };