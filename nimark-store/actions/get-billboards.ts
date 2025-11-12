import { Billboard } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_STORE_ID}/billboards`;

const getBillboards = async (): Promise<Billboard[]> => {
  try {
    const res = await fetch(URL, { 
      cache: 'no-store',
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) {
      console.error(`Failed to fetch billboards: ${res.status}`);
      return [];
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching billboards:', error);
    return [];
  }
};

export default getBillboards;
