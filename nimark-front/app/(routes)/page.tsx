import React from 'react';
import { Product } from '@/types/product';
import ProductCard from '@/components/product/ProductCard';

async function getFeaturedProducts(): Promise<Product[]> {
  // This is a placeholder. Replace with actual API call.
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?featured=true`);
  return res.json();
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to Nimark</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Shop by Category</h2>
        {/* Add category list/grid here */}
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Latest Offers</h2>
        {/* Add offers or promotions here */}
      </section>
    </div>
  );
}