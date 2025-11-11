import { Color } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_STORE_ID}/colors`;

const getColors = async (): Promise<Color[]> => {
  try {
    const res = await fetch(URL, { cache: 'no-store' });
    
    if (!res.ok) {
      throw new Error('Failed to fetch colors');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching colors:', error);
    return [];
  }
};

export default getColors;
