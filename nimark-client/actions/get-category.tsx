// import { Category } from "@/types";

// const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`

// const getCategory = async (id: string): Promise<Category> => {
//     const res = await fetch(`${URL}/${id}`);
//     return res.json();
// }

// export default getCategory;


//client>actions>get-category.tsx
import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategory = async (id: string): Promise<Category | null> => {
    try {
        const res = await fetch(`${URL}/${id}`);
        if (!res.ok) {
            if (res.status === 404) {
                console.error(`Category with id ${id} not found`);
                return null;
            }
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    } catch (error) {
        console.error(`Error fetching category ${id}:`, error);
        return null;
    }
}

export default getCategory;