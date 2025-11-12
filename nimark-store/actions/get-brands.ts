import { Brand } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_STORE_ID}/brands`;

const getBrands = async (): Promise<Brand[]> => {
  try {
    const res = await fetch(URL, { 
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) {
      console.error(`Failed to fetch brands: ${res.status}`);
      return [];
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching brands:', error);
    return [];
  }
};

export default getBrands;
