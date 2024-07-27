// import { Category } from "@/types";

// const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories` ;

// const getCategories = async (): Promise<Category[]> => {
//     const res = await fetch(URL);
//     return res.json();
// }

// export default getCategories;

//client>actions>get-categories.tsx

import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategories = async (): Promise<Category[]> => {
  try {
    const res = await fetch(URL);
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
};

export default getCategories;
