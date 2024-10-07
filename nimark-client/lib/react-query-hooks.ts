// lib/react-query-hooks.ts

import { useQuery } from '@tanstack/react-query';
import * as api from './utils';
import { ProductFilterParams } from '../types';

export function useBillboards() {
  return useQuery(['billboards'], api.getBillboards);
}

export function useBillboard(id: string) {
  return useQuery(['billboard', id], () => api.getBillboard(id));
}

export function useCategories() {
  return useQuery(['categories'], api.getCategories);
}

export function useCategory(id: string) {
  return useQuery(['category', id], () => api.getCategory(id));
}

export function useProducts(params?: ProductFilterParams) {
  return useQuery(['products', params], () => api.getProducts(params));
}

export function useProduct(id: string) {
  return useQuery(['product', id], () => api.getProduct(id));
}

export function useSizes() {
  return useQuery(['sizes'], api.getSizes);
}

export function useColors() {
  return useQuery(['colors'], api.getColors);
}

export function useBrands() {
  return useQuery(['brands'], api.getBrands);
}