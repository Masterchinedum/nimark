import Container from '@/components/ui/container';
import ProductList from '@/components/product/product-list';
import getProducts from '@/actions/get-products';
import { Suspense } from 'react';
import ProductCardSkeleton from '@/components/product/product-card-skeleton';

interface SearchPageProps {
  searchParams: Promise<{ q?: string; category?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || '';
  const category = params.category || '';

  // Fetch products - you might want to add search functionality to your API
  const products = await getProducts({
    isFeatured: undefined,
  });

  // Filter products based on search query (client-side for now)
  const filteredProducts = products.filter((product) => {
    const matchesQuery = query
      ? product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description?.toLowerCase().includes(query.toLowerCase())
      : true;

    const matchesCategory = category && category !== 'All'
      ? product.category.name === category
      : true;

    return matchesQuery && matchesCategory;
  });

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <div className="flex flex-col gap-y-8 px-4 py-10 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">
              {query ? `Search results for "${query}"` : 'All Products'}
            </h1>
            {category && category !== 'All' && (
              <p className="text-lg text-muted-foreground">
                in {category}
              </p>
            )}
            <p className="text-sm text-muted-foreground">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'} found
            </p>
          </div>
          <Suspense fallback={<ProductCardSkeleton />}>
            <ProductList 
              title="" 
              items={filteredProducts}
              emptyMessage={query ? `No products found for "${query}"` : 'No products found'}
            />
          </Suspense>
        </div>
      </div>
    </Container>
  );
}
