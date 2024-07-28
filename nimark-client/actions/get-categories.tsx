import { Category } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CATEGORIES_ENDPOINT = `${API_URL}/categories`;

const getCategories = async (): Promise<Category[]> => {
    try {
        const response = await fetch(CATEGORIES_ENDPOINT);
        
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        
        const categories: Category[] = await response.json();
        return categories;
    } catch (error) {
        console.error("Failed to fetch categories:", error);
        return [];
    }
}

export default getCategories;
