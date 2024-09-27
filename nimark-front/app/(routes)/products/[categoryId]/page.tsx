import React from 'react';
import { Product } from '@/types/product';
import ProductCard from '@/components/product/ProductCard';
import PaginationControls from '@/components/ui/pagination-controls';

async function getProducts(categoryId: string, page: number = 1, pageSize: number = 12): Promise<{ products: Product[], total: number }> {
  // This is a placeholder. Replace with actual API call.
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?categoryId=${categoryId}&page=${page}&pageSize=${pageSize}`);
  return res.json();
}

export default async function ProductListPage({ 
  params,
  searchParams,
}: {
  params: { categoryId: string };
  searchParams: { page?: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const pageSize = 12;
  const { products, total } = await getProducts(params.categoryId, page, pageSize);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      <PaginationControls 
        currentPage={page}
        totalPages={Math.ceil(total / pageSize)}
        categoryId={params.categoryId}
      />
    </div>
  );
}