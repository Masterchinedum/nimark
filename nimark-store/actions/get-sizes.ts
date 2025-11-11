import { Size } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_STORE_ID}/sizes`;

const getSizes = async (): Promise<Size[]> => {
  try {
    const res = await fetch(URL, { cache: 'no-store' });
    
    if (!res.ok) {
      throw new Error('Failed to fetch sizes');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching sizes:', error);
    return [];
  }
};

export default getSizes;
