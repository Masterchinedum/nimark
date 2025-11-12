import { Category } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const STORE_ID = process.env.NEXT_PUBLIC_STORE_ID;

if (!API_URL || !STORE_ID) {
  console.error('Missing required environment variables:', { API_URL, STORE_ID });
}

const URL = `${API_URL}/${STORE_ID}/categories/parent`;

const getParentCategories = async (): Promise<Category[]> => {
  try {
    const res = await fetch(URL, {
      next: {
        revalidate: 3600, // Cache for 1 hour
      },
    });
    
    if (!res.ok) {
      console.error(`Failed to fetch parent categories: ${res.status}`);
      // Fallback: fetch all categories and filter parent ones
      const allCategoriesUrl = `${API_URL}/${STORE_ID}/categories`;
      const fallbackRes = await fetch(allCategoriesUrl, {
        next: { revalidate: 3600 },
      });
      
      if (!fallbackRes.ok) {
        console.error(`Failed to fetch categories: ${fallbackRes.status}`);
        return [];
      }
      
      const allCategories = await fallbackRes.json();
      // Filter only parent categories (those without parentId)
      return allCategories.filter((cat: Category & { parentId?: string | null }) => !cat.parentId);
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching parent categories:', error);
    return [];
  }
};

export default getParentCategories;
