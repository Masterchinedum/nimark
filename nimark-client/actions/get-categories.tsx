import { Category } from "@/types";
import { cache } from 'react';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

export const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(URL);
  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }
  return res.json();
};

export default getCategories;