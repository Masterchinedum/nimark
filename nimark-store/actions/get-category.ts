import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_STORE_ID}/categories`;

const getCategory = async (id: string): Promise<Category> => {
  const res = await fetch(`${URL}/${id}`, { cache: 'no-store' });
  return res.json();
};

export default getCategory;
