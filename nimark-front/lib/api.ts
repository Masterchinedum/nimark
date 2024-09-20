import axios from 'axios';
import { Product } from '@/types/product';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get('/products');
  return response.data;
};

export const getProduct = async (id: string): Promise<Product> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};