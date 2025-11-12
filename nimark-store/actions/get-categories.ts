import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_STORE_ID}/categories`;

const getCategories = async (): Promise<Category[]> => {
  try {
    const res = await fetch(URL, {
      next: {
        revalidate: 3600, // Cache for 1 hour for better build performance
      },
    });
    
    if (!res.ok) {
      console.error(`Failed to fetch categories: ${res.status}`);
      return [];
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export default getCategories;
