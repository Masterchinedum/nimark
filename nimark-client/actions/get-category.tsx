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

const getCategory = async (id: string): Promise<Category> => {
  try {
    const res = await fetch(`${URL}/${id}`);
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error(`Failed to fetch category with id ${id}:`, error);
    return null;
  }
};

export default getCategory;
