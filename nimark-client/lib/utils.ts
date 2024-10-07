// lib/utils.ts

import { 
    ApiResponse, 
    Billboard, 
    Category, 
    Product, 
    Size, 
    Color, 
    Brand, 
    Order,
    ProductFilterParams,
    CreateOrderInput
  } from '../types';
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const STORE_ID = process.env.NEXT_PUBLIC_STORE_ID;
  
  if (!API_URL) {
    throw new Error('NEXT_PUBLIC_API_URL is not defined');
  }
  
  if (!STORE_ID) {
    throw new Error('NEXT_PUBLIC_STORE_ID is not defined');
  }
  
  type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
  
  async function fetchApi<T>(
    endpoint: string,
    method: HttpMethod = 'GET',
    body?: any
  ): Promise<ApiResponse<T>> {
    const url = `${API_URL}/${STORE_ID}/${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
  
    const options: RequestInit = {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    };
  
    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return { data };
    } catch (error) {
      console.error('API call failed:', error);
      return {
        data: {} as T,
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      };
    }
  }
  
  export async function getBillboards(): Promise<ApiResponse<Billboard[]>> {
    return fetchApi<Billboard[]>('billboards');
  }
  
  export async function getBillboard(id: string): Promise<ApiResponse<Billboard>> {
    return fetchApi<Billboard>(`billboards/${id}`);
  }
  
  export async function getCategories(): Promise<ApiResponse<Category[]>> {
    return fetchApi<Category[]>('categories');
  }
  
  export async function getCategory(id: string): Promise<ApiResponse<Category>> {
    return fetchApi<Category>(`categories/${id}`);
  }
  
  export async function getProducts(params?: ProductFilterParams): Promise<ApiResponse<Product[]>> {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return fetchApi<Product[]>(`products${queryString}`);
  }
  
  export async function getProduct(id: string): Promise<ApiResponse<Product>> {
    return fetchApi<Product>(`products/${id}`);
  }
  
  export async function getSizes(): Promise<ApiResponse<Size[]>> {
    return fetchApi<Size[]>('sizes');
  }
  
  export async function getColors(): Promise<ApiResponse<Color[]>> {
    return fetchApi<Color[]>('colors');
  }
  
  export async function getBrands(): Promise<ApiResponse<Brand[]>> {
    return fetchApi<Brand[]>('brands');
  }
  
  export async function createOrder(input: CreateOrderInput): Promise<ApiResponse<Order>> {
    return fetchApi<Order>('orders', 'POST', input);
  }
  
  export function formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  }
  
  export function generateImageUrl(imageUrl: string): string {
    // Adjust this function based on how your images are stored and served
    return `${API_URL}/${imageUrl}`;
  }