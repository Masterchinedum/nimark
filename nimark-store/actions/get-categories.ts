import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_STORE_ID}/categories`;

const getCategories = async (): Promise<Category[]> => {
  try {
    const res = await fetch(URL, { cache: 'no-store' });
    
    if (!res.ok) {
      throw new Error('Failed to fetch categories');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export default getCategories;
