import { Product } from "@/types";
import qs from 'query-string';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_STORE_ID}/products`;

interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  brandId?: string;
  isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> => {
  try {
    const url = qs.stringifyUrl({
      url: URL,
      query: {
        colorId: query.colorId,
        sizeId: query.sizeId,
        categoryId: query.categoryId,
        brandId: query.brandId,
        isFeatured: query.isFeatured,
      },
    });

    const res = await fetch(url, { cache: 'no-store' });
    
    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export default getProducts;
