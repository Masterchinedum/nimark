//nimark-front/types/products.ts

export interface Product {
    id: string;
    name: string;
    description: string | null;
    price: number;
    stock: number;
    isFeatured: boolean;
    isArchived: boolean;
    categoryId: string;
    category: {
      id: string;
      name: string;
    };
    sizeId: string;
    size: {
      id: string;
      name: string;
      value: string;
    };
    colorId: string;
    color: {
      id: string;
      name: string;
      value: string;
    };
    brandId: string | null;
    brand: {
      id: string;
      name: string;
      imageUrl: string;
    } | null;
    images: {
      id: string;
      url: string;
    }[];
    properties: Record<string, string | number | boolean> | null;
  }

  export interface ProductImage {
    id: string;
    url: string;
  }
  
  export interface ProductDetails {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    brand?: {
      name: string;
    };
    color: {
      name: string;
    };
    size: {
      value: string;
    };
    images: ProductImage[];
    properties?: Record<string, string | number | boolean>;
  }