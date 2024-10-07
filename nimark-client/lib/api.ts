import axios from 'axios';
import { Billboard, Category, Product, Size, Color, Brand, Order, ProductFilterParams } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const STORE_ID = process.env.NEXT_PUBLIC_STORE_ID;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

if (!STORE_ID) {
  throw new Error('NEXT_PUBLIC_STORE_ID is not defined');
}

const api = axios.create({
  baseURL: `${API_URL}/${STORE_ID}`,
});

export const getBillboards = async () => {
  const response = await api.get<Billboard[]>('/billboards');
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get<Category[]>('/categories');
  return response.data;
};

export const getProducts = async (params?: ProductFilterParams) => {
  const response = await api.get<Product[]>('/products', { params });
  return response.data;
};

export const getProduct = async (id: string) => {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
};

export const getSizes = async () => {
  const response = await api.get<Size[]>('/sizes');
  return response.data;
};

export const getColors = async () => {
  const response = await api.get<Color[]>('/colors');
  return response.data;
};

export const getBrands = async () => {
  const response = await api.get<Brand[]>('/brands');
  return response.data;
};

export const createOrder = async (orderData: Partial<Order>) => {
  const response = await api.post<Order>('/orders', orderData);
  return response.data;
};

// Add more API functions as needed