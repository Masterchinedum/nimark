import React from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';
import AddToCartButton from '@/components/cart/AddToCartButton';

async function getProduct(productId: string): Promise<Product> {
  // This is a placeholder. Replace with actual API call.
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`);
  return res.json();
}

export default async function ProductDetailPage({ params }: { params: { productId: string } }) {
  const product = await getProduct(params.productId);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Image
            src={product.images[0].url}
            alt={product.name}
            width={500}
            height={500}
            className="w-full h-auto object-cover rounded-lg"
          />
          <div className="grid grid-cols-4 gap-2">
            {product.images.slice(1).map((image) => (
              <Image
                key={image.id}
                src={image.url}
                alt={product.name}
                width={100}
                height={100}
                className="w-full h-auto object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-xl font-semibold">${product.price.toFixed(2)}</p>
          <p>{product.description}</p>
          
          <div className="space-y-2">
            <p><strong>Category:</strong> {product.category.name}</p>
            <p><strong>Size:</strong> {product.size.name}</p>
            <p><strong>Color:</strong> {product.color.name}</p>
            {product.brand && <p><strong>Brand:</strong> {product.brand.name}</p>}
          </div>
          
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}